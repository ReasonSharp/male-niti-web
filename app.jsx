// App — Design Canvas + bilingual + Tweaks

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "lang": "hr",
  "motion": true,
  "showNotes": true
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Disable thread draw/sway animations by toggling a body class
  React.useEffect(() => {
    document.body.classList.toggle('mn-no-motion', !tweaks.motion);
  }, [tweaks.motion]);

  return (
    <LangCtx.Provider value={tweaks.lang}>
      <DesignCanvas>
        <DCSection
          id="male-niti"
          title={tweaks.lang === 'hr' ? "Male Niti — pravci za web" : "Male Niti — directions for the site"}
          subtitle={tweaks.lang === 'hr'
            ? "A v2 je dorađena verzija po novim bilješkama."
            : "A v2 is the refined direction per the new notes."}>

          <DCArtboard id="stitched-v2" label="A v2 · Stitched — refined (indigo+green, MN monogram, blog)" width={760} height={3300}>
            <VariantStitchedV2 />
          </DCArtboard>
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection label={tweaks.lang === 'hr' ? "Jezik" : "Language"}>
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

        <TweakSection label={tweaks.lang === 'hr' ? "Niti" : "Threads"}>
          <TweakToggle
            label={tweaks.lang === 'hr' ? "Animirane niti" : "Animated threads"}
            value={tweaks.motion}
            onChange={(v) => setTweak('motion', v)}
          />
        </TweakSection>

        <TweakSection label={tweaks.lang === 'hr' ? "Savjet" : "Tip"}>
          <div style={{fontSize:12, color:'#666', lineHeight:1.4, padding:'4px 0'}}>
            {tweaks.lang === 'hr'
              ? "Klikni bilo koju skicu za fokus — strelice ←/→ mijenjaju pravce, Esc zatvara."
              : "Click any sketch to focus — ←/→ switch directions, Esc closes."}
          </div>
        </TweakSection>
      </TweaksPanel>
    </LangCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
