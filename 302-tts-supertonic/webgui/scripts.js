const API = Object.freeze({
  health: "/health",
  preview: "/api/tts/preview",
  createFile: "/api/tts/files",
  library: "/api/tts/library",
});

const HEALTH_TIMEOUT_MS = 5000;
const HEALTH_CHECK_INTERVAL_MS = 30000;

const root = document.documentElement;
const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = themeToggle.querySelector(".theme-icon");
const themeLabel = themeToggle.querySelector(".theme-label");
const form = document.querySelector("#tts-form");
const textInput = document.querySelector("#text");
const voiceInput = document.querySelector("#voice");
const languageInput = document.querySelector("#language");
const characterCount = document.querySelector("#character-count");
const textError = document.querySelector("#text-error");
const previewButton = document.querySelector("#preview-button");
const fileButton = document.querySelector("#file-button");
const downloadButton = document.querySelector("#download-button");
const statusBox = document.querySelector("#status");
const playerPanel = document.querySelector("#player-panel");
const audioPlayer = document.querySelector("#audio-player");
const apiHealthBadge = document.querySelector("#api-health-badge");
const apiHealthLabel = document.querySelector("#api-health-label");
const apiHealthMessage = document.querySelector("#api-health-message");
const apiHealthDetails = document.querySelector("#api-health-details");
const healthRetryButton = document.querySelector("#health-retry-button");
const audioLibrary = document.querySelector("#audio-library");
const libraryFolderFilter = document.querySelector("#library-folder-filter");
const libraryRefreshButton = document.querySelector("#library-refresh");
const libraryLoading = document.querySelector("#library-loading");
const libraryStatus = document.querySelector("#library-status");
const audioFolders = document.querySelector("#audio-folders");
const libraryPlayer = document.querySelector("#library-player");
const libraryPlayerTitle = document.querySelector("#library-player-title");
const libraryAudio = document.querySelector("#library-audio");
const playerThrobber = document.querySelector("#player-throbber");
const playbackToggle = document.querySelector("#playback-toggle");
const playbackToggleLabel = playbackToggle.querySelector(".playback-toggle-label");
const playbackProgress = document.querySelector("#playback-progress");
const playbackTime = document.querySelector("#playback-time");
const playbackSpeed = document.querySelector("#playback-speed");

let previewUrl = null;
let isHealthCheckRunning = false;
let isApiOnline = false;
let isLibraryLoading = false;
let selectedLibraryFile = null;
let audioLibraryData = { folders: [], total_files: 0 };
let pendingLibrarySelection = null;

function getInitialTheme() {
  const savedTheme = localStorage.getItem("tts-theme");

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
  const isDark = theme === "dark";
  root.dataset.theme = theme;
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", isDark ? "Włącz jasny motyw" : "Włącz ciemny motyw");
  themeIcon.textContent = isDark ? "☀" : "☾";
  themeLabel.textContent = isDark ? "Jasny motyw" : "Ciemny motyw";
}

function showStatus(message, kind = "info") {
  statusBox.textContent = message;
  statusBox.dataset.kind = kind;
  statusBox.hidden = false;
}

function hideStatus() {
  statusBox.hidden = true;
  statusBox.textContent = "";
  delete statusBox.dataset.kind;
}

function setLibraryStatus(message = "", kind = "info") {
  libraryStatus.textContent = message;

  if (message) {
    libraryStatus.dataset.kind = kind;
  } else {
    delete libraryStatus.dataset.kind;
  }
}

function setLibraryLoading(isLoading) {
  isLibraryLoading = isLoading;
  libraryLoading.hidden = !isLoading;
  libraryFolderFilter.disabled = !isApiOnline;
  libraryRefreshButton.disabled = isLoading || !isApiOnline;
  audioLibrary.setAttribute("aria-busy", String(isLoading));
  audioFolders.querySelectorAll("button").forEach((button) => {
    button.disabled = isLoading;
  });
}

