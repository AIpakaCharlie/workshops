# 101 Wprowadzenie do uczenia maszynowego

Ten warsztat prowadzi przez pierwszy praktyczny przep?yw Machine Learningu w Pythonie: od tabeli z danymi, przez podzia? na dane treningowe i testowe, a? po ocen? modelu i strojenie hiperparametr?w.

## Dla kogo

Dla os?b, kt?re znaj? podstawy Pythona i chc? zrozumie?, jak wygl?da praca z modelem ML w praktyce. Nie zak?adamy wcze?niejszej znajomo?ci `scikit-learn`.

## Czego si? nauczysz

- r??nicowa? klasyfikacj? i regresj?,
- dzieli? dane na `X` i `y`, treningowe i testowe,
- trenowa? modele przez `fit()` i wykonywa? predykcje przez `predict()`,
- ocenia? klasyfikacj? i regresj? r??nymi metrykami,
- por?wnywa? model z naiwnym baseline'em,
- rozpoznawa? pierwsze objawy overfittingu,
- u?ywa? `Pipeline`, `GridSearchCV` i hiperparametr?w,
- interpretowa? wyniki zamiast patrze? tylko na jedn? liczb?.

## Kolejne notebooki

1. [`01-klasyfikacja-iris-random-forest.ipynb`](./01-klasyfikacja-iris-random-forest.ipynb) - klasyfikacja gatunku irysa, macierz pomy?ek i wa?ne cechy.
2. [`02-regresja-california-ridge.ipynb`](./02-regresja-california-ridge.ipynb) - regresja liniowa i Ridge na California Housing, baseline i metryki regresji.
3. [`03-strojenie-hiperparametr?w.ipynb`](./03-strojenie-hiperparametr?w.ipynb) - notatnik z gwiazdk?: strojenie hiperparametr?w Random Forest, koszt obliczeniowy i post?p treningu.

## Przygotowanie ?rodowiska

```powershell
python -m venv .venv
.venv\Scripts\activate
python -m pip install -r requirements.txt
jupyter notebook
```

Na macOS/Linux aktywacja ?rodowiska wygl?da zwykle tak:

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
jupyter notebook
```

## Uwaga o czasie dzia?ania

Trzeci notebook celowo pokazuje koszt strojenia hiperparametr?w i mo?e trwa? kilka minut. To cz??? lekcji: lepsze eksperymenty wymagaj? czasu, wi?c trzeba ?wiadomie planowa? siatk? parametr?w.
