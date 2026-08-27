# Zasady współtworzenia AIpaka Workshops

## Wprowadzenie

Dziękujemy za zainteresowanie rozwojem materiałów AIpaka. Przyjmujemy nowe workshopy, poprawki istniejących materiałów, notatki edukacyjne, przykłady oraz zgłoszenia błędów.

Zależy nam na materiałach praktycznych, możliwych do samodzielnego uruchomienia i zrozumiałych dla uczestników o wskazanym poziomie zaawansowania.

## Zasady współpracy

Przed rozpoczęciem pracy przeczytaj [Kodeks postępowania](./CODE_OF_CONDUCT.md). Obowiązuje on w repozytorium, komunikacji projektowej oraz podczas wydarzeń online i stacjonarnych.

- traktuj innych uczestników z szacunkiem,
- przekazuj konkretny i konstruktywny feedback,
- nie używaj obraźliwego ani wykluczającego języka,
- nie publikuj cudzych danych, kodu lub materiałów bez odpowiednich praw,
- zgłaszaj problemy spokojnie i skupiaj się na rozwiązaniu,
- respektuj decyzje maintainerów dotyczące zakresu i jakości repozytorium.

Poważne lub wrażliwe naruszenia zgłaszaj prywatnie zgodnie z procedurą opisaną w kodeksie. Nie publikuj danych osób ani szczegółów zdarzenia w publicznym issue.

## Rodzaje kontrybucji

### Nowy workshop

Możesz przygotować kompletny workshop albo zaproponować temat do pliku [TODO.md](./TODO.md). Większy temat omów wcześniej w issue, aby potwierdzić zakres, numer i poziom trudności.

### Notatki i materiały edukacyjne

Możesz dodawać instrukcje, wyjaśnienia teoretyczne, przykłady, diagramy i legalnie udostępniane materiały pomocnicze. Każdy materiał powinien mieć opis celu i źródła.

### Poprawki istniejących materiałów

Przyjmujemy poprawki błędów, aktualizacje zależności, usprawnienia notebooków, korekty językowe i rozszerzenia dokumentacji. Nie zmieniaj publicznego przepływu workshopu bez opisania wpływu w pull requeście.

### Zgłoszenia problemów i pomysłów

Podatności bezpieczeństwa zgłaszaj prywatnie zgodnie z [SECURITY.md](./SECURITY.md), a nie przez publiczne issue.

Issue powinno zawierać:

- nazwę workshopu i pliku,
- opis oczekiwanego zachowania,
- opis rzeczywistego zachowania,
- kroki pozwalające odtworzyć problem,
- system operacyjny oraz wersje użytych narzędzi,
- komunikat błędu lub zrzut ekranu, jeśli pomaga w diagnozie,
- propozycję rozwiązania, jeżeli jest znana.

Nie umieszczaj w issue sekretów, tokenów, prywatnych danych ani pełnych logów zawierających takie informacje.

## Numeracja workshopów

Folder workshopu ma format:

```text
DNN-krotka-nazwa
```

- `D` — ogólny poziom trudności od `0` do `9`,
- `NN` — kolejny numer workshopu od `01` do `99`,
- `krotka-nazwa` — małe litery, cyfry i myślniki, bez spacji oraz polskich znaków.

Przykłady:

```text
101-wprowadzenie-do-ollamy
302-tts-supertonic
605-system-rag
```

Przed przypisaniem numeru sprawdź tabelę w [README.md](./README.md) i backlog w [TODO.md](./TODO.md). Nie zmieniaj numeru istniejącego workshopu bez uzgodnienia z maintainerami.

## Minimalna struktura workshopu

Zalecana struktura:

```text
DNN-krotka-nazwa/
├── README.md
├── 01-pierwszy-krok.ipynb
├── 02-kolejny-krok.ipynb
├── requirements.txt
└── dodatkowe-materialy.pl.md
```

Wymagania:

- `README.md` jest głównym punktem wejścia i może być napisany po polsku,
- dodatkowe dokumenty po polsku powinny kończyć się na `.pl.md`,
- notebooki powinny mieć numery określające kolejność wykonania,
- każdy notebook powinien zawierać wyjaśniające komórki Markdown,
- ostatni krok czyszczący środowisko musi wymagać świadomego potwierdzenia,
- wygenerowane pliki, cache modeli, `.venv` i sekrety nie mogą trafić do repozytorium.

Jeżeli istniejący workshop używa `README.pl.md`, tabela w głównym README musi prowadzić bezpośrednio do tego pliku.

## Standard dokumentacji

Dokumentacja workshopu powinna określać:

- cel i oczekiwany rezultat,
- poziom trudności oraz wymagania wstępne,
- potrzebne wersje Pythona, Node.js lub innych narzędzi,
- dokładne polecenia instalacji i uruchomienia,
- spodziewany wynik każdego ważnego kroku,
- sposób zatrzymania usług i posprzątania środowiska,
- zakres wykonanej walidacji oraz elementy, których nie sprawdzono na żywo,
- źródła, licencje i autorów materiałów zewnętrznych.

Nie opisuj mocka lub testu statycznego jako pełnego testu end-to-end.

## Standard notebooków i kodu