function formatFileSize(sizeBytes) {
  if (!Number.isFinite(sizeBytes) || sizeBytes < 0) {
    return "—";
  }

  if (sizeBytes < 1024) {
    return `${sizeBytes} B`;
  }

  if (sizeBytes < 1024 * 1024) {
    return `${(sizeBytes / 1024).toFixed(1)} KB`;
  }

  return `${(sizeBytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatModifiedAt(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Nieznana data";
  }

  return new Intl.DateTimeFormat("pl-PL", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}

function formatPlaybackTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }

  const roundedSeconds = Math.floor(seconds);
  const minutes = Math.floor(roundedSeconds / 60);
  return `${minutes}:${String(roundedSeconds % 60).padStart(2, "0")}`;
}

function updatePlaybackProgress() {
  const duration = Number.isFinite(libraryAudio.duration) ? libraryAudio.duration : 0;
  const currentTime = Number.isFinite(libraryAudio.currentTime) ? libraryAudio.currentTime : 0;

  playbackProgress.max = String(duration);
  playbackProgress.value = String(Math.min(currentTime, duration));
  playbackProgress.disabled = duration <= 0;
  playbackTime.textContent = `${formatPlaybackTime(currentTime)} / ${formatPlaybackTime(duration)}`;
}

function updatePlaybackButton() {
  const isPlaying = !libraryAudio.paused && !libraryAudio.ended;
  playbackToggle.querySelector("span[aria-hidden='true']").textContent = isPlaying ? "❚❚" : "▶";
  playbackToggleLabel.textContent = isPlaying ? "Pauza" : "Odtwórz";
}

function updateSelectedFileHighlight() {
  audioFolders.querySelectorAll(".audio-file").forEach((item) => {
    const isSelected = item.dataset.fileUrl === selectedLibraryFile?.url;
    item.classList.toggle("is-selected", isSelected);

    if (isSelected) {
      item.setAttribute("aria-current", "true");
    } else {
      item.removeAttribute("aria-current");
    }
  });
}

function resetLibraryPlayer() {
  libraryAudio.pause();
  libraryAudio.removeAttribute("src");
  libraryAudio.load();
  selectedLibraryFile = null;
  libraryPlayer.hidden = true;
  libraryPlayerTitle.textContent = "Wybierz plik z listy";
  playerThrobber.hidden = true;
  playbackProgress.value = "0";
  playbackProgress.max = "0";
  playbackProgress.disabled = true;
  playbackTime.textContent = "0:00 / 0:00";
  updatePlaybackButton();
  updateSelectedFileHighlight();
}

async function playLibraryFile(file) {
  const isNewFile = selectedLibraryFile?.url !== file.url;

  if (isNewFile) {
    libraryAudio.pause();
    selectedLibraryFile = file;
    libraryPlayerTitle.textContent = file.filename;
    libraryPlayer.hidden = false;
    playerThrobber.hidden = false;
    playbackProgress.disabled = true;
    playbackTime.textContent = "0:00 / 0:00";
    libraryAudio.src = file.url;
    libraryAudio.playbackRate = Number(playbackSpeed.value);
    libraryAudio.load();
  }

  updateSelectedFileHighlight();

  try {
    await libraryAudio.play();
  } catch {
    setLibraryStatus("Nie udało się rozpocząć odtwarzania. Spróbuj ponownie.", "error");
  }
}

function formatFileCount(count) {
  if (count === 1) {
    return "1 plik";
  }

  const lastTwoDigits = count % 100;
  const lastDigit = count % 10;

  if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 12 || lastTwoDigits > 14)) {
    return `${count} pliki`;
  }

  return `${count} plików`;
}

function getAllLibraryFiles(data) {
  const folders = Array.isArray(data.folders) ? data.folders : [];
  return folders.flatMap((folder) =>
    (Array.isArray(folder.files) ? folder.files : []).map((file) => ({
      ...file,
      folder: folder.name,
    })),
  );
}

function updateLibrarySummary(data) {
  const folders = Array.isArray(data.folders) ? data.folders : [];
  const selectedFolder = libraryFolderFilter.value;
  const visibleFiles =
    selectedFolder === "all"
      ? getAllLibraryFiles(data)
      : getAllLibraryFiles({
          folders: folders.filter((folder) => folder.name === selectedFolder),
        });
  const folderLabel = libraryFolderFilter.selectedOptions[0]?.textContent || "Folder";

  setLibraryStatus(
    visibleFiles.length
      ? `${folderLabel}: ${formatFileCount(visibleFiles.length)} WAV.`
      : `${folderLabel}: brak plików WAV.`,
    visibleFiles.length ? "success" : "info",
  );
}

function renderAudioLibrary(data) {
  const allFolders = Array.isArray(data.folders) ? data.folders : [];
  const allFiles = getAllLibraryFiles(data);
  const availableUrls = new Set(allFiles.map((file) => file.url));
  const selectedFolder = libraryFolderFilter.value;
  const visibleFolders =
    selectedFolder === "all"
      ? allFolders
      : allFolders.filter((folder) => folder.name === selectedFolder);
  audioFolders.replaceChildren();

  for (const folder of visibleFolders) {
    const files = Array.isArray(folder.files) ? folder.files : [];
    const group = document.createElement("section");
    group.className = "audio-folder";

    const heading = document.createElement("div");
    heading.className = "audio-folder-heading";
    const title = document.createElement("h3");
    title.textContent = folder.label || folder.name;
    const count = document.createElement("span");
    count.textContent = formatFileCount(files.length);
    heading.append(title, count);
    group.append(heading);

    if (!files.length) {
      const empty = document.createElement("p");
      empty.className = "audio-folder-empty";
      empty.textContent = "Brak plików WAV w tym katalogu.";
      group.append(empty);
      audioFolders.append(group);
      continue;
    }

    const list = document.createElement("ul");
    list.className = "audio-file-list";

    for (const file of files) {
      const item = document.createElement("li");
      item.className = "audio-file";
      item.dataset.fileUrl = file.url;

      const details = document.createElement("button");
      details.className = "audio-file-details audio-file-select";
      details.type = "button";
      details.setAttribute("aria-label", `Wybierz i odtwórz ${file.filename}`);
      details.addEventListener("click", () => playLibraryFile(file));
      const name = document.createElement("strong");
      name.textContent = file.filename;
      name.title = file.filename;
      const metadata = document.createElement("span");
      const hasDuration = file.duration_seconds !== null && file.duration_seconds !== undefined;
      const duration = Number(file.duration_seconds);
      const durationLabel =
        hasDuration && Number.isFinite(duration) ? `Czas ${formatPlaybackTime(duration)}` : "Czas —";
      metadata.textContent = `${durationLabel} · ${formatFileSize(file.size_bytes)} · ${formatModifiedAt(file.modified_at)}`;
      details.append(name, metadata);

      const actions = document.createElement("div");
      actions.className = "audio-file-actions";

      const playButton = document.createElement("button");
      playButton.className = "file-action";
      playButton.type = "button";
      playButton.textContent = "Odtwórz";
      playButton.setAttribute("aria-label", `Odtwórz ${file.filename}`);
      playButton.addEventListener("click", () => playLibraryFile(file));

      const downloadLink = document.createElement("a");
      downloadLink.className = "file-action";
      downloadLink.href = file.url;
      downloadLink.download = file.filename;
      downloadLink.textContent = "Pobierz";
      downloadLink.setAttribute("aria-label", `Pobierz ${file.filename}`);

      const deleteButton = document.createElement("button");
      deleteButton.className = "file-action file-action-danger";
      deleteButton.type = "button";
      deleteButton.textContent = "Usuń";
      deleteButton.setAttribute("aria-label", `Usuń ${file.filename}`);
      deleteButton.addEventListener("click", () => deleteLibraryFile(file));

      actions.append(playButton, downloadLink, deleteButton);
      item.append(details, actions);
      list.append(item);
    }

    group.append(list);
    audioFolders.append(group);
  }

  if (selectedLibraryFile && !availableUrls.has(selectedLibraryFile.url)) {
    resetLibraryPlayer();
  } else {
    updateSelectedFileHighlight();
  }

  updateLibrarySummary(data);
  return allFiles;
}

async function loadAudioLibrary({ selectUrl = null, folder = null } = {}) {
  if (folder && [...libraryFolderFilter.options].some((option) => option.value === folder)) {
    libraryFolderFilter.value = folder;
  }

  if (selectUrl) {
    pendingLibrarySelection = selectUrl;
  }

  if (!isApiOnline || isLibraryLoading) {
    return;
  }

  setLibraryLoading(true);
  setLibraryStatus("Pobieranie listy plików…", "info");

  try {
    const response = await fetch(API.library, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Endpoint listy plików jest niedostępny. Zrestartuj serwer TTS.");
      }

      throw new Error(await getErrorMessage(response));
    }

    const data = await response.json();
    audioLibraryData = data;
    const files = renderAudioLibrary(data);

    if (pendingLibrarySelection) {
      const selectedFile = files.find((file) => file.url === pendingLibrarySelection);

      if (selectedFile) {
        pendingLibrarySelection = null;
        await playLibraryFile(selectedFile);
        audioLibrary.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
          block: "start",
        });
      }
    }
  } catch (error) {
    audioFolders.replaceChildren();
    setLibraryStatus(error.message || "Nie udało się pobrać listy plików.", "error");
  } finally {
    setLibraryLoading(false);
  }
}

async function deleteLibraryFile(file) {
  if (!isApiOnline || !window.confirm(`Usunąć plik „${file.filename}”?`)) {
    return;
  }

  if (selectedLibraryFile?.url === file.url) {
    resetLibraryPlayer();
  }

  setLibraryLoading(true);
  setLibraryStatus(`Usuwanie pliku ${file.filename}…`, "info");

  try {
    const response = await fetch(file.url, { method: "DELETE" });

    if (!response.ok) {
      throw new Error(await getErrorMessage(response));
    }

    setLibraryStatus(`Usunięto plik ${file.filename}.`, "success");
  } catch (error) {
    setLibraryStatus(error.message || "Nie udało się usunąć pliku.", "error");
    return;
  } finally {
    setLibraryLoading(false);
  }

  await loadAudioLibrary();
}

function setHealthState(state, details = "") {
  const labels = {
    checking: "Sprawdzanie API…",
    online: "API dostępne",
    offline: "API niedostępne",
  };

  apiHealthBadge.classList.remove("is-checking", "is-online", "is-offline");
  apiHealthBadge.classList.add(`is-${state}`);
  apiHealthLabel.textContent = labels[state];
  apiHealthBadge.setAttribute("aria-label", labels[state]);

  const isOffline = state === "offline";
  apiHealthMessage.hidden = !isOffline;
  healthRetryButton.disabled = state === "checking";

  if (isOffline) {
    apiHealthDetails.textContent =
      details || "Nie udało się uzyskać odpowiedzi z endpointu GET /health.";
  }

  if (state === "online") {
    const shouldLoadLibrary = !isApiOnline;
    isApiOnline = true;
    libraryFolderFilter.disabled = false;

    if (shouldLoadLibrary) {
      loadAudioLibrary();
    }
  } else if (state === "offline") {
    isApiOnline = false;
    setLibraryLoading(false);
    audioFolders.replaceChildren();
    setLibraryStatus("Brak połączenia z serwerem. Uruchom API i użyj „Sprawdź ponownie”.", "error");
    resetLibraryPlayer();
  } else if (!isApiOnline) {
    libraryFolderFilter.disabled = true;
    libraryRefreshButton.disabled = true;
    libraryLoading.hidden = false;
    audioLibrary.setAttribute("aria-busy", "true");
    setLibraryStatus("Oczekiwanie na odpowiedź serwera…", "info");
  }
}

async function checkApiHealth() {
  if (isHealthCheckRunning) {
    return;
  }

  isHealthCheckRunning = true;
  setHealthState("checking");
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), HEALTH_TIMEOUT_MS);

  try {
    const response = await fetch(API.health, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Endpoint GET /health zwrócił HTTP ${response.status}.`);
    }

    const contentType = response.headers.get("content-type") ?? "";

    if (contentType.includes("application/json")) {
      const health = await response.json();
      const reportedStatus = String(health.status ?? "ok").toLowerCase();

      if (!["ok", "healthy", "ready"].includes(reportedStatus)) {
        throw new Error(`Serwer zgłosił status: ${reportedStatus}.`);
      }
    }

    setHealthState("online");
  } catch (error) {
    const message =
      error.name === "AbortError"
        ? "Endpoint GET /health nie odpowiedział w ciągu 5 sekund."
        : error.message;
    setHealthState("offline", message);
  } finally {
    window.clearTimeout(timeoutId);
    isHealthCheckRunning = false;
  }
}

