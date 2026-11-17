// Statický generátor webu FK Senica: data/ + src/ -> dist/   (node build.js; TODAY=2026-11-17 prepíše dnešný dátum)
// Zostavuje ho kluby-siet/engine/assemble.py zo spoločného jadra v2 a tohto súboru (vzhľad, úvod, stránka Klub).
// Kostra „Bulletin“: úvod ako obálka zápasového bulletinu (číslo kola, erb, súperi a výkop v strede), pod ňou dvojstrana
// s výsledkami, programom a tabuľkou, pás so štartmi v Európe a riadok faktov. Krémový papier, tmavomodrá a červená
// z klubových farieb, ozdobné linky. Písmo Abril Fatface (titulky) a Crimson Pro (text).
const SKIN = {
  nav: 'bar', theme: '#161d4a', brand: 'FK Senica', brandSub: 'Záhoráci od roku 1921',
  fonts: ['abril-fatface-400.woff', 'crimson-pro-400.woff', 'crimson-pro-600.woff'],
  sources: 'História a Európa podľa Wikipédie.',
  adminHero: 'Futbal v Senici od roku 1921',
  adminFacts: club.historia.map((h) => ({ k: h.rok, t: h.text })),
  links: [],
};
const NAV = [['zapasy/', 'Zápasy'], ['tabulky/', 'Tabuľky'], ['timy/', 'Tímy'], ['klub/', 'Klub'], ['kontakt/', 'Kontakt']];
const DESC = `${club.nazov} – futbal v Senici od roku ${club.zalozenie}. Zápasy, výsledky, tabuľky a súpisky áčka (${A.leagueName}) a mládeže, dva druhé miesta v najvyššej súťaži a štarty v Európskej lige.`;
const orn = '<p class="orn" aria-hidden="true">✦</p>';

add('', {
  title: 'Záhoráci od roku 1921', active: '', bodyClass: 'home',
  body: (R) => {
    const m = nextA || lastA;
    const wl = winterLine();
    const vs = m ? (m.home ? `FK Senica <i>–</i> ${esc(m.opponent)}` : `${esc(m.opponent)} <i>–</i> FK Senica`) : esc(club.nazov);
    return `<section class="cover"><div class="wrap cover-in">
  <p class="cover-k">Zápasový bulletin · ${esc(A.leagueName)}${m?.roundName ? ` · ${esc(m.roundName)}` : ''}</p>
  <img class="cover-crest" src="${R}img/erb-240.webp" alt="${esc(club.erbAlt)}" width="${Math.round(120 * CREST_R)}" height="120">
  <h1 class="cover-h">${vs}${m?.score ? ` <span class="cover-sc">${esc(m.score)}</span>` : ''}</h1>
  ${m ? `<p class="cover-d">${m.past ? 'Posledný zápas · ' : ''}<time datetime="${m.date}">${dLong(m.date)}</time>${m.time && !m.past ? ` · ${esc(m.time)}` : ''} · ${m.home ? esc(ST.nazov) : esc(venueName(m.venue || 'vonku'))}</p>` : ''}
  ${m && !m.past ? `<p class="cover-cd"><span class="cd" data-kickoff="${isoLocal(m.date, m.time)}" hidden></span></p>` : ''}
  ${wl ? `<p class="cover-p">${wl}</p>` : ''}
  <p class="btns">${m && !m.past ? `<a class="btn" href="${R}kalendar/zapas-${m.id}.ics" download>${I.cal}Do kalendára</a>` : ''}<a class="btn btn--line" href="${R}zapasy/">Program a výsledky</a></p>
</div></section>
<section class="spread"><div class="wrap spread-in">
  <div class="page-l">
    <h2 class="h3">Posledné výsledky</h2>${fxList(homeRes(5), R)}
    <h2 class="h3 h3--gap">Program</h2>${homeUp(4).length ? fxList(homeUp(4), R) : '<p>Ďalšie zápasy zatiaľ nie sú vyžrebované.</p>'}
    ${more(`${R}zapasy/`, 'Všetky zápasy')}
  </div>
  <div class="page-r">
    <h2 class="h3">${esc(A.leagueName)}</h2>${A.table ? tableHtml(A.table, R) : ''}
    ${more(`${R}tabulky/`, 'Tabuľky všetkých tímov')}
  </div>
</div></section>
<section class="euro" aria-labelledby="eu-h"><div class="wrap">
  ${orn}<h2 class="h2" id="eu-h">Senica v Európe</h2>
  <ol class="euro-l">${club.europa.zapasy.map((z) => `<li><span class="euro-y">${esc(z.sezona)}</span><b>${esc(z.super)}</b><span class="euro-s">${esc(z.doma).replace(/ /g, '')} · ${esc(z.vonku).replace(/ /g, '')}</span><small>${esc(z.kolo)}${z.postup ? ' · postup' : ''}</small></li>`).join('')}</ol>
  ${more(`${R}klub/`, 'História klubu')}
</div></section>`;
  },
});

add('klub/', {
  title: 'Klub', active: 'klub/', desc: `${club.nazov}: od roku ${club.zalozenie}, najvyššia súťaž 2009 – 2022, Európska liga, nový začiatok v roku 2022 a štadión OMS Arena.`,
  body: (R) => `${pageHead({ title: 'Záhoráci od roku 1921', sub: `${esc(club.pravnyNazov)}. Farby ${esc(club.farby)}.`, R, crumbs: [[null, 'Klub']] })}
<section class="sec sec--first"><div class="wrap book">
  <h2 class="h2">História</h2>
  <ol class="hist">${club.historia.map((h) => `<li><b>${esc(h.rok)}</b><p>${esc(h.text)}</p></li>`).join('')}</ol>
  ${orn}
  <h2 class="h2">Úspechy</h2>
  <ul class="wins">${club.uspechy.map((u) => `<li><b>${esc(u.rok)}</b> ${esc(u.text)}</li>`).join('')}</ul>
  <p class="aside">${esc(club.rival)} ${esc(club.strelec)}</p>
  ${orn}
  <h2 class="h2">${esc(ST.nazov)}</h2>
  <p class="aside">${esc(ST.obchodny)} · ${num(ST.kapacita)} miest · otvorený ${esc(ST.otvoreny)}</p>
  <p>${esc(ST.pribeh)}</p>
  <p>${esc(ST.rekonstrukcia)}</p>
  <p class="note">Zdroje: Wikipédia (FK Senica, Štadión FK Senica, európske poháre), Sportnet.</p>
</div></section>`,
});
