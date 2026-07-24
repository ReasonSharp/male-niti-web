// Variant A v2 — "Stitched" : editorial / poetic — REFINED
// Changes from v1:
//  · MN woven-monogram logo
//  · Dual palette: indigo + green (from variant B)
//  · Lighter, more ephemeral threads
//  · Services renamed for non-technical clients (personal site / dynamic content / full systems)
//  · New Blog ("Bilješke") section

// Interlocked MN monogram — M and N share the same vertical band,
// horizontally offset so each letter reads, like a classic intertwined
// monogram. The N's diagonal weaves UNDER M's right post (dashed segments
// reveal M behind it). Single-stroke, no ornament — fits the sketchy line.
function MonogramMN({ s = 56, indigo = 'var(--accent-a)', green = 'var(--accent-b)', ink = 'var(--ink)' }) {
  // 60x60 viewBox. M lives in x:4..36, N in x:22..56 — they overlap in the
  // middle 14 units, which is what creates the intertwined silhouette.
  // Weave crossings on N's diagonal (computed):
  //   · crosses M's right diagonal near (30.5, 19)
  //   · crosses M's right post (x=36) near (36, 26.1)
  // Both crossings fall in the segment (28.8, 16.8)..(37.5, 28) — dashed.
  // N's left post (x=22) also crosses M's right diagonal at (22, 36) — small
  // dashed window there too.
  return (
    <svg width={s} height={s} viewBox="0 0 60 60" style={{display:'block', overflow:'visible'}}>
      {/* M — indigo, drawn first so N can weave over/under it */}
      <path d="M4,52 L4,8 L20,40 L36,8 L36,52"
            stroke={indigo} strokeWidth="2.8" fill="none"
            strokeLinejoin="round" strokeLinecap="round"/>

      {/* N — green, three pieces with a dashed weave segment in the middle */}
      {/* left post: solid below the M-crossing, dashed across it, solid above */}
      <path d="M22,52 L22,40"
            stroke={green} strokeWidth="2.8" fill="none" strokeLinecap="round"/>
      <path d="M22,40 L22,32"
            stroke={green} strokeWidth="2.8" fill="none" strokeLinecap="round"
            strokeDasharray="1.4 2.2" opacity="0.55"/>
      <path d="M22,32 L22,8"
            stroke={green} strokeWidth="2.8" fill="none" strokeLinecap="round"/>

      {/* diagonal: solid → dashed (under M) → solid */}
      <path d="M22,8 L29,17"
            stroke={green} strokeWidth="2.8" fill="none" strokeLinecap="round"/>
      <path d="M29,17 L37.5,28"
            stroke={green} strokeWidth="2.8" fill="none" strokeLinecap="round"
            strokeDasharray="1.4 2.2" opacity="0.55"/>
      <path d="M37.5,28 L56,52"
            stroke={green} strokeWidth="2.8" fill="none" strokeLinecap="round"/>

      {/* right post */}
      <path d="M56,52 L56,8"
            stroke={green} strokeWidth="2.8" fill="none" strokeLinecap="round"/>

      {/* small knot dot where the threads pass each other */}
      <circle cx="30.5" cy="19" r="1.9" fill={ink}/>
      <circle cx="22" cy="36" r="1.4" fill={ink} opacity="0.7"/>
    </svg>
  );
}