function setBusy(isBusy, activeButton) {
  previewButton.disabled = isBusy;
  fileButton.disabled = isBusy;
  form.setAttribute("aria-busy", String(isBusy));

  if (isBusy) {
    activeButton.dataset.originalContent = activeButton.innerHTML;
    activeButton.textContent = "Generowanie…";
    return;
  }

  if (activeButton.dataset.originalContent) {
    activeButton.innerHTML = activeButton.dataset.originalContent;
    delete activeButton.dataset.originalContent;
  }
}

function getRequestBody() {
  return {
    text: textInput.value.trim(),
    voice: voiceInput.value,
    language: languageInput.value,
  };
}

function validateText() {
  const hasText = textInput.value.trim().length > 0;
  textInput.setAttribute("aria-invalid", String(!hasText));
  textError.textContent = hasText ? "" : "Wpisz tekst przed uruchomieniem syntezy.";

  if (!hasText) {
    textInput.focus();
  }

  return hasText;
}

async function getErrorMessage(response) {
  try {
    const contentType = response.headers.get("content-type") ?? "";

    if (contentType.includes("application/json")) {
      const body = await response.json();
      return body.detail ?? body.message ?? `Błąd serwera: ${response.status}`;
    }

    const text = await response.text();
    return text || `Błąd serwera: ${response.status}`;
  } catch {
    return `Błąd serwera: ${response.status}`;
  }
}

