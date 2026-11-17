# FK Senica – návrh webu

Návrh nového webu futbalového klubu FK Senica (Futbalový klub Senica n.o.). **Nie je to oficiálna stránka klubu.** Ukážka má v hlavičke pás s týmto upozornením a vyhľadávače ju neindexujú (`noindex`).

Ukážka: https://matuslenicky.github.io/fk-senica/ · administrácia (ukážka bez ukladania): https://matuslenicky.github.io/fk-senica/admin/

## Vzhľad

**„Tribúna“.** Senica má štadión pre 5 070 divákov z roku 1962 a klub, ktorý hral najvyššiu súťaž aj Európsku ligu, po krachu v roku 2022 začal odznova vo VIII. lige.

- čísla a nápisy (SENICA, poradie áčka, kapacita štadióna) sú poskladané **zo sedadiel ako mozaika na tribúne** (inline SVG, písmo 5 × 7),
- farby z prstenca erbu: **prechod z červenej cez fialovú do modrej** ako linka pod hlavičkou, na tabuliach a v päte, tmavomodré plochy ako tribúny,
- zápasová karta ako **tabuľa na štadióne**, hlavička podstránok s radom sedadiel,
- „Štyri sezóny po krachu“ (2022 → V. liga), Senica v Európskej lige 2011 – 2013, akadémia so 13 mládežníckymi tímami vrátane dievčat,
- menu na telefóne ako **sektory tribún okolo ihriska** (ihrisko = úvod),
- písmo **Saira Condensed** (ako tabule na štadióne) a **IBM Plex Sans**.

## Obsah a zdroje

- Zápasy, výsledky, strelci, karty, počty divákov, zostavy dospelých, tabuľky a súpisky 14 tímov zo Sportnetu (Futbalnet), verejné API súťaží (`scripts/sportnet.mjs` → `data/sportnet.json`). Dievčenské tímy majú na Sportnete rovnaký názov ako chlapčenské a rozlišujú sa poľom `gender`. Vek hráčov sa neukladá, zostavy len pri dospelých.
- Údaje o klube v `data/klub.json`, každá časť s uvedeným zdrojom: história, úspechy, Európska liga, sezóny po krachu a rivalita s Myjavou z Wikipédie (FK Senica), štadión z Wikipédie (Štadión FK Senica), derby s Hlbokým z denníka Záhorák, e-mail a adresa zo Sportnetu. Bývalé domény klubu (fksenica.sk, fksenica.eu) dnes patria stávkovým webom.
- Erb FK Senica a erby súperov zo Sportnetu (`scripts/logos.py`). Patria príslušným klubom.
- Písmo Saira Condensed a IBM Plex Sans, licencia SIL Open Font License 1.1 (`scripts/fonts.py`).

## Zostavenie

Statický generátor bez závislostí (Node 20+, Python 3 s Pillow na erby):

```
node scripts/sportnet.mjs        # zápasy, tabuľky a súpisky (FULL=1 stiahne znova aj detaily zápasov)
python -I scripts/logos.py       # erby súperov a náš erb do src/img (FORCE=1 stiahne znova)
node build.js                    # data/ + src/ -> dist/ (TODAY=2026-11-17 prepíše dnešný dátum)
node scripts/serve.mjs dist 5360 # náhľad na http://127.0.0.1:5360/ (?nolr = bez obnovovania, s CSP)
node scripts/deploy.mjs          # nasadenie dist/ na vetvu gh-pages (GitHub Pages)
```

Výsledky sa po zápasoch aktualizujú samé cez GitHub Actions (`.github/workflows/sportnet.yml`).
