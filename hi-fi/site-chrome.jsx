// Male Niti — shared site chrome (header + footer), used by the landing page
// and by the standalone blog pages.
//
// `base` prefixes the landing page's in-page anchors so the same nav works
// from a sub-page: '' on the landing page, 'index.html' from /blog pages.

const SITE_LANG_KEY = 'maleniti:lang';

// localStorage-backed language for pages that have no tweaks panel.
function useSiteLang() {
  const [lang, setLang] = React.useState(() => {
    try { return localStorage.getItem(SITE_LANG_KEY) || 'hr'; } catch (e) { return 'hr'; }
  });
  React.useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem(SITE_LANG_KEY, lang); } catch (e) {}
  }, [lang]);
  return [lang, setLang];
}

function SiteHeader({ lang, setLang, base = '', current = '' }) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: `${base}#usluge`,   hr: 'usluge',   en: 'services', key: 'usluge' },
    { href: `${base}#proces`,   hr: 'proces',   en: 'process',  key: 'proces' },
    { href: `${base}#radovi`,   hr: 'radovi',   en: 'work',     key: 'radovi' },
    { href: `${base}#zasto`,    hr: 'o meni',   en: 'about',    key: 'zasto' },
    { href: 'blog.html',        hr: 'blog',     en: 'blog',     key: 'blog' },
    { href: `${base}#kontakt`,  hr: 'kontakt',  en: 'contact',  key: 'kontakt' },
  ];

  const handleNavClick = (e, href) => smoothScrollToHash(e, href, base);
  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container">
        <nav className="nav">
          <a href={base || '#'} className="nav__brand" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Monogram s={42} />
            <div className="flex-col">
              <span className="nav__brand-name">Male Niti</span>
              <span className="nav__brand-tag"><T hr="male web stranice · male aplikacije" en="small sites · small apps" /></span>
            </div>
          </a>

          <div className="nav__links">
            {links.map((l) => (
              <a key={l.key} href={l.href} className={current === l.key ? 'is-current' : ''} onClick={(e) => handleNavClick(e, l.href)}>
                <T hr={l.hr} en={l.en} />
              </a>
            ))}
          </div>

          <div className="nav__lang">
            <button className={lang === 'hr' ? 'active' : ''} onClick={() => setLang('hr')}>HR</button>
            <span className="sep">·</span>
            <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
          </div>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter({ base = '' }) {
  return (
    <footer className="container">
      <div className="footer">
        <div className="footer__brand">
          <Monogram s={28} />
          <span>© 2026 · Male Niti</span>
        </div>
        <div className="footer__links">
          <a href="blog.html"><T hr="blog" en="blog" /></a>
          <a href={`${base}#kontakt`}><T hr="kontakt" en="contact" /></a>
          <a href="impressum.html"><T hr="impressum" en="imprint" /></a>
          <a href="privatnost.html"><T hr="privatnost" en="privacy" /></a>
          <a href="api/feed.xml">RSS</a>
        </div>
        <div><T hr="izrađeno s pažnjom — i s nekoliko niti" en="made with care — and a few threads" /></div>
      </div>
    </footer>
  );
}

Object.assign(window, { SITE_LANG_KEY, useSiteLang, SiteHeader, SiteFooter });