async function requestPreview() {
  if (!validateText()) {
    return;
  }

  hideStatus();
  setBusy(true, previewButton);
  showStatus("Supertonic generuje dźwięk bez zapisywania pliku…", "loading");

  try {
    const response = await fetch(API.preview, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(getRequestBody()),
    });

    if (!response.ok) {
      throw new Error(await getErrorMessage(response));
    }

    const audioBlob = await response.blob();

    if (!audioBlob.size) {
      throw new Error("Serwer zwrócił pusty plik audio.");
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    previewUrl = URL.createObjectURL(audioBlob);
    audioPlayer.src = previewUrl;
    playerPanel.hidden = false;
    showStatus("Dźwięk jest gotowy. Odtwarzanie rozpoczyna się w przeglądarce.", "success");

    try {
      await audioPlayer.play();
    } catch {
      showStatus("Dźwięk jest gotowy. Naciśnij Play w odtwarzaczu.", "success");
    }
  } catch (error) {
    showStatus(error.message || "Nie udało się wygenerować dźwięku.", "error");
  } finally {
    setBusy(false, previewButton);
  }
}

async function createAudioFile() {
  if (!validateText()) {
    return;
  }

  downloadButton.classList.add("is-disabled");
  downloadButton.setAttribute("aria-disabled", "true");
  downloadButton.removeAttribute("href");
  hideStatus();
  setBusy(true, fileButton);
  showStatus("Serwer tworzy plik WAV…", "loading");

  try {
    const response = await fetch(API.createFile, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(getRequestBody()),
    });

    if (!response.ok) {
      throw new Error(await getErrorMessage(response));
    }

    const result = await response.json();

    if (!result.download_url) {
      throw new Error("Serwer nie zwrócił adresu do pobrania pliku.");
    }

    downloadButton.href = result.download_url;
    downloadButton.download = result.filename || "supertonic-tts.wav";
    downloadButton.classList.remove("is-disabled");
    downloadButton.setAttribute("aria-disabled", "false");
    showStatus("Plik WAV jest gotowy. Explorer wybierze go i rozpocznie podgląd.", "success");

    const libraryUrl =
      result.library_url ||
      (result.filename
        ? `/api/tts/library/generated_audio/${encodeURIComponent(result.filename)}`
        : null);

    if (libraryUrl) {
      await loadAudioLibrary({
        selectUrl: libraryUrl,
        folder: result.folder || "generated_audio",
      });
    }
  } catch (error) {
    showStatus(error.message || "Nie udało się utworzyć pliku WAV.", "error");
  } finally {
    setBusy(false, fileButton);
  }
}

