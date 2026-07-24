// Male Niti — hi-fi sections (bottom): Work, About, Pricing, Blog, Contact, Footer

// Helper: render a string with one substring wrapped in <em>
function emWrap(str, em) {
  if (!em || !str.includes(em)) return str;
  const i = str.indexOf(em);
  return (
    <>
      {str.slice(0, i)}
      <em>{em}</em>
      {str.slice(i + em.length)}
    </>
  );
}

// ── Work / case study ──────────────────────────────────────────────────────
function Work() {
  const t = useT();
  const [work] = useApiList('/work', DEFAULT_WORK);
  const featured = work.find((w) => w.featured) || work[0];
  const secondary = work.filter((w) => w !== featured);
  return (
    <section className="section" id="radovi">
      <div className="container">
        <SectionHead
          num="03"
          hr="Trenutno na razboju."
          en="Currently on the loom."
          em_hr="razboju"
          em_en="loom"
          kicker_hr="Studije slučaja stižu kad sustavi uđu u proizvodnju."
          kicker_en="Case studies land once the systems ship." />

        {featured && (
        <article className="work">
          <div className="work__media">
            <Placeholder
              label={t(featured.media_label_hr, featured.media_label_en)}
              className="work__ph" />
            <div className="work__caption">
              <T hr={featured.caption_hr} en={featured.caption_en} />
            </div>
          </div>

          <div>
            <div className="label label-green" style={{ marginBottom: 12 }}>
              <T hr={featured.status_label_hr} en={featured.status_label_en} />
            </div>
            <h3 className="h-card work__title" style={{ fontSize: 44, lineHeight: 1.0 }}>
              <em><T hr={featured.title_hr} en={featured.title_en} /></em>{' '}
              <T hr={featured.title_rest_hr} en={featured.title_rest_en} />
            </h3>

            <p className="body" style={{ marginTop: 18, color: 'var(--ink-soft)' }}>
              <T hr={featured.body_hr} en={featured.body_en} />
            </p>

            <div className="work__chips">
              {(featured.chips || []).map((x) => (
                <span key={x} className="chip chip--indigo">{x}</span>
              ))}
            </div>

            <dl className="work__meta">
              <dt><T hr="Klijent" en="Client"/></dt>      <dd>{t(featured.client_hr, featured.client_en)}</dd>
              <dt><T hr="Trajanje" en="Duration"/></dt>   <dd>{t(featured.duration_hr, featured.duration_en)}</dd>
              <dt><T hr="Korisnici" en="Users"/></dt>     <dd>{t(featured.users_hr, featured.users_en)}</dd>
              <dt><T hr="Status" en="Status"/></dt>       <dd>{t(featured.status_hr, featured.status_en)}</dd>
            </dl>
          </div>
        </article>
        )}

        <div className="work-secondary">
          {secondary.map((w, i) => (
            <div key={w.slug || i}>
              <Placeholder label={t(w.media_label_hr, w.media_label_en)} />
              <div className="work__caption" style={{ marginTop: 12 }}>
                <T hr={w.caption_hr} en={w.caption_en} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Why Male Niti — dark editorial cut ─────────────────────────────────────
function About() {
  const t = useT();
  return (
    <section className="section section--dark" id="zasto">
      <div className="container">
        <SectionHead
          num="04"
          hr="Zašto Male Niti."
          en="Why Male Niti."
          em_hr="Zašto"
          em_en="Why"
          kicker_hr="Ime je trostruko ispleteno. Niti, pjesme, obitelj."
          kicker_en="The name is woven three times over. Threads, songs, family." />

        <div className="about">
          <div className="about__copy">
            <p>
              <span className="drop">M</span>
              <T hr="ale Niti, doslovno, znači ‘mali konci’. Ali ime je satkano od tri stvari odjednom — i niti jedna nije slučajna."
                 en="ale Niti, literally, means ‘small threads’. But the name is woven from three things at once — and none of them is accidental." />
            </p>

            <p>
              <T hr={<>Prvo — <em className="accent">niti u programiranju</em>. Hrvatski ‘dretva’ je točan prijevod, ali nikome ne stoji dobro u nazivu firme. ‘Niti’ stoji.</>}
                 en={<>First — <em className="accent">threads in software</em>. Croatian ‘dretva’ is the literal translation, but no one wants that on a business card. ‘Niti’ works.</>} />
            </p>

            <p>
              <T hr={<>Drugo — <em className="accent-green">dvije pjesme</em>. Bijelo Dugme i Crvena Jabuka oboje govore o niti koja veže: putove, srca, snove. Te su pjesme starije od mene, a u njima je više zajedničkog jezika nego u bilo kojem brand guide-u.</>}
                 en={<>Second — <em className="accent-green">two songs</em>. Bijelo Dugme and Crvena Jabuka both speak of a thread that ties: paths, hearts, dreams. Those songs are older than I am, and they carry more shared language than any brand guide.</>} />
            </p>

            <p>
              <T hr={<>Treće — <em className="accent">slogovi početka imena</em> svakog člana moje obitelji, spojeni u jednu nit. To je dio koji znamo samo mi.</>}
                 en={<>Third — <em className="accent">the opening syllables of each name</em> in my family, stitched into one thread. That part, only we know.</>} />
            </p>

            <p style={{ fontStyle: 'italic', fontSize: 22, lineHeight: 1.45, color: '#ECE3CB', borderTop: '1px solid rgba(232,225,204,0.25)', paddingTop: 20, marginTop: 28 }}>
              <T hr="Male niti, koje sami biramo. I koje sami pletemo."
                 en="Small threads, that we choose ourselves. And weave ourselves." />
            </p>

            <div className="family-threads" style={{ marginTop: 28 }}>
              <svg viewBox="0 0 400 120" style={{ gridColumn: '1 / -1', width: '100%', height: 120, overflow: 'visible' }}>
                {['Ma', 'le', 'Ni', 'ti'].map((s, i) => {
                  const x = 50 + i * 100;
                  const tone = i % 2 ? '#99C4A2' : '#B7C0E4';
                  return (
                    <g key={i}>
                      <Thread d={`M${x},10 C${x - 24},44 ${x + 24},78 ${x},112`}
                              color={tone} delay={0.2 + i * 0.18} dur={3}
                              weight={1.2} opacity={0.85} dash="2 5" len={400} />
                      <circle cx={x} cy="8" r="3.5" fill={tone} />
                      <text x={x} y={130} textAnchor="middle"
                            style={{ fontFamily: 'var(--serif-display)', fontStyle: 'italic', fontSize: 28, fill: '#ECE3CB' }}>{s}</text>
                    </g>
                  );
                })}
                <text x="200" y="76" textAnchor="middle"
                      style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.16em', fill: '#9E978A' }}>
                  {t('PRAVA IMENA — SAMO MI', 'REAL NAMES — ONLY US')}
                </text>
              </svg>
            </div>
          </div>

          <aside className="about__quotes">
            <div className="lyric lyric--dugme">
              <span className="note">♪</span>
              <p className="lyric__q">„<T hr={LYRICS.dugme.hr} en={LYRICS.dugme.en} />"</p>
              <span className="lyric__attr">— <T hr={LYRICS.dugme.attr_hr} en={LYRICS.dugme.attr_en} /></span>
            </div>

            <div className="lyric lyric--jabuka">
              <span className="note">♪</span>
              <p className="lyric__q">„<T hr={LYRICS.jabuka.hr} en={LYRICS.jabuka.en} />"</p>
              <span className="lyric__attr">— <T hr={LYRICS.jabuka.attr_hr} en={LYRICS.jabuka.attr_en} /></span>
            </div>

            <div style={{ paddingTop: 20, borderTop: '1px solid rgba(232,225,204,0.18)', display: 'grid', placeItems: 'center' }}>
              <Monogram s={120} indigo="#B7C0E4" green="#99C4A2" ink="#ECE3CB" stroke={2.6} ornament/>
              <span className="label" style={{ marginTop: 14, color: '#9E978A' }}>
                <T hr="logo · isti znak, drugačiji ton" en="logo · same mark, different tone" />
              </span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

// ── Pricing / engagement ───────────────────────────────────────────────────
function Pricing() {
  const t = useT();
  const [plans] = useApiList('/pricing', DEFAULT_PRICING);
  return (
    <section className="section section--alt" id="suradnja">
      <div className="container">
        <SectionHead
          num="05"
          hr="Suradnja."
          en="Engagement."
          em_hr="Suradnja"
          em_en="Engagement"
          kicker_hr="Tri modela. Sve cijene su u eurima, sve su sa svim porezima."
          kicker_en="Three models. All prices in euros, all taxes included." />

        <div className="pricing">
          {plans.map((p, i) => (
            <article key={i} className={`plan ${p.featured ? 'plan--featured' : ''}`}>
              <div className="plan__tag"><T hr={p.tag_hr} en={p.tag_en} /></div>
              <h3 className="plan__title">
                <T hr={emWrap(p.title_hr, p.em_hr)} en={emWrap(p.title_en, p.em_en)} />
              </h3>
              <p className="plan__sub"><T hr={p.sub_hr} en={p.sub_en} /></p>
              <ul className="plan__list">
                {p.list_hr.map((item, j) => (
                  <li key={j}><T hr={item} en={p.list_en[j]} /></li>
                ))}
              </ul>
              <div className="plan__when">
                <T hr={p.when_hr} en={p.when_en} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Blog / Bilješke ────────────────────────────────────────────────────────
function Blog() {
  const t = useT();
  const [posts] = useApiList('/blog', DEFAULT_BLOG);
  return (
    <section className="section" id="bilješke">
      <div className="container">
        <SectionHead
          num="06"
          hr="Bilješke s razboja."
          en="Notes from the loom."
          em_hr="razboja"
          em_en="loom"
          kicker_hr="Što sam naučio, što me ljuti, i na čemu trenutno mislim."
          kicker_en="What I’ve learned, what annoys me, and what I’m thinking about." />

        <div className="blog">
          {posts.map((p, i) => (
            <article key={p.slug || i} className="post">
              <Placeholder label={t('ilustracija članka', 'article illustration')} className="post__media" />
              <div className="post__meta">
                <span className={`post__tag--${p.tone}`}><T hr={p.tag_hr} en={p.tag_en} /></span>
                <span className="post__date"><T hr={p.date_hr} en={p.date_en} /></span>
              </div>
              <h3 className="post__title">
                <T hr={emWrap(p.title_hr, p.em_hr)} en={emWrap(p.title_en, p.em_en)} />
              </h3>
              <p className="post__excerpt"><T hr={p.excerpt_hr} en={p.excerpt_en} /></p>
              <div className="post__foot">
                <span className="post__read"><T hr={p.read_hr} en={p.read_en} /></span>
                <a className="post__more" href={p.slug ? `#/blog/${p.slug}` : '#'}>
                  <T hr="pročitaj" en="read" /> <Arrow size={14}/>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div style={{ marginTop: 56, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: 24, borderTop: '1px solid var(--rule)' }}>
          <p className="lede" style={{ margin: 0, maxWidth: 640 }}>
            <T hr="Tu zapisujem ono što sam u radu naučio — i ono na što sam se najviše živcirao."
               en="Where I write down what I’ve learned at work — and what I’ve been most annoyed by." />
          </p>
          <a className="btn" href="#">
            <T hr="sve bilješke" en="all notes" /><Arrow/>
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Contact ────────────────────────────────────────────────────────────────
function Contact() {
  const t = useT();
  const [form, setForm] = React.useState({ name: '', email: '', kind: '', msg: '' });
  const [state, setState] = React.useState('idle'); // idle | sending | sent | error
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setState('sending');
    submitContact(form)
      .then(() => { setState('sent'); setForm({ name: '', email: '', kind: '', msg: '' }); })
      .catch(() => setState('error'));
  };

  return (
    <section className="section" id="kontakt">
      <div className="container">
        <SectionHead
          num="07"
          hr="Povucimo nit."
          en="Let’s pull a thread."
          em_hr="nit"
          em_en="thread"
          kicker_hr="Razgovor je besplatan, kao i prva procjena."
          kicker_en="The first call and the first estimate are free." />

        <div className="contact">
          <form className="form" onSubmit={handleSubmit}>
            <div className="field field--row">
              <div className="field">
                <label htmlFor="name"><T hr="Ime" en="Name" /></label>
                <input id="name" type="text" required value={form.name} onChange={set('name')} placeholder={t('Vaše ime', 'Your name')} />
              </div>
              <div className="field">
                <label htmlFor="email"><T hr="E-mail" en="Email" /></label>
                <input id="email" type="email" required value={form.email} onChange={set('email')} placeholder={t('vi@vasa-firma.hr', 'you@your-company.com')} />
              </div>
            </div>

            <div className="field">
              <label htmlFor="kind"><T hr="O kojoj se vrsti projekta radi?" en="What kind of project?" /></label>
              <select id="kind" value={form.kind} onChange={set('kind')}>
                <option value="" disabled>{t('odaberite…', 'choose one…')}</option>
                <option>{t('osobna web stranica', 'personal website')}</option>
                <option>{t('dinamični sadržaj — blog / trgovina / alat', 'dynamic content — blog / shop / tool')}</option>
                <option>{t('cijeli sustav — IoT, analitika, multi-tenant', 'whole system — IoT, analytics, multi-tenant')}</option>
                <option>{t('održavanje postojećeg projekta', 'maintenance for an existing project')}</option>
                <option>{t('nisam siguran/sigurna', 'not sure yet')}</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="msg"><T hr="O čemu pričamo?" en="What are we talking about?" /></label>
              <textarea id="msg" rows="4" value={form.msg} onChange={set('msg')} placeholder={t('nekoliko rečenica — što gradite, što vas muči, kakav je rok', 'a few sentences — what you’re building, what worries you, what the deadline is')} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
              <span className="body-xs">
                {state === 'sent' ? <T hr="Poslano — javljam se uskoro." en="Sent — I'll be in touch soon." /> :
                 state === 'error' ? <T hr="Nešto nije uspjelo — probajte e-mailom." en="Something failed — try email instead." /> :
                 <T hr="Odgovaram u 24h, obično prije." en="I reply within 24h, usually sooner." />}
              </span>
              <button type="submit" className="btn btn--primary" disabled={state === 'sending'}>
                <T hr="Pošalji nit" en="Send the thread" /><Arrow/>
              </button>
            </div>
          </form>

          <aside className="contact__aside">
            <div className="label" style={{ marginBottom: 6 }}><T hr="ili direktno" en="or directly" /></div>
            <a className="contact__email" href="mailto:bok@maleniti.hr">bok@maleniti.hr</a>

            <dl className="contact__lines">
              <div className="contact__line">
                <dt>GitHub</dt><dd>github.com/maleniti</dd>
              </div>
              <div className="contact__line">
                <dt>LinkedIn</dt><dd>linkedin.com/in/maleniti</dd>
              </div>
              <div className="contact__line">
                <dt>RSS</dt><dd>maleniti.hr/feed.xml</dd>
              </div>
              <div className="contact__line">
                <dt><T hr="Lokacija" en="Location"/></dt><dd>{t('Zagreb · radim daljinski', 'Zagreb · remote')}</dd>
              </div>
              <div className="contact__line">
                <dt><T hr="Jezici" en="Languages"/></dt><dd>{t('hrvatski, engleski', 'Croatian, English')}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="container">
      <div className="footer">
        <div className="footer__brand">
          <Monogram s={28} stroke={2.6} />
          <span>© 2026 · Male Niti</span>
        </div>
        <div className="footer__links">
          <a href="#"><T hr="impressum" en="imprint" /></a>
          <a href="#"><T hr="privatnost" en="privacy" /></a>
          <a href="#"><T hr="uvjeti" en="terms" /></a>
          <a href="#">RSS</a>
        </div>
        <div><T hr="izrađeno s pažnjom — i s nekoliko niti" en="made with care — and a few threads" /></div>
      </div>
    </footer>
  );
}

Object.assign(window, { Work, About, Pricing, Blog, Contact, Footer });
