# 🦙 Wprowadzenie do lokalnych LLM z Ollamą

Warsztaty praktyczne — uruchamiasz AI lokalnie na swoim komputerze. Żadnej chmury, żadnego klucza API, żadnych opłat. Po prostu model działający u Ciebie.

> 📖 **Czym są LLM i jak działają?** — to wszystko znajdziesz w **prezentacji** w repozytorium.

---

## 🎯 Po co są te warsztaty?

- Zobaczyć na własne oczy, jak działa lokalny model AI
- Nauczyć się pisać lepsze prompty (żeby AI rozumiała o co chodzi)
- Połączyć AI z Pythonem i napisać swój pierwszy skrypt

---

## 📋 Co będziemy robić?

### 🗒️ Notatnik 1 — Pogadaj z AI (bez pisania kodu)
Wchodzisz do przeglądarki lub terminala i rozmawiasz z modelem. Zobaczysz m.in.:
- Jak zadawać lepsze i gorsze pytania
- Że AI potrafi się mylić (i jak to sprawdzić)
- Jak powiedzieć modelowi, żeby wcielił się w rolę (np. rekruter IT)

### 🐍 Notatnik 2 — AI + Python
Sterujemy modelem z poziomu kodu. Zobaczysz m.in.:
- Jak wysłać zapytanie do modelu jedną linijką Pythona
- Jak zmusić AI, żeby odpowiedź zwróciła jako JSON (przydatne w aplikacjach)

---

## 🚀 Jak zacząć? (krok po kroku)

### Krok 1 — Pobierz to repozytorium

Kliknij zielony przycisk **Code → Download ZIP** na górze strony, wypakuj folder w dowolnym miejscu.

Albo jeśli znasz terminal:
```bash
git clone <https://github.com/AIpakaCharlie/workshops>
```

---

### Krok 2 — Zainstaluj Ollama

Ollama to program, który pobiera i uruchamia modele AI na Twoim komputerze.

#### 🪟 Windows
Pobierz instalator ze strony i kliknij dalej jak każdy program:
👉 **[https://ollama.com/download/windows](https://ollama.com/download/windows)**

#### 🍎 macOS
Pobierz aplikację ze strony:
👉 **[https://ollama.com/download/mac](https://ollama.com/download/mac)**

Przeciągnij do folderu Aplikacje i uruchom.

#### 🐧 Linux
Wklej w terminalu jedną komendę:
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

---

### Krok 3 — Pobierz model AI

Otwórz terminal (na Windowsie: `cmd` lub `PowerShell`) i wpisz:

```bash
ollama pull gemma4:e4b
```

> ⏳ To może chwilę potrwać — model waży kilkaset MB. Pobierasz go tylko raz.

Sprawdź czy wszystko działa — wpisz w terminalu:
```bash
ollama run gemma4:e4b
```
Jeśli pojawi się `>>>` — możesz pisać do AI! Wyjdź przez `Ctrl+D`.

---

### Krok 4 — Zainstaluj biblioteki Pythona

> ⚠️ Potrzebujesz Pythona 3.10 lub nowszego. Sprawdź: `python --version`

W terminalu, w folderze z repozytorium:
```bash
pip install -r requirements.txt
```

---

### Krok 5 — Uruchom Jupyter

```bash
jupyter notebook
```

Otworzy się przeglądarka. Kliknij `Notatnik1.ipynb` i zaczynamy! 🎉

---

## 📁 Pliki w projekcie

| Plik | Co to jest |
|------|------------|
| `Notatnik1.ipynb` | Ćwiczenia z AI przez terminal — bez pisania kodu |
| `Notatnik2.ipynb` | Ćwiczenia z AI przez Pythona |
| `artykul_llm.txt` | Plik, który wygenerujesz w trakcie Notatnika 1 |
| `requirements.txt` | Lista bibliotek do zainstalowania |

---

### Wersja 1.0
Warsztaty przygotowali członkowie koła 
naukowego AIpaka:

    Jakub Mielcarek

    Jakub Szczerbiński

    Marta Machacka

    AIpaka Charlie AIpacino
    