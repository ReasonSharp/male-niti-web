// Male Niti — hi-fi entry
// Content is API-backed (see hi-fi/content.jsx + api-spec.yaml) with static fallback.

const HIFI_DEFAULTS = /*EDITMODE-BEGIN*/{
  "lang": "hr",
  "motion": true
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = useTweaks(HIFI_DEFAULTS);

  React.useEffect(() => {
    document.body.classList.toggle('no-motion', !tweaks.motion);
  }, [tweaks.motion]);

  React.useEffect(() => {
    document.documentElement.lang = tweaks.lang;
  }, [tweaks.lang]);

  const setLang = (v) => setTweak('lang', v);

  return (
    <LangCtx.Provider value={tweaks.lang}>
      <div className="page">
        <SiteHeader lang={tweaks.lang} setLang={setLang} />
        <Hero />
        <Services />
        <Process />
        <Work />
        <About />
        <Pricing />
        <Blog />
        <Contact />
        <SiteFooter />
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection label={tweaks.lang === 'hr' ? 'Jezik' : 'Language'}>
          <TweakRadio
            label="HR / EN"
            value={tweaks.lang}
            onChange={(v) => setTweak('lang', v)}
            options={[
              { value: 'hr', label: 'Hrvatski' },
              { value: 'en', label: 'English' },
            ]}
          />
        </TweakSection>
        <TweakSection label={tweaks.lang === 'hr' ? 'Niti' : 'Threads'}>
          <TweakToggle
            label={tweaks.lang === 'hr' ? 'Animirane niti' : 'Animated threads'}
            value={tweaks.motion}
            onChange={(v) => setTweak('motion', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </LangCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
