// Variant B — "Console" : dev studio / technical
// Terminal hero, parallel-thread metaphor as code processes, mono-heavy.

function VariantConsole() {
  const t = useT();
  const W = 760;
  const B = 'var(--accent-b)';

  const Prompt = ({ children, style }) => (
    <div className="mn-elite" style={{fontSize:13, color:'var(--ink)', ...style}}>
      <span style={{color: B}}>~/male-niti $</span> {children}
    </div>
  );

  return (
    <div className="mn-paper" style={{ width: W, minHeight: 2900 }}>

      {/* ── Top bar ─────────────────────────────────────── */}
      <div className="mn-elite" style={{display:'flex', alignItems:'center', justifyContent:'space-between',
                   padding:'14px 36px', borderBottom:'1px solid var(--ink)', fontSize:12}}>
        <div style={{display:'flex', alignItems:'center', gap:8}}>
          <span style={{color: B}}>▍</span>
          <span style={{letterSpacing:'.06em'}}>male_niti.sh</span>
        </div>
        <div style={{display:'flex', gap:20, color:'var(--ink-soft)'}}>
          {['services','process','work','about','pricing','contact'].map((k,i)=>(
            <span key={k}>./<T hr={COPY.nav[k]?.hr || k} en={k}/></span>
          ))}
        </div>
        <span style={{border:'1px solid var(--ink)', padding:'2px 8px'}}>--lang=HR</span>
      </div>

      {/* ── Hero — terminal ─────────────────────────────── */}
      <section style={{padding:'40px 36px 30px', position:'relative'}}>
        <div className="mn-box-solid" style={{padding:20, background:'rgba(0,0,0,0.02)'}}>
          {/* fake terminal head */}
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12,
                       paddingBottom:8, borderBottom:'1px dashed var(--ink)'}}>
            <div style={{display:'flex', gap:6}}>
              <span style={{width:10, height:10, borderRadius:5, border:'1px solid var(--ink)'}}/>
              <span style={{width:10, height:10, borderRadius:5, border:'1px solid var(--ink)'}}/>
              <span style={{width:10, height:10, borderRadius:5, border:'1px solid var(--ink)'}}/>
            </div>
            <span className="mn-elite" style={{fontSize:10, color:'var(--ink-fade)'}}>bash · maleniti</span>
            <span/>
          </div>

          <Prompt><T hr="whoami" en="whoami"/></Prompt>
          <div className="mn-elite" style={{fontSize:13, marginTop:4, color:'var(--ink-soft)'}}>
            <T hr="freelance developer · bespoke web aplikacije" en="freelance developer · bespoke web apps"/>
          </div>

          <h1 className="mn-elite" style={{
            margin:'18px 0 4px', fontSize:64, lineHeight:1, letterSpacing:'-0.04em',
            color:'var(--ink)'
          }}>
            Male<span style={{color:B}}>_</span>Niti<span style={{
              display:'inline-block', width:14, height:48, background:B, marginLeft:6, verticalAlign:'-4px',
              animation:'mn-thread-sway 1s steps(2) infinite'
            }}/>
          </h1>

          <div className="mn-elite" style={{fontSize:14, marginTop:14, color:'var(--ink-soft)', lineHeight:1.6}}>
            <Prompt><T hr="cat /etc/about.txt" en="cat /etc/about.txt"/></Prompt>
            <div style={{marginLeft:0, marginTop:6, color:'var(--ink)', maxWidth:580}}>
              <T hr="Bespoke web aplikacije. Frontend, backend, cijeli sustavi."
                 en="Bespoke web apps. Frontend, backend, full systems."/><br/>
              <T hr="Bez WordPressa. Bez CMS-shopa. Bez magije."
                 en="No WordPress. No CMS shops. No magic."/><br/>
              <span style={{color:'var(--ink-soft)'}}>
                <T hr="# samo niti — paralelne, povezane, vaše."
                   en="# just threads — parallel, connected, yours."/>
              </span>
            </div>
          </div>

          <div style={{display:'flex', gap:10, marginTop:18}}>
            <SketchBtn primary accent={B} style={{borderRadius:4, fontFamily:'Special Elite', fontSize:14}}>
              ./start_project.sh
            </SketchBtn>
            <SketchBtn accent="var(--ink)" style={{borderRadius:4, fontFamily:'Special Elite', fontSize:14}}>
              ./see_work.sh
            </SketchBtn>
          </div>
        </div>

        {/* parallel thread visual */}
        <div style={{marginTop:24, position:'relative', height:80}}>
          <svg width="100%" height="80" viewBox={`0 0 ${W-72} 80`} preserveAspectRatio="none">
            {[10, 28, 46, 64].map((y, i) => (
              <Thread key={i}
                d={`M0,${y} C200,${y-6} 400,${y+6} ${W-72},${y}`}
                color={i % 2 ? B : 'var(--ink)'}
                delay={0.1 + i*0.15} len={900} weight={1.4}/>
            ))}
          </svg>
          <div className="mn-elite" style={{position:'absolute', right:0, top:-2, fontSize:10, color:'var(--ink-fade)'}}>
            // <T hr="paralelne niti — kao u procesoru, kao u životu" en="parallel threads — like a CPU, like life"/>
          </div>
        </div>
      </section>

      {/* ── Services ────────────────────────────────────── */}
      <section style={{padding:'30px 36px', borderTop:'1px solid var(--ink)'}}>
        <SectionHead num="01" hr="services()" en="services()" accent={B}/>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:14}}>
          {[
            { label:'fn frontend()', hr:'Sučelja koja se ne moraju trpjeti.', en:'Interfaces that don’t make you wince.',
              tags:['React','TypeScript','Vite','SVG','a11y','dashboards'] },
            { label:'fn backend()', hr:'API-ji, baze, autentikacija, queue-ovi.', en:'APIs, databases, auth, queues.',
              tags:['Node','Python','Postgres','Redis','Docker','REST/WS'] },
            { label:'fn system()', hr:'Cijeli sustavi — od uređaja do dashboarda.', en:'Whole systems — devices to dashboard.',
              tags:['IoT','MQTT','Timescale','admin UI','models','infra'] },
          ].map((s, i) => (
            <div key={i} className="mn-box" style={{padding:14, position:'relative'}}>
              <div className="mn-elite" style={{fontSize:12, color:B}}>{s.label} {'{'}</div>
              <div className="mn-hand" style={{fontSize:15, margin:'6px 0 10px', paddingLeft:12, lineHeight:1.3}}>
                <T hr={s.hr} en={s.en}/>
              </div>
              <div style={{display:'flex', flexWrap:'wrap', gap:4, paddingLeft:12}}>
                {s.tags.map(tg => (
                  <span key={tg} className="mn-elite" style={{
                    fontSize:9.5, padding:'2px 6px', background:'rgba(0,0,0,.04)',
                    border:'1px solid var(--ink-fade)'
                  }}>{tg}</span>
                ))}
              </div>
              <div className="mn-elite" style={{fontSize:12, color:B, marginTop:10}}>{'}'}</div>
            </div>
          ))}
        </div>

        <div className="mn-elite" style={{fontSize:11, color:'var(--ink-fade)', marginTop:14}}>
          # <T hr="ne pokreće wordpress.exe — ne pokreće shopify.exe — ne pokreće squarespace.exe"
                en="will not run wordpress.exe — will not run shopify.exe — will not run squarespace.exe"/>
        </div>
      </section>

      {/* ── Process — flow diagram ──────────────────────── */}
      <section style={{padding:'34px 36px', borderTop:'1px solid var(--ink)'}}>
        <SectionHead num="02" hr="process.pipe()" en="process.pipe()" accent={B}/>

        <div style={{display:'flex', alignItems:'stretch', gap:0, marginTop:6, overflow:'visible'}}>
          {[
            { tag:'00', hr:'razgovor', en:'discovery', body_hr:'kratak poziv · pitanja · constraint-i', body_en:'short call · questions · constraints' },
            { tag:'01', hr:'skica',    en:'sketch',    body_hr:'lo-fi wireframe · tech read · procjena', body_en:'lo-fi wireframe · tech read · estimate' },
            { tag:'02', hr:'build',    en:'build',     body_hr:'tjedne demonstracije · live staging', body_en:'weekly demos · live staging' },
            { tag:'03', hr:'predaja',  en:'handover',  body_hr:'kod · docs · runbook · održavanje (opt.)', body_en:'code · docs · runbook · maintenance (opt.)' },
          ].map((s, i, arr) => (
            <React.Fragment key={i}>
              <div className="mn-box-solid" style={{padding:'12px 14px', flex:1, minWidth:0}}>
                <div className="mn-elite" style={{fontSize:10, color:B}}>STEP {s.tag}</div>
                <div className="mn-caveat" style={{fontSize:28, lineHeight:1}}>
                  <T hr={s.hr} en={s.en}/>
                </div>
                <div className="mn-elite" style={{fontSize:11, marginTop:6, color:'var(--ink-soft)', lineHeight:1.4}}>
                  <T hr={s.body_hr} en={s.body_en}/>
                </div>
              </div>
              {i < arr.length - 1 && (
                <div style={{alignSelf:'center', padding:'0 4px'}}>
                  <span className="mn-elite" style={{fontSize:18, color:B}}>|</span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="mn-elite" style={{fontSize:11, color:'var(--ink-fade)', marginTop:14}}>
          # <T hr="kao unix — male alatke, jasni izlazi, pipe-ane u smisao."
                en="like unix — small tools, clear outputs, piped into meaning."/>
        </div>
      </section>

      {/* ── Work (in progress) ─────────────────────────── */}
      <section style={{padding:'34px 36px', borderTop:'1px solid var(--ink)'}}>
        <SectionHead num="03" hr="work[]" en="work[]" accent={B}/>

        <div className="mn-box" style={{padding:18}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
            <div className="mn-elite" style={{fontSize:11, color:B}}>[0] STATUS: SHIPPING_SOON</div>
            <div className="mn-elite" style={{fontSize:10, color:'var(--ink-fade)'}}>~ 14 mo · solo</div>
          </div>
          <h3 className="mn-caveat" style={{margin:'4px 0 10px', fontSize:36, lineHeight:1}}>
            <T hr="IoT pipeline · poljoprivredna analitika"
               en="IoT pipeline · agricultural analytics"/>
          </h3>

          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:18, marginTop:8}}>
            <div className="mn-elite" style={{fontSize:12, lineHeight:1.55, color:'var(--ink)'}}>
              ├─ devices/  <span style={{color:'var(--ink-fade)'}}># schema per device</span><br/>
              ├─ sensors/  <span style={{color:'var(--ink-fade)'}}># attached, time-blocked</span><br/>
              ├─ views/    <span style={{color:'var(--ink-fade)'}}># client-defined groupings</span><br/>
              ├─ models/   <span style={{color:'var(--ink-fade)'}}># run prognosis on the data</span><br/>
              └─ admin/    <span style={{color:'var(--ink-fade)'}}># client defines all of the above</span>
            </div>
            <Slot label={t('dashboard preview', 'dashboard preview')} h={130}/>
          </div>

          <div style={{display:'flex', flexWrap:'wrap', gap:6, marginTop:14}}>
            {['MQTT','Postgres+Timescale','FastAPI','React','Docker','Grafana','model runner'].map(x => (
              <span key={x} className="mn-elite" style={{
                fontSize:10, border:`1px solid ${B}`, color:B, padding:'2px 8px'
              }}>{x}</span>
            ))}
          </div>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginTop:14}}>
          <div className="mn-box" style={{padding:14}}>
            <div className="mn-elite" style={{fontSize:11, color:'var(--ink-fade)'}}>[1] PLACEHOLDER</div>
            <div className="mn-caveat" style={{fontSize:26, marginTop:2}}>
              <T hr="dolazi uskoro" en="coming soon"/>
            </div>
          </div>
          <div className="mn-box" style={{padding:14}}>
            <div className="mn-elite" style={{fontSize:11, color:'var(--ink-fade)'}}>[2] PLACEHOLDER</div>
            <div className="mn-caveat" style={{fontSize:26, marginTop:2}}>
              <T hr="dolazi uskoro" en="coming soon"/>
            </div>
          </div>
        </div>
      </section>

      {/* ── About / Name story ───────────────────────────── */}
      <section style={{padding:'40px 36px', borderTop:'1px solid var(--ink)'}}>
        <SectionHead num="04" hr="man male_niti" en="man male_niti" accent={B}/>

        <div className="mn-box-solid" style={{padding:18, background:'rgba(0,0,0,.02)'}}>
          <div className="mn-elite" style={{fontSize:13, lineHeight:1.7}}>
            <div style={{color:B}}>NAME</div>
            <div style={{paddingLeft:14}}>male_niti — <T hr="lit. ‘male niti’; ‘small threads’ in English." en="lit. ‘male niti’; ‘small threads’ in English."/></div>

            <div style={{color:B, marginTop:10}}>DESCRIPTION</div>
            <div style={{paddingLeft:14}}>
              <T hr="A. niti u programiranju (hrv. ‘dretva’; nitko to ne želi u nazivu firme)."
                 en="A. threads in software (Croatian ‘dretva’; no one wants that on a business card)."/>
              <br/>
              <T hr="B. niti iz pjesama Bijelog Dugmeta i Crvene Jabuke — niti koje vežu putove i snove."
                 en="B. threads from songs by Bijelo Dugme and Crvena Jabuka — threads that tie paths and dreams."/>
              <br/>
              <T hr="C. slogovi početka imena članova obitelji, spleteni u jedan niz znakova."
                 en="C. opening syllables of each family member’s name, woven into a single token."/>
            </div>

            <div style={{color:B, marginTop:10}}>SEE ALSO</div>
            <div style={{paddingLeft:14, color:'var(--ink-soft)'}}>
              pthread(3), <T hr="obitelj(7), pjesma(5)" en="family(7), song(5)"/>
            </div>
          </div>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginTop:14}}>
          <Note color="#dbe9d6" rotate={-1.5}>
            <div className="mn-shadow" style={{fontSize:16, color:B, lineHeight:1.2}}>
              <T hr={LYRICS.dugme.hr} en={LYRICS.dugme.en}/>
            </div>
            <div className="mn-elite" style={{fontSize:9, marginTop:6, color:'var(--ink-fade)'}}>— {LYRICS.dugme.attr}</div>
          </Note>
          <Note color="#e7e2c8" rotate={1.5}>
            <div className="mn-shadow" style={{fontSize:16, color:B, lineHeight:1.2}}>
              <T hr={LYRICS.jabuka.hr} en={LYRICS.jabuka.en}/>
            </div>
            <div className="mn-elite" style={{fontSize:9, marginTop:6, color:'var(--ink-fade)'}}>— {LYRICS.jabuka.attr}</div>
          </Note>
        </div>
      </section>

      {/* ── Pricing ─────────────────────────────────────── */}
      <section style={{padding:'34px 36px', borderTop:'1px solid var(--ink)'}}>
        <SectionHead num="05" hr="pricing.json" en="pricing.json" accent={B}/>

        <div className="mn-box-solid" style={{padding:18, background:'rgba(0,0,0,.02)'}}>
          <div className="mn-elite" style={{fontSize:13, lineHeight:1.7}}>
            <div>{'{'}</div>
            <div style={{paddingLeft:18}}>
              <span style={{color:B}}>"per_project"</span>: {'{'}<br/>
              <span style={{paddingLeft:18}}>
                <span style={{color:'var(--ink-fade)'}}>"summary":</span> "<T hr="fiksni opseg, fiksna cijena" en="fixed scope, fixed price"/>",<br/>
              </span>
              <span style={{paddingLeft:18}}>
                <span style={{color:'var(--ink-fade)'}}>"good_for":</span> ["<T hr="definirani sustavi" en="scoped systems"/>", "MVPs"]
              </span><br/>
              {'},'}
            </div>
            <div style={{paddingLeft:18}}>
              <span style={{color:B}}>"hourly"</span>: {'{'} <span style={{color:'var(--ink-fade)'}}>"summary":</span> "<T hr="tjedni log, transparentno" en="weekly log, transparent"/>" {'},'}
            </div>
            <div style={{paddingLeft:18}}>
              <span style={{color:B}}>"retainer"</span>: {'{'} <span style={{color:'var(--ink-fade)'}}>"summary":</span> "<T hr="stabilna nit · mjesečno" en="steady thread · monthly"/>" {'}'}
            </div>
            <div>{'}'}</div>
          </div>
        </div>
      </section>

      {/* ── Contact ─────────────────────────────────────── */}
      <section style={{padding:'34px 36px 60px', borderTop:'1px solid var(--ink)'}}>
        <SectionHead num="06" hr="./connect.sh" en="./connect.sh" accent={B}/>

        <div className="mn-box" style={{padding:18}}>
          <Prompt><T hr="echo $EMAIL" en="echo $EMAIL"/></Prompt>
          <div className="mn-caveat" style={{fontSize:30, color:B, margin:'6px 0 16px'}}>bok@maleniti.hr</div>

          <Prompt><T hr="cat ./form.sh" en="cat ./form.sh"/></Prompt>
          <div style={{marginTop:8, display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
            <div>
              <div className="mn-elite" style={{fontSize:10, color:'var(--ink-fade)'}}>--name=</div>
              <div style={{borderBottom:'1px solid var(--ink)', height:24}}/>
            </div>
            <div>
              <div className="mn-elite" style={{fontSize:10, color:'var(--ink-fade)'}}>--email=</div>
              <div style={{borderBottom:'1px solid var(--ink)', height:24}}/>
            </div>
          </div>
          <div className="mn-elite" style={{fontSize:10, color:'var(--ink-fade)', marginTop:10}}>--message=</div>
          <div style={{border:'1px solid var(--ink)', height:80, marginTop:4}}/>

          <div style={{display:'flex', gap:10, marginTop:14, alignItems:'center'}}>
            <SketchBtn primary accent={B} style={{borderRadius:4, fontFamily:'Special Elite', fontSize:13}}>
              ./send.sh
            </SketchBtn>
            <span className="mn-elite" style={{fontSize:10, color:'var(--ink-fade)'}}>
              # <T hr="odgovaram u 24h" en="reply within 24h"/>
            </span>
          </div>
        </div>

        <div className="mn-elite" style={{
          marginTop:30, paddingTop:14, borderTop:'1px solid var(--ink)',
          display:'flex', justifyContent:'space-between', fontSize:10, color:'var(--ink-fade)'
        }}>
          <span>$ uptime · © 2026 male_niti</span>
          <span>github · linkedin · rss</span>
        </div>
      </section>
    </div>
  );
}

window.VariantConsole = VariantConsole;
