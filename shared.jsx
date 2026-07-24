// Shared primitives + bilingual copy for Male Niti wireframes

const LangCtx = React.createContext('hr');

function T({ hr, en }) {
  const lang = React.useContext(LangCtx);
  return <>{lang === 'hr' ? hr : en}</>;
}

function useT() {
  const lang = React.useContext(LangCtx);
  return (hr, en) => lang === 'hr' ? hr : en;
}

// Section heading with sketchy underline
function SectionHead({ num, hr, en, accent = 'var(--ink)' }) {
  return (
    <div style={{display:'flex', alignItems:'baseline', gap:14, marginBottom:18}}>
      <span className="mn-elite" style={{color:'var(--ink-fade)', fontSize:12}}>§ {num}</span>
      <h2 className="mn-caveat" style={{
        margin:0, fontSize:44, color:'var(--ink)',
      }}>
        <T hr={hr} en={en}/>
      </h2>
      <svg width="80" height="14" style={{flexShrink:0}}>
        <path d="M2,10 Q20,2 40,8 T78,7" stroke={accent} strokeWidth="2" fill="none" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

// Placeholder block — labeled wireframe rectangle
function Slot({ label, h = 120, w, hatch = true, style, children }) {
  return (
    <div className={hatch ? 'mn-hatch' : ''} style={{
      border:'1.5px solid var(--ink)',
      width: w, height: h,
      position:'relative',
      display:'flex', alignItems:'center', justifyContent:'center',
      padding:10, boxSizing:'border-box',
      ...style
    }}>
      <svg style={{position:'absolute', inset:0, width:'100%', height:'100%', opacity:.35}} preserveAspectRatio="none">
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="var(--ink)" strokeWidth="0.7" strokeDasharray="3 4"/>
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="var(--ink)" strokeWidth="0.7" strokeDasharray="3 4"/>
      </svg>
      {children || (
        <span className="mn-elite" style={{
          position:'relative', background:'var(--paper)', padding:'2px 8px',
          fontSize:11, color:'var(--ink-soft)', textAlign:'center',
        }}>{label}</span>
      )}
    </div>
  );
}

// Animated thread along an SVG path
function Thread({ d, color = 'var(--ink)', delay = 0, dur = 5, weight = 1.4, len = 1500, style }) {
  return (
    <path
      d={d}
      stroke={color}
      strokeWidth={weight}
      fill="none"
      strokeLinecap="round"
      className="mn-thread"
      style={{
        '--mn-len': len,
        '--mn-delay': `${delay}s`,
        '--mn-dur': `${dur}s`,
        ...style
      }}
    />
  );
}

// Sketchy button
function SketchBtn({ children, primary, accent = 'var(--ink)', style, onClick }) {
  return (
    <button onClick={onClick} className="mn-hand" style={{
      border:`1.8px solid ${accent}`,
      background: primary ? accent : 'transparent',
      color: primary ? 'var(--paper)' : accent,
      padding:'10px 22px',
      fontSize:18,
      fontFamily:'Architects Daughter',
      cursor:'pointer',
      borderRadius:30,
      transform:'rotate(-0.6deg)',
      boxShadow: primary ? '3px 3px 0 rgba(0,0,0,.15)' : 'none',
      ...style
    }}>{children}</button>
  );
}

// Sketchy underline svg
function Squiggle({ w = 120, color = 'var(--ink)', style }) {
  return (
    <svg width={w} height="10" style={style}>
      <path d={`M2,6 Q${w*0.2},1 ${w*0.4},6 T${w*0.8},6 T${w-2},5`} stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

// Arrow scribble
function ScribbleArrow({ w = 60, h = 24, style, color = 'var(--ink)' }) {
  return (
    <svg width={w} height={h} style={style}>
      <path d={`M2,${h/2} Q${w*0.5},${h*0.1} ${w-6},${h/2}`} stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d={`M${w-12},${h/2-5} L${w-4},${h/2} L${w-12},${h/2+5}`} stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Sticky "post-it" annotation
function Note({ children, color = '#f5e9a1', rotate = -2, style }) {
  return (
    <div className="mn-hand" style={{
      background: color,
      padding:'8px 12px',
      fontSize: 13,
      transform: `rotate(${rotate}deg)`,
      boxShadow: '2px 3px 0 rgba(0,0,0,.12)',
      maxWidth: 180,
      lineHeight: 1.25,
      ...style
    }}>{children}</div>
  );
}

// Common bilingual fragments
const COPY = {
  nav: {
    services: { hr: 'Usluge', en: 'Services' },
    process: { hr: 'Proces', en: 'Process' },
    work: { hr: 'Radovi', en: 'Work' },
    about: { hr: 'O meni', en: 'About' },
    pricing: { hr: 'Suradnja', en: 'Pricing' },
    contact: { hr: 'Kontakt', en: 'Contact' },
  },
};

// Lyric attributions kept brief / referential (under fair use)
const LYRICS = {
  dugme: {
    hr: '“…kojom čovjek sebe veže kada bira neki put.”',
    en: '“…with which a person ties themself when choosing a path.”',
    attr: 'Bijelo Dugme · Ima neka tajna veza',
  },
  jabuka: {
    hr: '“…neka tanka nit, koja čini naše snove.”',
    en: '“…some thin thread, that makes our dreams.”',
    attr: 'Crvena Jabuka · Ima nešto od srca do srca',
  },
};

Object.assign(window, {
  LangCtx, T, useT, SectionHead, Slot, Thread, SketchBtn, Squiggle, ScribbleArrow, Note, COPY, LYRICS,
});
