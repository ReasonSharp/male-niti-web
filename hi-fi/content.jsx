// Male Niti — API-backed content with static fallback
// Configure the live API base via: window.MALE_NITI_CONFIG = { apiBase: 'https://api.maleniti.com/v1' };
// Defaults to a same-origin '/api' path (fits self-hosting on maleniti.com).
const API_BASE = (window.MALE_NITI_CONFIG && window.MALE_NITI_CONFIG.apiBase) || '/api';

async function apiGet(path) {
  const res = await fetch(API_BASE + path, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(path + ' -> ' + res.status);
  return res.json();
}

// Fetches a list endpoint; falls back to bundled defaults on any failure
// (network error, 404, bad shape) so the page always renders something.
function useApiList(path, fallback) {
  const [data, setData] = React.useState(fallback);
  const [status, setStatus] = React.useState('loading'); // loading | live | fallback
  React.useEffect(() => {
    let cancelled = false;
    apiGet(path)
      .then((json) => {
        if (cancelled) return;
        const items = Array.isArray(json) ? json : (json && Array.isArray(json.items) ? json.items : null);
        if (items && items.length) { setData(items); setStatus('live'); }
        else setStatus('fallback');
      })
      .catch(() => { if (!cancelled) setStatus('fallback'); });
    return () => { cancelled = true; };
  }, [path]);
  return [data, status];
}

// Fetches one item; falls back to a match inside the bundled defaults.
function useApiItem(path, fallback) {
  const [data, setData] = React.useState(fallback);
  const [status, setStatus] = React.useState(fallback ? 'fallback' : 'loading');
  React.useEffect(() => {
    if (!path) return;
    let cancelled = false;
    apiGet(path)
      .then((json) => { if (!cancelled && json) { setData(json); setStatus('live'); } })
      .catch(() => { if (!cancelled) setStatus('fallback'); });
    return () => { cancelled = true; };
  }, [path]);
  return [data, status];
}

// Reads ?slug= from the URL (used by the standalone blog post page).
function useSlugParam(key = 'slug') {
  return React.useMemo(() => {
    try { return new URLSearchParams(window.location.search).get(key); } catch (e) { return null; }
  }, [key]);
}

async function submitContact(payload) {
  const res = await fetch(API_BASE + '/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('contact submit failed: ' + res.status);
  return res.json().catch(() => ({}));
}

// ── Bundled defaults (mirror the OpenAPI schemas in api-spec.yaml) ─────────
const DEFAULT_SERVICES = [
  { tone: 'indigo', roman: 'I', num_hr: 'prezentacija', num_en: 'presentation',
    title_hr: 'Osobna', title_en: 'Personal', title2_hr: 'web stranica', title2_en: 'website',
    body_hr: 'Vaše ime, vaš posao, vaša priča — sve na jednom mjestu. Jednostavno za vas, lijepo za posjetitelje, brzo se učitava.',
    body_en: 'Your name, your work, your story — one place. Simple for you, beautiful for visitors, quick to load.',
    list_hr: ['portfelj', 'vizitka & obrt', 'landing za projekt', 'brošura ordinacije'],
    list_en: ['portfolio', 'business card & sole trader', 'project landing page', 'practice / clinic brochure'] },
  { tone: 'green', roman: 'II', num_hr: 'sadržaj', num_en: 'content',
    title_hr: 'Dinamični', title_en: 'Dynamic', title2_hr: 'sadržaj', title2_en: 'content',
    body_hr: 'Sadržaj koji se mijenja sam — vijesti, katalog, narudžbe, korisnički računi, rezervacije. Vi pišete, sustav se brine za ostalo.',
    body_en: 'Content that updates itself — news, catalogues, orders, accounts, bookings. You write, the system handles the rest.',
    list_hr: ['blog & uredništvo', 'trgovina i košarica', 'prijave, računi, plaćanja', 'interni alati & CRM'],
    list_en: ['blog & editorial', 'shop & checkout', 'sign-ups, accounts, billing', 'internal tools & CRM'] },
  { tone: 'indigo', roman: 'III', num_hr: 'sustav', num_en: 'system',
    title_hr: 'Cijeli', title_en: 'Whole', title2_hr: 'sustavi', title2_en: 'systems',
    body_hr: 'Sve odjednom — uređaji, baze podataka, modeli, admin sučelje za klijenta i posebno sučelje za njegove korisnike. Jedna nit kroz cijelu kuću.',
    body_en: 'Everything at once — devices, databases, models, an admin UI for the client and a separate UI for their customers. One thread through the whole house.',
    list_hr: ['IoT pipeline & telemetrija', 'analitika i prognoze', 'multi-tenant aplikacije', 'vlastiti admin & API'],
    list_en: ['IoT pipelines & telemetry', 'analytics & forecasting', 'multi-tenant apps', 'bespoke admin & APIs'] },
];

const DEFAULT_PRICING = [
  { tag_hr: 'opcija a', tag_en: 'option a', title_hr: 'Po projektu', title_en: 'Per project', em_hr: 'Po', em_en: 'Per',
    sub_hr: 'Fiksni opseg, fiksna cijena.', sub_en: 'Fixed scope, fixed price.',
    list_hr: ['jedna ponuda, jedna cijena', 'rok dogovaramo unaprijed', 'kod, docs, predaja'],
    list_en: ['one quote, one price', 'deadline agreed upfront', 'code, docs, handover'],
    when_hr: 'za jasno definirane sustave i landing stranice', when_en: 'for clearly scoped systems and landings', featured: false },
  { tag_hr: 'najčešće', tag_en: 'most common', title_hr: 'Po satu', title_en: 'Hourly', em_hr: 'Po', em_en: 'Hourly',
    sub_hr: 'Tjedna evidencija, transparentno.', sub_en: 'Weekly log, transparent.',
    list_hr: ['naplaćuje se samo odrađeno', 'tjedni log u inbox', 'opseg može rasti i padati'],
    list_en: ['only what was actually done', 'weekly log in your inbox', 'scope can grow and shrink'],
    when_hr: 'za iteracije, dorade, R&D', when_en: 'for iteration, polish, R&D', featured: true },
  { tag_hr: 'opcija c', tag_en: 'option c', title_hr: 'Zadrška', title_en: 'Retainer', em_hr: 'Zadrška', em_en: 'Retainer',
    sub_hr: 'Stabilna nit, mjesečno.', sub_en: 'A steady thread, monthly.',
    list_hr: ['rezervirano vrijeme svaki mjesec', 'prioritet kod incidenata', 'razvoj + održavanje'],
    list_en: ['reserved time each month', 'priority on incidents', 'development + maintenance'],
    when_hr: 'za sustave u produkciji', when_en: 'for systems in production', featured: false },
];

const DEFAULT_BLOG = [
  { slug: 'zasto-ne-radim-wordpress', tag_hr: 'mišljenje', tag_en: 'opinion', tone: 'indigo', featured: true,
    date_hr: '23. III. 2026.', date_en: 'Mar 23, 2026',
    title_hr: 'Zašto ne radim WordPress', title_en: 'Why I don\u2019t do WordPress', em_hr: 'WordPress', em_en: 'WordPress',
    excerpt_hr: 'Jeftino je dok ga ne treba mijenjati. Onda postaje skuplje od pravog rješenja, a brzina i sigurnost su kompromisi koje plaća netko drugi.',
    excerpt_en: 'It\u2019s cheap until you need to change it. Then it costs more than the real thing, and speed and security are compromises someone else pays for.',
    read_hr: '5 min čitanja', read_en: '5 min read',
    lede_hr: 'Svaki drugi upit počinje s „možemo li to na WordPressu?". Kratki odgovor je: možete, ali ne biste trebali — i evo zašto to gotovo uvijek ispadne skuplje.',
    lede_en: 'Every other enquiry opens with "can we do it in WordPress?" The short answer is: you can, but you shouldn\u2019t — and here is why it almost always ends up costing more.',
    body_hr: [
      { type: 'p', text: 'Jeftino je na početku. Tema košta trideset eura, hosting pet eura mjesečno, i prva verzija stranice stoji online do petka. To je stvarna prednost i nema smisla praviti se da nije.' },
      { type: 'h', text: 'Problem počinje kod druge promjene' },
      { type: 'p', text: 'Prva promjena je uvijek lagana. Druga traži plugin. Treća traži plugin koji se ne voli s prvim pluginom. Šesta traži da netko otvori PHP i napiše nešto što tema nije predvidjela — i u tom trenutku plaćate razvoj, samo na tuđem terenu i s tuđim pretpostavkama.' },
      { type: 'q', text: 'Ne plaćate izradu stranice. Plaćate sve promjene koje ćete tražiti sljedeće tri godine.' },
      { type: 'p', text: 'Brzina i sigurnost su druga strana istog računa. Svaki plugin je još jedan autor kojem vjerujete, još jedan repozitorij koji se možda ne održava, i još nekoliko stotina kilobajta koje posjetitelj mora skinuti prije nego vidi vaše ime.' },
      { type: 'h', text: 'Što radim umjesto toga' },
      { type: 'p', text: 'Pišem onoliko koda koliko projekt traži i ni redak više. Ako vam treba pet stranica i kontakt forma, dobit ćete pet stranica i kontakt formu — brzu, čitljivu i takvu da je za tri godine još uvijek moguće otvoriti i razumjeti. Ako vam treba katalog s narudžbama, dobit ćete bazu koja je modelirana za vaš posao, ne za tuđi.' },
      { type: 'p', text: 'To nije ideološka pozicija. To je samo računica koja se, kad se gleda na tri godine a ne na tri tjedna, gotovo uvijek okrene u istu stranu.' }
    ],
    body_en: [
      { type: 'p', text: 'It is cheap at the start. The theme costs thirty euros, hosting five a month, and the first version of the site is online by Friday. That is a real advantage and there is no point pretending otherwise.' },
      { type: 'h', text: 'The trouble starts at the second change' },
      { type: 'p', text: 'The first change is always easy. The second needs a plugin. The third needs a plugin that does not get along with the first one. The sixth needs somebody to open PHP and write something the theme never anticipated — and at that moment you are paying for development anyway, just on somebody else\u2019s terms and with somebody else\u2019s assumptions.' },
      { type: 'q', text: 'You are not paying for the site being built. You are paying for every change you will ask for over the next three years.' },
      { type: 'p', text: 'Speed and security are the other side of the same bill. Every plugin is one more author you trust, one more repository that may not be maintained, and a few hundred more kilobytes a visitor must download before they see your name.' },
      { type: 'h', text: 'What I do instead' },
      { type: 'p', text: 'I write as much code as the project needs and not one line more. If you need five pages and a contact form, you get five pages and a contact form — fast, legible, and still openable and understandable three years from now. If you need a catalogue with orders, you get a database modelled for your business, not for somebody else\u2019s.' },
      { type: 'p', text: 'This is not an ideological position. It is arithmetic that, measured over three years rather than three weeks, almost always lands on the same side.' }
    ] },
  { slug: 'sto-je-view-u-iot-sustavu', tag_hr: 'iz razboja', tag_en: 'from the loom', tone: 'green',
    date_hr: '14. II. 2026.', date_en: 'Feb 14, 2026',
    title_hr: 'Što je "view" u IoT sustavu?', title_en: 'What is a "view" in an IoT system?', em_hr: 'view', em_en: 'view',
    excerpt_hr: 'Kako sam pustio klijenta da sam definira što njegovi korisnici gledaju — i zašto je to bila najvažnija odluka u dizajnu sustava.',
    excerpt_en: 'How I let the client define what their users see — and why that turned out to be the most important design decision in the system.',
    read_hr: '8 min čitanja', read_en: '8 min read',
    lede_hr: 'Najvažnija odluka u sustavu nije bila baza, protokol ni model. Bila je to jedna tablica koja klijentu dopušta da sam odluči što njegovi korisnici vide.',
    lede_en: 'The most important decision in the system was not the database, the protocol, or the model. It was one table that lets the client decide what their own users see.',
    body_hr: [
      { type: 'p', text: 'Klijent ima uređaje na terenu. Uređaji imaju senzore. Senzori imaju sheme koje se mijenjaju češće nego što bih ja volio. Prvi nagon je bio da svaku kombinaciju zakodiram u sučelje — i to je bila greška koju sam prepoznao dovoljno rano.' },
      { type: 'h', text: 'View kao podatak, ne kao ekran' },
      { type: 'p', text: 'Umjesto ekrana koje ja pišem, klijent u adminu definira „view" — koji senzori ulaze, kako se agregiraju, u kojem vremenskom bloku, i kome se prikazuju. View je zapis u bazi. Frontend ga samo interpretira.' },
      { type: 'q', text: 'Kad je view podatak, novi tip prikaza više nije deploy. To je unos u tablicu.' },
      { type: 'p', text: 'Posljedica je da klijent ne čeka mene. Kad se pojavi nova vrsta parcele, novi senzor ili novi način na koji njegovi korisnici žele gledati istu stvar, on to napravi sam, u petak popodne, bez ijednog mog reda koda.' },
      { type: 'h', text: 'Cijena te odluke' },
      { type: 'p', text: 'Nije besplatno. Interpretacija je složenija od statičnog ekrana, validacija je ozbiljan posao, a admin sučelje treba biti dovoljno jasno da netko kome to nije posao ne razbije sustav slučajno. Ta tri mjeseca dodatnog rada su se isplatila već prvi put kad je klijent dodao view koji ja nikad ne bih zamislio.' }
    ],
    body_en: [
      { type: 'p', text: 'The client has devices in the field. The devices have sensors. The sensors have schemas that change more often than I would like. My first instinct was to hard-code every combination into the interface — a mistake I caught early enough.' },
      { type: 'h', text: 'A view as data, not as a screen' },
      { type: 'p', text: 'Instead of screens I write, the client defines a "view" in the admin — which sensors feed it, how they aggregate, over which time block, and who gets to see it. A view is a row in a database. The frontend only interprets it.' },
      { type: 'q', text: 'When a view is data, a new kind of display is no longer a deploy. It is a table entry.' },
      { type: 'p', text: 'The consequence is that the client does not wait for me. When a new kind of plot appears, or a new sensor, or a new way their users want to look at the same thing, they build it themselves, on a Friday afternoon, without a single line from me.' },
      { type: 'h', text: 'What that decision costs' },
      { type: 'p', text: 'It is not free. Interpretation is harder than a static screen, validation is real work, and the admin has to be clear enough that somebody who does not do this for a living cannot break the system by accident. Those three extra months paid for themselves the first time the client added a view I would never have imagined.' }
    ] },
  { slug: 'mala-tehnologija-za-male-poslove', tag_hr: 'za male poslove', tag_en: 'for small business', tone: 'indigo',
    date_hr: '4. I. 2026.', date_en: 'Jan 4, 2026',
    title_hr: 'Mala tehnologija za male poslove', title_en: 'Small tech for small business', em_hr: 'Mala', em_en: 'Small',
    excerpt_hr: 'Ne trebate kubernetes. Trebate da stranica radi u utorak ujutro kad ide kava — i da netko zna gdje je problem ako ne radi.',
    excerpt_en: 'You don\u2019t need kubernetes. You need the site to work Tuesday morning over coffee — and someone who knows where the problem is when it doesn\u2019t.',
    read_hr: '4 min čitanja', read_en: '4 min read',
    lede_hr: 'Za većinu malih poslova pravo pitanje nije koja je tehnologija najbolja, nego koja je najmanja tehnologija koja rješava problem i preživi sljedeće tri godine.',
    lede_en: 'For most small businesses the real question is not which technology is best, but which is the smallest one that solves the problem and survives the next three years.',
    body_hr: [
      { type: 'p', text: 'Ne trebate kubernetes. Ne trebate ni mikroservise, ni event bus, ni tri okruženja s automatskim skaliranjem. Trebate da stranica radi u utorak ujutro kad ide kava, i da netko zna gdje je problem ako ne radi.' },
      { type: 'h', text: 'Mala tehnologija je odluka, ne kompromis' },
      { type: 'p', text: 'Jedan server, jedna baza, jedan proces koji se može restartati rukom. To zvuči staromodno dok ne izbroji koliko dijelova sustava netko mora razumjeti u tri ujutro. Manje dijelova znači kraću listu mjesta na kojima problem može biti.' },
      { type: 'q', text: 'Svaki sloj koji dodate mora zaraditi svoje mjesto — i u radu, i u glavi osobe koja ga održava.' },
      { type: 'p', text: 'To ne znači da se ne skalira. Znači da skaliranje dolazi kad ga podaci opravdaju, a ne kad ga arhitekturni dijagram poželi.' },
      { type: 'h', text: 'Kako to izgleda u praksi' },
      { type: 'p', text: 'Statični HTML gdje sadržaj ne mijenja; jedna aplikacija i baza gdje mijenja; jasan backup i jasna procedura za vraćanje. Nadzor koji vam pošalje mail kad nešto padne, ne dashboard koji nitko ne gleda. I dokumentacija dovoljno kratka da je netko stvarno pročita.' }
    ],
    body_en: [
      { type: 'p', text: 'You do not need kubernetes. You do not need microservices, an event bus, or three auto-scaling environments either. You need the site to work Tuesday morning over coffee, and somebody who knows where the problem is when it does not.' },
      { type: 'h', text: 'Small tech is a decision, not a compromise' },
      { type: 'p', text: 'One server, one database, one process you can restart by hand. That sounds old-fashioned until you count how many parts of the system somebody has to understand at three in the morning. Fewer parts means a shorter list of places the problem can hide.' },
      { type: 'q', text: 'Every layer you add has to earn its place — in the running system, and in the head of the person maintaining it.' },
      { type: 'p', text: 'This does not mean it will not scale. It means scaling arrives when the data justifies it, not when an architecture diagram fancies it.' },
      { type: 'h', text: 'What it looks like in practice' },
      { type: 'p', text: 'Static HTML where the content does not change; one application and one database where it does; a clear backup and a clear restore procedure. Monitoring that emails you when something falls over, not a dashboard nobody watches. And documentation short enough that somebody actually reads it.' }
    ] },
];

const DEFAULT_WORK = [
  { featured: true, slug: 'iot-pipeline-za-poljoprivredu',
    media_label_hr: 'admin · iot · screenshot', media_label_en: 'admin · iot · screenshot',
    caption_hr: 'Admin sučelje — definicija uređaja, senzora i \u2018view-ova\u2019.',
    caption_en: 'Admin UI — defining devices, sensors and \u2018views\u2019.',
    status_label_hr: 'studija slučaja · u tijeku', status_label_en: 'case study · in progress',
    title_hr: 'IoT pipeline', title_en: 'IoT pipeline', title_rest_hr: 'za poljoprivredu', title_rest_en: 'for agriculture',
    body_hr: 'Uređaji opisani u bazi, senzori s vlastitim shemama, prognoze modela nad vremenski blokiranim podacima. Klijent ima vlastiti admin u kojem definira sve to — i \u2018view-ove\u2019 koje njegovi korisnici onda gledaju, koriste i odlučuju na osnovi njih.',
    body_en: 'Devices described in a database, sensors with their own schemas, prognostic models running over time-blocked data. The client gets an admin where they define all of it — and the \u2018views\u2019 their own customers see, use, and make decisions on.',
    chips: ['MQTT', 'PostgreSQL', 'TimescaleDB', 'FastAPI', 'React', 'Docker'],
    client_hr: 'anonimno · agritech', client_en: 'anonymous · agritech',
    duration_hr: '~ 14 mjeseci · solo', duration_en: '~ 14 months · solo',
    users_hr: 'admin (1) + krajnji korisnici (mnogi)', users_en: 'admin (1) + end-users (many)',
    status_hr: 'proizvodnja · Q4 2026', status_en: 'shipping · Q4 2026',
    // demo_url is supplied by the API — each project's demo is a separately
    // designed page living outside this project. Null here so nothing 404s.
    demo_url: null,
    demo_label_hr: 'Pogledaj demo', demo_label_en: 'View the demo',
    // Optional blog post describing this project's features.
    post_slug: 'sto-je-view-u-iot-sustavu' },
  { featured: false, media_label_hr: 'drugi projekt', media_label_en: 'second project',
    caption_hr: 'Sljedeći klijent — vaš projekt ovdje.', caption_en: 'Next slot — your project here.',
    demo_url: null, post_slug: null },
  { featured: false, media_label_hr: 'treći projekt', media_label_en: 'third project',
    caption_hr: 'Dva mjesta otvorena u Q3 2026.', caption_en: 'Two slots open in Q3 2026.',
    demo_url: null, post_slug: null },
];

Object.assign(window, {
  API_BASE, useApiList, useApiItem, useSlugParam, submitContact,
  DEFAULT_SERVICES, DEFAULT_PRICING, DEFAULT_BLOG, DEFAULT_WORK,
});
