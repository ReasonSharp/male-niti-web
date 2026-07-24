// Male Niti — hi-fi shared components

const LangCtx = React.createContext('hr');
const useLang = () => React.useContext(LangCtx);
function T({ hr, en }) {
  const lang = useLang();
  return <>{lang === 'hr' ? hr : en}</>;
}
const useT = () => {
  const lang = useLang();
  return (hr, en) => (lang === 'hr' ? hr : en);
};

// ─── Monogram (image-based hi-fi version) ────────────────────────────────────
// Renders the provided wispy, hand-drawn M+N artwork as a raster image with
// a transparent background. Sized by HEIGHT (`s`) — width auto-scales with
// the image's natural ratio (~1.83:1). Accepts `s="100%"` for fluid layouts.
// The previous SVG props (indigo / green / ink / stroke / ornament) are
// accepted but ignored so existing call sites stay intact.
function Monogram({ s = 72, indigo, green, ink, stroke, ornament, className = '', style }) {
  const isPct = typeof s === 'string' && s.endsWith('%');
  const sizeStyle = isPct
    ? { width: s, height: 'auto', maxWidth: '100%' }
    : { height: s, width: 'auto' };
  return (
    <img
      src="hi-fi/monogram.png"
      alt="Male Niti"
      className={`monogram ${className}`}
      style={{ display: 'block', ...sizeStyle, ...style }}
    />
  );
}

// ─── Thread (animated draw-on SVG path) ──────────────────────────────────────
function Thread({ d, color = 'var(--indigo)', delay = 0, dur = 3, weight = 1, opacity = 0.5, dash = '', len = 1400, style }) {
  return (
    <path d={d}
          stroke={color} strokeWidth={weight} fill="none" strokeLinecap="round"
          opacity={opacity}
          strokeDasharray={dash || undefined}
          className={dash ? '' : 'thread'}
          style={{ '--len': len, '--delay': `${delay}s`, '--dur': `${dur}s`, ...style }} />
  );
}

// Bilingual placeholder block with a small monospace label in the corner.
function Placeholder({ label, className = '', style }) {
  return (
    <div className={`ph ${className}`} style={style}>
      <span className="ph__label">{label}</span>
    </div>
  );
}

// Stylized arrow glyph used in CTAs and links
function Arrow({ size = 18, color = 'currentColor' }) {
  return (
    <svg className="arrow" width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14M13 5l7 7-7 7" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Section heading: number + title (with italic accent word) + kicker
function SectionHead({ num, hr, en, em_hr, em_en, kicker_hr, kicker_en }) {
  const renderTitle = (full, em) => {
    if (!em) return full;
    const i = full.toLowerCase().indexOf(em.toLowerCase());
    if (i < 0) return full;
    return <>
      {full.slice(0, i)}
      <em>{full.slice(i, i + em.length)}</em>
      {full.slice(i + em.length)}
    </>;
  };
  return (
    <div className="sec-head">
      <div className="sec-head__num">§ {num}</div>
      <h2 className="sec-head__title">
        <T hr={renderTitle(hr, em_hr)} en={renderTitle(en, em_en)} />
      </h2>
      <div className="sec-head__kicker">
        <T hr={kicker_hr} en={kicker_en} />
      </div>
    </div>
  );
}

// ─── Lyric attributions kept brief / referential (under fair use) ───────────
const LYRICS = {
  dugme: {
    hr: '…kojom čovjek sebe veže kada bira neki put.',
    en: '…with which a person ties themself when choosing a path.',
    attr_hr: 'Bijelo Dugme · Ima neka tajna veza',
    attr_en: 'Bijelo Dugme · There is some secret tie',
  },
  jabuka: {
    hr: '…neka tanka nit, koja čini naše snove.',
    en: '…some thin thread, that makes our dreams.',
    attr_hr: 'Crvena Jabuka · Ima nešto od srca do srca',
    attr_en: 'Crvena Jabuka · There is something heart to heart',
  },
};

Object.assign(window, {
  LangCtx, useLang, T, useT,
  Monogram, Thread, Placeholder, Arrow, SectionHead,
  LYRICS,
});
