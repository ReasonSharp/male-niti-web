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
  { slug: 'zasto-ne-radim-wordpress', tag_hr: 'mišljenje', tag_en: 'opinion', tone: 'indigo',
    date_hr: '23. III. 2026.', date_en: 'Mar 23, 2026',
    title_hr: 'Zašto ne radim WordPress', title_en: 'Why I don\u2019t do WordPress', em_hr: 'WordPress', em_en: 'WordPress',
    excerpt_hr: 'Jeftino je dok ga ne treba mijenjati. Onda postaje skuplje od pravog rješenja, a brzina i sigurnost su kompromisi koje plaća netko drugi.',
    excerpt_en: 'It\u2019s cheap until you need to change it. Then it costs more than the real thing, and speed and security are compromises someone else pays for.',
    read_hr: '5 min čitanja', read_en: '5 min read' },
  { slug: 'sto-je-view-u-iot-sustavu', tag_hr: 'iz razboja', tag_en: 'from the loom', tone: 'green',
    date_hr: '14. II. 2026.', date_en: 'Feb 14, 2026',
    title_hr: 'Što je "view" u IoT sustavu?', title_en: 'What is a "view" in an IoT system?', em_hr: 'view', em_en: 'view',
    excerpt_hr: 'Kako sam pustio klijenta da sam definira što njegovi korisnici gledaju — i zašto je to bila najvažnija odluka u dizajnu sustava.',
    excerpt_en: 'How I let the client define what their users see — and why that turned out to be the most important design decision in the system.',
    read_hr: '8 min čitanja', read_en: '8 min read' },
  { slug: 'mala-tehnologija-za-male-poslove', tag_hr: 'za male poslove', tag_en: 'for small business', tone: 'indigo',
    date_hr: '4. I. 2026.', date_en: 'Jan 4, 2026',
    title_hr: 'Mala tehnologija za male poslove', title_en: 'Small tech for small business', em_hr: 'Mala', em_en: 'Small',
    excerpt_hr: 'Ne trebate kubernetes. Trebate da stranica radi u utorak ujutro kad ide kava — i da netko zna gdje je problem ako ne radi.',
    excerpt_en: 'You don\u2019t need kubernetes. You need the site to work Tuesday morning over coffee — and someone who knows where the problem is when it doesn\u2019t.',
    read_hr: '4 min čitanja', read_en: '4 min read' },
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
    status_hr: 'proizvodnja · Q4 2026', status_en: 'shipping · Q4 2026' },
  { featured: false, media_label_hr: 'drugi projekt', media_label_en: 'second project',
    caption_hr: 'Sljedeći klijent — vaš projekt ovdje.', caption_en: 'Next slot — your project here.' },
  { featured: false, media_label_hr: 'treći projekt', media_label_en: 'third project',
    caption_hr: 'Dva mjesta otvorena u Q3 2026.', caption_en: 'Two slots open in Q3 2026.' },
];

Object.assign(window, {
  API_BASE, useApiList, submitContact,
  DEFAULT_SERVICES, DEFAULT_PRICING, DEFAULT_BLOG, DEFAULT_WORK,
});
