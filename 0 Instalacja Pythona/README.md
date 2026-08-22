# 🧠 Warsztat 0 — Przygotowanie środowiska

Ten warsztat przygotowuje komputer do kolejnych materiałów z repozytorium **AIpaka Workshops**.

Jeśli nie masz jeszcze skonfigurowanego Pythona, Jupytera albo nie wiesz, czym jest IDE i środowisko wirtualne, zacznij właśnie tutaj.

Po wykonaniu tego warsztatu będziesz mieć gotowe środowisko do uruchamiania notebooków i kodu wykorzystywanego w kolejnych zajęciach.

---

## 🎯 Cel warsztatu

Podczas tego warsztatu:

- zainstalujesz Pythona,
- sprawdzisz, czy Python działa poprawnie,
- dowiesz się, czym jest IDE,
- poznasz podstawy pracy z Jupyter Notebook,
- utworzysz środowisko wirtualne `.venv`,
- pobierzesz repozytorium z materiałami warsztatowymi.

---

# 1. Instalacja Pythona

Python jest językiem programowania, którego będziemy używać w wielu kolejnych warsztatach.

## Windows

Najwygodniej zainstalować Pythona przez **WinGet**.

Otwórz **PowerShell** i uruchom:

```powershell
winget install --id Python.Python.3.14 -e
```

Po zakończeniu instalacji zamknij i ponownie otwórz PowerShell, a następnie sprawdź wersję:

```powershell
python --version
```

Powinieneś zobaczyć informację podobną do:

```text
Python 3.14.x
```

Jeśli polecenie `python` nie działa, spróbuj:

```powershell
py --version
```

> Jeśli `winget` nie jest dostępny, możesz również pobrać instalator Pythona ręcznie ze strony [python.org](https://www.python.org/downloads/).

## macOS

Najpierw sprawdź, czy Python jest już dostępny:

```bash
python3 --version
```

Jeśli nie, możesz pobrać instalator ze strony:

[https://www.python.org/downloads/macos/](https://www.python.org/downloads/macos/)

## Linux

W wielu dystrybucjach Python jest już zainstalowany.

Sprawdź:

```bash
python3 --version
```

Jeśli go nie ma, zainstaluj go za pomocą menedżera pakietów swojej dystrybucji.

Przykład dla Ubuntu/Debiana:

```bash
sudo apt update
sudo apt install python3 python3-pip python3-venv
```

---

# 2. Czym jest Jupyter Notebook?

**Jupyter Notebook** pozwala uruchamiać kod w interaktywnych blokach nazywanych **komórkami**.

Pliki notebooków mają rozszerzenie:

```text
.ipynb
```

Notebook może zawierać jednocześnie:

- kod Python,
- wyniki działania kodu,
- tekst i instrukcje,
- wykresy,
- obrazy i inne materiały.

Dzięki temu bardzo dobrze sprawdza się podczas nauki, analizy danych i warsztatów.

---

# 3. Instalacja Jupytera

Najpierw sprawdź, czy Jupyter jest już dostępny:

```bash
jupyter notebook --version
```

Jeśli zobaczysz numer wersji, możesz przejść dalej.

Jeżeli polecenie nie działa, zainstaluj Jupyter Notebook.

### Windows

```powershell
python -m pip install notebook
```

### macOS / Linux

```bash
python3 -m pip install notebook
```

Po instalacji możesz uruchomić Jupytera poleceniem:

```bash
jupyter notebook
```

W przeglądarce otworzy się panel, z którego możesz wybrać plik `.ipynb`.

---

# 4. Środowisko wirtualne — po co jest?

Różne projekty mogą wymagać różnych bibliotek i ich wersji. Dlatego zalecamy korzystanie ze środowiska wirtualnego (virtual environment).

Środowisko wirtualne tworzy oddzielny zestaw pakietów dla konkretnego projektu, dzięki czemu instalowane biblioteki nie mieszają się z pakietami innych projektów. Dodatkowo pakiety są instalowane lokalnie w obrębie danego środowiska, dzięki czemu nie zaśmiecają systemu i globalnej instalacji Pythona.

Najczęściej środowisko nazywamy `.venv`.

## Windows

Utworzenie środowiska:

```powershell
python -m venv .venv
```

Aktywacja:

```powershell
.venv\Scripts\activate
```

## macOS / Linux

Utworzenie środowiska:

```bash
python3 -m venv .venv
```

Aktywacja:

```bash
source .venv/bin/activate
```

Po aktywacji na początku linii terminala zwykle pojawi się informacja podobna do:

```text
(.venv)
```


---



# 5. Edytory kodu i IDE

Kod w Pythonie można pisać na kilka sposobów. Podczas warsztatów będziemy korzystać głównie z **Jupytera**, ponieważ pozwala uruchamiać kod krok po kroku w osobnych komórkach i od razu obserwować wyniki.

Kod można jednak również zapisywać w zwykłych plikach `.py` i uruchamiać je z terminala:

```bash
python program.py
```

Do wygodniejszego pisania większych programów często wykorzystuje się **IDE lub edytory programistyczne**, które oferują dodatkowe narzędzia, takie jak:

* podświetlanie składni,
* podpowiadanie kodu,
* wykrywanie części błędów,
* uruchamianie i debugowanie programu,
* integracja z Git i GitHubem,
* obsługa środowisk Pythona.

Popularne narzędzia to:

* **Visual Studio Code** — lekkie i uniwersalne środowisko, które można rozbudować za pomocą rozszerzeń,
* **PyCharm** — bardziej rozbudowane środowisko skupione przede wszystkim na Pythonie.

Korzystanie z IDE **nie jest wymagane podczas warsztatów**. Notebooki można uruchamiać bezpośrednio przez Jupytera w przeglądarce.

### Opcjonalnie — instalacja Visual Studio Code

#### Windows

Visual Studio Code można zainstalować przez WinGet:

```powershell
winget install --id Microsoft.VisualStudioCode -e
```

#### Linux

Na Ubuntu i innych dystrybucjach obsługujących Snap:

```bash
sudo snap install code --classic
```

W przypadku innych dystrybucji możesz skorzystać z instalatora lub instrukcji dostępnych na stronie Visual Studio Code.

#### macOS

Jeżeli korzystasz z Homebrew:

```bash
brew install --cask visual-studio-code
```

Możesz też pobrać instalator bezpośrednio ze strony Visual Studio Code.

Do pracy z Pythonem warto później zainstalować w VS Code rozszerzenia **Python** oraz **Jupyter**.

---


# 📚 Co dalej?

Po przygotowaniu środowiska przejdź do kolejnego folderu w repozytorium.

Pierwszy właściwy warsztat to:

## Warsztat 1 — Wprowadzenie do lokalnych LLM z Ollamą

W jego README znajdziesz już tylko instrukcje potrzebne do uruchomienia konkretnego warsztatu.

---