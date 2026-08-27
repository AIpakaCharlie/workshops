---
title: "Czym jest TTS?"
description: "Krótkie wprowadzenie do syntezy mowy, jej budowy, zastosowań i ograniczeń."
tags:
  - tts
  - synteza-mowy
  - supertonic
  - ai
  - teoria
authors:
  - Kacper Boś
language: pl
status: draft
created: 2026-08-19T00:15:03+02:00
updated: 2026-08-19T00:19:52+02:00
---

# Czym jest TTS?

**TTS** (*Text-to-Speech*) to technologia zamieniająca tekst na mowę. Jej zadaniem nie jest jedynie odczytanie kolejnych liter. System musi zrozumieć, jak wymówić słowa, gdzie zrobić przerwę oraz jak nadać wypowiedzi odpowiedni rytm i intonację.

Z TTS spotykamy się między innymi w:

- nawigacji samochodowej,
- czytnikach ekranu i narzędziach dostępności,
- audiobookach i materiałach edukacyjnych,
- asystentach głosowych,
- grach i aplikacjach mobilnych,
- systemach informacji pasażerskiej,
- automatycznej obsłudze telefonicznej.

## Jak tekst staje się dźwiękiem?

W uproszczeniu synteza przebiega w kilku etapach:

```text
tekst → normalizacja → reprezentacja wymowy → model mowy → wokoder → dźwięk
```

### 1. Normalizacja tekstu

System przygotowuje tekst do przeczytania. Musi zdecydować, jak wypowiedzieć liczby, daty, godziny, waluty i skróty.

Przykładowo zapis `19.08.2026` nie powinien zostać przeczytany jako ciąg cyfr. Podobny problem dotyczy zdań takich jak `Mam 2 kg jabłek` albo `Spotkanie jest o 8:30`.

### 2. Reprezentacja wymowy

Tekst jest zamieniany na postać zrozumiałą dla modelu. Mogą to być znaki, tokeny albo fonemy, czyli umowne reprezentacje dźwięków mowy.

Sama pisownia nie zawsze wystarcza. To samo słowo może mieć inną wymowę zależnie od języka lub kontekstu.

### 3. Model mowy

Model przewiduje, jak powinna brzmieć wypowiedź. Uwzględnia między innymi:

- wymowę,
- długość poszczególnych dźwięków,
- pauzy,
- akcent,
- tempo,
- intonację i styl głosu.

Wynikiem tego etapu jest zwykle pośrednia reprezentacja mowy, a nie gotowy plik audio.

### 4. Wokoder

Wokoder zamienia reprezentację przygotowaną przez model na falę dźwiękową. To właśnie ona może zostać zapisana jako plik, na przykład WAV, i odtworzona przez głośniki.

## Jak rozwijały się systemy TTS?

Pierwsze popularne systemy składały wypowiedzi z wcześniej nagranych fragmentów. Potrafiły być zrozumiałe, ale często brzmiały mechanicznie i miały ograniczoną elastyczność.

Później stosowano modele statystyczne opisujące parametry głosu. Dzisiejsze rozwiązania najczęściej wykorzystują sieci neuronowe. Uczą się zależności między tekstem i nagraniami, dzięki czemu potrafią generować bardziej naturalną mowę.

## Czym jest Supertonic?

Supertonic 3 to lekki, wielojęzyczny model TTS przeznaczony do lokalnego generowania mowy. Korzysta z modeli w formacie ONNX, dzięki czemu może działać na komputerze użytkownika bez wysyłania tekstu do zewnętrznego API.

W trakcie warsztatów Supertonic będzie naszym silnikiem syntezy. Python załaduje model i uruchomi generowanie, natomiast lokalny serwer udostępni tę funkcję stronie `index.html`.

> TTS i klonowanie głosu nie oznaczają tego samego. TTS generuje mowę z tekstu, a klonowanie głosu dodatkowo próbuje odtworzyć cechy konkretnej osoby.

## Model lokalny a usługa w chmurze

| Cecha                     | Model lokalny                        | Usługa chmurowa                         |
| ------------------------- | ------------------------------------ | --------------------------------------- |
| Przetwarzanie tekstu      | Na komputerze użytkownika            | Na serwerze dostawcy                    |
| Internet po instalacji    | Zwykle nie jest potrzebny            | Zwykle jest wymagany                    |
| Prywatność                | Tekst może pozostać lokalnie         | Tekst jest wysyłany do usługi           |
| Koszt pojedynczej syntezy | Brak opłaty za API                   | Możliwa opłata za użycie                |
| Wymagania sprzętowe       | Obciążają komputer użytkownika       | Obliczenia wykonuje dostawca            |
| Konfiguracja              | Wymaga instalacji modelu i bibliotek | Wymaga konta, klucza lub integracji API |

Nie istnieje jedno rozwiązanie najlepsze w każdej sytuacji. Wybór zależy od wymaganej jakości, opóźnienia, prywatności, kosztów oraz sprzętu.

## Co wpływa na jakość mowy?

Podczas oceniania TTS warto zwrócić uwagę na:

- **zrozumiałość** — czy każde słowo można poprawnie rozpoznać,
- **naturalność** — czy głos nie brzmi zbyt mechanicznie,
- **wymowę** — szczególnie nazw własnych, skrótów i obcych słów,
- **prozodię** — rytm, akcent, pauzy i intonację,
- **stabilność** — czy model nie pomija i nie powtarza fragmentów,
- **opóźnienie** — ile czasu mija od wysłania tekstu do uzyskania dźwięku.

## Ograniczenia

Model TTS może popełniać błędy. Szczególnie wymagające bywają:

- liczby, daty i jednostki,
- skróty oraz nazwy własne,
- tekst zawierający kilka języków,
- bardzo krótkie lub bardzo długie wypowiedzi,
- nietypowa interpunkcja,
- specjalistyczne słownictwo.

Dlatego system TTS należy testować na przykładach podobnych do tych, które pojawią się w docelowej aplikacji.

## Odpowiedzialne wykorzystanie

Syntetyczny głos może poprawiać dostępność i ułatwiać tworzenie treści, ale może też zostać wykorzystany do podszywania się pod inne osoby.

Korzystając z TTS:

- nie naśladuj konkretnej osoby bez jej zgody,
- oznaczaj treści, jeżeli syntetyczny charakter głosu może wprowadzić odbiorcę w błąd,
- sprawdzaj licencję modelu oraz głosu,
- nie przekazuj do zewnętrznych usług tekstu zawierającego dane wrażliwe,
- odsłuchaj rezultat przed jego opublikowaniem.

## Pytania przed częścią praktyczną

1. Dlaczego system TTS musi normalizować liczby i skróty?
2. Jaką rolę pełni wokoder?
3. Kiedy model lokalny może być lepszym wyborem niż usługa chmurowa?
4. Jak sprawdzić, czy wygenerowana mowa jest dobrej jakości?
5. Jakich zasad należy przestrzegać, publikując syntetyczny głos?

## Następny krok

Po części teoretycznej przejdź do [architektury projektu](./architektura-projektu.pl.md), aby zobaczyć, jakie elementy aplikacji powstaną podczas warsztatów.
