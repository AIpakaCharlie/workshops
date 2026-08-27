from __future__ import annotations

import io
import os
import threading
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Literal
from urllib.parse import quote

import soundfile as sf
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse, Response
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, ConfigDict, Field, field_validator
from supertonic import TTS

PROJECT_DIR = Path(__file__).resolve().parent.parent
WEBGUI_DIR = PROJECT_DIR / "webgui"
OUTPUT_DIR = PROJECT_DIR / "outputs"
GENERATED_AUDIO_DIR = PROJECT_DIR / "generated_audio"

VoiceName = Literal["F1", "F2", "F3", "F4", "F5", "M1", "M2", "M3", "M4", "M5"]
AudioFolderName = Literal["outputs", "generated_audio"]
LanguageCode = Literal[
    "ar", "bg", "cs", "da", "de", "el", "en", "es", "et", "fi", "fr", "hi", "hr",
    "hu", "id", "it", "ja", "ko", "lt", "lv", "na", "nl", "pl", "pt", "ro", "ru",
    "sk", "sl", "sv", "tr", "uk", "vi",
]
AUDIO_FOLDERS: dict[AudioFolderName, tuple[str, Path]] = {
    "outputs": ("Wyniki notebooków", OUTPUT_DIR),
    "generated_audio": ("Pliki utworzone przez serwer", GENERATED_AUDIO_DIR),
}


class TTSRequest(BaseModel):
    """Validated synthesis request shared by the HTML interface and API clients."""

    model_config = ConfigDict(extra="forbid")

    text: str = Field(min_length=1, max_length=1000)
    voice: VoiceName = "F2"
    language: LanguageCode = "pl"
    total_steps: int = Field(default=8, ge=5, le=12)
    speed: float = Field(default=1.05, ge=0.7, le=2.0)

    @field_validator("text")
    @classmethod
    def reject_blank_text(cls, value: str) -> str:
        text = value.strip()
        if not text:
            raise ValueError("Tekst nie może być pusty.")
        return text


class AudioFileInfo(BaseModel):
    """Metadata needed by the browser-side audio explorer."""

    filename: str
    duration_seconds: float | None = Field(default=None, ge=0)
    size_bytes: int = Field(ge=0)
    modified_at: datetime
    url: str


class AudioFolderInfo(BaseModel):
    """One server-controlled folder exposed to the audio explorer."""

    name: AudioFolderName
    label: str
    files: list[AudioFileInfo]


class AudioLibraryResponse(BaseModel):
    """Complete list of safe, playable files available on the local server."""

    folders: list[AudioFolderInfo]
    total_files: int = Field(ge=0)


app = FastAPI(
    title="Supertonic 3 — lokalne TTS",
    description="Warsztatowe API zgodne z interfejsem webgui.",
    version="1.0.0",
)

_tts: TTS | None = None
_tts_lock = threading.Lock()


def synthesize_wav(request: TTSRequest) -> bytes:
    """Generate an in-memory WAV file while serializing access to the ONNX engine."""

    global _tts

    with _tts_lock:
        if _tts is None:
            _tts = TTS(auto_download=True)

        voice_style = _tts.get_voice_style(voice_name=request.voice)
        wav, _duration = _tts.synthesize(
            text=request.text,
            voice_style=voice_style,
            lang=request.language,
            total_steps=request.total_steps,
            speed=request.speed,
        )
        sample_rate = _tts.sample_rate

    buffer = io.BytesIO()
    sf.write(buffer, wav.squeeze(), sample_rate, format="WAV", subtype="PCM_16")
    return buffer.getvalue()


def create_wav_or_503(request: TTSRequest) -> bytes:
    try:
        return synthesize_wav(request)
    except Exception as error:
        raise HTTPException(
            status_code=503,
            detail=f"Generowanie mowy nie powiodło się: {error}",
        ) from error


def resolve_audio_file(folder: AudioFolderName, filename: str) -> Path:
    """Resolve a WAV filename inside one allow-listed output folder."""

    _label, folder_path = AUDIO_FOLDERS[folder]
    output_root = folder_path.resolve()
    candidate = (folder_path / filename).resolve()

    if candidate.parent != output_root or candidate.suffix.lower() != ".wav":
        raise HTTPException(status_code=400, detail="Nieprawidłowa nazwa pliku.")
    if not candidate.is_file():
        raise HTTPException(status_code=404, detail="Plik nie istnieje.")

    return candidate


