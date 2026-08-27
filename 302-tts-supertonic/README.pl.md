---
title: "Wprowadzenie do TTS z Supertonic"
description: "Opis praktycznych warsztatów z lokalnej syntezy mowy w Pythonie przy użyciu Supertonic 3."
tags:
  - tts
  - supertonic
  - python
  - ai
  - warsztaty
authors:
  - Kacper Boś
language: pl
status: draft
created: 2026-08-19T00:15:03+02:00
updated: 2026-08-27T23:42:48+02:00
---

# 🎤 Wprowadzenie do TTS z Supertonic

Praktyczne warsztaty poświęcone syntezie mowy, czyli zamianie tekstu na dźwięk. W trakcie zajęć uruchomisz model **Supertonic 3** lokalnie, przetestujesz go w Pythonie, a następnie połączysz z prostym interfejsem przeglądarkowym.

Warsztat prowadzi od podstaw: od krótkiego wprowadzenia do TTS, przez przygotowanie środowiska Pythona, aż do uruchomienia lokalnego serwera generującego mowę.

> [!NOTE]
> Synteza działa lokalnie. Przy pierwszym utworzeniu obiektu `TTS` model zostanie pobrany do cache użytkownika, dlatego wtedy potrzebne jest połączenie z internetem.

## Spis treści