applyTheme(getInitialTheme());
characterCount.textContent = `${textInput.value.length} / ${textInput.maxLength}`;
checkApiHealth();
window.setInterval(checkApiHealth, HEALTH_CHECK_INTERVAL_MS);

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  localStorage.setItem("tts-theme", nextTheme);
});

textInput.addEventListener("input", () => {
  characterCount.textContent = `${textInput.value.length} / ${textInput.maxLength}`;

  if (textInput.value.trim()) {
    textInput.setAttribute("aria-invalid", "false");
    textError.textContent = "";
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  requestPreview();
});

fileButton.addEventListener("click", createAudioFile);
healthRetryButton.addEventListener("click", checkApiHealth);
libraryRefreshButton.addEventListener("click", () => loadAudioLibrary());
libraryFolderFilter.addEventListener("change", () => {
  renderAudioLibrary(audioLibraryData);
});

playbackToggle.addEventListener("click", async () => {
  if (!selectedLibraryFile) {
    return;
  }

  if (libraryAudio.paused || libraryAudio.ended) {
    try {
      await libraryAudio.play();
    } catch {
      setLibraryStatus("Nie udało się rozpocząć odtwarzania.", "error");
    }
  } else {
    libraryAudio.pause();
  }
});

playbackProgress.addEventListener("input", () => {
  const nextTime = Number(playbackProgress.value);

  if (Number.isFinite(nextTime) && Number.isFinite(libraryAudio.duration)) {
    libraryAudio.currentTime = Math.min(nextTime, libraryAudio.duration);
    updatePlaybackProgress();
  }
});

playbackSpeed.addEventListener("change", () => {
  libraryAudio.playbackRate = Number(playbackSpeed.value);
});

libraryAudio.addEventListener("loadstart", () => {
  playerThrobber.hidden = false;
});

libraryAudio.addEventListener("waiting", () => {
  playerThrobber.hidden = false;
});

libraryAudio.addEventListener("canplay", () => {
  playerThrobber.hidden = true;
  updatePlaybackProgress();
});

libraryAudio.addEventListener("loadedmetadata", updatePlaybackProgress);
libraryAudio.addEventListener("durationchange", updatePlaybackProgress);
libraryAudio.addEventListener("timeupdate", updatePlaybackProgress);
libraryAudio.addEventListener("play", updatePlaybackButton);
libraryAudio.addEventListener("playing", () => {
  playerThrobber.hidden = true;
  updatePlaybackButton();
});
libraryAudio.addEventListener("pause", updatePlaybackButton);
libraryAudio.addEventListener("ended", updatePlaybackButton);
libraryAudio.addEventListener("error", () => {
  playerThrobber.hidden = true;
  updatePlaybackButton();
  setLibraryStatus("Nie udało się wczytać wybranego pliku WAV.", "error");
});

downloadButton.addEventListener("click", (event) => {
  if (downloadButton.getAttribute("aria-disabled") === "true") {
    event.preventDefault();
  }
});

window.addEventListener("beforeunload", () => {
  libraryAudio.pause();

  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
  }
});
