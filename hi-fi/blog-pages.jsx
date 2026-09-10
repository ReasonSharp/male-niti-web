// Male Niti — standalone blog pages: index (blog.html) + post (blog-post.html)

// ── Blog index ──────────────────────────────────────────────────────────────
function BlogIndexPage() {
  const [lang, setLang] = useSiteLang();
  const t = (hr, en) => (lang === 'hr' ? hr : en);
  const [posts] = useApiList('/blog', DEFAULT_BLOG);
  const [tag, setTag] = React.useState(null);

  const tags = [];
  posts.forEach((p) => {
    const key = t(p.tag_hr, p.tag_en);
    if (!tags.includes(key)) tags.push(key);
  });
  const shown = tag ? posts.filter((p) => t(p.tag_hr, p.tag_en) === tag) : posts;
  const lead = shown.find((p) => p.featured) || shown[0];
  const rest = shown.filter((p) => p !== lead);
  const href = (p) => `blog-post.html?slug=${encodeURIComponent(p.slug)}`;

  return (
    <LangCtx.Provider value={lang}>
      <div className="page">
        <SiteHeader lang={lang} setLang={setLang} base="Male Niti.html" current="blog" />

        <div className="container">
          <div className="page-head">
            <div className="page-head__num">§ 06</div>
            <h1 className="page-head__title">
              <T hr={<>Bil<em>je</em>ške.</>} en={<>Field <em>notes</em>.</>} />
            </h1>
            <p className="page-head__kicker">
              <T hr="Što sam naučio, što me nervira i o čemu razmišljam. Bez rasporeda objave — pišem kad ima što reći."
                 en="What I’ve learned, what annoys me, and what I’m thinking about. No publishing schedule — I write when there is something to say." />
            </p>
            <div className="page-head__count">
              {posts.length} <T hr="zapisa" en="entries" />
            </div>
          </div>

          <div className="blog-filter">
            <span className="label"><T hr="filtriraj" en="filter" /></span>
            <div className="blog-filter__chips">
              <button className={`chip chip--btn ${tag === null ? 'is-on' : ''}`} onClick={() => setTag(null)}>
                <T hr="sve" en="all" />
              </button>
              {tags.map((x) => (
                <button key={x} className={`chip chip--btn ${tag === x ? 'is-on' : ''}`} onClick={() => setTag(x)}>{x}</button>
              ))}
            </div>
          </div>

          {lead && (
            <a className="blog-lead" href={href(lead)}>
              <div className="blog-lead__media">
                <Placeholder label={t('ilustracija članka', 'article illustration')} />
              </div>
              <div className="blog-lead__body">
                <div className="post__meta">
                  <span className={`post__tag--${lead.tone}`}>{t(lead.tag_hr, lead.tag_en)}</span>
                  <span className="post__date">{t(lead.date_hr, lead.date_en)}</span>
                </div>
                <h2 className="blog-lead__title">
                  <T hr={emWrap(lead.title_hr, lead.em_hr)} en={emWrap(lead.title_en, lead.em_en)} />
                </h2>
                <p className="lede blog-lead__lede">{t(lead.lede_hr || lead.excerpt_hr, lead.lede_en || lead.excerpt_en)}</p>
                <div className="blog-lead__foot">
                  <span className="post__read">{t(lead.read_hr, lead.read_en)}</span>
                  <span className="post__more"><T hr="pročitaj" en="read" /> <Arrow size={14}/></span>
                </div>
              </div>
            </a>
          )}

          {rest.length > 0 && (
            <div className="blog-rows">
              {rest.map((p, i) => (
                <a className="blog-row" key={p.slug || i} href={href(p)}>
                  <div className="blog-row__meta">
                    <span className={`post__tag--${p.tone}`}>{t(p.tag_hr, p.tag_en)}</span>
                    <span className="post__date">{t(p.date_hr, p.date_en)}</span>
                  </div>
                  <div className="blog-row__main">
                    <h3 className="blog-row__title">
                      <T hr={emWrap(p.title_hr, p.em_hr)} en={emWrap(p.title_en, p.em_en)} />
                    </h3>
                    <p className="blog-row__excerpt">{t(p.excerpt_hr, p.excerpt_en)}</p>
                  </div>
                  <div className="blog-row__aside">
                    <span className="post__read">{t(p.read_hr, p.read_en)}</span>
                    <span className="blog-row__arrow"><Arrow size={16}/></span>
                  </div>
                </a>
              ))}
            </div>
          )}

          <div className="blog-end">
            <p className="body-s">
              <T hr="Nema više zapisa — ovo je početak niti." en="No more entries — this is where the thread starts." />
            </p>
            <a className="btn" href="Male Niti.html#kontakt">
              <T hr="Povucimo nit" en="Let’s pull a thread" /><Arrow/>
            </a>
          </div>
        </div>

        <SiteFooter base="Male Niti.html" />
      </div>
    </LangCtx.Provider>
  );
}

