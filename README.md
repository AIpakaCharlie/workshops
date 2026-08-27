# AIpaka Workshops

**Lokalne AI. Praktyczne ćwiczenia. Działające rezultaty.**

Repozytorium edukacyjne **Studenckiego Koła Naukowego AIpaka**.

<p>
  <img alt="Workshopy: 2" src="https://img.shields.io/badge/workshopy-2-6f42c1">
  <img alt="Język: polski" src="https://img.shields.io/badge/j%C4%99zyk-polski-dc143c">
  <img alt="Podejście: local first" src="https://img.shields.io/badge/podej%C5%9Bcie-local--first-0a7f5a">
  <a href="./LICENSE.md"><img alt="Licencja: CC BY-SA 4.0" src="https://img.shields.io/badge/licencja-CC%20BY--SA%204.0-2f80ed"></a>
</p>
</div>

## O repozytorium

AIpaka Workshops to kolekcja praktycznych materiałów do nauki sztucznej inteligencji przez budowanie i eksperymentowanie. Każdy workshop prowadzi od przygotowania środowiska do konkretnego rezultatu działającego lokalnie.

Materiały łączą krótkie wprowadzenie teoretyczne z notebookami Jupyter, kodem Python, lokalnymi modelami i małymi aplikacjami demonstracyjnymi.

### Główne założenia

- **local-first** — modele i dane pozostają na komputerze uczestnika, gdy pozwala na to dany workshop,
- **practice-first** — każde zagadnienie kończy się uruchamialnym rezultatem,
- **rosnąca trudność** — numer folderu wskazuje poziom i kolejność materiału,
- **powtarzalność** — workshopy zawierają wymagania, polecenia uruchomienia i walidację,
- **otwarta współpraca** — nowe materiały powstają przez issue i pull requesty.

## Dostępne workshopy

| Kod   | Poziom                | Workshop                                                        | Rezultat                                                      | Główne technologie          |
| ----- | --------------------- | --------------------------------------------------------------- | ------------------------------------------------------------- | --------------------------- |
| `101` | 1/9 — wprowadzenie    | [Lokalne LLM z Ollamą](./101-wprowadzenie-do-ollamy/)           | Lokalny model, skuteczne prompty i pierwsza integracja Python | Ollama, Python, Jupyter     |
| `302` | 3/9 — podstawowy plus | [Lokalne TTS z Supertonic 3](./302-tts-supertonic/README.pl.md) | Lokalna aplikacja zamieniająca tekst na mowę                  | Supertonic 3, FastAPI, ONNX |

## Jak czytać numerację `DNN`

Każdy folder workshopu zaczyna się od trzycyfrowego kodu:

```text
DNN-krotka-nazwa
```

- `D` — ogólny poziom trudności od `0` do `9`,
- `NN` — kolejny numer workshopu od `01` do `99`,
- nazwa — małe litery, cyfry i myślniki, bez spacji oraz polskich znaków.

Przykład: `605-system-rag` oznacza workshop numer `05` o trudności `6/9`.

## Szybki start

### 1. Pobierz repozytorium

```powershell
git clone https://github.com/AIpakaCharlie/workshops.git
Set-Location workshops
```

### 2. Wybierz workshop

```powershell
Set-Location 101-wprowadzenie-do-ollamy
```

albo:

```powershell
Set-Location 302-tts-supertonic
```

### 3. Przeczytaj README wybranego workshopu

Każdy moduł ma własne wymagania, zależności i instrukcję uruchomienia. Nie instaluj wszystkich zależności globalnie — korzystaj ze środowiska `.venv`, jeśli przewiduje je dany materiał.

## Struktura repozytorium

```text
.
├── .github/                         # formularze issue i szablon pull requesta
├── 101-wprowadzenie-do-ollamy/      # lokalne modele językowe
├── 302-tts-supertonic/              # lokalna synteza mowy
├── CODE_OF_CONDUCT.md               # zasady społeczności
├── CONTRIBUTING.md                  # standard współtworzenia
├── LICENSE.md                       # CC BY-SA 4.0
├── SECURITY.md                      # prywatne zgłaszanie podatności
└── TODO.md                          # roadmap kolejnych workshopów
```

## Roadmap

| Kod   | Poziom                | Planowany workshop           | Docelowy przepływ                                   |
| ----- | --------------------- | ---------------------------- | --------------------------------------------------- |
| `303` | 3/9 — podstawowy plus | OCR dokumentów               | obraz lub PDF → tekst i dane strukturalne           |
| `404` | 4/9 — średni          | Lokalne STT                  | mikrofon lub audio → transkrypcja z timestampami    |
| `605` | 6/9 — zaawansowany    | System RAG                   | dokumenty → retrieval → LLM → odpowiedź ze źródłami |
| `906` | 9/9 — ekspercki       | Pełny flow `STT → LLM → TTS` | mowa → model językowy → odpowiedź głosowa           |

Szczegółowy zakres i zależności znajdują się w [TODO.md](./TODO.md).

## Dla kogo

Repozytorium jest przeznaczone dla:

- studentów rozpoczynających naukę AI,
- osób znających podstawy Pythona i chcących budować praktyczne integracje,
- uczestników workshopów, hackathonów i spotkań AIpaka,
- prowadzących szukających gotowych materiałów edukacyjnych,
- contributorów rozwijających otwarte zasoby do nauki AI.

Dokładne wymagania sprzętowe i programowe są opisane osobno dla każdego workshopu. Pierwsze uruchomienie modeli może wymagać połączenia z internetem i kilku gigabajtów wolnego miejsca.

## Współtworzenie

Chcesz poprawić materiał albo przygotować nowy workshop?

1. Przeczytaj [CONTRIBUTING.md](./CONTRIBUTING.md).
2. Sprawdź istniejące tematy w [TODO.md](./TODO.md).
3. Otwórz [zgłoszenie błędu](./.github/ISSUE_TEMPLATE/bug_report.yml) albo [propozycję workshopu](./.github/ISSUE_TEMPLATE/workshop_proposal.yml).
4. Utwórz branch i pull request zgodnie z szablonem repozytorium.

Wszystkich uczestników obowiązuje [Kodeks postępowania](./CODE_OF_CONDUCT.md). Podatności należy zgłaszać prywatnie zgodnie z [SECURITY.md](./SECURITY.md), nigdy jako publiczne issue.

## Licencja

Materiały w repozytorium są udostępniane na licencji [Creative Commons Attribution-ShareAlike 4.0 International](./LICENSE.md), o ile konkretny plik lub materiał zewnętrzny nie wskazuje innych warunków.

Korzystając z materiałów, zachowaj informacje o autorach i źródłach. Adaptacje należy udostępniać na zgodnych warunkach licencyjnych.

## Autorzy i organizatorzy

Materiały są rozwijane przez członków **Studenckiego Koła Naukowego AIpaka** oraz contributorów społeczności.

Wśród autorów znajdują się między innymi:

- Jakub Mielcarek,
- Jakub Szczerbiński,
- Marta Machacka,
- AIpaka Charlie AIpacino.

---

<div align="center">
  <strong>Uczymy się AI, budując rzeczy, które naprawdę działają.</strong>
</div>
