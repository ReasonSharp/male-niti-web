// Male Niti — standalone legal pages: imprint (impressum.html) + privacy (privatnost.html)
//
// Imprint fields are fetched from the API (see DEFAULT_IMPRINT in
// hi-fi/content.jsx + the /imprint schema in api-spec.yaml). Any value still
// wrapped in <Fill> is a bracketed placeholder the owner hasn't supplied yet
// — wrapped so it's visually obvious and impossible to ship by accident.

function Fill({ hr, en }) {
  const lang = useLang();
  return <span className="legal-fill">{lang === 'hr' ? hr : en}</span>;
}

function LegalPage({ num, title_hr, title_en, em_hr, em_en, kicker_hr, kicker_en, updated_hr, updated_en, children }) {
  const [lang, setLang] = useSiteLang();
  return (
    <LangCtx.Provider value={lang}>
      <div className="page">
        <SiteHeader lang={lang} setLang={setLang} base="Male Niti.html" />
        <article className="container">
          <div className="legal-head">
            <div className="legal-head__num">§ {num}</div>
            <h1 className="legal-head__title">
              <T hr={emWrap(title_hr, em_hr)} en={emWrap(title_en, em_en)} />
            </h1>
            <p className="legal-head__kicker"><T hr={kicker_hr} en={kicker_en} /></p>
            <div className="legal-head__updated">
              <T hr="ažurirano" en="updated" /> · <T hr={updated_hr} en={updated_en} />
            </div>
          </div>
          <div className="legal-body">{children}</div>
          <div className="legal-foot">
            <span className="body-s"><T hr="Nešto nejasno? Pitajte — odgovaram." en="Something unclear? Ask — I answer." /></span>
            <a className="btn" href="Male Niti.html#kontakt"><T hr="Kontakt" en="Contact" /><Arrow/></a>
          </div>
        </article>
        <SiteFooter base="Male Niti.html" />
      </div>
    </LangCtx.Provider>
  );
}

function LegalSection({ n, hr, en, children }) {
  return (
    <section className="legal-sec">
      <h2 className="legal-sec__title"><span className="legal-sec__n">{n}</span><T hr={hr} en={en} /></h2>
      {children}
    </section>
  );
}

function P({ hr, en }) { return <p className="legal-p"><T hr={hr} en={en} /></p>; }