// ── Blog post ───────────────────────────────────────────────────────────────
function BlogPostPage() {
  const [lang, setLang] = useSiteLang();
  const t = (hr, en) => (lang === 'hr' ? hr : en);
  const slug = useSlugParam('slug');
  const [posts] = useApiList('/blog', DEFAULT_BLOG);
  const fallback = posts.find((p) => p.slug === slug) || posts[0];
  const [post] = useApiItem(slug ? `/blog/${slug}` : null, fallback);

  React.useEffect(() => {
    if (post) document.title = `${t(post.title_hr, post.title_en)} · Male Niti`;
  }, [post, lang]);

  if (!post) {
    return (
      <div className="container" style={{ padding: '120px 0' }}>
        <p className="lede"><T hr="Zapis nije nađen." en="Entry not found." /></p>
        <a className="btn" href="blog.html"><T hr="Natrag na blog" en="Back to the blog" /></a>
      </div>
    );
  }

  const body = t(post.body_hr, post.body_en) || [];
  const idx = posts.findIndex((p) => p.slug === post.slug);
  const prev = idx > 0 ? posts[idx - 1] : null;
  const next = idx >= 0 && idx < posts.length - 1 ? posts[idx + 1] : null;

  return (
    <LangCtx.Provider value={lang}>
      <div className="page">
        <SiteHeader lang={lang} setLang={setLang} base="Male Niti.html" current="blog" />

        <article className="container">
          <a className="post-back" href="blog.html">
            <span className="post-back__arrow">←</span> <T hr="sve bilješke" en="all notes" />
          </a>

          <header className="post-head">
            <div className="post-head__meta">
              <span className={`post__tag--${post.tone}`}>{t(post.tag_hr, post.tag_en)}</span>
              <span className="post__date">{t(post.date_hr, post.date_en)}</span>
              <span className="post__read">{t(post.read_hr, post.read_en)}</span>
            </div>
            <h1 className="post-head__title">
              <T hr={emWrap(post.title_hr, post.em_hr)} en={emWrap(post.title_en, post.em_en)} />
            </h1>
            <p className="post-head__lede">{t(post.lede_hr || post.excerpt_hr, post.lede_en || post.excerpt_en)}</p>
          </header>

          <div className="post-hero">
            <Placeholder label={t('naslovna ilustracija · 16:9', 'header illustration · 16:9')} />
          </div>

          <div className="post-body">
            {body.map((b, i) => {
              if (b.type === 'h') return <h2 key={i} className="post-body__h">{b.text}</h2>;
              if (b.type === 'q') return (
                <blockquote key={i} className="post-body__q">{b.text}</blockquote>
              );
              const isFirst = i === 0;
              return (
                <p key={i} className={isFirst ? 'post-body__p post-body__p--first' : 'post-body__p'}>
                  {isFirst ? <><span className="post-body__drop">{b.text.charAt(0)}</span>{b.text.slice(1)}</> : b.text}
                </p>
              );
            })}
          </div>

          <div className="post-sign">
            <Monogram s={34} />
            <span className="label"><T hr="Male Niti · Zagreb" en="Male Niti · Zagreb" /></span>
          </div>

          <nav className="post-nav">
            <div className="post-nav__side">
              {prev && (
                <a href={`blog-post.html?slug=${encodeURIComponent(prev.slug)}`}>
                  <span className="label"><T hr="prethodno" en="previous" /></span>
                  <span className="post-nav__title">{t(prev.title_hr, prev.title_en)}</span>
                </a>
              )}
            </div>
            <div className="post-nav__side post-nav__side--right">
              {next && (
                <a href={`blog-post.html?slug=${encodeURIComponent(next.slug)}`}>
                  <span className="label"><T hr="sljedeće" en="next" /></span>
                  <span className="post-nav__title">{t(next.title_hr, next.title_en)}</span>
                </a>
              )}
            </div>
          </nav>

          <div className="post-cta">
            <h3 className="h-card"><T hr="Imate projekt koji treba isto ovakvu pažnju?" en="Have a project that needs this kind of care?" /></h3>
            <a className="btn btn--primary" href="Male Niti.html#kontakt">
              <T hr="Povucimo nit" en="Let’s pull a thread" /><Arrow/>
            </a>
          </div>
        </article>

        <SiteFooter base="Male Niti.html" />
      </div>
    </LangCtx.Provider>
  );
}

Object.assign(window, { BlogIndexPage, BlogPostPage });
