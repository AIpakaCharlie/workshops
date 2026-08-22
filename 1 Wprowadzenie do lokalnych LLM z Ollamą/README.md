# 🦙 Warsztat 1 — Wprowadzenie do lokalnych LLM z Ollamą

Praktyczne warsztaty, podczas których uruchomisz model AI **lokalnie na swoim komputerze**. Bez chmury i bez kluczy API — model będzie działał bezpośrednio na Twoim urządzeniu.

Przed rozpoczęciem upewnij się, że wykonałeś **Warsztat 0 — Przygotowanie środowiska**. Znajdziesz tam instalację Pythona, Jupytera, opis IDE oraz konfigurację środowiska wirtualnego.

Jeśli chcesz najpierw zrozumieć, czym są LLM-y i jak działają, zajrzyj również do prezentacji dostępnej w materiałach warsztatowych.

---

## 🎯 Cel warsztatu

Podczas warsztatu:

- zobaczysz, jak działa lokalny model językowy,
- nauczysz się pisać skuteczniejsze prompty,
- sprawdzisz, gdzie AI radzi sobie dobrze, a gdzie może się pomylić,
- połączysz model z Pythonem,
- napiszesz prosty kod korzystający z lokalnego AI.

---

## 📋 Plan warsztatu

### Notatnik 1 — rozmowa z AI bez pisania kodu

W pierwszej części będziesz korzystać z modelu bezpośrednio z terminala lub przeglądarki. Sprawdzisz między innymi:

- jak zadawać lepsze i gorsze pytania,
- jak rozpoznawać błędy i halucynacje modelu,
- jak nadawać modelowi określoną rolę, np. rekrutera IT albo nauczyciela.

### Notatnik 2 — AI + Python

W drugiej części połączysz się z modelem z poziomu Pythona. Zobaczysz:

- jak wysłać zapytanie do modelu z kodu,
- jak programistycznie odebrać odpowiedź,
- jak wymusić odpowiedź w formacie JSON przydatnym w aplikacjach.

---

# 🚀 Uruchomienie warsztatu

## 1. Przejdź do folderu warsztatu

Po pobraniu repozytorium przejdź do katalogu:

```text
1 Wprowadzenie do lokalnych LLM z Ollamą
```

W terminalu możesz użyć: 

```bash
cd "1 Wprowadzenie do lokalnych LLM z Ollamą"
```


---

## 2. Zainstaluj Ollamę

**Ollama** pozwala pobierać i uruchamiać modele językowe lokalnie na komputerze.

### Windows

Najwygodniej zainstalować Ollamę przez WinGet:

```powershell
winget install --id Ollama.Ollama -e
```

Alternatywnie możesz pobrać instalator ze strony:

[https://ollama.com/download/windows](https://ollama.com/download/windows)

### macOS

Pobierz aplikację:

[https://ollama.com/download/mac](https://ollama.com/download/mac)

Po instalacji uruchom Ollamę.

### Linux

W terminalu wykonaj:

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

---

## 3. Pobierz model Gemma 4

W terminalu wpisz:

```bash
ollama pull gemma4:e4b
```

Model ma kilka GB, więc pierwsze pobieranie może potrwać chwilę. Ten krok wykonujesz tylko raz.

Po zakończeniu sprawdź, czy model działa:

```bash
ollama run gemma4:e4b
```

Jeśli pojawi się znak:

```text
>>>
```

możesz rozpocząć rozmowę z modelem.

Aby zakończyć rozmowę, użyj:

```text
Ctrl+D
```

lub wpisz:

```text
/bye
```

---

## 4. Zainstaluj biblioteki wymagane przez warsztat

Będąc w folderze warsztatu i mając aktywne środowisko `.venv`, uruchom:

### Windows

```powershell
python -m pip install -r requirements.txt
```

### macOS / Linux

```bash
python3 -m pip install -r requirements.txt
```

---

## 5. Uruchom materiały warsztatowe

Uruchom Jupyter Notebook:

```bash
jupyter notebook
```

Następnie otwórz:

```text
Notatnik1.ipynb
```

Po wykonaniu pierwszej części przejdź do:

```text
Notatnik2.ipynb
```

---

# ✅ Szybki test przed rozpoczęciem

Sprawdź, czy Ollama działa:

```bash
ollama --version
```

Następnie sprawdź model:

```bash
ollama run gemma4:e4b
```

Jeśli model się uruchamia, możesz rozpocząć warsztat.

---

# 🧯 Najczęstsze problemy

## `ollama` nie jest rozpoznawana

Po instalacji zamknij i ponownie otwórz terminal.

Jeśli problem nadal występuje, uruchom ponownie system i sprawdź:

```bash
ollama --version
```

## Model nie jest pobrany

Uruchom:

```bash
ollama pull gemma4:e4b
```

## Notebook nie może połączyć się z Ollamą

Najpierw sprawdź, czy model uruchamia się bezpośrednio z terminala:

```bash
ollama run gemma4:e4b
```

Jeśli nie, problem dotyczy konfiguracji Ollamy, a nie notebooka.

---

# 📁 Pliki warsztatu

- `Notatnik1.ipynb` — ćwiczenia z korzystania z AI bez pisania kodu,
- `Notatnik2.ipynb` — ćwiczenia z użyciem AI w Pythonie,
- `artykul_llm.txt` — plik wykorzystywany podczas pracy z pierwszym notebookiem,
- `requirements.txt` — biblioteki wymagane przez warsztat.

---

# ✅ Wymagania

Przed rozpoczęciem powinieneś mieć przygotowane środowisko zgodnie z **Warsztatem 0** oraz:

- zainstalowaną Ollamę,
- dostęp do internetu podczas pobierania modelu i bibliotek,
- kilka GB wolnego miejsca na model.

---

# 👥 Autorzy

Warsztat został przygotowany przez członków Studenckiego Koła Naukowego **AIpaka**:

- Jakub Mielcarek
- Jakub Szczerbiński
- Marta Machacka
- AIpaka Charlie AIpacino

## Wersja

**1.1.5**
