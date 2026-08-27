---
title: "TODO — plan kolejnych workshopów AIpaka"
description: "Backlog kolejnych workshopów wraz z numeracją, trudnością, zakresem i zależnościami."
tags:
  - warsztaty
  - roadmap
  - ocr
  - stt
  - rag
  - llm
  - tts
authors:
  - Kacper Boś
language: pl
status: draft
created: 2026-08-26T23:24:59+02:00
updated: 2026-08-26T23:24:59+02:00
---

# TODO — plan kolejnych workshopów

Kod folderu ma format `DNN-nazwa`:

- `D` — ogólny poziom trudności od `0` do `9`,
- `NN` — kolejny numer workshopu.

Foldery wymienione poniżej są planowane i powstaną dopiero podczas przygotowywania materiałów.

## Lista workshopów do wykonania

| Priorytet | Kod   | Poziom                  | Planowany folder                 | Główny rezultat                                      | Status |
| --------- | ----- | ----------------------- | -------------------------------- | ---------------------------------------------------- | ------ |
| 1         | `303` | 3/9 — podstawowy plus   | `303-ocr-dokumentow`             | Obraz lub PDF → rozpoznany tekst i dane strukturalne | TODO   |
| 2         | `404` | 4/9 — średni            | `404-stt-lokalne`                | Mikrofon lub audio → transkrypcja z timestampami     | TODO   |
| 3         | `605` | 6/9 — zaawansowany      | `605-system-rag`                 | Dokumenty → wyszukiwanie → odpowiedź ze źródłami    | TODO   |
| 4         | `906` | 9/9 — ekspercki         | `906-pelny-flow-stt-llm-tts`     | Mowa → LLM → odpowiedź głosowa prawie realtime       | TODO   |

## `303` — OCR dokumentów

Przepływ: `obraz/PDF → preprocessing → OCR → tekst/JSON`.

Zakres:

- rozpoznawanie tekstu z obrazu i PDF,
- obrót, kadrowanie, skalowanie, kontrast i odszumianie,
- zachowanie numerów stron oraz położeń fragmentów tekstu,
- zapis wyniku jako TXT, Markdown i JSON,
- porównanie jakości na czystym skanie, zdjęciu telefonu i trudnym dokumencie,
- podstawowy pomiar jakości oraz obsługa pustych i uszkodzonych plików.

## `404` — lokalne STT

Przepływ: `mikrofon/WAV → wykrywanie mowy → STT → tekst z timestampami`.

Zakres:

- transkrypcja pliku audio i wejścia z mikrofonu,
- wybór języka albo jego automatyczne rozpoznanie,
- timestampy segmentów i eksport napisów SRT/VTT,
- test szumu, ciszy, różnych mikrofonów i tempa mówienia,
- pomiar czasu transkrypcji względem długości nagrania,
- proste lokalne API przyjmujące plik audio.

## `605` — system RAG

Przepływ: `dokumenty → fragmenty → embeddingi → wyszukiwanie → LLM → odpowiedź ze źródłami`.

Zakres:

- ładowanie dokumentów TXT, Markdown i PDF,
- chunking oraz przechowywanie metadanych źródła,
- lokalne embeddingi i baza wektorowa,
- wyszukiwanie podobnych fragmentów,
- prompt z kontekstem i odpowiedź zawierająca cytowane źródła,
- test pytań z odpowiedzią w dokumentach i bez odpowiedzi,
- podstawowa ocena jakości retrievalu i ograniczanie halucynacji.

OCR z workshopu `303` może być opcjonalnym wejściem dla zeskanowanych dokumentów.

## `906` — pełny flow `STT → LLM → TTS`

Przepływ: `mikrofon → VAD/STT → LLM → bufor zdań → TTS → odtwarzanie`.

Zakres:

- przechwytywanie mowy i wykrywanie końca wypowiedzi,
- przesłanie transkrypcji do lokalnego LLM,
- przekazywanie gotowych zdań odpowiedzi do Supertonic,
- odtwarzanie pierwszego zdania przed wygenerowaniem całej odpowiedzi,
- kolejka audio, anulowanie i przerwanie odpowiedzi przez użytkownika,
- pomiar czasu do transkrypcji, pierwszego tokenu i pierwszego dźwięku,
- obsługa błędów każdego etapu oraz widoczny status całego pipeline'u,
- opcjonalne dołączenie systemu RAG z workshopu `605`.

Workshop korzysta z doświadczeń z `404-stt-lokalne`, `302-tts-supertonic` oraz opcjonalnie `605-system-rag`.

## Kryteria przygotowania każdego workshopu

- osobny folder zgodny z numeracją `DNN`,
- README po polsku z celem, wymaganiami i planem,
- notebooki lub skrypty prowadzące od podstaw do działającego rezultatu,
- przykładowe wejścia bez danych prywatnych,
- zadania o rosnącym poziomie trudności,
- polecenia uruchomienia, zatrzymania i sprzątania środowiska,
- walidacja kodu oraz jasno opisany zakres testów wykonanych na żywo.
