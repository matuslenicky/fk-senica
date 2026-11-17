# FK Senica – návrh webu

Návrh nového webu futbalového klubu FK Senica (Futbalový klub Senica n.o.). **Nie je to oficiálna stránka klubu.** Ukážka má v hlavičke pás s týmto upozornením a vyhľadávače ju neindexujú (`noindex`).

Ukážka: https://matuslenicky.github.io/fk-senica/ · administrácia (ukážka bez ukladania): https://matuslenicky.github.io/fk-senica/admin/

## Vzhľad

**„Bulletin“ (dizajn v2, 17. 11. 2026).** Krémový papier, tmavomodrá a červená z klubových farieb, ozdobné linky. Písmo Abril Fatface (titulky) a Crimson Pro (text).

- úvod ako obálka zápasového bulletinu: kolo, erb, súperi a výkop v strede, odpočet,
- pod obálkou dvojstrana: vľavo výsledky a program, vpravo celá tabuľka ligy,
- pás „Senica v Európe“ so štartmi v Európskej lige 2011 – 2013,
- stránka Klub ako kapitola v knihe: história, úspechy, rival a štadión OMS Arena,
- menu na telefóne je tmavomodrá plocha cez celú obrazovku.

Web sa skladá zo spoločného jadra v2 (`kluby-siet/engine`: `python assemble.py <web>`), vlastný je `src/site.js` (úvod, Klub, nastavenia) a `src/css/skin.css`.

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
