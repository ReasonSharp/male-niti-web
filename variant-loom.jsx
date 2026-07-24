// Variant C — "Loom" : warm / personal
// Family initials braid into the logo. Story leads. Warm rust accent.

function VariantLoom() {
  const t = useT();
  const W = 760;
  const C = 'var(--accent-c)';

  return (
    <div className="mn-paper" style={{ width: W, minHeight: 2900, background:'#f4ecdc' }}>

      {/* ── Top bar ─────────────────────────────────────── */}
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between',
                   padding:'16px 32px', borderBottom:'1.5px solid var(--ink)'}}>
        <div style={{display:'flex', alignItems:'center', gap:10}}>
          <svg width="36" height="22" viewBox="0 0 36 22">
            {[4,12,20,28].map((x,i)=>(
              <path key={i} d={`M${x},2 Q${x-4},11 ${x},20`} stroke={i%2?'var(--ink)':C} strokeWidth="1.5" fill="none"/>
            ))}
          </svg>
          <span className="mn-caveat" style={{fontSize:26}}>Male Niti</span>
        </div>
        <div className="mn-hand" style={{display:'flex', gap:20, fontSize:14, color:'var(--ink-soft)'}}>
          <span><T hr="usluge" en="services"/></span>
          <span><T hr="kako radim" en="how I work"/></span>
          <span><T hr="priča" en="story"/></span>
          <span><T hr="kontakt" en="contact"/></span>
        </div>
        <div className="mn-hand" style={{fontSize:13, color:'var(--ink-soft)'}}>
          <span style={{color: C, fontWeight:700}}>HR</span> · en
        </div>
      </div>

      {/* ── Hero — family braid ────────────────────────── */}
      <section style={{padding:'48px 32px 30px', position:'relative'}}>

        <div style={{display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:30, alignItems:'center'}}>
          <div>
            <div className="mn-elite" style={{fontSize:11, color:C, letterSpacing:'.3em'}}>
              EST. <T hr="DOMA" en="AT HOME"/>
            </div>
            <h1 className="mn-caveat" style={{
              margin:'12px 0 12px', fontSize:120, lineHeight:0.95, letterSpacing:'-0.01em',
              color:'var(--ink)'
            }}>
              <T hr={<>Male<br/>Niti.</>} en={<>Small<br/>Threads.</>}/>
            </h1>
            <div className="mn-hand" style={{fontSize:20, maxWidth:380, lineHeight:1.35, color:'var(--ink)'}}>
              <T hr="Bespoke web aplikacije za male poslove koji rastu."
                 en="Bespoke web apps for small businesses that grow."/>
            </div>
            <div className="mn-hand" style={{fontSize:14, marginTop:10, maxWidth:360, color:'var(--ink-soft)'}}>
              <T hr="Frontend, backend, ili cijeli sustav — sve isplete jedna nit."
                 en="Frontend, backend, or a whole system — one thread runs through."/>
            </div>

            <div style={{display:'flex', gap:12, marginTop:24}}>
              <SketchBtn primary accent={C}><T hr="Pozdrav, evo o čemu se radi…" en="Hi, here’s what I need…"/></SketchBtn>
              <SketchBtn accent="var(--ink)"><T hr="Pogledaj radove" en="See work"/></SketchBtn>
            </div>
          </div>

          {/* Braid diagram — family initials weaving into the logo */}
          <div style={{position:'relative'}}>
            <svg viewBox="0 0 280 360" style={{width:'100%', height:380, overflow:'visible'}}>
              {/* labels at top */}
              {['Ma','le','Ni','ti'].map((s,i)=>{
                const x = 40 + i * 67;
                return <text key={i} x={x} y={18} textAnchor="middle"
                             style={{fontFamily:'Caveat', fontSize:28, fill:'var(--ink)'}}>{s}</text>;
              })}
              {/* the four threads weaving down */}
              {[
                {x:40, color:C},
                {x:107, color:'var(--ink)'},
                {x:174, color:C},
                {x:241, color:'var(--ink)'},
              ].map((th, i) => {
                const phase = i * 0.25;
                const d = `M${th.x},28
                  C${th.x - 30 + 60*Math.sin(phase)},80
                   ${th.x + 30 - 60*Math.sin(phase)},140
                   ${th.x},200
                  C${th.x - 30 + 60*Math.sin(phase+1)},240
                   ${th.x + 30 - 60*Math.sin(phase+1)},280
                   140,320`;
                return <Thread key={i} d={d} color={th.color} delay={0.2 + i*0.18} len={700} weight={1.6}/>;
              })}
              {/* knot at bottom */}
              <circle cx="140" cy="320" r="9" fill={C} stroke="var(--ink)" strokeWidth="1.5"/>
              <text x="140" y="350" textAnchor="middle"
                    style={{fontFamily:'Caveat', fontSize:30, fill:'var(--ink)'}}>
                {t('= mi', '= us')}
              </text>
            </svg>

            <Note color="#fbe2ce" rotate={4} style={{position:'absolute', right:-8, top:-16, width:170}}>
              <T hr="(slogovi imena članova obitelji, spleteni)"
                 en="(opening syllables of each family member’s name, braided)"/>
            </Note>
          </div>
        </div>
      </section>

      {/* ── A short sentence about the studio ──────────── */}
      <section style={{padding:'10px 32px 26px'}}>
        <div className="mn-shadow" style={{fontSize:30, lineHeight:1.25, color:'var(--ink)', maxWidth:680}}>
          <T hr={<>“Pravim sustave za ljude koji žele <span style={{color:C}}>znati što imaju</span>, ne samo da imaju nešto.”</>}
             en={<>“I build systems for people who want to <span style={{color:C}}>know what they have</span>, not just to have something.”</>}/>
        </div>
      </section>

      {/* ── Services ────────────────────────────────────── */}
      <section style={{padding:'34px 32px', borderTop:'1.5px dashed var(--ink)'}}>
        <SectionHead num="01" hr="Što radim." en="What I do." accent={C}/>

        <div style={{display:'flex', flexDirection:'column', gap:14}}>
          {[
            { hr:'Frontend', en:'Frontend',
              body_hr:'Sučelja koja se ne moraju trpjeti — dashboardi, alati, custom UI.',
              body_en:'Interfaces you don’t have to apologise for — dashboards, tools, custom UI.',
              tags:['React','TypeScript','SVG/Canvas','a11y'] },
            { hr:'Backend', en:'Backend',
              body_hr:'API-ji, baze, autentikacija, queue-ovi, integracije.',
              body_en:'APIs, databases, auth, queues, integrations.',
              tags:['Node','Python','Postgres','Redis'] },
            { hr:'Cijeli sustavi', en:'Whole systems',
              body_hr:'Od uređaja, preko backendova, do admin sučelja — sve u jednoj niti.',
              body_en:'From devices through backends to admin panels — one continuous thread.',
              tags:['IoT','pipelines','admin UI','time-series'] },
          ].map((s, i) => (
            <div key={i} style={{display:'grid', gridTemplateColumns:'80px 1fr auto', gap:18, alignItems:'center',
                                  padding:'14px 16px', border:'1.5px solid var(--ink)', borderRadius:8,
                                  background:'var(--paper)'}}>
              <div style={{textAlign:'center'}}>
                <svg width="60" height="46" viewBox="0 0 60 46">
                  {[10,22,34,46].map((x,j)=>(
                    <path key={j} d={`M${x},4 Q${x+(j%2?-6:6)},23 ${x},42`}
                          stroke={j===i?C:'var(--ink)'} strokeWidth="1.5" fill="none"/>
                  ))}
                </svg>
              </div>
              <div>
                <div className="mn-caveat" style={{fontSize:34, lineHeight:1, color:'var(--ink)'}}>
                  <T hr={s.hr} en={s.en}/>
                </div>
                <div className="mn-hand" style={{fontSize:15, marginTop:4, color:'var(--ink-soft)', lineHeight:1.35}}>
                  <T hr={s.body_hr} en={s.body_en}/>
                </div>
                <div style={{display:'flex', flexWrap:'wrap', gap:6, marginTop:8}}>
                  {s.tags.map(tg => (
                    <span key={tg} className="mn-elite" style={{
                      fontSize:10, color:C, border:`1px solid ${C}`, padding:'1px 8px', borderRadius:20
                    }}>{tg}</span>
                  ))}
                </div>
              </div>
              <div style={{textAlign:'right'}}>
                <ScribbleArrow w={50} color={C}/>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Name story (the heart of the variant) ──────── */}
      <section style={{padding:'40px 32px', borderTop:'1.5px dashed var(--ink)', position:'relative',
                       background:'rgba(176, 74, 37, 0.04)'}}>
        <SectionHead num="02" hr="Priča iza imena." en="The story behind the name." accent={C}/>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:24, marginTop:6}}>
          <div className="mn-hand" style={{fontSize:16, lineHeight:1.6, color:'var(--ink)'}}>
            <p style={{marginTop:0}}>
              <span className="mn-caveat" style={{fontSize:42, color:C, lineHeight:0.6, marginRight:6, float:'left'}}>M</span>
              <T hr="ale Niti znači, otprilike, ‘mali konci’. Ali ime je satkano od tri stvari odjednom."
                 en="ale Niti translates, roughly, to ‘small threads’. But the name is woven from three things at once."/>
            </p>
            <p>
              <T hr="Prvo, dretve u programiranju — niti koje rade paralelno, sinkronizirano kad treba, neovisno kad može."
                 en="First, threads in software — running in parallel, syncing when needed, independent when they can."/>
            </p>
            <p>
              <T hr="Drugo, dvije pjesme. Jedna kaže da postoji neka tajna veza, ‘kojom čovjek sebe veže kada bira neki put.’ Druga govori o ‘tankoj niti, koja čini naše snove.’"
                 en="Second, two songs. One speaks of a secret tie, ‘with which a person ties themself when choosing a path.’ The other, of ‘a thin thread that makes our dreams.’"/>
            </p>
            <p>
              <T hr="Treće — i najmanje očito — slogovi početka imena svakog člana moje obitelji, spleteni u jedno ime."
                 en="Third — and least obvious — the opening syllables of each name in my family, braided into one."/>
            </p>
            <p style={{color:C}}>
              <T hr="Pa, da. Male niti, koje sami biramo. I koje sami pletemo."
                 en="So, yes. Small threads, that we choose ourselves. And weave ourselves."/>
            </p>
          </div>

          <div style={{display:'flex', flexDirection:'column', gap:14}}>
            <div className="mn-box-solid" style={{borderColor:C, padding:'16px 18px', background:'var(--paper)'}}>
              <div className="mn-shadow" style={{fontSize:20, color:'var(--ink)', lineHeight:1.3}}>
                <T hr={LYRICS.dugme.hr} en={LYRICS.dugme.en}/>
              </div>
              <div className="mn-elite" style={{fontSize:10, marginTop:10, color:C}}>
                ♪ {LYRICS.dugme.attr}
              </div>
            </div>
            <div className="mn-box-solid" style={{borderColor:'var(--ink)', padding:'16px 18px', background:'var(--paper)'}}>
              <div className="mn-shadow" style={{fontSize:20, color:'var(--ink)', lineHeight:1.3}}>
                <T hr={LYRICS.jabuka.hr} en={LYRICS.jabuka.en}/>
              </div>
              <div className="mn-elite" style={{fontSize:10, marginTop:10, color:C}}>
                ♪ {LYRICS.jabuka.attr}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How I work ───────────────────────────────────── */}
      <section style={{padding:'36px 32px', borderTop:'1.5px dashed var(--ink)'}}>
        <SectionHead num="03" hr="Kako radim." en="How I work." accent={C}/>

        <div style={{position:'relative', paddingLeft:30}}>
          <svg style={{position:'absolute', left:0, top:0, width:30, height:'100%', overflow:'visible'}}>
            <Thread d="M15,0 C0,80 30,140 15,220 C0,300 30,360 15,440" color={C} len={900} delay={0.2} weight={1.6}/>
          </svg>
          {[
            { hr:'Razgovor', en:'Conversation', body_hr:'Što vam treba, što vas plaši, kako ćete to mjeriti.', body_en:'What you need, what worries you, how you’ll measure it.' },
            { hr:'Skica i procjena', en:'Sketch & estimate', body_hr:'Lo-fi prototip + tehnički plan. Vidite ga prije nego što platite.', body_en:'Lo-fi prototype + tech plan. You see it before you pay.' },
            { hr:'Tkanje', en:'Weaving', body_hr:'Iterativna gradnja, tjedne demonstracije, staging od prvog dana.', body_en:'Iterative build, weekly demos, staging from day one.' },
            { hr:'Predaja i njega', en:'Handover & care', body_hr:'Kod, dokumentacija, runbook. Održavanje po želji — kao kosa, ne zauvijek.', body_en:'Code, docs, runbook. Maintenance optional — like a haircut, not forever.' },
          ].map((s,i) => (
            <div key={i} style={{position:'relative', padding:'10px 0 18px'}}>
              <div style={{position:'absolute', left:-30, top:14, width:24, height:24, borderRadius:'50%',
                           border:`2px solid ${C}`, background:'var(--paper)',
                           display:'flex', alignItems:'center', justifyContent:'center',
                           fontFamily:'Caveat', fontWeight:700, fontSize:18}}>{i+1}</div>
              <div className="mn-caveat" style={{fontSize:30, lineHeight:1}}>
                <T hr={s.hr} en={s.en}/>
              </div>
              <div className="mn-hand" style={{fontSize:15, marginTop:4, color:'var(--ink-soft)', maxWidth:540, lineHeight:1.4}}>
                <T hr={s.body_hr} en={s.body_en}/>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured work ────────────────────────────────── */}
      <section style={{padding:'34px 32px', borderTop:'1.5px dashed var(--ink)'}}>
        <SectionHead num="04" hr="Na razboju." en="On the loom." accent={C}/>

        <div className="mn-box-solid" style={{padding:'18px 18px', background:'var(--paper)'}}>
          <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between'}}>
            <div className="mn-elite" style={{fontSize:11, color:C}}>{t('U TIJEKU', 'IN PROGRESS')}</div>
            <div className="mn-elite" style={{fontSize:11, color:'var(--ink-fade)'}}>~ 14 mo</div>
          </div>
          <h3 className="mn-caveat" style={{margin:'4px 0 6px', fontSize:34, lineHeight:1}}>
            <T hr="IoT analitika za poljoprivredu" en="IoT analytics for agriculture"/>
          </h3>
          <p className="mn-hand" style={{fontSize:14, lineHeight:1.45, margin:'6px 0 0', color:'var(--ink-soft)'}}>
            <T hr="Uređaji se opisuju u bazi, senzori se kače po vlastitoj shemi, podaci stižu kroz pipeline, prognoze se rotiraju nad vremenski blokiranim podacima, a klijent ima vlastiti admin u kojem definira sve to — i ‘view-ove’ koje njegovi korisnici onda gledaju."
               en="Devices are described in the database, sensors attach with their own schemas, data flows through a pipeline, prognostic models run over time-blocked data, and the client gets an admin where they define all of it — and the ‘views’ their customers eventually see."/>
          </p>

          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12, marginTop:16}}>
            <Slot label={t('admin', 'admin')} h={110}/>
            <Slot label={t('view', 'view')} h={110}/>
            <Slot label={t('prognoza', 'forecast')} h={110}/>
          </div>
        </div>

        <div className="mn-hand" style={{fontSize:13, color:'var(--ink-soft)', marginTop:14, textAlign:'right'}}>
          <T hr="Detaljna studija slučaja stiže kad sustav uđe u proizvodnju."
             en="Full case study lands once the system ships."/> →
        </div>
      </section>

      {/* ── Pricing ─────────────────────────────────────── */}
      <section style={{padding:'34px 32px', borderTop:'1.5px dashed var(--ink)'}}>
        <SectionHead num="05" hr="Suradnja." en="How we work together." accent={C}/>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:14}}>
          {[
            { hr:'Po projektu', en:'Per project',
              sub_hr:'fiksni opseg, fiksna cijena', sub_en:'fixed scope, fixed price',
              when_hr:'definirani sustavi, MVP-i', when_en:'defined systems, MVPs', thread: 1 },
            { hr:'Po satu', en:'Hourly',
              sub_hr:'tjedna evidencija, transparentno', sub_en:'weekly log, transparent',
              when_hr:'iteracije, dorade', when_en:'iteration, polish', thread: 2 },
            { hr:'Zadrška', en:'Retainer',
              sub_hr:'stabilna nit, mjesečno', sub_en:'a steady thread, monthly',
              when_hr:'održavanje i razvoj', when_en:'maintenance & growth', thread: 3 },
          ].map((p,i)=>(
            <div key={i} style={{
              border:`1.8px solid var(--ink)`,
              borderRadius:10, padding:'16px 14px',
              background:'var(--paper)',
              position:'relative',
              boxShadow: i===0 ? `4px 4px 0 ${C}` : '3px 3px 0 rgba(0,0,0,.08)'
            }}>
              <svg width="44" height="20" viewBox="0 0 44 20" style={{marginBottom:6}}>
                {Array.from({length: p.thread + 1}).map((_,j)=>{
                  const x = 6 + j*10;
                  return <path key={j} d={`M${x},2 Q${x-3},10 ${x},18`} stroke={j%2?'var(--ink)':C} strokeWidth="1.5" fill="none"/>;
                })}
              </svg>
              <div className="mn-caveat" style={{fontSize:30, lineHeight:1}}><T hr={p.hr} en={p.en}/></div>
              <div className="mn-hand" style={{fontSize:14, marginTop:6}}>
                <T hr={p.sub_hr} en={p.sub_en}/>
              </div>
              <div className="mn-elite" style={{fontSize:10, marginTop:10, color:C}}>
                <T hr={p.when_hr} en={p.when_en}/>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact ─────────────────────────────────────── */}
      <section style={{padding:'40px 32px 50px', borderTop:'1.5px dashed var(--ink)', background:'rgba(176, 74, 37, 0.05)'}}>
        <SectionHead num="06" hr="Hajdemo isplesti nešto." en="Let’s weave something." accent={C}/>

        <div style={{display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:24}}>
          <div className="mn-box-solid" style={{padding:18, background:'var(--paper)'}}>
            <div className="mn-hand" style={{fontSize:14, lineHeight:1.45, marginBottom:12, color:'var(--ink-soft)'}}>
              <T hr="Napišite nekoliko rečenica — što gradite, što vas muči, kakav je rok. Bez formalnosti."
                 en="A few sentences — what you’re building, what’s on your mind, what’s the deadline. Skip the formalities."/>
            </div>

            <div className="mn-hand" style={{fontSize:13, color:'var(--ink-fade)'}}>{t('Vaše ime', 'Your name')}</div>
            <div style={{borderBottom:'1.5px solid var(--ink)', height:26, marginBottom:12}}/>
            <div className="mn-hand" style={{fontSize:13, color:'var(--ink-fade)'}}>{t('Email', 'Email')}</div>
            <div style={{borderBottom:'1.5px solid var(--ink)', height:26, marginBottom:12}}/>
            <div className="mn-hand" style={{fontSize:13, color:'var(--ink-fade)'}}>{t('Što gradimo?', 'What are we building?')}</div>
            <div style={{border:'1.5px solid var(--ink)', height:100, marginTop:4, marginBottom:14, borderRadius:6}}/>
            <SketchBtn primary accent={C}><T hr="Pošalji nit →" en="Send the thread →"/></SketchBtn>
          </div>

          <div className="mn-hand" style={{fontSize:14, lineHeight:1.5}}>
            <div className="mn-elite" style={{fontSize:11, color:C, marginBottom:6}}>{t('ILI', 'OR')}</div>
            <div className="mn-caveat" style={{fontSize:26}}>bok@maleniti.hr</div>
            <p style={{margin:'10px 0 0', color:'var(--ink-soft)'}}>
              <T hr="Razgovor je besplatan. Prva procjena također."
                 en="The first call is free. So is the first estimate."/>
            </p>
            <div className="mn-hand" style={{marginTop:14, display:'flex', gap:10, fontSize:13}}>
              <span style={{borderBottom:'1.5px solid var(--ink)'}}>github</span>
              <span style={{borderBottom:'1.5px solid var(--ink)'}}>linkedin</span>
              <span style={{borderBottom:'1.5px solid var(--ink)'}}>rss</span>
            </div>
          </div>
        </div>

        <div className="mn-elite" style={{
          marginTop:34, paddingTop:14, borderTop:'1px dashed var(--ink)',
          display:'flex', justifyContent:'space-between', fontSize:10, color:'var(--ink-fade)'
        }}>
          <span>© 2026 · Male Niti</span>
          <span>{t('isplela jedna obitelj', 'woven by a family')}</span>
        </div>
      </section>
    </div>
  );
}

window.VariantLoom = VariantLoom;