- [Materiały](#-materiały)
- [Cel warsztatów](#-cel-warsztatów)
- [Główne elementy](#-główne-elementy)
- [Plan warsztatów](#-plan-warsztatów)
- [Zawartość katalogu](#-zawartość-katalogu)
- [Wymagania](#-wymagania)
- [Szybki start](#-szybki-start)
- [Ręczne czyszczenie środowiska](#-ręczne-czyszczenie-środowiska)
- [Kompetencje po warsztatach](#-kompetencje-po-warsztatach)
- [Rezultat](#-rezultat)

## 📚 Materiały

- [Czym jest TTS?](./czym-jest-tts.pl.md) — krótki wykład wprowadzający,
- [Architektura projektu](./architektura-projektu.pl.md) — opis budowanej aplikacji, schemat, wymagania i kompetencje,
- [oficjalne repozytorium Supertonic](https://github.com/supertone-inc/supertonic) — kod, przykłady i instrukcje projektu,
- [model Supertonic 3](https://huggingface.co/Supertone/supertonic-3) — pliki modelu i karta modelu.

## 🎯 Cel warsztatów

Podczas warsztatów:

- dowiesz się, czym jest TTS i gdzie wykorzystuje się syntezę mowy,
- poznasz podstawowe etapy zamiany tekstu na dźwięk,
- utworzysz izolowane środowisko wirtualne Pythona,
- zainstalujesz biblioteki i model Supertonic 3,
- wygenerujesz pierwsze nagranie z poziomu notatnika Jupyter,
- przetestujesz dostępne głosy, języki i parametry syntezy,
- uruchomisz lokalny serwer TTS,
- połączysz serwer z interfejsem dostępnym w przeglądarce,
- zobaczysz, jak model AI może stać się częścią prostej aplikacji.

## 🧩 Główne elementy

### Supertonic 3

[Supertonic 3](https://github.com/supertone-inc/supertonic) jest głównym narzędziem wykorzystywanym podczas warsztatów. To model TTS przeznaczony do szybkiego generowania mowy lokalnie przy użyciu modeli ONNX. Synteza odbywa się na komputerze uczestnika, bez wysyłania tekstu do zewnętrznej usługi.

### Python i notatnik Jupyter

Notatnik przeprowadzi Cię przez cały proces przygotowania projektu:

1. sprawdzenie wersji Pythona,
2. utworzenie i aktywowanie środowiska `.venv`,
3. instalację wymaganych pakietów,
4. pobranie modelu Supertonic 3,
5. wygenerowanie testowego pliku audio,
6. eksperymenty z tekstem, głosem, językiem i parametrami syntezy,
7. uruchomienie lokalnego serwera TTS,
8. sprawdzenie komunikacji z serwerem.

### Interfejs `index.html`

Prosta strona internetowa będzie interfejsem użytkownika. Pozwoli wpisać tekst, wybrać ustawienia głosu, wysłać żądanie do lokalnego serwera i odsłuchać wygenerowaną mowę.

### Krótki wykład o TTS

Osobny materiał teoretyczny wyjaśni między innymi:

- czym jest synteza mowy,
- jak wyglądał rozwój systemów TTS,
- z jakich elementów składa się współczesny system TTS,
- czym są modele akustyczne, wokodery i reprezentacje tekstu,
- czym różni się lokalny model od usługi TTS w chmurze,
- jakie są zastosowania, ograniczenia i ryzyka związane z generowaniem głosu.

## 📋 Plan warsztatów

### 1. Czym jest TTS?

Zaczniemy od krótkiego wprowadzenia teoretycznego. Omówimy drogę od tekstu do gotowej fali dźwiękowej oraz przykładowe zastosowania syntezy mowy.

### 2. Przygotowanie środowiska

Sprawdzimy instalację Pythona, utworzymy `.venv` i zainstalujemy zależności wymagane przez notatnik, Supertonic oraz lokalny serwer.

### 3. Pierwsza synteza w Pythonie

Załadujemy model, wygenerujemy mowę dla przykładowego tekstu, zapiszemy wynik do pliku audio i odsłuchamy go bezpośrednio w notatniku.

### 4. Eksperymenty z mową

Porównamy głosy i języki oraz sprawdzimy, jak model radzi sobie z liczbami, skrótami, interpunkcją, dłuższym tekstem i tekstem w języku polskim.

### 5. Lokalny serwer TTS

Uruchomimy serwer udostępniający funkcję syntezy mowy przez HTTP. Poznamy format zapytania, odpowiedź serwera i podstawowy przepływ danych między aplikacją a modelem.

### 6. Interfejs przeglądarkowy

Otworzymy `index.html`, połączymy formularz z serwerem i zbudujemy prosty przepływ:

```text
tekst użytkownika → index.html → serwer Python → Supertonic → plik audio → odtwarzacz
```

### 7. Własne eksperymenty

Na koniec rozbudujesz przykład, zmieniając treść, głos, parametry syntezy lub zachowanie interfejsu.

## 📁 Zawartość katalogu

- `README.pl.md` — opis i plan warsztatów,
- [`czym-jest-tts.pl.md`](./czym-jest-tts.pl.md) — krótki wykład wprowadzający do syntezy mowy,
- [`architektura-projektu.pl.md`](./architektura-projektu.pl.md) — architektura, wymagania i efekty nauki,
- [`01-przygotowanie-srodowiska.ipynb`](./01-przygotowanie-srodowiska.ipynb) — utworzenie `.venv`, instalacja i kernel Jupyter,
- [`02-podstawy-supertonic.ipynb`](./02-podstawy-supertonic.ipynb) — podstawowe wejścia JSON, synteza i zapis WAV,
- [`03-supertonic-zaawansowany-i-serwer.ipynb`](./03-supertonic-zaawansowany-i-serwer.ipynb) — parametry zaawansowane, własny styl JSON i uruchomienie API,
- [`04-hard-streaming-zdaniami.ipynb`](./04-hard-streaming-zdaniami.ipynb) — zadanie hard: odpowiedzi prawie w czasie rzeczywistym, zdanie po zdaniu,
- [`05-sprzatanie-venv.ipynb`](./05-sprzatanie-venv.ipynb) — bezpieczne usunięcie kernela i `.venv`,
- `server/main.py` — lokalny serwer FastAPI udostępniający TTS i interfejs,
- `webgui/index.html` — interfejs użytkownika w przeglądarce,
- `requirements.txt` — zależności Pythona,
- `outputs/` — wejściowe pliki JSON i nagrania z notebooków,
- `generated_audio/` — pliki utworzone przez endpoint serwera.

## ✅ Wymagania

Do udziału w warsztatach potrzebujesz:

- komputera z systemem Windows, macOS lub Linux,
- Pythona w wersji obsługiwanej przez wykorzystywane pakiety,
- przeglądarki internetowej,
- połączenia z internetem podczas instalowania pakietów i pobierania modelu,
- wolnego miejsca na zależności oraz pliki modelu,
- możliwości uruchamiania poleceń w terminalu,
- podstawowej znajomości Pythona i HTML; znajomość TTS nie jest wymagana.

Dokładna lista kontrolna znajduje się w dokumencie [Architektura projektu](./architektura-projektu.pl.md#wymagania-wstępne).

## 🚀 Szybki start

Środowisko możesz przygotować na jeden z dwóch sposobów.

> [!TIP]
> Najprostszy wariant dla uczestnika to uruchomienie notebooka przygotowawczego. Terminal przydaje się, gdy chcesz świadomie wykonać i sprawdzić każdy krok instalacji.

### Opcja 1: notebook przygotowawczy

Otwórz [`01-przygotowanie-srodowiska.ipynb`](./01-przygotowanie-srodowiska.ipynb) i uruchom wszystkie komórki po kolei. Notebook utworzy `.venv`, zainstaluje zależności i zarejestruje kernel Jupyter.

### Opcja 2: terminal

Jeśli chcesz pominąć notebook przygotowawczy, wykonaj polecenia odpowiednie dla swojego systemu z katalogu głównego repozytorium.

#### Windows — PowerShell

```powershell
cd .\302-tts-supertonic
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r .\requirements.txt
python -m ipykernel install --user --name supertonic-workshop --display-name "Supertonic Workshop (.venv)"
python -m pip check
```

#### macOS i Linux — shell

```bash
cd 302-tts-supertonic
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
python -m ipykernel install --user --name supertonic-workshop --display-name "Supertonic Workshop (.venv)"
python -m pip check
```

> [!IMPORTANT]
> Po przygotowaniu środowiska przejdź do zadania w [`02-podstawy-supertonic.ipynb`](./02-podstawy-supertonic.ipynb). Przed uruchomieniem komórek wybierz kernel Python **Supertonic Workshop (.venv)**.

## 🧹 Ręczne czyszczenie środowiska

Po zakończeniu warsztatów możesz użyć [`05-sprzatanie-venv.ipynb`](./05-sprzatanie-venv.ipynb) albo ręcznie usunąć kernel `supertonic-workshop` i katalog `.venv`.

> [!WARNING]
> Zatrzymaj serwer, zamknij notebooki korzystające z `.venv` i otwórz nowy terminal. Przed usunięciem sprawdź, czy bieżący katalog to `302-tts-supertonic`.

### Opcjonalnie: usuń wyniki ćwiczeń

> [!TIP]
> Outputy komórek możesz wyczyścić bezpośrednio w każdym otwartym notebooku. Wybierz polecenie **Clear All Outputs** lub **Wyczyść wszystkie dane wyjściowe**, a następnie zapisz plik `.ipynb`.

Możesz też wyczyścić wszystkie notebooki przez narzędzie [`nbconvert`](https://nbconvert.readthedocs.io/en/latest/config_options.html) oraz usunąć katalogi z wygenerowanymi plikami przez terminal. Zrób to przed usunięciem `.venv`, ponieważ polecenie `nbconvert` korzysta z tego środowiska. Każdy blok uruchom z katalogu głównego repozytorium.

#### Windows — PowerShell

```powershell
cd .\302-tts-supertonic
& .\.venv\Scripts\python.exe -m pip install nbconvert
Get-ChildItem -LiteralPath . -Filter '*.ipynb' | ForEach-Object {
    & .\.venv\Scripts\jupyter.exe nbconvert --clear-output --inplace $_.FullName
}
Remove-Item -LiteralPath .\outputs -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -LiteralPath .\generated_audio -Recurse -Force -ErrorAction SilentlyContinue
```

#### macOS i Linux — shell

```bash
cd 302-tts-supertonic
.venv/bin/python -m pip install nbconvert
.venv/bin/jupyter nbconvert --clear-output --inplace ./*.ipynb
rm -rf -- outputs generated_audio
```

> [!CAUTION]
> Usunięcie `outputs/` i `generated_audio/` kasuje wygenerowane pliki WAV i JSON. Katalogi zostaną utworzone ponownie przy kolejnym uruchomieniu odpowiednich ćwiczeń lub serwera. Cache modelu Supertonic pozostaje bez zmian.

### Windows — PowerShell

Uruchom z katalogu głównego repozytorium:

```powershell
cd .\302-tts-supertonic
Get-Location
& .\.venv\Scripts\jupyter.exe kernelspec remove -f supertonic-workshop
Remove-Item -LiteralPath .\.venv -Recurse -Force
Test-Path -LiteralPath .\.venv
```

Spodziewany wynik: kernel zostaje usunięty, a ostatnie polecenie zwraca `False`.

### macOS i Linux — shell

Uruchom z katalogu głównego repozytorium:

```bash
cd 302-tts-supertonic
pwd
.venv/bin/jupyter kernelspec remove -f supertonic-workshop
rm -rf -- .venv
test ! -d .venv && echo ".venv usunięte"
```

Spodziewany wynik: kernel zostaje usunięty, a na końcu pojawia się komunikat `.venv usunięte`.

## 🎓 Kompetencje po warsztatach

Po ukończeniu ćwiczeń uczestnik potrafi:

- wyjaśnić podstawowy przepływ syntezy mowy,
- przygotować izolowane środowisko Pythona i zainstalować zależności,
- uruchomić model Supertonic i wygenerować plik audio,
- przetestować TTS w notatniku Jupyter,
- uruchomić lokalny serwer HTTP,
- połączyć interfejs HTML z API za pomocą JavaScriptu,
- zdiagnozować podstawowe problemy z modelem, serwerem i odtwarzaniem audio,
- wskazać ograniczenia oraz zasady odpowiedzialnego wykorzystania syntetycznego głosu.

## 🏁 Rezultat

Po ukończeniu warsztatów będziesz mieć działającą lokalnie aplikację TTS: model Supertonic uruchomiony w Pythonie, serwer obsługujący syntezę oraz stronę internetową pozwalającą wygenerować i odtworzyć mowę.
