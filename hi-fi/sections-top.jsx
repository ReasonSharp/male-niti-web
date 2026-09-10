// Male Niti — hi-fi sections (top): Hero, Services, Process
// (Header/Footer live in hi-fi/site-chrome.jsx, shared with the blog pages.)

// ── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  const t = useT();
  return (
    <section className="hero container" id="hero">
      {/* Ephemeral hairline threads weaving through the background */}
      <svg className="hero__bg" viewBox="0 0 1120 760" preserveAspectRatio="none">
        <Thread d="M-20,90 C260,160 520,40 1140,180"  color="var(--indigo)" delay={0.0} dur={3.2} weight={0.9} opacity={0.40} len={1600}/>
        <Thread d="M-20,200 C300,280 600,140 1140,300" color="var(--indigo)" delay={0.4} dur={3.4} weight={0.7} opacity={0.32} len={1600}/>
        <Thread d="M-20,330 C260,420 520,260 1140,420" color="var(--green)"  delay={0.7} dur={3.6} weight={0.7} opacity={0.30} len={1600}/>
        <Thread d="M-20,460 C300,550 600,390 1140,560" color="var(--indigo)" delay={1.0} dur={3.8} weight={0.8} opacity={0.36} len={1600}/>
        <Thread d="M-20,610 C260,700 580,500 1140,700" color="var(--indigo)" delay={1.4} dur={4.0} weight={0.7} opacity={0.28} len={1600}/>
      </svg>

      <div className="hero__grid">
        <div>
          <div className="label label-accent" style={{ marginBottom: 28 }}>
            Vol. 01 · MMXXVI · <T hr="Međimurje" en="Međimurje" />
          </div>

          <h1 className="display hero__title">
            Male<br/>Niti<span className="hero__period">.</span>
          </h1>

          <p className="lede hero__lede">
            <T hr="Web stranice po mjeri — male ili velike, ali sašivene kako treba."
               en="Bespoke websites — small or large, but stitched the right way." />
          </p>

          <p className="hero__sub">
            <T hr="Od jednostavne osobne stranice do cijelih sustava sa svojim bazama, korisnicima i logikom. Bez WordPressa, bez šablona."
               en="From a simple personal site to whole systems with their own databases, users, and logic. No WordPress, no templates." />
          </p>

          <div className="hero__ctas">
            <a className="btn btn--primary" href="#kontakt" onClick={(e) => smoothScrollToHash(e, '#kontakt')}>
              <T hr="Reci mi o svom projektu" en="Tell me about your project" />
              <Arrow />
            </a>
            <a className="btn btn--green" href="#radovi" onClick={(e) => smoothScrollToHash(e, '#radovi')}>
              <T hr="Pogledaj radove" en="See work" />
            </a>
          </div>
        </div>

        <aside className="hero__monogram">
          <div className="hero__monogram-meta">
            <span><T hr="logo · monogram" en="logo · monogram" /></span>
            <span>M ⨯ N</span>
          </div>
          <div className="hero__monogram-wrap">
            <Monogram s="100%" stroke={2.2} ornament/>
          </div>
          <div className="hero__monogram-quote">
            <p className="q"><T hr={`„${LYRICS.dugme.hr}"`} en={`"${LYRICS.dugme.en}"`} /></p>
            <span className="label label-green">— <T hr={LYRICS.dugme.attr_hr} en={LYRICS.dugme.attr_en} /></span>
          </div>
        </aside>
      </div>
    </section>
  );
}

// ── Services ────────────────────────────────────────────────────────────────
function Services() {
  const [services] = useApiList('/services', DEFAULT_SERVICES);
  return (
    <section className="section" id="usluge">
      <div className="container">
        <SectionHead
          num="01"
          hr="Što sve mogu uplesti."
          en="What I can weave for you."
          em_hr="uplesti"
          em_en="weave"
          kicker_hr="Tri stvari. Po želji, sve tri zajedno — jedan jezik, jedna nit."
          kicker_en="Three offerings. Together if you like — one language, one thread." />

        <div className="services">
          {services.map((s, i) => (
            <article key={s.slug || i} className={`service service--${s.tone}`}>
              <div className="service__num"><span className="dot"/>{s.roman} — <T hr={s.num_hr} en={s.num_en}/></div>
              <h3 className="service__title">
                <em><T hr={s.title_hr} en={s.title_en}/></em><br/>
                <T hr={s.title2_hr} en={s.title2_en}/>
              </h3>
              <p className="service__body">
                <T hr={s.body_hr} en={s.body_en} />
              </p>
              <ul className="service__list">
                {s.list_hr.map((item, j) => (
                  <li key={j}><T hr={item} en={s.list_en[j]}/></li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div style={{ marginTop: 56, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <p className="lede" style={{ maxWidth: 640, marginTop: 0 }}>
            <T hr="Ne radim WordPress, Wix ni Shopify. Pravim aplikacije koje rade točno ono što vam treba — i koje rastu s vama."
               en="No WordPress, Wix, or Shopify. Bespoke apps that do exactly what you need — and grow with you." />
          </p>
          <a className="post__more" href="#kontakt" onClick={(e) => smoothScrollToHash(e, '#kontakt')}>
            <T hr="dogovorite razgovor" en="book a call" /> <Arrow size={14}/>
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Process ─────────────────────────────────────────────────────────────────
function Process() {
  const steps = [
    { n: 'I',  hr: 'Razgovor', en: 'Talk',
      body_hr: 'Što vam treba, što vas plaši, kako ćete znati da je gotovo. Bez ponuda na slijepo.',
      body_en: 'What you need, what worries you, how you’ll know it’s done. No blind quotes.',
      tone: 'indigo' },
    { n: 'II', hr: 'Skica',    en: 'Sketch',
      body_hr: 'Lo-fi prototip i tehnička procjena — vidimo prije nego što kucamo.',
      body_en: 'Lo-fi prototype and a technical read — we see it before we type it.',
      tone: 'green' },
    { n: 'III',hr: 'Tkanje',   en: 'Weaving',
      body_hr: 'Iterativna gradnja. Tjedne demonstracije. Staging od prvog dana.',
      body_en: 'Iterative build. Weekly demos. Staging from day one.',
      tone: 'indigo' },
    { n: 'IV', hr: 'Predaja',  en: 'Handover',
      body_hr: 'Kod, dokumentacija, runbook. Održavanje po želji — ne zauvijek.',
      body_en: 'Code, documentation, runbook. Maintenance on request — not forever.',
      tone: 'green' },
  ];
  return (
    <section className="section section--alt" id="proces">
      <div className="container">
        <SectionHead
          num="02"
          hr="Kako radim."
          en="How I work."
          em_hr="Kako"
          em_en="How"
          kicker_hr="Četiri koraka. Bez tajni i bez ‘povjerenja na riječ’."
          kicker_en="Four steps. No secrets, no ‘just-trust-me’." />

        <div className="process">
          {/* the thread connecting the circles */}
          <svg className="process__thread" viewBox="0 0 1120 80" preserveAspectRatio="none" height="80">
            <Thread d="M40,40 C260,10 460,70 820,30 C960,18 1040,42 1080,40"
                    color="var(--indigo)" delay={0.2} dur={3.5}
                    weight={1} opacity={0.55} dash="2 5" len={1500} />
          </svg>

          {steps.map((s, i) => (
            <div key={i} className={`step step--${s.tone}`}>
              <div className="step__num">{s.n}</div>
              <h3 className="step__title"><T hr={s.hr} en={s.en} /></h3>
              <p className="step__body"><T hr={s.body_hr} en={s.body_en} /></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Hero, Services, Process });
