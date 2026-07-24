// Variant D — "Workshop" : playful / crafty
// Embroidery hoop hero. Patches, swatches, stitched borders. Teal accent.

function VariantWorkshop() {
  const t = useT();
  const W = 760;
  const D = 'var(--accent-d)';

  // Stitched dashed border style
  const stitch = {
    border:'1.5px solid var(--ink)',
    borderStyle:'dashed',
    background:'var(--paper)',
    borderRadius:14,
  };

  // Patch (rounded chip with stitched border)
  const Patch = ({ children, color = '#e6dec8', rotate = -2, style }) => (
    <span style={{
      display:'inline-block',
      padding:'6px 12px',
      background: color,
      border:'1.5px dashed var(--ink)',
      borderRadius:24,
      transform:`rotate(${rotate}deg)`,
      fontFamily:'Caveat',
      fontSize:18, fontWeight:700,
      ...style
    }}>{children}</span>
  );

  return (
    <div className="mn-paper" style={{ width: W, minHeight: 2900 }}>

      {/* ── Top bar ─────────────────────────────────────── */}
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between',
                   padding:'14px 30px', borderBottom:'2.5px dashed var(--ink)'}}>
        <Patch color="#cfe6e3" rotate={-3} style={{fontSize:20}}>
          🧵 male niti
        </Patch>
        <div className="mn-hand" style={{display:'flex', gap:14, fontSize:14}}>
          {['usluge','radionica','priča','suradnja','kontakt'].map((k,i)=>(
            <Patch key={k} color="#faf4e2" rotate={(i%2?-1:1)} style={{fontSize:14}}>{
              <T hr={k} en={['services','workshop','story','pricing','contact'][i]}/>
            }</Patch>
          ))}
        </div>
        <Patch color="#cfe6e3" rotate={3} style={{fontSize:14}}>HR · en</Patch>
      </div>

      {/* ── Hero — embroidery hoop ─────────────────────── */}
      <section style={{padding:'42px 30px 30px', position:'relative'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 360px', gap:24, alignItems:'center'}}>
          <div>
            <Patch color="#fbe0bf" rotate={-4} style={{fontSize:13, marginBottom:18}}>
              {t('mala radionica · velika obitelj', 'small workshop · big family')}
            </Patch>
            <h1 className="mn-caveat" style={{
              margin:'0 0 10px', fontSize:120, lineHeight:0.95, letterSpacing:'-0.01em',
              color:'var(--ink)'
            }}>
              Male<br/>Niti
              <span style={{
                display:'inline-block', width:18, height:18, marginLeft:4,
                borderRadius:'50%', background:D, border:'2px solid var(--ink)',
                verticalAlign:'super'
              }}/>
            </h1>
            <div className="mn-hand" style={{fontSize:20, maxWidth:380, lineHeight:1.3, color:'var(--ink)'}}>
              <T hr="Šivamo web aplikacije po mjeri."
                 en="We stitch bespoke web apps."/>
            </div>
            <div className="mn-hand" style={{fontSize:14, marginTop:8, maxWidth:380, color:'var(--ink-soft)'}}>
              <T hr="Nije fast fashion. Nije WordPress. Sve šavovi su naši."
                 en="Not fast fashion. Not WordPress. Every stitch is ours."/>
            </div>

            <div style={{display:'flex', gap:12, marginTop:22, flexWrap:'wrap'}}>
              <SketchBtn primary accent={D}><T hr="Naruči nit ↦" en="Order a thread ↦"/></SketchBtn>
              <SketchBtn accent="var(--ink)"><T hr="Vidi šavove" en="See the stitches"/></SketchBtn>
            </div>
          </div>

          {/* embroidery hoop */}
          <div style={{position:'relative'}}>
            <svg viewBox="0 0 360 360" style={{width:'100%', height:360}}>
              {/* outer hoop */}
              <circle cx="180" cy="180" r="160" fill="none" stroke="var(--ink)" strokeWidth="4"/>
              <circle cx="180" cy="180" r="155" fill="none" stroke="var(--ink)" strokeWidth="1" strokeDasharray="2 4"/>
              {/* fabric (hatched) */}
              <defs>
                <pattern id="fabric" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
                  <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(0,0,0,.07)" strokeWidth="1"/>
                </pattern>
                <clipPath id="hoop-clip"><circle cx="180" cy="180" r="158"/></clipPath>
              </defs>
              <circle cx="180" cy="180" r="158" fill="url(#fabric)"/>

              {/* hoop screw */}
              <rect x="172" y="14" width="16" height="22" rx="3" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5"/>
              <line x1="180" y1="14" x2="180" y2="36" stroke="var(--ink)" strokeWidth="1"/>

              {/* embroidered "MN" monogram + threads */}
              <g clipPath="url(#hoop-clip)">
                <Thread d="M70,250 Q120,180 180,200 Q240,220 290,140" color={D} delay={0.2} len={500} weight={2.5}/>
                <Thread d="M60,180 Q120,250 200,210 Q260,180 300,250" color="var(--ink)" delay={0.5} len={500} weight={1.8}/>
                <Thread d="M90,120 Q160,140 180,200 Q200,260 270,260" color={D} delay={0.8} len={500} weight={1.8}/>
                {/* M N monogram cross-stitched */}
                <g style={{fontFamily:'Caveat', fontWeight:700}}>
                  <text x="180" y="200" textAnchor="middle" fontSize="120" fill="var(--ink)">M</text>
                  <text x="180" y="200" textAnchor="middle" fontSize="120" fill="none" stroke={D} strokeWidth="1.2" strokeDasharray="3 3">M</text>
                </g>
                {/* knot dots */}
                <circle cx="90" cy="120" r="4" fill={D}/>
                <circle cx="270" cy="260" r="4" fill={D}/>
                <circle cx="300" cy="250" r="3" fill="var(--ink)"/>
              </g>
            </svg>
            <Note color="#fbe0bf" rotate={6} style={{position:'absolute', right:-8, bottom:8, fontSize:13}}>
              <T hr="ručno šivano · vaše veličine" en="hand-stitched · your size"/>
            </Note>
          </div>
        </div>
      </section>

      {/* ── Services (patches grid) ────────────────────── */}
      <section style={{padding:'30px 30px', borderTop:'2.5px dashed var(--ink)'}}>
        <SectionHead num="01" hr="Što šivamo." en="What we stitch." accent={D}/>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:18}}>
          {[
            { hr:'Frontend', en:'Frontend', color:'#cfe6e3', rot:-2,
              hr_b:'Sučelja koja su lijepa i razumna.', en_b:'Interfaces that are both pretty and sensible.',
              tags:['React','TS','SVG','motion','a11y'] },
            { hr:'Backend', en:'Backend', color:'#f3e7c9', rot:1.5,
              hr_b:'API-ji, baze, autentikacija, queue-ovi.', en_b:'APIs, databases, auth, queues.',
              tags:['Node','Python','Postgres','Redis'] },
            { hr:'Cijeli šav', en:'Whole seam', color:'#fbd9c0', rot:-1,
              hr_b:'Od uređaja do dashboarda, jedna nit.', en_b:'Device to dashboard, one thread.',
              tags:['IoT','MQTT','admin','models'] },
          ].map((s,i)=>(
            <div key={i} style={{...stitch, padding:'18px 16px', background:s.color, transform:`rotate(${s.rot}deg)`,
                                  boxShadow:'4px 4px 0 rgba(0,0,0,.1)'}}>
              {/* corner button */}
              <div style={{position:'absolute', top:8, right:8, width:14, height:14, borderRadius:'50%',
                           background:'var(--paper)', border:'1.5px solid var(--ink)'}}/>
              <div className="mn-caveat" style={{fontSize:34, lineHeight:1}}>
                <T hr={s.hr} en={s.en}/>
              </div>
              <div className="mn-hand" style={{fontSize:14, marginTop:6, lineHeight:1.3}}>
                <T hr={s.hr_b} en={s.en_b}/>
              </div>
              <div style={{display:'flex', flexWrap:'wrap', gap:6, marginTop:12}}>
                {s.tags.map(t => (
                  <span key={t} className="mn-elite" style={{
                    fontSize:10, padding:'2px 8px', background:'var(--paper)',
                    border:'1px dashed var(--ink)', borderRadius:20
                  }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mn-elite" style={{fontSize:11, marginTop:18, color:'var(--ink-soft)', textAlign:'center'}}>
          ¬ wordpress · ¬ wix · ¬ shopify · ¬ squarespace
        </div>
      </section>

      {/* ── Process — pattern sheet ────────────────────── */}
      <section style={{padding:'34px 30px', borderTop:'2.5px dashed var(--ink)'}}>
        <SectionHead num="02" hr="Šivaći obrazac." en="The pattern sheet." accent={D}/>

        <div style={{...stitch, padding:'22px 22px', background:'var(--paper)'}}>
          <svg style={{position:'absolute', inset:18, width:'calc(100% - 36px)', height:'calc(100% - 36px)',
                       pointerEvents:'none', opacity:.4}}>
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M20,0 L0,0 L0,20" fill="none" stroke="var(--ink)" strokeWidth="0.4"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)"/>
          </svg>

          <div style={{position:'relative', display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:14}}>
            {[
              { n:1, hr:'razgovor', en:'talk', body_hr:'pitanja, granice, brige', body_en:'questions, scope, worries' },
              { n:2, hr:'kroj',     en:'cut',  body_hr:'lo-fi prototip + procjena', body_en:'lo-fi prototype + estimate' },
              { n:3, hr:'šav',      en:'stitch', body_hr:'iteracije, tjedne demonstracije', body_en:'iteration, weekly demos' },
              { n:4, hr:'predaja',  en:'fitting', body_hr:'kod, docs, runbook · njega po želji', body_en:'code, docs, runbook · care optional' },
            ].map((s,i,arr)=>(
              <div key={i} style={{position:'relative', textAlign:'center'}}>
                <div style={{width:56, height:56, margin:'0 auto', borderRadius:'50%',
                              background:'var(--paper)', border:`2px dashed ${D}`,
                              display:'flex', alignItems:'center', justifyContent:'center',
                              fontFamily:'Caveat', fontWeight:700, fontSize:36, color:D}}>
                  {s.n}
                </div>
                {i < arr.length-1 && (
                  <svg width="40" height="20" style={{position:'absolute', right:-30, top:18, overflow:'visible'}}>
                    <path d="M0,10 Q20,0 40,10" stroke={D} strokeWidth="1.6" fill="none" strokeDasharray="3 3"/>
                  </svg>
                )}
                <div className="mn-caveat" style={{fontSize:26, marginTop:8, lineHeight:1}}>
                  <T hr={s.hr} en={s.en}/>
                </div>
                <div className="mn-hand" style={{fontSize:12, marginTop:4, color:'var(--ink-soft)', lineHeight:1.3}}>
                  <T hr={s.body_hr} en={s.body_en}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Work — pin board ───────────────────────────── */}
      <section style={{padding:'30px 30px', borderTop:'2.5px dashed var(--ink)'}}>
        <SectionHead num="03" hr="Na zidu radionice." en="On the workshop wall." accent={D}/>

        <div style={{position:'relative', height:360, ...stitch, padding:18, background:'var(--paper)'}}>
          {/* Pinned IoT card */}
          <div style={{position:'absolute', left:24, top:18, width:340, transform:'rotate(-2deg)',
                        background:'#fbe0bf', border:'1.5px solid var(--ink)', borderRadius:8, padding:14,
                        boxShadow:'4px 4px 0 rgba(0,0,0,.12)'}}>
            <div style={{width:10, height:10, borderRadius:'50%', background:D, border:'1.5px solid var(--ink)',
                          position:'absolute', top:-5, left:'50%', marginLeft:-5}}/>
            <Patch color="var(--paper)" rotate={-1} style={{fontSize:11, marginBottom:8}}>
              {t('U TIJEKU · IoT', 'IN PROGRESS · IoT')}
            </Patch>
            <div className="mn-caveat" style={{fontSize:26, lineHeight:1}}>
              <T hr="Poljoprivredna analitika" en="Agricultural analytics"/>
            </div>
            <div className="mn-hand" style={{fontSize:13, marginTop:6, lineHeight:1.3}}>
              <T hr="Uređaji, senzori, prognoze, view-ovi — i admin koji veže sve zajedno."
                 en="Devices, sensors, forecasts, views — and an admin that ties it all together."/>
            </div>
            <div style={{display:'flex', flexWrap:'wrap', gap:4, marginTop:10}}>
              {['MQTT','Postgres','Timescale','FastAPI','React'].map(x=>(
                <span key={x} className="mn-elite" style={{fontSize:9, padding:'1px 6px',
                  background:'var(--paper)', border:'1px dashed var(--ink)', borderRadius:12}}>{x}</span>
              ))}
            </div>
          </div>

          {/* Sketch swatches */}
          <div style={{position:'absolute', right:24, top:24, width:200, transform:'rotate(3deg)'}}>
            <Slot label={t('skica dashboarda', 'dashboard sketch')} h={120} style={{background:'var(--paper)'}}/>
            <div style={{width:10, height:10, borderRadius:'50%', background:'var(--ink)', border:'1.5px solid var(--paper)',
                          position:'absolute', top:-5, left:'50%', marginLeft:-5, boxShadow:'0 0 0 1.5px var(--ink)'}}/>
          </div>

          {/* Note: future work */}
          <Note color="#fff" rotate={-4} style={{position:'absolute', right:38, bottom:24, width:200}}>
            <div className="mn-caveat" style={{fontSize:22, color:D, lineHeight:1}}>
              {t('vaš projekt ovdje', 'your project here')}
            </div>
            <div className="mn-hand" style={{fontSize:12, marginTop:4, color:'var(--ink-soft)'}}>
              <T hr="dva mjesta otvorena u Q3" en="two slots open in Q3"/>
            </div>
          </Note>

          {/* Sample thread piece */}
          <svg style={{position:'absolute', left:50, bottom:30, width:200, height:60, overflow:'visible'}}>
            <Thread d="M10,40 C50,5 100,55 190,15" color={D} delay={0.3} len={350} weight={2}/>
            <text x="0" y="58" className="mn-elite" style={{fontSize:10, fill:'var(--ink-fade)'}}>
              uzorak konca · sample
            </text>
          </svg>
        </div>
      </section>

      {/* ── Name story (label patches) ─────────────────── */}
      <section style={{padding:'34px 30px', borderTop:'2.5px dashed var(--ink)'}}>
        <SectionHead num="04" hr="Etiketa." en="The label." accent={D}/>

        <div style={{...stitch, padding:24, background:'#fbf6e8'}}>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:18}}>
            {[
              { tag: t('značenje · 01', 'meaning · 01'),
                title_hr:'niti = dretve', title_en:'threads = software threads',
                body_hr:'paralelne, povezane kad treba, slobodne kad mogu.',
                body_en:'parallel, joined when needed, free when they can be.' },
              { tag: t('značenje · 02', 'meaning · 02'),
                title_hr:'niti iz pjesama', title_en:'threads from songs',
                body_hr:'Dugme: ‘…čovjek sebe veže…’ · Jabuka: ‘…tanka nit, čini snove…’',
                body_en:'Dugme: ‘…ties themselves…’ · Jabuka: ‘…thin thread, makes dreams…’' },
              { tag: t('značenje · 03', 'meaning · 03'),
                title_hr:'niti = obitelj', title_en:'threads = family',
                body_hr:'slogovi imena nas u obitelji, spleteni u jedno.',
                body_en:'opening syllables of our family’s names, braided into one.' },
            ].map((m,i)=>(
              <div key={i} style={{
                background:'var(--paper)', border:'1.5px dashed var(--ink)', borderRadius:10,
                padding:14, position:'relative',
                transform:`rotate(${i===1?0.5:(i===0?-1:1)}deg)`
              }}>
                {/* eyelet hole */}
                <div style={{position:'absolute', top:-7, left:'50%', marginLeft:-7,
                              width:14, height:14, borderRadius:'50%',
                              background:'#e9e4d8', border:'1.5px solid var(--ink)'}}/>
                <div className="mn-elite" style={{fontSize:10, color:D, marginTop:4, textTransform:'uppercase'}}>
                  {m.tag}
                </div>
                <div className="mn-caveat" style={{fontSize:26, lineHeight:1.05, margin:'4px 0 6px'}}>
                  <T hr={m.title_hr} en={m.title_en}/>
                </div>
                <div className="mn-hand" style={{fontSize:13, lineHeight:1.4, color:'var(--ink-soft)'}}>
                  <T hr={m.body_hr} en={m.body_en}/>
                </div>
              </div>
            ))}
          </div>

          <div style={{display:'flex', justifyContent:'center', marginTop:18}}>
            <Patch color="#cfe6e3" rotate={-2} style={{fontSize:18, padding:'10px 18px'}}>
              <T hr="male niti, koje sami biramo i pletemo"
                 en="small threads, chosen and woven by us"/>
            </Patch>
          </div>
        </div>
      </section>

      {/* ── Pricing — fabric swatches ──────────────────── */}
      <section style={{padding:'34px 30px', borderTop:'2.5px dashed var(--ink)'}}>
        <SectionHead num="05" hr="Suradnja." en="How we work." accent={D}/>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:14}}>
          {[
            { hr:'Komad', en:'By piece', sub_hr:'fiksni opseg, fiksna cijena', sub_en:'fixed scope, fixed price',
              swatch:'#cfe6e3' },
            { hr:'Po metru', en:'By the metre', sub_hr:'po satu, tjedno log', sub_en:'hourly, weekly log',
              swatch:'#fbe0bf' },
            { hr:'Pretplata', en:'Subscription', sub_hr:'stabilna nit · mjesečno', sub_en:'a steady thread · monthly',
              swatch:'#f6dada' },
          ].map((p,i)=>(
            <div key={i} style={{...stitch, padding:0, overflow:'hidden', transform:`rotate(${i===1?-0.5:(i===0?0.5:-1)}deg)`}}>
              <div style={{background: p.swatch, height:60, borderBottom:'1.5px dashed var(--ink)',
                            display:'flex', alignItems:'center', justifyContent:'center'}}>
                <svg width="100" height="40" viewBox="0 0 100 40">
                  {[10,25,40,55,70,85].map((x,j)=>(
                    <path key={j} d={`M${x},4 Q${x-4},20 ${x},36`} stroke="var(--ink)" strokeWidth="1.2" fill="none"/>
                  ))}
                </svg>
              </div>
              <div style={{padding:'14px 16px'}}>
                <div className="mn-caveat" style={{fontSize:30, lineHeight:1}}><T hr={p.hr} en={p.en}/></div>
                <div className="mn-hand" style={{fontSize:14, marginTop:6}}><T hr={p.sub_hr} en={p.sub_en}/></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact — order ticket ─────────────────────── */}
      <section style={{padding:'34px 30px 50px', borderTop:'2.5px dashed var(--ink)'}}>
        <SectionHead num="06" hr="Naruči nit." en="Order a thread." accent={D}/>

        <div style={{...stitch, padding:22, background:'#fbf6e8', position:'relative'}}>
          {/* perforated edge top */}
          <div style={{position:'absolute', top:8, left:0, right:0, height:6,
                        backgroundImage:'radial-gradient(circle, var(--paper) 2px, transparent 2.5px)',
                        backgroundSize:'14px 14px'}}/>

          <Patch color="var(--paper)" rotate={-2} style={{fontSize:16, padding:'6px 14px', marginBottom:12}}>
            {t('ORDER TICKET · 0001', 'ORDER TICKET · 0001')}
          </Patch>

          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
            <div>
              <div className="mn-hand" style={{fontSize:13, color:'var(--ink-fade)'}}>{t('IME', 'NAME')}</div>
              <div style={{borderBottom:'1.5px dashed var(--ink)', height:28}}/>
            </div>
            <div>
              <div className="mn-hand" style={{fontSize:13, color:'var(--ink-fade)'}}>{t('EMAIL', 'EMAIL')}</div>
              <div style={{borderBottom:'1.5px dashed var(--ink)', height:28}}/>
            </div>
          </div>

          <div className="mn-hand" style={{fontSize:13, color:'var(--ink-fade)', marginTop:14}}>{t('TIP NITI', 'THREAD TYPE')}</div>
          <div style={{display:'flex', gap:8, marginTop:6, flexWrap:'wrap'}}>
            {[
              t('frontend','frontend'), t('backend','backend'),
              t('cijeli sustav','whole system'), t('održavanje','maintenance')
            ].map(x => (
              <span key={x} style={{
                padding:'4px 12px', border:'1.5px dashed var(--ink)',
                borderRadius:20, fontFamily:'Caveat', fontWeight:700, fontSize:16,
                background:'var(--paper)'
              }}>☐ {x}</span>
            ))}
          </div>

          <div className="mn-hand" style={{fontSize:13, color:'var(--ink-fade)', marginTop:14}}>
            {t('ŠTO BISMO ŠILI?', 'WHAT WOULD WE STITCH?')}
          </div>
          <div style={{border:'1.5px dashed var(--ink)', height:90, marginTop:4, borderRadius:8, background:'var(--paper)'}}/>

          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:18}}>
            <span className="mn-hand" style={{fontSize:13, color:'var(--ink-soft)'}}>
              <T hr="ili pošaljite golub:" en="or send a pigeon:"/> <span style={{color:D, fontWeight:700}}>bok@maleniti.hr</span>
            </span>
            <SketchBtn primary accent={D}>
              <T hr="Pošalji narudžbu ↦" en="Send the ticket ↦"/>
            </SketchBtn>
          </div>
        </div>

        <div className="mn-elite" style={{
          marginTop:30, paddingTop:14, borderTop:'2.5px dashed var(--ink)',
          display:'flex', justifyContent:'space-between', fontSize:10, color:'var(--ink-fade)'
        }}>
          <span>© 2026 · male niti · workshop edition</span>
          <span>{t('isplela jedna obitelj', 'woven by a family')}</span>
        </div>
      </section>
    </div>
  );
}

window.VariantWorkshop = VariantWorkshop;
