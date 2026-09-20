# Polityka bezpieczeństwa

## Cel

AIpaka Workshops jest repozytorium edukacyjnym zawierającym notebooki, skrypty, lokalne serwery oraz materiały do samodzielnego uruchamiania. Bezpieczeństwo uczestników, ich danych i środowisk lokalnych jest dla nas ważne.

Ten dokument opisuje wspierane wersje, zakres zgłoszeń oraz sposób odpowiedzialnego przekazywania informacji o podatnościach.

## Wspierane wersje

| Wersja lub gałąź                         | Wsparcie bezpieczeństwa |
| ---------------------------------------- | ----------------------- |
| Aktualna zawartość gałęzi `master`       | Tak                     |
| Otwarty pull request lub gałąź robocza   | Ograniczone             |
| Starszy commit, archiwalna kopia lub fork | Nie                    |

Przed zgłoszeniem sprawdź, czy problem nadal występuje w aktualnej gałęzi `master`. Jeżeli podatność dotyczy forka albo zmodyfikowanej wersji, skontaktuj się najpierw z maintainerem tej wersji.

## Zgłaszanie podatności

Nie publikuj informacji o niezałatanej podatności w publicznym issue, pull requeście, dyskusji ani komentarzu.

Preferowany sposób zgłoszenia:

1. Otwórz kartę **Security** repozytorium `AIpakaCharlie/workshops`.
2. Jeżeli widoczna jest opcja **Report a vulnerability**, użyj jej do utworzenia prywatnego zgłoszenia.
3. Jeżeli prywatne zgłaszanie nie jest dostępne, skontaktuj się prywatnie z maintainerem lub organizatorem AIpaka.
4. Jeżeli nie znasz prywatnego kanału, poproś publicznie wyłącznie o wskazanie kontaktu. Nie podawaj nazwy podatnego pliku, szczegółów technicznych, danych ani sposobu wykorzystania luki.

Aktualne informacje organizacyjne są dostępne na profilu [AIpakaCharlie](https://github.com/AIpakaCharlie) i w materiałach danego wydarzenia.

Repozytorium nie ma obecnie opublikowanego dedykowanego adresu e-mail do zgłoszeń bezpieczeństwa. Nie wysyłaj raportu na przypadkowo znalezione adresy członków społeczności.

## Informacje potrzebne w zgłoszeniu

Podaj możliwie dużo informacji umożliwiających bezpieczne odtworzenie problemu:

- nazwę workshopu, pliku i gałęzi lub identyfikator commita,
- krótki opis podatności,
- kroki odtworzenia,
- wymagane środowisko, system operacyjny i wersje narzędzi,
- potencjalny wpływ na poufność, integralność lub dostępność,
- minimalny proof of concept, jeżeli można go przekazać bez ujawniania danych,
- informację, czy podatność została już ujawniona innej osobie lub projektowi,
- preferowany sposób kontaktu.

Nie dołączaj prawdziwych sekretów, tokenów, danych osobowych ani danych pochodzących z systemu, do którego nie masz uprawnień. Zanonimizuj logi i zrzuty ekranu.

## Zakres zgłoszeń

Zgłoszenie bezpieczeństwa może dotyczyć między innymi:

- ujawnienia sekretów, tokenów lub prywatnych danych,
- niebezpiecznych operacji na plikach albo ścieżkach,
- możliwości zapisania lub odczytania pliku poza dozwolonym katalogiem,
- wykonywania nieoczekiwanego kodu lub poleceń,
- podatnego lokalnego API albo niewłaściwego wystawienia usługi w sieci,
- braku walidacji danych prowadzącego do istotnego wpływu bezpieczeństwa,
- niebezpiecznej komórki notebooka, szczególnie usuwającej lub nadpisującej dane,
- zależności z istotną podatnością używanej przez aktualny workshop,
- instrukcji, która może nieświadomie ujawnić dane lub osłabić bezpieczeństwo środowiska uczestnika.

## Zgłoszenia poza zakresem

Polityka nie obejmuje:

- zwykłych błędów działania bez wpływu na bezpieczeństwo,
- korekt tekstu, brakujących linków i propozycji funkcji,
- problemów występujących wyłącznie w samodzielnie zmodyfikowanym forku,
- podatności w zewnętrznym projekcie, którego kod nie jest utrzymywany w tym repozytorium,
- wyników automatycznego skanera bez opisu wpływu i możliwości odtworzenia,
- socjotechniki, phishingu, fizycznego dostępu lub testów przeciwko członkom społeczności,
- testów powodujących utratę danych, zakłócenie wydarzenia albo niedostępność cudzych usług.

Błędy bez wpływu na bezpieczeństwo zgłaszaj jako zwykłe issue zgodnie z [CONTRIBUTING.md](./CONTRIBUTING.md). Nękanie, groźby i naruszenia zasad społeczności zgłaszaj zgodnie z [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).

## Zasady odpowiedzialnego testowania

Podczas badania bezpieczeństwa:

- testuj wyłącznie zasoby i dane, do których masz uprawnienia,
- używaj minimalnej ilości danych potrzebnej do potwierdzenia problemu,
- nie utrzymuj dostępu po zakończeniu testu,
- nie pobieraj, nie modyfikuj i nie usuwaj cudzych danych,
- nie zakłócaj usług, workshopów ani pracy innych osób,
- nie publikuj szczegółów przed uzgodnionym usunięciem podatności,
- daj maintainerom rozsądny czas na analizę i przygotowanie poprawki.

## Obsługa zgłoszenia

Po otrzymaniu kompletnego zgłoszenia maintainerzy postarają się:

1. potwierdzić odbiór i ustalić bezpieczny kanał dalszego kontaktu,
2. zweryfikować możliwość odtworzenia oraz wpływ podatności,
3. ustalić priorytet i zakres poprawki,
4. przygotować oraz zweryfikować zmianę,
5. uzgodnić ze zgłaszającym moment i zakres publikacji informacji.

AIpaka Workshops jest projektem społecznościowym i nie gwarantuje określonego czasu odpowiedzi ani usunięcia problemu. Krytyczne zgłoszenia będą traktowane priorytetowo w miarę dostępności maintainerów.

Poufność zgłoszenia zostanie zachowana w możliwym zakresie. Informacje będą udostępniane tylko osobom potrzebnym do analizy i naprawy.

## Ujawniony sekret

Jeżeli token, hasło lub klucz został już zapisany w repozytorium albo publicznym logu:

1. natychmiast unieważnij lub zmień (zrotuj) sekret u jego dostawcy,
2. poinformuj prywatnie maintainerów,
3. usuń sekret z aktywnej konfiguracji,
4. sprawdź logi użycia i zakres możliwego dostępu,
5. nie zakładaj, że samo usunięcie commita lub pliku unieważniło ujawniony sekret.

Nie kopiuj ujawnionego sekretu do issue ani kolejnego commita.

## Zależności zewnętrzne

Podatność w bibliotece, modelu lub narzędziu zewnętrznym zgłoś przede wszystkim maintainerom tego projektu. Powiadom również AIpaka prywatnie, jeżeli aktualny workshop przypina podatną wersję albo jego konfiguracja zwiększa ryzyko.

## Wynagrodzenia

Repozytorium nie prowadzi programu bug bounty i nie gwarantuje wynagrodzenia za zgłoszenie. Odpowiedzialne raporty są jednak ważnym wkładem w bezpieczeństwo materiałów i uczestników.

## Zmiany polityki

Polityka może być aktualizowana wraz z rozwojem repozytorium i kanałów kontaktowych. Obowiązuje wersja znajdująca się w aktualnej gałęzi `master`.
