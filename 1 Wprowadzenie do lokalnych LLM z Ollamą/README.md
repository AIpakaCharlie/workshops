# 🦙 Wprowadzenie do lokalnych LLM z Ollamą

Praktyczne warsztaty, podczas których uruchomisz model AI lokalnie na swoim komputerze. Bez chmury, bez kluczy API i bez dodatkowych opłat — po prostu własny model działający u Ciebie.

Jeśli chcesz najpierw zrozumieć, czym są LLM-y i jak działają, zajrzyj do **prezentacji** dostępnej w repozytorium.

## 🎯 Cel warsztatów

Podczas warsztatów:

- zobaczysz, jak działa lokalny model językowy,
- nauczysz się pisać skuteczniejsze prompty,
- sprawdzisz, gdzie AI radzi sobie dobrze, a gdzie potrafi się pomylić,
- połączysz model z Pythonem i napiszesz prosty skrypt korzystający z AI.

## 📋 Plan warsztatów

### Notatnik 1 — rozmowa z AI bez pisania kodu

W pierwszej części będziesz korzystać z modelu bezpośrednio z terminala lub przeglądarki. Dzięki temu zobaczysz:

- jak zadawać lepsze i gorsze pytania,
- jak rozpoznawać błędy i halucynacje modelu,
- jak nadawać modelowi rolę, na przykład rekrutera IT albo nauczyciela.

### Notatnik 2 — AI + Python

W drugiej części połączysz się z modelem z poziomu Pythona. Zobaczysz między innymi:

- jak wysłać zapytanie do modelu z poziomu kodu,
- jak odbierać odpowiedzi programistycznie,
- jak wymusić zwrot odpowiedzi w formacie JSON, co przydaje się w aplikacjach.

## 🚀 Jak zacząć

### 1. Pobierz repozytorium

Możesz pobrać projekt jako plik ZIP, klikając zielony przycisk **Code → Download ZIP**, a następnie wypakować go w dowolnym miejscu.

Jeśli wolisz terminal, użyj:

```bash
git clone https://github.com/AIpakaCharlie/workshops
```

### 2. Zainstaluj Ollamę

Ollama to narzędzie, które pozwala pobierać i uruchamiać modele AI lokalnie na komputerze.

#### Windows

Pobierz instalator i przejdź przez standardowy proces instalacji:

[https://ollama.com/download/windows](https://ollama.com/download/windows)

lub W PowerShell uruchom:

```bash
irm https://ollama.com/install.ps1 | iex
```

#### macOS



#### Linux & macOS

W terminalu uruchom:

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

W przypadku macOS również dostępny jest instalator:

[https://ollama.com/download/mac](https://ollama.com/download/mac)

Następnie przenieś ją do folderu `Applications` i uruchom.

### 3. Pobierz model

Po zainstalowaniu Ollamy otwórz terminal i wpisz:

```bash
ollama pull gemma4:e4b
```

Pobranie może potrwać kilka minut. Model waży kilka GB, ale wystarczy zrobić to tylko raz.

Aby sprawdzić, czy wszystko działa poprawnie, uruchom:

```bash
ollama run gemma4:e4b
```

Jeśli zobaczysz znak zachęty `>>>`, możesz zacząć rozmowę z modelem. Aby zakończyć, użyj `Ctrl+D`, lub wpisz //bye

### 4. Konfiguracja pythona i uruchamianie notatników
Jeżeli masz w systemie wgrany notatnik jupyter i bezprośrednio przez niego chcesz uruchamiać pliki, możesz przejść do podpunktu 5

Mozesz sprawdzić czy masz zainstalowany jupiter w systemie:
```
jupyter notebook --version
```

### 4.1 Tworzenie środowiska wirtualnego (opcjonalnie)
Jeżeli wolisz uruchamiać notatniki przez środowisko wirtualne lub w swoim IDE to zalecane jest  utworzenie środowistka wirtualnego 
Dzięki temu wszystkie pakiety zainstalują się tylko dla tego projektu, a nie globalnie w systemie.

*IDE (np. Pycharm) często tworzą automatycznie środowiska wirualne. Aby sprawdzić czy jest zrobione wystarczy w konsoli sprawdzić czy widzisz prefix .venv. Jeżeli się nie pokazuje wymagane będzie jego aktywowanie lub utworzenie*


Upewnij się, że masz zainstalowanego Pythona w wersji 3.10 lub nowszej i system go widzi 
*(windows domyślnie może nie widzieć Pythona w systemie, wtedy moze być wymagane ręczne dodanie ścieżki do zmiennych systemowych)*

```bash
python --version
```

### Tworzenie środowiska wirtualnego

#### Windows

```bash
#utworzenie (jednorazowe) 
python -m venv .venv

#aktywacja
.venv\Scripts\activate
```

#### macOS / Linux

```bash
#utworzenie (jednorazowe) 
python3 -m venv .venv

#aktywacja
source .venv/bin/activate
```

Po aktywacji środowiska przejdz do podfolderu z plikami tego warsztatu

```bash
cd '1\ Wprowadzenie\ do\ lokalnych\ LLM\ z\ Ollamą/'
```
Następnie, będąc w folderze z repozytorium, uruchom:

```bash
pip install -r requirements.txt
```

### 5. Uruchom Jupytera 

W terminalu wpisz:

```bash
jupyter notebook
```

Po chwili w przeglądarce otworzy się Jupyter. Wybierz plik `Notatnik1.ipynb` i możesz zaczynać.

## 📁 Zawartość projektu

- `Notatnik1.ipynb` — ćwiczenia z korzystania z AI bez pisania kodu
- `Notatnik2.ipynb` — ćwiczenia z użyciem AI w Pythonie
- `artykul_llm.txt` — plik tworzony w trakcie pracy z pierwszym notatnikiem
- `requirements.txt` — lista bibliotek potrzebnych do uruchomienia projektu

## ✅ Wymagania

Do udziału w warsztatach potrzebujesz:

- komputera z systemem Windows, macOS lub Linux,
- zainstalowanej Ollamy,
- Pythona w wersji co najmniej 3.10,
- połączenia z internetem na etapie pobierania repozytorium i modelu.

## 👥 Autorzy

Warsztaty zostały przygotowane przez członków koła naukowego **AIpaka**:

- Jakub Mielcarek
- Jakub Szczerbiński
- Marta Machacka
- AIpaka Charlie AIpacino

## Wersja

1.1