def list_audio_folder(folder: AudioFolderName) -> AudioFolderInfo:
    """List direct WAV children without exposing arbitrary filesystem paths."""

    label, folder_path = AUDIO_FOLDERS[folder]
    output_root = folder_path.resolve()
    files: list[AudioFileInfo] = []

    if folder_path.is_dir():
        for entry in folder_path.iterdir():
            candidate = entry.resolve()
            if (
                not candidate.is_file()
                or candidate.parent != output_root
                or candidate.suffix.lower() != ".wav"
            ):
                continue

            stat = candidate.stat()
            try:
                duration_seconds = float(sf.info(candidate).duration)
            except (OSError, RuntimeError):
                duration_seconds = None
            encoded_folder = quote(folder, safe="")
            encoded_filename = quote(candidate.name, safe="")
            files.append(
                AudioFileInfo(
                    filename=candidate.name,
                    duration_seconds=duration_seconds,
                    size_bytes=stat.st_size,
                    modified_at=datetime.fromtimestamp(stat.st_mtime, timezone.utc),
                    url=f"/api/tts/library/{encoded_folder}/{encoded_filename}",
                )
            )

    files.sort(key=lambda item: item.modified_at, reverse=True)
    return AudioFolderInfo(name=folder, label=label, files=files)


@app.get("/health")
def health() -> dict[str, str | bool]:
    return {"status": "ready", "model_loaded": _tts is not None}


@app.post("/api/tts/preview", response_class=Response)
def preview_tts(request: TTSRequest) -> Response:
    wav_bytes = create_wav_or_503(request)
    return Response(
        content=wav_bytes,
        media_type="audio/wav",
        headers={"Content-Disposition": 'inline; filename="supertonic-preview.wav"'},
    )


@app.post("/api/tts/files")
def create_tts_file(request: TTSRequest) -> dict[str, str]:
    wav_bytes = create_wav_or_503(request)
    GENERATED_AUDIO_DIR.mkdir(parents=True, exist_ok=True)

    timestamp = datetime.now(timezone.utc).strftime("%Y%m%d-%H%M%S")
    filename = f"supertonic-{timestamp}-{uuid.uuid4().hex[:8]}.wav"
    (GENERATED_AUDIO_DIR / filename).write_bytes(wav_bytes)
    encoded_filename = quote(filename, safe="")

    return {
        "filename": filename,
        "folder": "generated_audio",
        "download_url": f"/api/tts/files/{filename}",
        "library_url": f"/api/tts/library/generated_audio/{encoded_filename}",
    }


@app.get("/api/tts/files/{filename}", response_class=FileResponse)
def download_tts_file(filename: str) -> FileResponse:
    candidate = (GENERATED_AUDIO_DIR / filename).resolve()
    output_root = GENERATED_AUDIO_DIR.resolve()

    if candidate.parent != output_root or candidate.suffix.lower() != ".wav":
        raise HTTPException(status_code=400, detail="Nieprawidłowa nazwa pliku.")
    if not candidate.is_file():
        raise HTTPException(status_code=404, detail="Plik nie istnieje.")

    return FileResponse(candidate, media_type="audio/wav", filename=candidate.name)


@app.get("/api/tts/library", response_model=AudioLibraryResponse)
def list_audio_library() -> AudioLibraryResponse:
    folders = [list_audio_folder(folder) for folder in AUDIO_FOLDERS]
    return AudioLibraryResponse(
        folders=folders,
        total_files=sum(len(folder.files) for folder in folders),
    )


@app.get("/api/tts/library/{folder}/{filename}", response_class=FileResponse)
def play_audio_file(folder: AudioFolderName, filename: str) -> FileResponse:
    candidate = resolve_audio_file(folder, filename)
    return FileResponse(candidate, media_type="audio/wav")


@app.delete("/api/tts/library/{folder}/{filename}")
def delete_audio_file(folder: AudioFolderName, filename: str) -> dict[str, str]:
    candidate = resolve_audio_file(folder, filename)

    try:
        candidate.unlink()
    except OSError as error:
        raise HTTPException(
            status_code=409,
            detail="Nie można usunąć pliku. Zatrzymaj odtwarzanie i spróbuj ponownie.",
        ) from error

    return {"status": "deleted", "folder": folder, "filename": candidate.name}


@app.get("/", response_class=FileResponse, include_in_schema=False)
def webgui_index() -> FileResponse:
    return FileResponse(
        WEBGUI_DIR / "index.html",
        media_type="text/html",
        headers={"Cache-Control": "no-store"},
    )


app.mount("/", StaticFiles(directory=WEBGUI_DIR, html=True), name="webgui")


def main() -> None:
    host = os.getenv("TTS_HOST", "127.0.0.1")
    port = int(os.getenv("TTS_PORT", "8000"))
    uvicorn.run(app, host=host, port=port)


if __name__ == "__main__":
    main()
