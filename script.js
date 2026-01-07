// script.js - interactivity: hamburger, lightbox, theme toggle, language switch, year, about translations
document.addEventListener('DOMContentLoaded', function(){

  // Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Hamburger toggle
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function(e){
      e.stopPropagation();
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      if (mobileMenu.hasAttribute('hidden')) {
        mobileMenu.removeAttribute('hidden');
        const firstLink = mobileMenu.querySelector('a, button');
        if (firstLink) firstLink.focus();
      } else {
        mobileMenu.setAttribute('hidden', '');
      }
    });

    // Close when clicking outside
    document.addEventListener('click', function(ev){
      if (!mobileMenu.contains(ev.target) && !hamburger.contains(ev.target) && !mobileMenu.hasAttribute('hidden')) {
        mobileMenu.setAttribute('hidden', '');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });

    // Close with Escape
    document.addEventListener('keydown', function(ev){
      if (ev.key === 'Escape' && !mobileMenu.hasAttribute('hidden')) {
        mobileMenu.setAttribute('hidden', '');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.focus();
      }
    });
  }

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lightboxImg = lightbox.querySelector('img');
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(btn => {
      btn.addEventListener('click', () => {
        const src = btn.getAttribute('data-src');
        if (!src) return;
        lightboxImg.src = src;
        lightboxImg.alt = btn.querySelector('img')?.alt || '';
        lightbox.removeAttribute('hidden');
        lightbox.setAttribute('aria-hidden', 'false');
        lightbox.querySelector('.lightbox-close')?.focus();
      });
    });

    const closeBtn = lightbox.querySelector('.lightbox-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        lightbox.setAttribute('hidden', '');
        lightbox.setAttribute('aria-hidden', 'true');
        lightbox.querySelector('img').src = '';
      });
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.setAttribute('hidden', '');
        lightbox.setAttribute('aria-hidden', 'true');
        lightbox.querySelector('img').src = '';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !lightbox.hasAttribute('hidden')) {
        lightbox.setAttribute('hidden', '');
        lightbox.setAttribute('aria-hidden', 'true');
        lightbox.querySelector('img').src = '';
      }
    });
  }

  // Theme toggle (desktop and mobile)
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  const storedTheme = localStorage.getItem('site-theme');
  if (storedTheme === 'dark') root.classList.add('dark');

  function setTheme(isDark) {
    if (isDark) root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('site-theme', isDark ? 'dark' : 'light');
    if (themeToggle) themeToggle.setAttribute('aria-pressed', String(isDark));
    if (themeToggleMobile) themeToggleMobile.setAttribute('aria-pressed', String(isDark));
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => setTheme(!root.classList.contains('dark')));
    themeToggle.setAttribute('aria-pressed', String(root.classList.contains('dark')));
  }
  if (themeToggleMobile) {
    themeToggleMobile.addEventListener('click', () => setTheme(!root.classList.contains('dark')));
    themeToggleMobile.setAttribute('aria-pressed', String(root.classList.contains('dark')));
  }

  // Language translations (client-side) including full about text in HU/DE/EN
  const translations = {
    hu: {
      "nav.home":"Főoldal","nav.about":"Rólunk","nav.services":"Szolgáltatások","nav.gallery":"Galéria","nav.contact":"Kapcsolat",
      "cta.quote":"Árajánlat","cta.call":"Hívjon most",
      "hero.title":"Precízen és korrekten — fuvarozás és földmunka",
      "hero.lead":"Megbízható partner építési és szállítási munkákban 1995 óta.",
      "services.title":"Szolgáltatásaink","services.transport":"Árufuvarozás","services.transport_desc":"Országos és nemzetközi fuvarozás, időben és biztonságban.","services.excavation":"Gépi földmunka","services.excavation_desc":"Gépi kotrás, tereprendezés és alapásás tapasztalt gépparkkal.","services.paving":"Térburkolat","services.paving_desc":"Térkövezés, járda és udvar burkolatok kivitelezése.","services.kert":"Kerítés, kapu építési munkák","services.kert_desc":"Kerítések, kapuk, tolókapu alapok betonozott, falazott kivitelben, drótkerítések építése.","services.viz":"Vízelvezető árkok építése","services.viz_desc":"Kisebb vízelvezető árkok, átereszek építése, felújítása, tisztítása, profilárkok, mederlapozás.","services.jatszo":"Uniós játszóterek építése","services.jatszo_desc":"Uniós játszóterek alépítményeinek kialakítása.", "services.terb":"Térburkolat építés","services.terb_desc":"Kocsibejárók, járdák, kerti kiülők, támfalak, terek, teraszok.","services.utepites":"Útépítés, javítás","services.utepites_desc":"Nem szilárd burkolatú utak javítása, profilozása, tömörítése, bazalt-, mészkőzúzalékkal, töltéskaviccsal feltöltése.","services.gat":"Gátépítés, javítás","services.gat_desc":"Gátépítés, gátmagasítás.","services.more":"Részletek",
      "gallery.title":"Referenciák","contact.title":"Kapcsolat","contact.call":"Telefon","contact.email":"Email","contact.address":"Cím","contact.fleet":"Géppark","contact.fleet_desc":"Sokoldalú jármű- és géppark a gyors kivitelezésért","contact.hours":"Hétfőtől péntekig 8:00–17:00","contact.response":"Általában 24 órán belül válaszolunk",
      "footer.rights":"Minden jog fenntartva.","footer.privacy":"Adatvédelem","footer.terms":"Általános szerződési feltételek",
      "about.title":"Cégtörténet",
      "about.p1":"Cégünk 1995 májusában alakult, 1996-ban vettük fel a fuvarozásra utaló „UJJ TRANS” nevet. Családi vállalkozásként édesapánk, aki már sajnos nincs köztünk, tapasztalatára alapozva kezdtünk dolgozni, s tesszük ezt a mai napig. Fő profilunk a lakosság és a környékbeli kisvállalkozások építőanyaggal, elsősorban homokkal, kaviccsal, kővel, tűzifával, földdel való kiszolgálása.",
      "about.p2":"A ’90-es évek végén vásároltuk első traktor alapú rakodó gépünket, mellyel megrendelőink számára teleprendezést, alap- és pinceásást, árkolást, szőlő telepítéséhez föld forgatását, valamint épületek bontását is el tudunk végezni. E tevékenységek során merült fel megrendelőink részéről a komplett szolgáltatás igénye, ezért a 2000-es évek derekán létrehoztunk egy építő csapatot, így már kisebb utak, járdák, átereszek, hidak térkövezését, betonozását, illetve kövezett udvarok, terek építését is vállalunk.",
      "about.p3":"Családi tulajdonban lévő cégünk Lentiben és szűkebb környezetében végez munkákat. Befizetett adónkkal Lenti várost gyarapítjuk. Munkatársaink helyben élő vagy környékbeli szakemberek. Járműveink azonos színűek, felirattal ellátottak, ezen kívül kollégáink ruházatával és megjelenésével is igyekszünk egységes arculatot mutatni.",
      "about.p4":"Ügyfeleink megtalálnak minket a 2004-ben Lentiszombathelyen felépített saját telepünkön, de telefonos egyeztetés után mi is felkeressük Önöket az elvégzendő munka színhelyén is. Az eltelt 20 év alatt elvégzett munkáinkkal igyekeztünk megrendelőink bizalmára rászolgálni, kívánságaikat, igényeiket a lehetőségeinkhez mérten, a legjobb tudásunk szerint elvégezni. Már több visszatérő ügyfelet is üdvözölhetünk megrendelőink között.",
      "about.p5":"Tevékenységünk során ügyelünk a szükséges engedélyek és szakképzettségek meglétére. Belföldi árufuvarozói engedély: AF20-00438 Nem veszélyes hulladékgyűjtési és -szállítási engedély: 5356-1/3/2014 Építőipari kivitelezői nyilvántartási szám: 33A34271 Közúti áruszállításhoz rakománybiztosítással, egyéb tevékenységekhez általános felelősségbiztosítással, környezeti károkozáshoz környezetvédelmi biztosítással rendelkezünk.",
      "about.p6":"Cégünk megtalálható a köztartozás mentes adózók adatbázisában."
    },
    de: {
      "nav.home":"Startseite","nav.about":"Über uns","nav.services":"Leistungen","nav.gallery":"Galerie","nav.contact":"Kontakt",
      "cta.quote":"Angebot","cta.call":"Jetzt anrufen",
      "hero.title":"Präzise und zuverlässig — Transport und Erdarbeiten",
      "hero.lead":"Zuverlässiger Partner für Bau- und Transportarbeiten seit 1995.",
      "services.title":"Unsere Dienstleistungen","services.transport":"Gütertransport","services.transport_desc":"Nationaler und internationaler Transport – pünktlich und sicher.","services.excavation":"Maschinelle Erdarbeiten","services.excavation_desc":"Maschinelles Graben, Geländemodellierung und Fundamentaushub mit erfahrenem Maschinenpark.","services.paving":"Pflasterarbeiten","services.paving_desc":"Pflasterung von Gehwegen, Höfen und Außenflächen.","services.kert":"Zaun- und Torbauarbeiten","services.kert_desc":"Bau von Zäunen, Toren, Schiebetor-Fundamenten in betonierter oder gemauerter Ausführung, sowie Drahtzaunbau.","services.viz":"Bau von Entwässerungsgräben","services.viz_desc":"Bau, Renovierung und Reinigung kleiner Entwässerungsgräben und Durchlässe, Profilgräben, Bachbettbefestigungen.","services.jatszo":"Bau von EU‑Spielplätzen","services.jatszo_desc":"Errichtung der Unterkonstruktionen von EU‑konformen Spielplätzen.","services.terb":"Pflasterflächenbau","services.terb_desc":"Bau von Einfahrten, Gehwegen, Gartenbereichen, Stützmauern, Plätzen und Terrassen.","services.utepites":"Straßenbau und Reparatur","services.utepites_desc":"Reparatur, Profilierung und Verdichtung von unbefestigten Straßen, Auffüllung mit Basalt-, Kalksteinschotter oder Kies.","services.gat":"Damm- und Deichbau","services.gat_desc":"Bau und Erhöhung von Dämmen.","services.more":"Mehr erfahren",
      "gallery.title":"Referenzen","contact.title":"Kontakt","contact.call":"Telefon","contact.email":"E-Mail","contact.address":"Adresse","contact.fleet":"Maschinenpark","contact.fleet_desc":"Vielseitiger Fuhrpark für schnelle Ausführung","contact.hours":"Mo–Fr 8:00–17:00","contact.response":"Wir antworten in der Regel innerhalb von 24 Stunden",
      "footer.rights":"Alle Rechte vorbehalten.","footer.privacy":"Datenschutz","footer.terms":"AGB",
      "about.title":"Firmenchronik",
      "about.p1":"Unser Unternehmen wurde im Mai 1995 gegründet, 1996 nahmen wir den für den Transport charakteristischen Namen „UJJ TRANS“ an. Als Familienbetrieb begannen wir auf der Erfahrung unseres leider verstorbenen Vaters aufzubauen und tun dies bis heute. Unser Hauptprofil ist die Versorgung von Privathaushalten und regionalen Kleinbetrieben mit Baustoffen, vor allem Sand, Kies, Steinen, Brennholz und Erde.",
      "about.p2":"Ende der 90er Jahre kauften wir unsere erste traktorbasierte Ladeschaufel, mit der wir für unsere Auftraggeber Hofräumungen, Fundament- und Kelleraushub, Grabenarbeiten, Erdumwälzung für Weinbergpflanzungen sowie Abbrucharbeiten durchführen können. Aus diesen Tätigkeiten entstand der Wunsch unserer Kunden nach einem Komplettservice, weshalb wir Mitte der 2000er Jahre ein Bauteam gründeten. So übernehmen wir heute auch Pflasterarbeiten, Betonarbeiten und den Bau von befestigten Höfen und Plätzen sowie kleinere Straßen, Gehwege, Durchlässe und Brücken.",
      "about.p3":"Unser familiengeführtes Unternehmen führt Arbeiten in Lenti und der näheren Umgebung aus. Mit unseren gezahlten Steuern tragen wir zur Entwicklung der Stadt Lenti bei. Unsere Mitarbeiter sind ortsansässige oder regionale Fachkräfte. Unsere Fahrzeuge sind einheitlich lackiert und beschriftet; auch mit der Kleidung und dem Erscheinungsbild unserer Kollegen streben wir ein einheitliches Auftreten an.",
      "about.p4":"Unsere Kunden finden uns auf unserem 2004 in Lentiszombathely errichteten Firmengelände, nach telefonischer Vereinbarung besuchen wir Sie jedoch auch vor Ort. In den vergangenen 20 Jahren haben wir durch unsere Arbeit das Vertrauen unserer Auftraggeber gewonnen und ihre Wünsche und Anforderungen nach bestem Wissen und Gewissen erfüllt. Wir dürfen bereits mehrere Stammkunden zu unseren Auftraggebern zählen.",
      "about.p5":"Bei unserer Tätigkeit achten wir auf die erforderlichen Genehmigungen und Qualifikationen. Inlandstransportgenehmigung: AF20-00438 Genehmigung zur Sammlung und Beförderung nicht gefährlicher Abfälle: 5356-1/3/2014 Bauunternehmer-Registrierungsnummer: 33A34271 Für den Straßengüterverkehr verfügen wir über Ladungsversicherung, für andere Tätigkeiten über allgemeine Haftpflichtversicherung und für Umweltschäden über Umwelthaftpflichtversicherung.",
      "about.p6":"Unser Unternehmen ist in der Datenbank der steuerlich schuldenfreien Steuerzahler aufgeführt."
    },
    en: {
      "nav.home":"Home","nav.about":"About","nav.services":"Services","nav.gallery":"Gallery","nav.contact":"Contact",
      "cta.quote":"Request Quote","cta.call":"Call Now",
      "hero.title":"Precise and reliable — transport and earthworks",
      "hero.lead":"Trusted partner for construction and transport since 1995.",
      "services.title":"Our Services","services.transport":"Freight Transport","services.transport_desc":"National and international transport, delivered on time and safely.","services.excavation":"Machine Excavation","services.excavation_desc":"Mechanical digging, land grading and foundation excavation with an experienced fleet.","services.paving":"Paving Works","services.paving_desc":"Paving of walkways, yards and outdoor surfaces.","services.kert":"Fence and Gate Construction","services.kert_desc":"Construction of fences, gates, sliding‑gate foundations in concrete or masonry, and wire fence installation.","services.viz":"Drainage Ditch Construction","services.viz_desc":"Construction, renovation and cleaning of small drainage ditches and culverts, profile ditches, and channel lining.","services.jatszo":"EU Playground Construction","services.jatszo_desc":"Construction of substructures for EU‑standard playgrounds.","services.terb":"Paving Surface Construction","services.terb_desc":"Construction of driveways, walkways, garden seating areas, retaining walls, squares and terraces.","services.utepites":"Road Construction and Repair","services.utepites_desc":"Repair, profiling and compaction of unpaved roads, filling with basalt, limestone gravel or embankment material.","services.gat":"Dam Construction and Repair","services.gat_desc":"Construction and elevation of dams.","services.more":"Details",
      "gallery.title":"References","contact.title":"Contact","contact.call":"Phone","contact.email":"Email","contact.address":"Address","contact.fleet":"Fleet","contact.fleet_desc":"Versatile vehicle and machinery fleet for fast execution","contact.hours":"Mon–Fri 8:00–17:00","contact.response":"We usually reply within 24 hours",
      "footer.rights":"All rights reserved.","footer.privacy":"Privacy","footer.terms":"Terms",
      "about.title":"Company history",
      "about.p1":"Our company was founded in May 1995; in 1996 we adopted the transport-related name “UJJ TRANS”. As a family business, we started based on the experience of our late father and continue to operate on that foundation. Our main profile is serving households and nearby small businesses with building materials, primarily sand, gravel, stone, firewood and soil.",
      "about.p2":"At the end of the 1990s we purchased our first tractor-based loader, which allows us to perform site clearances, foundation and cellar excavations, ditching, soil turning for vineyard planting, and building demolitions for our clients. During these activities clients requested a complete service, so in the mid-2000s we formed a construction team. We now undertake smaller roads, sidewalks, culverts, bridge paving, concrete works and the construction of paved yards and spaces.",
      "about.p3":"Our family-owned company carries out work in Lenti and the surrounding area. With our paid taxes we contribute to the town of Lenti. Our staff are local or regional professionals. Our vehicles are uniformly colored and labeled; we also strive for a consistent appearance through our colleagues' clothing and presentation.",
      "about.p4":"Clients can find us at our own site built in 2004 in Lentiszombathely, but after telephone arrangement we also visit the work site. Over the past 20 years we have aimed to earn our clients' trust by performing work to the best of our abilities and according to their wishes and needs. We already welcome several returning clients among our customers.",
      "about.p5":"In our activities we ensure the necessary permits and qualifications. Domestic freight transport license: AF20-00438 Permit for collection and transport of non-hazardous waste: 5356-1/3/2014 Construction contractor registration number: 33A34271 For road freight transport we have cargo insurance; for other activities general liability insurance and environmental liability insurance for environmental damage.",
      "about.p6":"Our company is listed in the database of taxpayers free of public debt."
    }
  };

  function applyTranslations(lang) {
    const nodes = document.querySelectorAll('[data-i18n]');
    nodes.forEach(node => {
      const key = node.getAttribute('data-i18n');
      const text = translations[lang] && translations[lang][key];
      if (text) node.textContent = text;
    });
  }

  // Initialize language from localStorage or default 'hu'
  const savedLang = localStorage.getItem('site-lang') || 'hu';
  setLanguage(savedLang);

  // Language buttons
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      setLanguage(lang);
    });
  });

  function setLanguage(lang) {
    document.querySelectorAll('.lang-btn').forEach(b => {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang));
    });
    document.documentElement.lang = (lang === 'hu') ? 'hu' : (lang === 'de' ? 'de' : 'en');
    applyTranslations(lang);
    localStorage.setItem('site-lang', lang);
  }

  // Mobile menu: close on link click
  if (mobileMenu) {
    mobileMenu.addEventListener('click', function(e){
      const target = e.target;
      if (target && target.tagName === 'A') {
        mobileMenu.setAttribute('hidden', '');
        if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Anchor handling: close mobile menu when navigating to anchors
  document.querySelectorAll('a[href^="index.html#"], a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e){
      if (mobileMenu && !mobileMenu.hasAttribute('hidden')) {
        mobileMenu.setAttribute('hidden', '');
        if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Sanity checks (console)
  if (!document.querySelector('.site-header')) console.warn('Header missing.');
  if (!document.querySelector('.site-footer')) console.warn('Footer missing.');

});