- używaj czytelnych nazw i małych, skupionych funkcji,
- nie zapisuj bezwzględnych ścieżek ze swojego komputera,
- nie zapisuj tokenów, kluczy API, haseł ani plików `.env`,
- waliduj wejścia użytkownika i bezpiecznie obsługuj ścieżki plików,
- przypinaj kluczowe zależności, gdy ich wersja wpływa na działanie ćwiczenia,
- nie dodawaj dużych modeli, cache ani wygenerowanych plików audio i wideo,
- przed wysłaniem zmian usuń przypadkowe outputy i błędy z notebooków,
- dodaj komentarze tylko tam, gdzie wyjaśniają intencję lub nieoczywiste ograniczenie.

Materiały wygenerowane przy pomocy AI muszą zostać przeczytane, zweryfikowane i przyjęte przez autora pull requesta. Autor odpowiada za ich poprawność oraz prawa do publikacji.

## Proces współtworzenia

### 1. Utwórz fork i pobierz repozytorium

Utwórz fork na swoim koncie GitHub, a następnie sklonuj go lokalnie. Oryginalne repozytorium dodaj jako remote `upstream`.

```powershell
git clone https://github.com/TWOJ_LOGIN/workshops.git
Set-Location workshops
git remote add upstream https://github.com/AIpakaCharlie/workshops.git
```

Spodziewany wynik `git remote -v`: `origin` wskazuje Twój fork, a `upstream` repozytorium AIpakaCharlie.

### 2. Zaktualizuj gałąź bazową

```powershell
git fetch upstream
git switch master
git pull --ff-only upstream master
```

### 3. Utwórz gałąź roboczą

Stosuj krótkie i opisowe nazwy:

```powershell
git switch -c workshop/03-ocr-dokumentow
```

Do mniejszych zmian używaj prefiksów `docs/`, `fix/` albo `chore/`.

### 4. Wprowadź i sprawdź zmiany

Przed commitem wykonaj co najmniej:

```powershell
git status --short
git diff --check
```

Spodziewany wynik `git diff --check`: brak komunikatów o błędach formatowania.

Dla notebooków uruchom w katalogu workshopu:

```powershell
py -c "import json, pathlib; files=list(pathlib.Path('.').glob('*.ipynb')); [json.loads(p.read_text(encoding='utf-8')) for p in files]; print(f'OK: {len(files)} notebooków')"
```

Uruchom również kontrole właściwe dla zmienianego kodu, na przykład:

```powershell
py -m py_compile .\server\main.py
node --check .\webgui\scripts.js
```

Nie deklaruj przejścia testów, których faktycznie nie wykonano.

### 5. Utwórz commit

```powershell
git add .
git commit -m "feat(workshop-03): dodaj podstawy OCR"
```

Commit powinien opisywać jedną logiczną zmianę. Nie używaj komunikatów takich jak `update`, `fix stuff` lub `changes`.

### 6. Wyślij gałąź i otwórz pull request

```powershell
git push -u origin workshop/03-ocr-dokumentow
```

Otwórz pull request do gałęzi `master` repozytorium `AIpakaCharlie/workshops`.

## Wymagania pull requesta

Opis pull requesta powinien zawierać:

- cel zmiany,
- listę najważniejszych plików,
- instrukcję uruchomienia,
- wykonane polecenia walidacyjne i ich wyniki,
- zrzuty ekranu dla istotnych zmian interfejsu,
- informację o niewykonanych testach lub znanych ograniczeniach,
- źródła i licencje nowych danych, grafik, dokumentów lub modeli.

Checklist przed wysłaniem:

- [ ] numer i nazwa folderu są zgodne z formatem `DNN`,
- [ ] README oraz tabela główna prowadzą do właściwych plików,
- [ ] notebooki zawierają instrukcje i mają poprawną kolejność,
- [ ] nie dodano sekretów, `.venv`, cache ani wygenerowanych artefaktów,
- [ ] linki względne działają,
- [ ] uruchomiono właściwe testy i opisano ich wynik,
- [ ] materiały zewnętrzne mają podane źródła i warunki użycia.

## Review i merge

Maintainerzy mogą poprosić o zmianę zakresu, dodatkową walidację, korekty dokumentacji albo rozdzielenie dużego pull requesta. Odpowiadaj na komentarze w tym samym PR i oznaczaj rozwiązane wątki dopiero po wprowadzeniu poprawek.

Zmiana zostanie scalona po akceptacji review i zakończeniu wymaganych kontroli. Samo otwarcie pull requesta nie gwarantuje jego przyjęcia.

## Własność i licencjonowanie

Dodając materiał, potwierdzasz, że masz prawo go opublikować oraz że może być wykorzystywany zgodnie z edukacyjnymi i niekomercyjnymi zasadami opisanymi w [README.md](./README.md). Zachowaj informacje o autorach i źródłach.

Nie dodawaj materiałów o niejasnym pochodzeniu. W razie wątpliwości otwórz issue przed wysłaniem plików.

## Pytania

Jeżeli zakres, numer workshopu albo sposób implementacji nie jest jasny, otwórz issue i opisz propozycję przed rozpoczęciem większej pracy.

Dziękujemy za rozwijanie AIpaka Workshops!
