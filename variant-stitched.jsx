// Variant A — "Stitched" : editorial / poetic
// Magazine-like asymmetric layout, song lyrics as pull quotes, indigo thread.

function VariantStitched() {
  const t = useT();
  const W = 760;
  const A = 'var(--accent-a)';

  return (
    <div className="mn-paper" style={{ width: W, minHeight: 2900, fontFamily: 'Architects Daughter, sans-serif' }}>

      {/* ── Top bar ─────────────────────────────────────── */}
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between',
                   padding:'18px 36px', borderBottom:'1px dashed var(--ink)'}}>
        <div style={{display:'flex', alignItems:'center', gap:10}}>
          <svg width="28" height="28" viewBox="0 0 28 28">
            <circle cx="14" cy="14" r="11" fill="none" stroke={A} strokeWidth="1.5"/>
            <path d="M5,14 Q14,4 23,14 Q14,24 5,14" fill="none" stroke="var(--ink)" strokeWidth="1.2"/>
            <circle cx="14" cy="14" r="2" fill={A}/>
          </svg>
          <span className="mn-caveat" style={{fontSize:26, color:'var(--ink)'}}>male niti</span>
        </div>
        <div style={{display:'flex', gap:18, fontSize:14, color:'var(--ink-soft)'}}>
          <span><T hr="usluge" en="services"/></span>
          <span><T hr="proces" en="process"/></span>
          <span><T hr="radovi" en="work"/></span>
          <span><T hr="o meni" en="about"/></span>
          <span><T hr="kontakt" en="contact"/></span>
        </div>
        <div className="mn-elite" style={{fontSize:11, color:'var(--ink-soft)', border:'1px solid var(--ink)', padding:'4px 8px', borderRadius:20}}>
          HR · en
        </div>
      </div>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section style={{position:'relative', padding:'58px 36px 30px', minHeight:540}}>
        {/* threading background */}
        <svg style={{position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none'}}
             viewBox={`0 0 ${W} 540`} preserveAspectRatio="none">
          <Thread d="M-20,80 C200,140 380,40 780,160" color={A} delay={0.1} len={1100} weight={1.2}/>
          <Thread d="M-20,180 C220,250 420,140 780,260" color="var(--ink)" delay={0.5} len={1100} weight={1}/>
          <Thread d="M-20,340 C260,420 420,300 780,400" color={A} delay={0.9} len={1100} weight={1.2}/>
          <Thread d="M-20,460 C200,530 460,420 780,510" color="var(--ink)" delay={1.3} len={1100} weight={1}/>
        </svg>

        <div className="mn-elite" style={{fontSize:11, color:A, letterSpacing:'.3em'}}>Vol. 01 · MMXXVI</div>

        <h1 style={{
          margin:'24px 0 6px', fontFamily:'Caveat, cursive', fontWeight:700,
          fontSize:148, lineHeight:0.9, color:'var(--ink)', letterSpacing:'-0.02em'
        }}>
          Male<br/>Niti<span style={{color:A}}>.</span>
        </h1>

        <div className="mn-hand" style={{fontSize:22, marginTop:10, maxWidth:420, lineHeight:1.25}}>
          <T hr="Male niti za male i srednje poslove." en="Small threads for small and steady businesses."/>
        </div>
        <div className="mn-hand" style={{fontSize:16, marginTop:6, maxWidth:380, color:'var(--ink-soft)'}}>
          <T hr="Web aplikacije po mjeri — bez WordPressa, bez kompromisa."
             en="Bespoke web apps — no WordPress, no shortcuts."/>
        </div>

        <div style={{display:'flex', gap:14, marginTop:26}}>
          <SketchBtn primary accent={A}><T hr="Reci mi o svom projektu →" en="Tell me about your project →"/></SketchBtn>
          <SketchBtn accent="var(--ink)"><T hr="Pogledaj radove" en="See work"/></SketchBtn>
        </div>

        {/* Floating lyric note */}
        <Note color="#eee9d5" rotate={2} style={{position:'absolute', right:36, top:90, width:240, padding:'14px 16px'}}>
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
            { num:'i', hr:'Frontend', en:'Frontend', body_hr:'React, vanilla, animacije, dashboardi, dizajn sustavi.', body_en:'React, vanilla, motion, dashboards, design systems.' },
            { num:'ii', hr:'Backend', en:'Backend', body_hr:'API-ji, baze, autentikacija, queue-ovi, integracije.', body_en:'APIs, databases, auth, queues, integrations.' },
            { num:'iii', hr:'Cijeli sustavi', en:'Full systems', body_hr:'Od IoT pipelinea do admin panela — sve u jednoj niti.', body_en:'From IoT pipelines to admin panels — one continuous thread.' },
          ].map((c, i) => (
            <div key={i} className="mn-box" style={{padding:'18px 18px 22px', position:'relative'}}>
              <div className="mn-elite" style={{fontSize:11, color:A}}>{c.num}.</div>
              <div className="mn-caveat" style={{fontSize:32, marginTop:2}}><T hr={c.hr} en={c.en}/></div>
              <div style={{fontSize:14, marginTop:8, lineHeight:1.35, color:'var(--ink-soft)'}}>
                <T hr={c.body_hr} en={c.body_en}/>
              </div>
              {/* connecting knot */}
              {i < 2 && (
                <svg width="28" height="20" style={{position:'absolute', right:-24, top:'50%', overflow:'visible'}}>
                  <path d="M0,10 Q14,0 28,10" stroke={A} strokeWidth="1.4" fill="none"/>
                </svg>
              )}
            </div>
          ))}
        </div>

        <Note color="#dde6ff" rotate={-2} style={{marginTop:24, marginLeft:'auto', width:280}}>
          <T hr="Ne radim WordPress, Wix, Shopify. Radim aplikacije koje rastu s vama."
             en="No WordPress, Wix, Shopify. Bespoke apps that grow with you."/>
        </Note>
      </section>

      {/* ── Process ─────────────────────────────────────── */}
      <section style={{padding:'40px 36px', borderTop:'1px dashed var(--ink)', position:'relative'}}>
        <SectionHead num="02" hr="Kako radim." en="How I work." accent={A}/>

        {/* thread connecting the 4 steps */}
        <svg style={{position:'absolute', left:60, top:120, width:80, height:480, overflow:'visible', pointerEvents:'none'}}>
          <Thread d="M40,0 C0,80 80,160 40,240 C0,320 80,400 40,480"
                  color={A} delay={0.2} dur={4} len={900} weight={1.5}/>
        </svg>

        <div style={{marginLeft:120, display:'flex', flexDirection:'column', gap:34, marginTop:18}}>
          {[
            { n:'Ⅰ', hr:'Razgovor', en:'Talk', body_hr:'Što vam treba i zašto. Bez ponuda na slijepo.', body_en:'What you need and why. No blind quotes.' },
            { n:'Ⅱ', hr:'Skica', en:'Sketch', body_hr:'Niskovrijedni prototipi i tehnička procjena — vidimo prije nego što kucamo.', body_en:'Lo-fi prototypes & a technical read — we see it before we type it.' },
            { n:'Ⅲ', hr:'Tkanje', en:'Weaving', body_hr:'Iterativna gradnja s pregledima svaki tjedan.', body_en:'Iterative build, weekly check-ins.' },
            { n:'Ⅳ', hr:'Predaja', en:'Handover', body_hr:'Kod je vaš, dokumentacija isto. Održavanje po želji.', body_en:'Code is yours, docs too. Maintenance on request.' },
          ].map((s, i) => (
            <div key={i} style={{position:'relative'}}>
              <div className="mn-caveat" style={{position:'absolute', left:-86, top:-4, fontSize:34, color:A}}>{s.n}</div>
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
            <div className="mn-elite" style={{fontSize:11, color:A}}>{t('STUDIJA SLUČAJA · U TIJEKU', 'CASE STUDY · IN PROGRESS')}</div>
            <h3 className="mn-caveat" style={{margin:'4px 0 8px', fontSize:34, lineHeight:1}}>
              <T hr="IoT pipeline za poljoprivredu" en="IoT pipeline for agriculture"/>
            </h3>
            <p style={{fontSize:14, lineHeight:1.4, margin:0, color:'var(--ink-soft)'}}>
              <T hr="Uređaji opisani u bazi, senzori s vlastitim shemama, prognoza modela na vremenski blokirane podatke, i admin u kojem klijent definira nove uređaje i ‘view-ove’ za svoje korisnike."
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

      {/* ── About / Name origin (the editorial centrepiece) ─ */}
      <section style={{padding:'46px 36px 48px', borderTop:'1px dashed var(--ink)', position:'relative'}}>
        <SectionHead num="04" hr="Zašto Male Niti." en="Why Male Niti." accent={A}/>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:30, marginTop:10}}>
          <div className="mn-hand" style={{fontSize:16, lineHeight:1.55, color:'var(--ink)'}}>
            <p style={{marginTop:0}}>
              <T hr="Ime je trostruko ispleteno."
                 en="The name is woven three times over."/>
            </p>
            <p>
              <T hr="Prvo — niti u programiranju. (Hrvatski ‘dretva’ nikome ne stoji dobro u nazivu firme.)"
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
            <p style={{color:A, fontWeight:'normal'}}>
              <T hr="Male niti, koje sami biramo, koje sami pletemo."
                 en="Small threads, chosen by us, woven by us."/>
            </p>
          </div>

          <div style={{display:'flex', flexDirection:'column', gap:18}}>
            <div className="mn-box-solid" style={{borderColor:A, padding:18}}>
              <div className="mn-shadow" style={{fontSize:20, color:A, lineHeight:1.25}}>
                <T hr={LYRICS.jabuka.hr} en={LYRICS.jabuka.en}/>
              </div>
              <div className="mn-elite" style={{fontSize:10, marginTop:10, color:'var(--ink-fade)'}}>
                — {LYRICS.jabuka.attr}
              </div>
            </div>

            {/* family-thread diagram */}
            <div className="mn-box" style={{padding:'18px 18px'}}>
              <div className="mn-elite" style={{fontSize:11, color:'var(--ink-soft)', marginBottom:10}}>
                {t('SLOGOVI · OBITELJ', 'SYLLABLES · FAMILY')}
              </div>
              <svg viewBox="0 0 320 110" style={{width:'100%', height:130}}>
                {['Ma','le','Ni','ti'].map((s, i) => {
                  const x = 30 + i * 90;
                  return (
                    <g key={i}>
                      <Thread d={`M${x},10 C${x-20},40 ${x+20},70 ${x},100`}
                              color={i % 2 ? 'var(--ink)' : A}
                              delay={0.2 + i*0.2} len={300} weight={1.2}/>
                      <circle cx={x} cy={8} r="4" fill={A}/>
                      <text x={x} y={108} textAnchor="middle"
                            style={{fontFamily:'Caveat', fontSize:24, fill:'var(--ink)'}}>{s}</text>
                    </g>
                  );
                })}
                <text x="160" y="60" textAnchor="middle" className="mn-elite"
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
            { hr:'Po projektu', en:'Per project', sub_hr:'Fiksni opseg, fiksna cijena.', sub_en:'Fixed scope, fixed price.', when_hr:'za jasno definirane sustave', when_en:'for clearly scoped systems' },
            { hr:'Po satu', en:'Hourly', sub_hr:'Tjedna evidencija, transparentno.', sub_en:'Weekly log, transparent.', when_hr:'za iteracije i dorade', when_en:'for iteration & retainer work' },
            { hr:'Zadrška', en:'Retainer', sub_hr:'Stabilna nit, mjesečno.', sub_en:'A steady thread, monthly.', when_hr:'za održavanje i razvoj', when_en:'for maintenance & growth' },
          ].map((p, i) => (
            <div key={i} className="mn-box-solid" style={{padding:18, borderColor:i===1 ? A : 'var(--ink)'}}>
              <div className="mn-caveat" style={{fontSize:32, color: i===1 ? A : 'var(--ink)'}}>
                <T hr={p.hr} en={p.en}/>
              </div>
              <div style={{fontSize:14, marginTop:4}}>
                <T hr={p.sub_hr} en={p.sub_en}/>
              </div>
              <div className="mn-elite" style={{fontSize:10, marginTop:10, color:'var(--ink-fade)'}}>
                <T hr={p.when_hr} en={p.when_en}/>
              </div>
              <Squiggle w={140} color={i===1 ? A : 'var(--ink-fade)'} style={{marginTop:14}}/>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact / footer ──────────────────────────────── */}
      <section style={{padding:'40px 36px 60px', borderTop:'1px dashed var(--ink)', position:'relative'}}>
        <SectionHead num="06" hr="Povucimo nit." en="Let’s pull a thread." accent={A}/>

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
              <div className="mn-caveat" style={{fontSize:30, color:A}}>bok@maleniti.hr</div>
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
          display:'flex', justifyContent:'space-between', fontSize:10, color:'var(--ink-fade)'
        }}>
          <span>© 2026 · Male Niti · {t('zagreb', 'zagreb')}</span>
          <span>{t('izrađeno s pažnjom — i s nekoliko niti', 'made with care — and a few threads')}</span>
        </div>
      </section>
    </div>
  );
}

window.VariantStitched = VariantStitched;