function Rows({ rows }) {
  return (
    <dl className="legal-rows">
      {rows.map((r, i) => (
        <React.Fragment key={i}>
          <dt><T hr={r.k_hr} en={r.k_en} /></dt>
          <dd>{r.v}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}

// ── Imprint ─────────────────────────────────────────────────────────────────
function ImprintPage() {
  const [imprint] = useApiItem('/imprint', DEFAULT_IMPRINT);
  return (
    <LegalPage
      num="A" title_hr="Impressum." title_en="Imprint." em_hr="Impressum" em_en="Imprint"
      kicker_hr="Podaci o pružatelju usluga, kako to nalaže Zakon o elektroničkoj trgovini i Zakon o trgovini."
      kicker_en="Service provider details, as required by Croatian e-commerce and trade law."
      updated_hr="10. IX. 2026." updated_en="Sep 10, 2026">

      <LegalSection n="A1" hr="Pružatelj usluga" en="Service provider">
        <Rows rows={[
          { k_hr: 'Naziv', k_en: 'Name', v: <Fill hr={imprint.legal_name} en={imprint.legal_name} /> },
          { k_hr: 'Pravni oblik', k_en: 'Legal form', v: <Fill hr={imprint.legal_form_hr} en={imprint.legal_form_en} /> },
          { k_hr: 'Vlasnik / odgovorna osoba', k_en: 'Owner / responsible person', v: <Fill hr={imprint.owner_name} en={imprint.owner_name} /> },
          { k_hr: 'Sjedište', k_en: 'Registered address', v: <Fill hr={imprint.address} en={imprint.address} /> },
          { k_hr: 'OIB', k_en: 'OIB (tax number)', v: <Fill hr={imprint.oib} en={imprint.oib} /> },
          { k_hr: 'MBS / matični broj', k_en: 'Registration number', v: <Fill hr={imprint.registration_number} en={imprint.registration_number} /> },
          { k_hr: 'Registar', k_en: 'Register', v: <Fill hr={imprint.register_hr} en={imprint.register_en} /> },
          { k_hr: 'PDV', k_en: 'VAT', v: <Fill hr={imprint.vat_status_hr} en={imprint.vat_status_en} /> },
        ]}/>
      </LegalSection>

      <LegalSection n="A2" hr="Kontakt" en="Contact">
        <Rows rows={[
          { k_hr: 'E-mail', k_en: 'Email', v: <a href="Male Niti.html#kontakt"><T hr="putem obrasca za kontakt" en="via the contact form"/></a> },
          { k_hr: 'Telefon', k_en: 'Phone', v: <Fill hr={imprint.phone} en={imprint.phone} /> },
          { k_hr: 'Web', k_en: 'Web', v: <a href="https://maleniti.com">maleniti.com</a> },
        ]}/>
        <P hr="Za sva pitanja o projektima, ponudama i računima najbrži je e-mail. Odgovaram u roku od 24 sata radnim danom."
           en="Email is the fastest route for anything about projects, quotes, and invoices. I reply within 24 hours on working days." />
      </LegalSection>

      <LegalSection n="A3" hr="Bankovni podaci" en="Bank details">
        <Rows rows={[
          { k_hr: 'Banka', k_en: 'Bank', v: <Fill hr={imprint.bank_name} en={imprint.bank_name} /> },
          { k_hr: 'IBAN', k_en: 'IBAN', v: <Fill hr={imprint.iban} en={imprint.iban} /> },
          { k_hr: 'SWIFT / BIC', k_en: 'SWIFT / BIC', v: <Fill hr={imprint.swift} en={imprint.swift} /> },
        ]}/>
      </LegalSection>

      <LegalSection n="A4" hr="Hosting i tehnička izvedba" en="Hosting and technical delivery">
        <P hr="Stranica maleniti.com je samostalno hostana. Poslužitelj i infrastrukturu održava vlasnik stranice."
           en="maleniti.com is self-hosted. The server and infrastructure are maintained by the site owner." />
        <Rows rows={[
          { k_hr: 'Poslužitelj', k_en: 'Server', v: <Fill hr={imprint.hosting_provider} en={imprint.hosting_provider} /> },
          { k_hr: 'Izrada i sadržaj', k_en: 'Build and content', v: 'Male Niti' },
        ]}/>
      </LegalSection>

      <LegalSection n="A5" hr="Autorska prava" en="Copyright">
        <P hr="Tekstovi, kod, monogram i vizualni identitet na ovoj stranici vlasništvo su Malih Niti, osim gdje je izričito navedeno drugačije. Preuzimanje i objava bez pisanog dopuštenja nisu dopušteni."
           en="The text, code, monogram, and visual identity on this site belong to Male Niti unless explicitly stated otherwise. Reproduction or publication without written permission is not permitted." />
        <P hr="Nazivi klijenata, snimke zaslona i studije slučaja objavljuju se samo uz dopuštenje klijenta. Projekti označeni kao anonimni objavljeni su bez podataka koji bi ih mogli identificirati."
           en="Client names, screenshots, and case studies are published only with the client’s permission. Projects marked anonymous are published without identifying details." />
        <P hr="Citati pjesama u odjeljku „Zašto Male Niti” navedeni su referencijalno, uz naznaku izvođača i naslova, i ostaju vlasništvo svojih autora."
           en="The song references in the “Why Male Niti” section are cited referentially, with performer and title credited, and remain the property of their authors." />
      </LegalSection>

      <LegalSection n="A6" hr="Odgovornost za sadržaj i vanjske veze" en="Liability for content and external links">
        <P hr="Sadržaj se objavljuje s dužnom pažnjom, ali bez jamstva da je u svakom trenutku potpun i točan. Bilješke na blogu su mišljenja i tehničke napomene, ne savjeti za konkretan slučaj."
           en="Content is published with due care but without warranty that it is complete and accurate at all times. The blog notes are opinions and technical remarks, not advice for a specific case." />
        <P hr="Za sadržaj stranica na koje vode vanjske veze odgovorni su njihovi vlasnici. Veze se provjeravaju u trenutku postavljanja i ne nadziru se trajno."
           en="External sites linked from here are the responsibility of their owners. Links are checked when added and are not monitored continuously." />
      </LegalSection>

      <LegalSection n="A7" hr="Rješavanje sporova" en="Dispute resolution">
        <P hr={<>Prigovore možete poslati putem <a href="Male Niti.html#kontakt">obrasca za kontakt</a>. Odgovor dobivate u pisanom obliku u roku od 15 dana od primitka prigovora.</>}
           en={<>Complaints can be sent via the <a href="Male Niti.html#kontakt">contact form</a>. You will receive a written reply within 15 days of receipt.</>} />
        <P hr="U slučaju spora primjenjuje se hrvatsko pravo, a nadležan je sud u sjedištu pružatelja usluga, osim ako je ugovorom s klijentom dogovoreno drugačije."
           en="In the event of a dispute, Croatian law applies and the court at the service provider’s registered seat has jurisdiction, unless agreed otherwise in the client contract." />
      </LegalSection>
    </LegalPage>
  );
}

// ── Privacy ─────────────────────────────────────────────────────────────────
function PrivacyPage() {
  return (
    <LegalPage
      num="B" title_hr="Privatnost." title_en="Privacy." em_hr="Privatnost" em_en="Privacy"
      kicker_hr="Što se prikuplja, zašto i koliko dugo se čuva. Kratko, jer se prikuplja jako malo."
      kicker_en="What is collected, why, and how long it is kept. Short, because very little is collected."
      updated_hr="10. IX. 2026." updated_en="Sep 10, 2026">

      <LegalSection n="B1" hr="Voditelj obrade" en="Data controller">
        <P hr={<>Voditelj obrade osobnih podataka je Male Niti, s podacima navedenima u impressumu. Za sva pitanja o podacima pišite putem <a href="Male Niti.html#kontakt">obrasca za kontakt</a>.</>}
           en={<>The controller of personal data is Male Niti, with the details listed in the imprint. For any question about your data, write via the <a href="Male Niti.html#kontakt">contact form</a>.</>} />
      </LegalSection>

      <LegalSection n="B2" hr="Kontakt obrazac" en="Contact form">
        <P hr="Kad pošaljete obrazac, prikupljaju se samo polja koja sami upišete: ime, e-mail adresa, vrsta projekta i tekst poruke. Ništa više — nema skrivenih polja, praćenja miša ni profiliranja."
           en="When you submit the form, only the fields you fill in are collected: name, email address, project type, and the message text. Nothing more — no hidden fields, no mouse tracking, no profiling." />
        <Rows rows={[
          { k_hr: 'Svrha', k_en: 'Purpose', v: <T hr="odgovor na vaš upit i priprema ponude" en="replying to your enquiry and preparing a quote" /> },
          { k_hr: 'Pravna osnova', k_en: 'Legal basis', v: <T hr="čl. 6(1)(b) i 6(1)(f) GDPR-a — priprema ugovora i legitimni interes" en="Art. 6(1)(b) and 6(1)(f) GDPR — pre-contractual steps and legitimate interest" /> },
          { k_hr: 'Rok čuvanja', k_en: 'Retention', v: <T hr="24 mjeseca od zadnje komunikacije, potom brisanje" en="24 months from the last correspondence, then deleted" /> },
          { k_hr: 'Primatelji', k_en: 'Recipients', v: <T hr="nitko — poruke ostaju na vlastitom poslužitelju" en="none — messages stay on my own server" /> },
        ]}/>
        <P hr="Podaci se ne koriste za newsletter, ne prodaju se i ne prosljeđuju trećim stranama u marketinške svrhe. Nikad."
           en="The data is not used for a newsletter, not sold, and never passed to third parties for marketing. Ever." />
      </LegalSection>

      <LegalSection n="B3" hr="Kolačići i lokalna pohrana" en="Cookies and local storage">
        <P hr="Stranica ne koristi analitiku ni kolačiće za praćenje — nema Google Analyticsa, nema trećih strana koje vas profiliraju ili prate kroz posjete. Nije potrebna nikakva privola za kolačiće, jer se nijedan ne postavlja."
           en="The site uses no analytics and no tracking cookies — no Google Analytics, no third party profiling or following you across visits. No cookie consent is needed, because none are set." />
        <P hr="Jedino što se sprema u vašem pregledniku je odabir jezika (HR/EN), u lokalnoj pohrani preglednika (localStorage), pod ključem „maleniti:lang”. To nije kolačić — nikad se ne šalje na poslužitelj, ostaje isključivo na vašem uređaju i briše se kad obrišete podatke stranice."
           en="The only thing stored in your browser is your language choice (HR/EN), in the browser's local storage (localStorage) under the key “maleniti:lang”. This is not a cookie — it is never sent to the server, stays only on your device, and is cleared when you clear the site's data." />
      </LegalSection>

      <LegalSection n="B4" hr="Poslužitelj i vanjski resursi" en="Server and external resources">
        <P hr="Poslužitelj vodi standardne zapise pristupa (IP adresa, vrijeme, zahtjev, korisnički agent) radi sigurnosti i otkrivanja smetnji. Zapisi se brišu nakon 30 dana i ne povezuju se s drugim podacima."
           en="The server keeps standard access logs (IP address, time, request, user agent) for security and fault detection. Logs are deleted after 30 days and are not combined with any other data." />
        <P hr="Fontovi se učitavaju s Google Fonts, a React biblioteke s unpkg.com, pri čemu vaš preglednik kontaktira te poslužitelje i oni vide vašu IP adresu. Ako to želite izbjeći, oba se resursa mogu hostati lokalno — recite i to se napravi."
           en="Fonts load from Google Fonts and the React libraries from unpkg.com, which means your browser contacts those servers and they see your IP address. If you would rather avoid that, both can be self-hosted — say so and it will be." />
      </LegalSection>

      <LegalSection n="B5" hr="Vaša prava" en="Your rights">
        <P hr="Prema GDPR-u imate pravo na pristup svojim podacima, ispravak, brisanje, ograničenje obrade, prenosivost i pravo na prigovor. Za ostvarivanje bilo kojeg od tih prava dovoljan je jedan e-mail — nema obrasca ni procedure."
           en="Under the GDPR you have the right to access your data, to rectification, erasure, restriction of processing, portability, and the right to object. One email is enough to exercise any of them — there is no form and no procedure." />
        <P hr="Zahtjev se obrađuje u roku od 30 dana. Ako smatrate da su vam prava povrijeđena, možete se obratiti Agenciji za zaštitu osobnih podataka (AZOP), Selska cesta 136, Zagreb."
           en="Requests are handled within 30 days. If you believe your rights have been breached, you may contact the Croatian Personal Data Protection Agency (AZOP), Selska cesta 136, Zagreb." />
      </LegalSection>

      <LegalSection n="B6" hr="Promjene ove politike" en="Changes to this policy">
        <P hr="Ako se politika promijeni, mijenja se i datum na vrhu ove stranice. Bitne promjene najavljuju se u bilješkama na blogu, a ne tihim ažuriranjem."
           en="If this policy changes, the date at the top of this page changes with it. Material changes are announced in the blog notes, not by a silent update." />
      </LegalSection>
    </LegalPage>
  );
}

Object.assign(window, { Fill, LegalPage, LegalSection, ImprintPage, PrivacyPage });