function VariantStitchedV2() {
  const t = useT();
  const W = 760;
  const A = 'var(--accent-a)';   // indigo (from B's blue family, deepened)
  const G = 'var(--accent-b)';   // green (lifted from B)

  // Ephemeral thread style — used in the hero
  const ghostThread = (d, delay = 0, weight = 0.8, opacity = 0.38, dash = '1 5') => (
    <path d={d} stroke={A} strokeWidth={weight} fill="none" strokeLinecap="round"
          opacity={opacity} strokeDasharray={dash}
          className="mn-thread" style={{'--mn-len': 1400, '--mn-delay': `${delay}s`, '--mn-dur': '6s'}}/>
  );

  return (
    <div className="mn-paper" style={{ width: W, minHeight: 3300, fontFamily: 'Architects Daughter, sans-serif' }}>

      {/* ── Top bar ─────────────────────────────────────── */}
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between',
                   padding:'14px 36px 14px', borderBottom:'1px dashed var(--ink)'}}>
        <div style={{display:'flex', alignItems:'center', gap:12}}>
          <MonogramMN s={44} indigo={A} green={G}/>
          <div style={{display:'flex', flexDirection:'column', lineHeight:1}}>
            <span className="mn-caveat" style={{fontSize:26, color:'var(--ink)'}}>male niti</span>
            <span className="mn-elite" style={{fontSize:9, color:'var(--ink-fade)', letterSpacing:'.18em', marginTop:2}}>
              {t('male web stranice, male aplikacije', 'small sites, small apps')}
            </span>
          </div>
        </div>
        <div style={{display:'flex', gap:18, fontSize:14, color:'var(--ink-soft)'}}>
          <span><T hr="usluge" en="services"/></span>
          <span><T hr="proces" en="process"/></span>
          <span><T hr="radovi" en="work"/></span>
          <span><T hr="bilješke" en="notes"/></span>
          <span><T hr="o meni" en="about"/></span>
          <span><T hr="kontakt" en="contact"/></span>
        </div>
        <div className="mn-elite" style={{fontSize:11, color:'var(--ink-soft)', border:'1px solid var(--ink)', padding:'4px 8px', borderRadius:20}}>
          HR · en
        </div>
      </div>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section style={{position:'relative', padding:'60px 36px 36px', minHeight:560}}>
        {/* ephemeral threading background — many thin, low-opacity, dashed strokes */}
        <svg style={{position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none'}}
             viewBox={`0 0 ${W} 560`} preserveAspectRatio="none">
          {ghostThread("M-20,60 C200,120 380,30 780,140", 0.0, 0.9, 0.4, '1 6')}
          {ghostThread("M-20,150 C220,220 420,110 780,230", 0.4, 0.7, 0.32, '1 5')}
          {ghostThread("M-20,250 C260,340 420,210 780,300", 0.8, 0.8, 0.36, '2 6')}
          {ghostThread("M-20,360 C200,440 460,320 780,420", 1.2, 0.7, 0.30, '1 7')}
          {ghostThread("M-20,460 C260,530 420,400 780,520", 1.6, 0.9, 0.42, '1 5')}
          {/* one green thread, very faint */}
          <path d="M-20,200 C260,290 480,170 780,360"
                stroke={G} strokeWidth="0.8" fill="none" strokeLinecap="round"
                opacity="0.28" strokeDasharray="2 7"
                className="mn-thread" style={{'--mn-len':1400, '--mn-delay':'2s', '--mn-dur':'7s'}}/>
        </svg>

        <div className="mn-elite" style={{fontSize:11, color:A, letterSpacing:'.3em'}}>Vol. 01 · MMXXVI</div>

        <h1 style={{
          margin:'24px 0 6px', fontFamily:'Caveat, cursive', fontWeight:700,
          fontSize:148, lineHeight:0.9, color:'var(--ink)', letterSpacing:'-0.02em',
          position:'relative'
        }}>
          Male<br/>Niti<span style={{color: G}}>.</span>
        </h1>

        <div className="mn-hand" style={{fontSize:22, marginTop:10, maxWidth:460, lineHeight:1.25}}>
          <T hr="Web stranice po mjeri — male ili velike, ali sašivene kako treba."
             en="Bespoke websites — small or large, but stitched the right way."/>
        </div>
        <div className="mn-hand" style={{fontSize:16, marginTop:6, maxWidth:440, color:'var(--ink-soft)'}}>
          <T hr="Od jednostavne osobne stranice do cijelih sustava. Bez WordPressa, bez kompromisa."
             en="From a simple personal site to whole systems. No WordPress, no shortcuts."/>
        </div>

        <div style={{display:'flex', gap:14, marginTop:26}}>
          <SketchBtn primary accent={A}><T hr="Reci mi o svom projektu →" en="Tell me about your project →"/></SketchBtn>
          <SketchBtn accent={G}><T hr="Pogledaj radove" en="See work"/></SketchBtn>
        </div>

        {/* Floating lyric note */}
        <Note color="#eee9d5" rotate={2} style={{position:'absolute', right:36, top:96, width:240, padding:'14px 16px'}}>
          <div className="mn-shadow" style={{fontSize:18, color:A, lineHeight:1.2}}>
            <T hr={LYRICS.dugme.hr} en={LYRICS.dugme.en}/>
          </div>
          <div className="mn-elite" style={{fontSize:10, marginTop:8, color:'var(--ink-fade)'}}>
            — {LYRICS.dugme.attr}
          </div>
        </Note>
      </section>

      {/* ── Services ────────────────────────────────────── */}
      <section style={{padding:'40px 36px', borderTop:'1px dashed var(--ink)'}}>
        <SectionHead num="01" hr="Što sve mogu uplesti." en="What I can weave for you." accent={A}/>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:20, marginTop:18}}>
          {[
            {
              num:'i',
              hr:'Osobna web stranica', en:'Personal website',
              body_hr:'Vaše ime, vaš posao, vaša priča — sve na jednom mjestu. Lijepo, brzo, vaše.',
              body_en:'Your name, your work, your story — one place. Beautiful, quick, yours.',
              examples_hr:'portfelj · vizitka · stranica obrta · landing za projekt',
              examples_en:'portfolio · business card · craft-business site · project landing',
              col: A,
            },
            {
              num:'ii',
              hr:'Dinamični sadržaj', en:'Dynamic content',
              body_hr:'Sadržaj koji se mijenja — vijesti, katalog, narudžbe, korisnički računi, rezervacije.',
              body_en:'Content that changes — news, catalogues, orders, user accounts, bookings.',
              examples_hr:'blog · trgovina · prijave · CRM · alati za internu upotrebu',
              examples_en:'blog · shop · sign-ups · CRM · internal tools',
              col: G,
            },
            {
              num:'iii',
              hr:'Cijeli sustavi', en:'Full systems',
              body_hr:'Sve odjednom — uređaji, baze, modeli, admin sučelje. Jedna nit kroz cijelu kuću.',
              body_en:'Everything at once — devices, databases, models, admin UI. One thread through the whole house.',
              examples_hr:'IoT · analitika · prognoze · multi-tenant aplikacije',
              examples_en:'IoT · analytics · forecasting · multi-tenant apps',
              col: A,
            },
          ].map((c, i) => (
            <div key={i} className="mn-box" style={{padding:'18px 18px 20px', position:'relative', borderColor: c.col}}>
              <div className="mn-elite" style={{fontSize:11, color: c.col}}>{c.num}.</div>
              <div className="mn-caveat" style={{fontSize:30, marginTop:2, lineHeight:1, color:'var(--ink)'}}>
                <T hr={c.hr} en={c.en}/>
              </div>
              <div style={{fontSize:14, marginTop:8, lineHeight:1.35, color:'var(--ink-soft)'}}>
                <T hr={c.body_hr} en={c.body_en}/>
              </div>
              <div className="mn-elite" style={{fontSize:10, marginTop:12, color:'var(--ink-fade)', lineHeight:1.5}}>
                <T hr={c.examples_hr} en={c.examples_en}/>
              </div>
              {/* connecting knot between cards */}
              {i < 2 && (
                <svg width="28" height="20" style={{position:'absolute', right:-24, top:'50%', overflow:'visible', pointerEvents:'none'}}>
                  <path d="M0,10 Q14,0 28,10" stroke={i===0 ? A : G} strokeWidth="1" fill="none" opacity="0.6" strokeDasharray="2 3"/>
                </svg>
              )}
            </div>
          ))}
        </div>

        <Note color="#dde6ff" rotate={-2} style={{marginTop:24, marginLeft:'auto', width:300}}>
          <T hr="Ne pravim WordPress, Wix, ni Shopify. Pravim aplikacije koje rade točno ono što vam treba — i koje rastu s vama."
             en="No WordPress, Wix, or Shopify. Bespoke apps that do exactly what you need — and grow with you."/>
        </Note>
      </section>

      {/* ── Process ─────────────────────────────────────── */}
      <section style={{padding:'40px 36px', borderTop:'1px dashed var(--ink)', position:'relative'}}>
        <SectionHead num="02" hr="Kako radim." en="How I work." accent={A}/>

        {/* lighter thread connecting the 4 steps */}
        <svg style={{position:'absolute', left:60, top:120, width:80, height:480, overflow:'visible', pointerEvents:'none'}}>
          <path d="M40,0 C0,80 80,160 40,240 C0,320 80,400 40,480"
                stroke={A} strokeWidth="0.9" fill="none" opacity="0.5"
                strokeDasharray="2 4" strokeLinecap="round"
                className="mn-thread" style={{'--mn-len':900, '--mn-delay':'0.2s', '--mn-dur':'5s'}}/>
        </svg>

        <div style={{marginLeft:120, display:'flex', flexDirection:'column', gap:34, marginTop:18}}>
          {[
            { n:'Ⅰ', hr:'Razgovor', en:'Talk', body_hr:'Što vam treba i zašto. Pitanja, granice, brige. Bez ponuda na slijepo.', body_en:'What you need and why. Questions, scope, worries. No blind quotes.', col: A },
            { n:'Ⅱ', hr:'Skica', en:'Sketch', body_hr:'Lo-fi prototip i tehnička procjena — vidimo prije nego što kucamo.', body_en:'Lo-fi prototype & a technical read — we see it before we type it.', col: G },
            { n:'Ⅲ', hr:'Tkanje', en:'Weaving', body_hr:'Iterativna gradnja s pregledima svaki tjedan. Staging od prvog dana.', body_en:'Iterative build, weekly check-ins. Staging from day one.', col: A },
            { n:'Ⅳ', hr:'Predaja', en:'Handover', body_hr:'Kod je vaš, dokumentacija isto. Održavanje po želji — ne zauvijek.', body_en:'Code is yours, docs too. Maintenance on request — not forever.', col: G },
          ].map((s, i) => (
            <div key={i} style={{position:'relative'}}>
              <div className="mn-caveat" style={{position:'absolute', left:-86, top:-4, fontSize:34, color: s.col}}>{s.n}</div>
              <div className="mn-caveat" style={{fontSize:30}}><T hr={s.hr} en={s.en}/></div>
              <div style={{fontSize:14, color:'var(--ink-soft)', marginTop:2, maxWidth:480}}>
                <T hr={s.body_hr} en={s.body_en}/>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured work (in progress) ────────────────── */}
      <section style={{padding:'40px 36px', borderTop:'1px dashed var(--ink)'}}>
        <SectionHead num="03" hr="Trenutno na razboju." en="Currently on the loom." accent={A}/>

        <div style={{display:'grid', gridTemplateColumns:'1.3fr 1fr', gap:22, alignItems:'start'}}>
          <Slot label={t('snimka admin sučelja · IoT', 'screenshot · IoT admin')} h={300}/>
          <div>
            <div className="mn-elite" style={{fontSize:11, color: G}}>{t('STUDIJA SLUČAJA · U TIJEKU', 'CASE STUDY · IN PROGRESS')}</div>
            <h3 className="mn-caveat" style={{margin:'4px 0 8px', fontSize:34, lineHeight:1}}>
              <T hr="IoT pipeline za poljoprivredu" en="IoT pipeline for agriculture"/>
            </h3>
            <p style={{fontSize:14, lineHeight:1.4, margin:0, color:'var(--ink-soft)'}}>
              <T hr="Uređaji opisani u bazi, senzori s vlastitim shemama, prognoze modela nad vremenski blokiranim podacima, i admin u kojem klijent definira nove uređaje i ‘view-ove’ za svoje korisnike."
                 en="Devices described in a database, sensors with their own schemas, prognostic models against time-blocked data, and an admin where the client defines new devices and ‘views’ for their customers."/>
            </p>
            <div style={{display:'flex', flexWrap:'wrap', gap:6, marginTop:14}}>
              {['MQTT','Postgres','TimescaleDB','React','FastAPI','Docker'].map(x => (
                <span key={x} className="mn-elite" style={{
                  fontSize:10, border:`1px solid ${A}`, color:A, padding:'2px 8px', borderRadius:20
                }}>{x}</span>
              ))}
            </div>
            <div style={{marginTop:14, fontSize:13, color:'var(--ink-soft)'}}>
              <T hr="Studija slučaja stiže kad sustav uđe u proizvodnju." en="Full write-up lands once the system ships."/>
            </div>
          </div>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:22, marginTop:22}}>
          <Slot label={t('mjesto za drugi projekt', 'second project slot')} h={140}/>
          <Slot label={t('mjesto za treći projekt', 'third project slot')} h={140}/>
        </div>
      </section>

      {/* ── About / Name origin ──────────────────────────── */}
      <section style={{padding:'46px 36px 48px', borderTop:'1px dashed var(--ink)', position:'relative'}}>
        <SectionHead num="04" hr="Zašto Male Niti." en="Why Male Niti." accent={A}/>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:30, marginTop:10}}>
          <div className="mn-hand" style={{fontSize:16, lineHeight:1.55, color:'var(--ink)'}}>
            <p style={{marginTop:0}}>
              <T hr="Ime je trostruko ispleteno."
                 en="The name is woven three times over."/>
            </p>
            <p>
              <T hr={<>Prvo — niti u programiranju. (Hrvatski ‘dretva’ nikome ne stoji dobro u nazivu firme.)</>}
                 en="First — threads, as in software. (The Croatian word ‘dretva’ doesn’t sit pretty on a business card.)"/>
            </p>
            <p>
              <T hr="Drugo — dvije pjesme. Bijelo Dugme i Crvena Jabuka oboje govore o niti koja veže — putove, srca, snove."
                 en="Second — two songs. Bijelo Dugme and Crvena Jabuka both speak of a thread that ties — paths, hearts, dreams."/>
            </p>
            <p>
              <T hr="Treće — slogovi početka imena svakog člana moje obitelji. Spojeni u jednu nit."
                 en="Third — the opening syllables of each name in my family. Stitched into one thread."/>
            </p>
            <p style={{color: G, fontWeight:'normal'}}>
              <T hr="Male niti, koje sami biramo, koje sami pletemo."
                 en="Small threads, chosen by us, woven by us."/>
            </p>
          </div>

          <div style={{display:'flex', flexDirection:'column', gap:14}}>
            <div className="mn-box-solid" style={{borderColor: G, padding:18, position:'relative'}}>
              {/* tiny musical note marker */}
              <span className="mn-elite" style={{position:'absolute', top:10, right:14, fontSize:14, color: G}}>♪</span>
              <div className="mn-shadow" style={{fontSize:20, color: G, lineHeight:1.25, paddingRight:18}}>
                <T hr={LYRICS.dugme.hr} en={LYRICS.dugme.en}/>
              </div>
              <div className="mn-elite" style={{fontSize:10, marginTop:10, color:'var(--ink-fade)'}}>
                — {LYRICS.dugme.attr}
              </div>
            </div>

            <div className="mn-box-solid" style={{borderColor:A, padding:18, position:'relative'}}>
              <span className="mn-elite" style={{position:'absolute', top:10, right:14, fontSize:14, color: A}}>♪</span>
              <div className="mn-shadow" style={{fontSize:20, color:A, lineHeight:1.25, paddingRight:18}}>
                <T hr={LYRICS.jabuka.hr} en={LYRICS.jabuka.en}/>
              </div>
              <div className="mn-elite" style={{fontSize:10, marginTop:10, color:'var(--ink-fade)'}}>
                — {LYRICS.jabuka.attr}
              </div>
            </div>

            {/* monogram + family threads diagram */}
            <div className="mn-box" style={{padding:'18px 18px'}}>
              <div className="mn-elite" style={{fontSize:11, color:'var(--ink-soft)', marginBottom:10}}>
                {t('SLOGOVI · OBITELJ', 'SYLLABLES · FAMILY')}
              </div>
              <svg viewBox="0 0 320 120" style={{width:'100%', height:140}}>
                {['Ma','le','Ni','ti'].map((s, i) => {
                  const x = 30 + i * 90;
                  const col = i % 2 ? G : A;
                  return (
                    <g key={i}>
                      <path
                        d={`M${x},10 C${x-20},44 ${x+20},78 ${x},110`}
                        stroke={col} strokeWidth="1.1" fill="none" strokeLinecap="round"
                        opacity="0.6" strokeDasharray="2 4"
                        className="mn-thread" style={{'--mn-len':320, '--mn-delay':`${0.2 + i*0.2}s`, '--mn-dur':'5s'}}/>
                      <circle cx={x} cy={8} r="3.5" fill={col}/>
                      <text x={x} y={118} textAnchor="middle"
                            style={{fontFamily:'Caveat', fontSize:22, fill:'var(--ink)'}}>{s}</text>
                    </g>
                  );
                })}
                <text x="160" y="64" textAnchor="middle" className="mn-elite"
                      style={{fontSize:10, fill:'var(--ink-fade)'}}>
                  {t('(prava imena znamo samo mi)', '(only we know the real names)')}
                </text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing / engagement ─────────────────────────── */}
      <section style={{padding:'40px 36px', borderTop:'1px dashed var(--ink)'}}>
        <SectionHead num="05" hr="Suradnja." en="Engagement models." accent={A}/>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:18}}>
          {[
            { hr:'Po projektu', en:'Per project', sub_hr:'Fiksni opseg, fiksna cijena.', sub_en:'Fixed scope, fixed price.', when_hr:'za jasno definirane sustave', when_en:'for clearly scoped systems', col: A },
            { hr:'Po satu', en:'Hourly', sub_hr:'Tjedna evidencija, transparentno.', sub_en:'Weekly log, transparent.', when_hr:'za iteracije i dorade', when_en:'for iteration & retainer work', col: G, highlight: true },
            { hr:'Zadrška', en:'Retainer', sub_hr:'Stabilna nit, mjesečno.', sub_en:'A steady thread, monthly.', when_hr:'za održavanje i razvoj', when_en:'for maintenance & growth', col: A },
          ].map((p, i) => (
            <div key={i} className="mn-box-solid" style={{padding:18, borderColor: p.col}}>
              <div className="mn-caveat" style={{fontSize:32, color: p.col}}>
                <T hr={p.hr} en={p.en}/>
              </div>
              <div style={{fontSize:14, marginTop:4}}>
                <T hr={p.sub_hr} en={p.sub_en}/>
              </div>
              <div className="mn-elite" style={{fontSize:10, marginTop:10, color:'var(--ink-fade)'}}>
                <T hr={p.when_hr} en={p.when_en}/>
              </div>
              <Squiggle w={140} color={p.col} style={{marginTop:14, opacity: p.highlight ? 1 : 0.5}}/>
            </div>
          ))}
        </div>
      </section>

      {/* ── Blog / Notes ─────────────────────────────────── */}
      <section style={{padding:'40px 36px', borderTop:'1px dashed var(--ink)', position:'relative'}}>
        <SectionHead num="06" hr="Bilješke s razboja." en="Notes from the loom." accent={A}/>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:18}}>
          {[
            {
              date_hr:'23. ožujka 2026.', date_en:'Mar 23, 2026',
              tag_hr:'mišljenje', tag_en:'opinion',
              title_hr:'Zašto ne radim WordPress', title_en:'Why I don’t do WordPress',
              excerpt_hr:'Jeftino je dok ga ne treba mijenjati. Onda postaje skuplje od pravog rješenja.',
              excerpt_en:'It’s cheap until you need to change it. Then it costs more than the real thing.',
              read_hr:'5 min čitanja', read_en:'5 min read', col: A,
            },
            {
              date_hr:'14. veljače 2026.', date_en:'Feb 14, 2026',
              tag_hr:'iz razboja', tag_en:'from the loom',
              title_hr:'Što je “view” u IoT sustavu?', title_en:'What is a “view” in an IoT system?',
              excerpt_hr:'Kako sam pustio klijenta da sam definira što njegovi korisnici gledaju — i zašto je to važno.',
              excerpt_en:'How I let my client define what their users see — and why that mattered.',
              read_hr:'8 min čitanja', read_en:'8 min read', col: G,
            },
            {
              date_hr:'4. siječnja 2026.', date_en:'Jan 4, 2026',
              tag_hr:'za male poslove', tag_en:'for small business',
              title_hr:'Mala tehnologija za male poslove', title_en:'Small tech for small business',
              excerpt_hr:'Ne trebate kubernetes. Trebate da stranica radi u utorak ujutro kad ide kava.',
              excerpt_en:'You don’t need kubernetes. You need the site to work Tuesday morning over coffee.',
              read_hr:'4 min čitanja', read_en:'4 min read', col: A,
            },
          ].map((post, i) => (
            <article key={i} style={{
              borderLeft: `2px solid ${post.col}`,
              paddingLeft: 14,
              position: 'relative',
            }}>
              {/* tiny thread mark next to the border */}
              <svg width="14" height="60" style={{position:'absolute', left:-8, top:0, overflow:'visible', pointerEvents:'none'}}>
                <path d="M7,2 Q2,14 7,28 Q12,42 7,58"
                      stroke={post.col} strokeWidth="0.8" fill="none" strokeLinecap="round"
                      opacity="0.55" strokeDasharray="1 3"/>
              </svg>

              <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
                <div className="mn-elite" style={{fontSize:10, color: post.col, letterSpacing:'.08em', textTransform:'uppercase'}}>
                  <T hr={post.tag_hr} en={post.tag_en}/>
                </div>
                <div className="mn-elite" style={{fontSize:10, color:'var(--ink-fade)'}}>
                  <T hr={post.date_hr} en={post.date_en}/>
                </div>
              </div>

              <h4 className="mn-caveat" style={{margin:'6px 0 8px', fontSize:28, lineHeight:1.05, color:'var(--ink)'}}>
                <T hr={post.title_hr} en={post.title_en}/>
              </h4>

              <p style={{margin:0, fontSize:14, lineHeight:1.4, color:'var(--ink-soft)'}}>
                <T hr={post.excerpt_hr} en={post.excerpt_en}/>
              </p>

              <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:14}}>
                <span className="mn-elite" style={{fontSize:10, color:'var(--ink-fade)'}}>
                  <T hr={post.read_hr} en={post.read_en}/>
                </span>
                <span className="mn-hand" style={{fontSize:13, color: post.col, display:'inline-flex', alignItems:'center', gap:4}}>
                  <T hr="pročitaj" en="read"/> <ScribbleArrow w={28} h={12} color={post.col}/>
                </span>
              </div>
            </article>
          ))}
        </div>

        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:22, paddingTop:14, borderTop:'1px dashed var(--ink-fade)'}}>
          <span className="mn-hand" style={{fontSize:14, color:'var(--ink-soft)'}}>
            <T hr="Tu zapisujem ono što sam u radu naučio — i ono na što sam se najviše živcirao."
               en="Where I write down what I’ve learned at work — and what I’ve been most annoyed by."/>
          </span>
          <span className="mn-hand" style={{fontSize:14, color: G}}>
            <T hr="sve bilješke →" en="all notes →"/>
          </span>
        </div>
      </section>

      {/* ── Contact / footer ──────────────────────────────── */}
      <section style={{padding:'40px 36px 56px', borderTop:'1px dashed var(--ink)', position:'relative'}}>
        <SectionHead num="07" hr="Povucimo nit." en="Let’s pull a thread." accent={A}/>

        <div style={{display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:30}}>
          <div className="mn-box" style={{padding:18}}>
            <div className="mn-elite" style={{fontSize:10, color:'var(--ink-fade)'}}>{t('IME', 'NAME')}</div>
            <div style={{borderBottom:'1px solid var(--ink)', height:28, marginBottom:14}}/>
            <div className="mn-elite" style={{fontSize:10, color:'var(--ink-fade)'}}>{t('EMAIL', 'EMAIL')}</div>
            <div style={{borderBottom:'1px solid var(--ink)', height:28, marginBottom:14}}/>
            <div className="mn-elite" style={{fontSize:10, color:'var(--ink-fade)'}}>{t('O ČEMU PRIČAMO?', 'WHAT ARE WE TALKING ABOUT?')}</div>
            <div style={{border:'1px solid var(--ink)', height:90, marginTop:4, marginBottom:14}}/>
            <SketchBtn primary accent={A}><T hr="Pošalji →" en="Send →"/></SketchBtn>
          </div>

          <div style={{display:'flex', flexDirection:'column', gap:14}}>
            <div>
              <div className="mn-elite" style={{fontSize:11, color:'var(--ink-fade)'}}>{t('ILI DIREKTNO', 'OR DIRECTLY')}</div>
              <div className="mn-caveat" style={{fontSize:30, color: G}}>bok@maleniti.hr</div>
            </div>
            <div className="mn-hand" style={{fontSize:14, color:'var(--ink-soft)', lineHeight:1.4}}>
              <T hr="Odgovaram u 24h. Razgovor je besplatan, kao i procjena."
                 en="I reply within 24h. The first call & estimate are free."/>
            </div>
            <div style={{display:'flex', gap:10, marginTop:6}}>
              {['github','linkedin','rss'].map(x => (
                <span key={x} className="mn-elite" style={{
                  fontSize:10, border:'1px solid var(--ink)', padding:'4px 10px', borderRadius:20
                }}>{x}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="mn-elite" style={{
          marginTop:40, paddingTop:14, borderTop:'1px dashed var(--ink)',
          display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:10, color:'var(--ink-fade)'
        }}>
          <div style={{display:'flex', alignItems:'center', gap:10}}>
            <MonogramMN s={22} indigo={A} green={G}/>
            <span>© 2026 · Male Niti · {t('zagreb', 'zagreb')}</span>
          </div>
          <span>{t('izrađeno s pažnjom — i s nekoliko niti', 'made with care — and a few threads')}</span>
        </div>
      </section>
    </div>
  );
}

window.VariantStitchedV2 = VariantStitchedV2;
window.MonogramMN = MonogramMN;
