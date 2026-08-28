# Cercetare de design pentru un guide HTML local

**Scop:** un ghid complet pentru un începător care merge la GTM Skillathon 2026.

**Artefact vizat:** un singur fișier HTML local, interactiv, care poate fi deschis direct în browser și consultat în timp real la hackathon.

**Data cercetării:** 24 august 2026.

**Constrângeri:** nu presupunem framework, build step, server, CDN sau altă aplicație. HTML-ul trebuie să fie clar, scanabil, responsive și util sub presiunea unei seri de build.

## Cum trebuie citit acest document

- **Fapt din sursă** înseamnă că afirmația este explicită în fișierul local sau în documentația oficială citată.
- **Inferență** înseamnă o concluzie trasă din mai multe fapte.
- **Recomandare proprie** înseamnă o decizie de design propusă pentru acest ghid. Nu este o regulă a evenimentului și nu este o cerință WCAG.
- **Adaptare pentru HTML local** înseamnă că preluăm un principiu dintr-un skill, dar îl modificăm pentru constrângerea de un singur fișier offline.

Nu încercăm să copiem identitatea vizuală a lui Matt Pocock. Împrumutăm mecanica de predare: întrebări bune, probleme concrete, practică, documentație primară și răspunsuri care apar la momentul potrivit.

## Rezumatul deciziei

Ghidul ar trebui să se comporte ca un field manual, nu ca un mini-site de marketing:

1. Prima vedere spune unde e utilizatorul, ce trebuie să facă acum și ce rezultat trebuie să aibă.
2. Conținutul principal este liniar și vizibil. Detaliile secundare intră în disclosure-uri native.
3. Fiecare secțiune are un singur rezultat și se termină cu un criteriu verificabil: "Done when".
4. Navigarea se face prin ancore, titluri descriptive și o listă scurtă de secțiuni. Nu folosim tabs, carusele sau modale pentru lucruri care trebuie găsite rapid.
5. Interactivitatea rămâne mică și utilă: checklist, progres textual, copierea unor comenzi și eventual filtrare. Conținutul rămâne folositor dacă JavaScript-ul nu rulează.
6. Tipografia și spațiul fac designul. Un singur accent cromatic este suficient. Nu adăugăm gradient, glow, ilustrații generice sau decor care concurează cu pașii.
7. Fișierul final nu are dependențe externe. Aceasta este o recomandare proprie derivată din cerința de HTML local, nu o regulă a skill-urilor.

## Contextul de utilizare

### Fapte despre eveniment

**Fapt din sursă.** Pagina oficială descrie GTM Skillathon ca o singură seară în care participanții folosesc Codex și/sau Apify pentru a construi o skill agent reutilizabilă, pentru un job real de go-to-market, alimentată de date web live și verificată prin evals. Pagina spune și că nu este necesară experiență anterioară cu Codex sau agent skills. [Evenimentul oficial pe Luma](https://luma.com/82q9aclg)

**Fapt din sursă.** Programul public este 17:00 check-in, 17:30 welcome și demo Codex, 18:00 build, 21:00 demos, apoi evenimentul social. Intervalul operațional de build este, prin urmare, de aproximativ trei ore. [Evenimentul oficial pe Luma](https://luma.com/82q9aclg)

**Inferență.** Ghidul nu trebuie parcurs de la început la sfârșit ca un curs normal. Utilizatorul va sări între "ce fac acum", "cum verific", "ce fac dacă tool-ul eșuează" și "cum demonstrez".

**Recomandare proprie.** Organizează ghidul în două moduri care folosesc același conținut:

- **Traseu:** pregătire → alegerea problemei → MVP → date live → eval → demo.
- **Referință rapidă:** timeline, checklist, recovery, glossary și script de demo.

### Ce înseamnă succesul pentru această interfață

**Recomandare proprie.** Ghidul este reușit dacă un începător care îl deschide la 18:05 poate răspunde în mai puțin de zece secunde la trei întrebări:

- Ce construiesc?
- Care este următorul pas?
- Cum știu că pasul este terminat?

Dacă răspunsul este îngropat într-un hero mare, într-un card sau într-un accordion închis, designul nu își face treaba.

## Skill-uri locale relevante

### research

**Sursă locală:** [research/SKILL.md](/Users/teo/.codex/skills/research/SKILL.md)

**Fapt din sursă.** Skill-ul cere cercetare pe surse primare, urmărirea fiecărei afirmații până la sursa care o deține, citarea fiecărei afirmații și salvarea constatărilor într-un singur fișier Markdown.

**Aplicare în ghid.** Fiecare regulă importantă despre eveniment, accesibilitate sau platforma web trebuie să aibă sursa aproape de ea. Nu separa toate sursele într-o bibliografie îndepărtată și nu lăsa afirmații precum "best practice" fără proprietar.

**Adaptare pentru utilizator.** Ghidul trebuie să spună clar când ceva este cerut de organizatori, când este cerut de standardul web și când este doar o alegere de design.

### prototype

**Sursă locală:** [prototype/SKILL.md](/Users/teo/.codex/skills/prototype/SKILL.md)

**Fapt din sursă.** Pentru întrebări de UI, skill-ul propune variații UI într-un singur fișier, iar regulile generale cer ca un prototip să fie trivial de rulat, fără persistență implicită, cu starea vizibilă după fiecare acțiune și fără polish inutil.

**Aplicare în ghid.** Pentru un artefact local, păstrează un model de stare mic: secțiuni bifate, pasul curent și eventual ultimul mesaj de feedback. Afișează textual progresul, nu doar o bară decorativă.

**Limită.** Skill-ul descrie un prototip throwaway, nu un produs editorial final. Nu transfera automat regula "skip the polish" în ghidul final. Ghidul are nevoie de polish editorial, dar nu de funcții speculative.

### teach

**Sursă locală:** [teach/SKILL.md](/Users/teo/.codex/skills/teach/SKILL.md)

**Fapt din sursă.** Skill-ul tratează lecția ca un HTML self-contained, cu tipografie și layout lizibile, scurt, cu un singur câștig concret. Cunoștințele trebuie urmate de practică și feedback imediat, iar lecțiile trebuie să indice surse de încredere și să se lege între ele prin ancore.

**Aplicare în ghid.** Fiecare secțiune ar trebui să aibă forma: problemă → explicație scurtă → acțiune → feedback → următorul pas. Un checklist este mai bun dacă spune ce output trebuie să existe, nu doar că utilizatorul a apăsat o bifă.

**Adaptare pentru HTML local.** Skill-ul presupune un workspace cu lessons/, reference/, assets/ și alte fișiere. Cerința de aici cere opusul: un singur HTML. Păstrează principiile de predare și inlinează stilul și scriptul mic în fișierul final. Nu crea structura de workspace a skill-ului.

### sites-building

**Sursă locală:** [sites-building/SKILL.md](/Users/teo/.codex/plugins/cache/openai-bundled/sites/0.1.43/skills/sites-building/SKILL.md)

**Fapt din sursă.** Skill-ul cere ca primul preview să aibă o felie coerentă, conținut specific produsului și affordance-ul principal vizibil. Pentru site-uri recomandă tipografie, culoare și layout puternice, copy concret, responsive behavior, label-uri accesibile, evitarea stării inutile și a chrome-ului generic de dashboard.

**Aplicare în ghid.** Prima fereastră trebuie să arate ghidul real, nu un splash screen sau un skeleton. Pune imediat titlul, contextul, următoarea acțiune și un link către traseul de start.

**Limită.** Skill-ul are un lifecycle de site găzduit și recomandă uneori CDN-uri pentru raportul vizual. Nu preluăm setup-ul, hosting-ul sau CDN-urile. Pentru un HTML local, dependențele externe cresc riscul ca ghidul să nu funcționeze exact când este necesar.

### improve-codebase-architecture și HTML-REPORT.md

**Surse locale:** [improve-codebase-architecture/SKILL.md](/Users/teo/.codex/skills/improve-codebase-architecture/SKILL.md) și [HTML-REPORT.md](/Users/teo/.codex/skills/improve-codebase-architecture/HTML-REPORT.md)

**Fapt din sursă.** Formatul de raport cere HTML self-contained, whitespace generos, stil editorial în loc de dashboard corporatist, text puțin, carduri cu ierarhie clară și diagrame care poartă greul explicației. Recomandă o culoare de accent, roșu pentru leakage și amber pentru warnings. Spune explicit să nu existe un paragraf introductiv lung și să se intre direct în conținut.

**Aplicare în ghid.** Folosește aceeași disciplină: o introducere de o propoziție, apoi acțiuni și diagrame simple pentru fluxul de build. Când o relație este mai bine înțeleasă vizual, folosește o bandă de timp sau un flow static construit cu HTML/CSS.

**Adaptare pentru HTML local.** Formatul de raport folosește Tailwind și Mermaid prin CDN. Pentru artefactul nostru acestea rămân doar referințe de layout. Recomandarea este CSS inline și JavaScript vanilla minim. Nu introduce o bibliotecă doar ca să imite un raport.

### unslop

**Sursă locală:** [unslop/SKILL.md](/Users/teo/.codex/skills/unslop/SKILL.md)

**Fapt din sursă.** Skill-ul cere să elimini hype-ul, atribuțiile vagi, vocabularul promoțional, frazele superficiale în "-ing", jargonul AI, titlurile în Title Case, emoji-urile decorative, em dash-ul repetat, bold-ul folosit peste tot și frazele de chatbot. Cere specificitate, opinii și ritm variat.

**Aplicare în ghid.** Înlocuiește "unlock your GTM potential" cu o acțiune observabilă: "Alege un job GTM pe care îl poți demonstra în trei ore". Înlocuiește "Learn more" cu obiectul real: "Vezi exemplul de eval pentru cazul negativ".

### writing-for-agents

**Sursă locală:** [writing-for-agents/SKILL.md](/Users/teo/.codex/skills/writing-for-agents/SKILL.md)

**Fapt din sursă.** Skill-ul separă pașii de referință și propune o ierarhie cu progressive disclosure. Recomandă co-location, reducerea sprawl-ului, o singură sursă de adevăr și criterii de finalizare verificabile pentru fiecare pas.

**Aplicare în ghid.** Ține în fluxul principal doar ceea ce trebuie văzut de fiecare participant. Pune definițiile, excepțiile și explicațiile lungi în details sau în glossary. Fiecare pas trebuie să se termine cu un output vizibil: fișier creat, test trecut, rezultat citat sau demo pregătit.

**Adaptare.** Skill-ul este scris pentru documente consumate de agenți. Principiul de progressive disclosure este transferabil, dar nu transforma ghidul într-un set de instrucțiuni robotice. Un începător are nevoie de motivul pasului și de un exemplu concret.

### codebase-design

**Sursă locală:** [codebase-design/SKILL.md](/Users/teo/.codex/skills/codebase-design/SKILL.md)

**Fapt din sursă.** Skill-ul definește un modul deep ca având o interfață mică și mult comportament în interior. Pune accent pe leverage, locality, interfață ca suprafață de test și deletion test.

**Adaptare pentru interfața ghidului.** Aceasta nu este o regulă de UI din sursă, ci o analogie utilă: interfața ghidului ar trebui să aibă puține affordance-uri care acoperă mult conținut. Ancorele, disclosure-urile native și checklist-ul pot ascunde complexitatea fără să oblige utilizatorul să învețe un sistem de navigare mare.

## Ce preluăm din stilul ghidurilor lui Matt Pocock

### Fapte observabile din surse primare

**Fapt din sursă.** Pagina oficială Total TypeScript descrie tutorialele gratuite ca fiind exercise-driven și in-depth. Pagina tutorialului pentru începători spune că fiecare exercițiu începe cu o problemă și cere o abordare activă: citește introducerea, verifică documentația, caută cuvinte-cheie, încearcă o soluție, apoi compară cu soluția prezentată. [Tutorialele oficiale Total TypeScript](https://www.totaltypescript.com/tutorials) și [Beginner's TypeScript](https://www.totaltypescript.com/tutorials/beginners-typescript)

**Fapt din sursă.** Ghidul oficial "How To Learn TypeScript" folosește întrebări pas cu pas, explicații scurte și linkuri spre resurse suplimentare. Instrucțiunile spun să citești întrebarea cu atenție și să înțelegi răspunsul înainte de a trece mai departe. [How To Learn TypeScript](https://www.totaltypescript.com/learn-typescript)

### Inferențe de design

Din aceste pagini rezultă un stil de predare mai valoros decât orice imitație de culoare sau branding:

- începe cu întrebarea sau blocajul pe care îl are utilizatorul;
- cere o încercare mică înainte de a arăta răspunsul;
- trimite utilizatorul la documentația care deține adevărul;
- explică doar cât este necesar pentru următoarea decizie;
- folosește exerciții și probleme reale, nu afirmații generale despre domeniu;
- construiește progresul din pași mici, care se pot verifica.

### Recomandare proprie pentru ghid

Fiecare secțiune ar trebui să aibă această structură:

1. **Întrebarea:** "Ce aleg să construiesc în următoarele 20 de minute?"
2. **De ce contează acum:** o propoziție legată de deadline sau de demo.
3. **Încearcă:** o acțiune pe care utilizatorul o poate face imediat.
4. **Semnal de feedback:** ce trebuie să apară sau să treacă.
5. **Dacă te-ai blocat:** fallback concret, nu încurajare generică.
6. **Done when:** criteriu binar sau aproape binar.
7. **Sursa:** documentația oficială relevantă.

Pentru răspunsuri și explicații secundare, folosește un disclosure nativ cu summary-ul "De ce?". Nu ascunde în acest mod pasul critic sau output-ul necesar pentru demo.

## Arhitectura informației recomandată

### Structura de nivel înalt

**Recomandare proprie.** Un singur document, cu o navigare persistentă pe desktop și o listă compactă de jump links pe mobil:

1. **Start aici, în 90 de secunde**
   - misiunea serii;
   - ce înseamnă o skill reutilizabilă;
   - următoarea acțiune;
   - "Done when": ai un job GTM formulat într-o propoziție.
2. **Înainte de build**
   - problema, utilizatorul, inputul, outputul și limita de timp;
   - criteriul de alegere a unui MVP;
   - accesul la Codex, Apify și sursele de date.
3. **Bucla de build**
   - problemă → input/output → primul path funcțional → date live → eval → demo;
   - ce nu intră în MVP;
   - cum alegi un fallback local.
4. **Timeline pentru 18:00–21:00**
   - blocuri scurte de lucru;
   - output-ul fiecărui bloc;
   - momentul la care trebuie să tai funcții.
5. **Evals care conving**
   - caz pozitiv, caz negativ, date goale, timeout și grounding;
   - scorecard simplu;
   - cum arăți un fail fără să pierzi credibilitatea.
6. **Demo-ul de trei minute**
   - setup, rulare, dovadă, cazul negativ și limitările declarate;
   - script scurt pe care îl poți citi cu voce tare.
7. **Dacă se strică ceva**
   - timeout, date irelevante, schema invalidă, tool indisponibil, output generic;
   - fallback și criteriul pentru a opri cercetarea.
8. **Quick reference**
   - vocabular, linkuri, checklist final și întrebări utile pentru organizatori.

### Layout propus

**Recomandare proprie.** Pe ecran larg:

- un header scurt, cu titlul și statusul curent;
- o coloană laterală de aproximativ 14rem cu ancorele, sticky și un grup mic de "Acum" / "Mai târziu";
- un singur content column principal, cu lățime de citire limitată;
- callout-urile și timeline-ul în interiorul coloanei, nu într-un al treilea rail permanent.

Pe mobil:

- header compact;
- un disclosure cu textul "Sari la secțiune" sau o listă orizontală care nu blochează citirea;
- un singur flux vertical;
- butoane și checkbox-uri cu zone de atingere generoase;
- fără sidebar care ocupă jumătate din ecran și fără scroll orizontal obligatoriu.

### Contractul unei secțiuni

**Recomandare proprie.** Nu crea carduri doar pentru că CSS-ul permite. Fiecare secțiune trebuie să aibă:

- un titlu care spune acțiunea sau decizia;
- o frază de context;
- o listă numerotată sau un flow;
- un exemplu de output;
- o zonă "Dacă te blochezi";
- un criteriu "Done when";
- cel mult un disclosure cu explicație secundară.

Exemplu de titlu bun: "Alege un job GTM pe care îl poți evalua". Titlu slab: "Definește-ți strategia de succes".

### Interacțiuni cu randament mare

| Interacțiune | Recomandare | Motiv |
|---|---|---|
| Ancore către secțiuni | Da, sunt baza | Funcționează fără JavaScript și se pot folosi cu browser find |
| Checklist | Da, cu feedback textual | Leagă progresul de output, nu de animație |
| details / summary | Da, pentru "de ce", exemple și fallback-uri | Disclosure nativ, simplu și potrivit pentru progressive disclosure |
| Copierea unui snippet | Opțional | Merită doar pentru comenzi sau schema repetate |
| Căutare proprie | Doar dacă ghidul devine foarte lung | Cmd/Ctrl+F acoperă prima versiune cu mai puțin cod |
| Tabs | În general nu | Pattern-ul accesibil cere gestionarea focusului și taste speciale |
| Carousel | Nu | Ascunde opțiuni și încetinește scanarea |
| Modal | Nu pentru instrucțiuni | Rupe contextul și complică închiderea prin tastatură |
| localStorage | Opțional | Nu este necesar pentru un ghid care funcționează din memorie |

**Fapt din sursă.** Elementul details creează un disclosure widget nativ cu un summary obligatoriu, suportă starea open, evenimentul toggle și gruparea prin name fără script suplimentar. [MDN: details](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details)

**Fapt din sursă.** Pattern-ul WAI-ARIA Disclosure presupune un control de tip button, aria-expanded și, opțional, aria-controls; Enter și Space comută vizibilitatea. [WAI-ARIA APG: Disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)

**Recomandare proprie.** Pentru acest ghid, preferă details când conținutul este pur și simplu opțional. Dacă ai nevoie de un buton custom care actualizează mai multe zone, implementează explicit starea accesibilă și testează tastatura. Nu construi tabs doar pentru că arată compact.

**Fapt din sursă.** Pattern-ul WAI-ARIA Tabs cere un tablist, butoane cu role=tab, aria-selected, aria-controls, gestionarea lui tabindex și un tabpanel; exemplul include navigare prin săgeți și Home/End. [WAI-ARIA APG: Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)

## Tipografie și limbaj

### Ce este susținut de surse

**Fapt din sursă.** MDN recomandă semantic HTML, text simplu, evitarea jargonului și a abrevierilor neexplicate, structură logică a titlurilor și source order care are sens și fără CSS. [MDN: HTML ca bază pentru accesibilitate](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML)

**Fapt din sursă.** WCAG 2.2 SC 2.4.6 cere ca headings și labels să descrie topicul sau scopul. Explicația W3C spune că titlurile descriptive ajută utilizatorii să se orienteze și să prezică ce urmează. [W3C: Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html)

### Recomandări concrete

**Recomandare proprie.** Folosește o singură familie sans-serif de sistem pentru body și UI. Un serif discret pentru titluri poate funcționa într-un raport editorial, dar nu este necesar și adaugă o decizie vizuală. Pentru un ghid de hackathon, consistența este mai valoroasă decât contrastul de fonturi.

**Recomandare proprie.** Punct de pornire pentru token-uri:

    :root {
      --body-size: 1rem;
      --body-leading: 1.6;
      --reading-measure: 68ch;
      --heading-leading: 1.05;
    }

Nu trata aceste valori ca standard. Sunt o bază de testare pentru un ghid citit rapid, pe laptop și pe telefon.

**Recomandare proprie.** Reguli de text:

- body de 16–18px la 100% zoom;
- line-height de aproximativ 1.5–1.7 pentru paragrafe;
- coloana de text de aproximativ 60–72ch;
- titluri în sentence case, nu Title Case și nu toate cu majuscule;
- comenzi, nume de fișiere și schema în monospace, dar nu întregul UI;
- un singur verb clar în titlul unui pas;
- paragrafe scurte, liste numai când există pași sau alternative reale;
- definiția unui termen la prima apariție, apoi aceeași denumire peste tot.

**Fapt din sursă.** clamp() poate face ca font-size să crească odată cu viewport-ul fără să treacă sub minim sau peste maxim. [MDN: clamp()](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp)

**Recomandare proprie.** Poți folosi clamp() doar pentru titluri și spațieri, cu limite conservatoare. Nu lăsa textul să devină un poster pe ecrane mari și nu seta înălțimi fixe care se rup la zoom.

**Recomandare proprie.** Folosește diacritice și lang="ro". Dacă un termen rămâne în engleză pentru că este nume de produs sau comandă, păstrează-l ca atare și explică-l o singură dată.

## Culori și direcție vizuală

### Ce este susținut de surse

**Fapt din sursă.** WCAG 2.2 SC 1.4.3 cere contrast de cel puțin 4.5:1 pentru text obișnuit și 3:1 pentru text mare, cu excepțiile documentate de standard. [W3C: Contrast (Minimum)](https://www.w3.org/TR/WCAG22/#contrast-minimum)

**Fapt din sursă.** WCAG 2.2 SC 1.4.1 spune că nu trebuie să folosești culoarea ca singurul mijloc de a comunica o informație, o acțiune sau o stare. [W3C: Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html)

**Fapt din sursă.** Pentru componente non-text, inclusiv indicatori vizuali, W3C discută pragul de 3:1 și nevoia ca focusul să fie vizibil și suficient de distinct. [W3C: Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)

### Recomandări concrete

**Recomandare proprie.** Pornește cu o paletă calmă, aproape editorială:

| Rol | Exemplu de token | Utilizare |
|---|---|---|
| Paper | #f7f5ef | fundal general |
| Surface | #fffdf8 | zone de conținut și cod |
| Ink | #172033 | text principal |
| Muted | #5c6875 | text secundar, numai după verificarea contrastului |
| Line | #d9d6ce | delimitări și borduri |
| Accent | #0f766e | linkuri, progres și acțiuni |
| Accent soft | #ccfbf1 | fundal de callout, cu text închis |
| Success | #166534 | stare trecută, împreună cu text sau icon |
| Warning | #92400e | atenționare, împreună cu text sau icon |
| Danger | #991b1b | fail sau stop, împreună cu text sau icon |

Verifică perechile reale după ce adaugi text, borduri și hover states. Numele culorii nu dovedește accesibilitatea.

**Recomandare proprie.** Limitează sistemul vizual la paper, ink, un accent și stările de lucru. Nu folosi gradient violet, neon, glow, glassmorphism sau umbre foarte mari ca substitut pentru ierarhie.

**Recomandare proprie.** Pentru stări, scrie TRECUT, ATENȚIE sau FAIL, nu doar un punct verde, galben ori roșu. Adaugă și formă, text sau icon. Un status trebuie să rămână înțeles în grayscale și cu un screen reader.

## Layout, navigare și responsive

### Structură semantică minimă

**Fapt din sursă.** MDN recomandă elementul potrivit pentru rolul potrivit, deoarece browserul oferă deja comportament și hook-uri de accesibilitate. Un button are navigare și activare prin tastatură, iar nav, main, article, aside și footer oferă indicii structurale. [MDN: HTML ca bază pentru accesibilitate](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML)

**Recomandare proprie.** Scheletul logic ar trebui să fie:

    <body>
      <a class="skip-link" href="#main">Sari la conținut</a>
      <header>titlu, scop, status curent</header>
      <nav aria-label="Secțiuni">ancore către secțiuni</nav>
      <main id="main">
        <section id="start">...</section>
        <section id="build">...</section>
        <section id="evals">...</section>
        <section id="demo">...</section>
        <section id="recovery">...</section>
      </main>
      <footer>surse și versiunea ghidului</footer>
    </body>

Nu folosi div pentru un link, un buton sau un titlu doar ca să controlezi aspectul. CSS-ul ar trebui să urmeze structura, nu să o înlocuiască.

### Navigare

**Recomandare proprie.** Navigarea ar trebui să aibă trei niveluri, fără să devină un site map:

- **Acum:** un link către pasul curent și următorul output;
- **Traseu:** cele 5–8 secțiuni principale;
- **Reference:** glossary, recovery și surse.

Fiecare ancoră trebuie să aibă text descriptiv: Evals care conving, nu Pasul 4. Dacă header-ul este sticky, setează scroll-margin-block-start pe secțiuni ca titlul să nu ajungă sub el.

**Fapt din sursă.** WCAG 2.2 SC 2.4.1 cere un mecanism pentru a evita blocurile repetate și explică faptul că un skip link către conținutul principal ajută utilizatorii de tastatură. [W3C: Bypass Blocks](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html)

**Recomandare proprie.** Include un skip link vizibil la focus, chiar dacă documentul are o singură pagină. Costul este mic, iar header-ul și nav-ul pot deveni lungi.

### Responsive

**Fapt din sursă.** MDN descrie responsive design ca o abordare bazată pe layout flexibil, imagini fluide și media queries. Recomandă mobile-first, grid flexibil și breakpoint-uri legate de conținut, nu de o listă de dispozitive. [MDN: Responsive web design](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design)

**Fapt din sursă.** WCAG 2.2 SC 1.4.10 Reflow cere ca informația și funcționalitatea să fie disponibile la o lățime echivalentă cu 320 CSS px fără scroll în două dimensiuni, cu excepțiile documentate. [W3C: Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)

**Recomandare proprie.** Pornește mobile-first:

- meta viewport cu width=device-width și initial-scale=1;
- un singur column până când conținutul justifică două coloane;
- desktop: nav sticky + content, nu trei coloane;
- breakpoint-ul apare când sidebar-ul și coloana principală au spațiu real, nu pentru că un device popular are o anumită lățime;
- folosește minmax(0, 1fr), max-width, gap, unități relative și wrap;
- nu seta height fix pe carduri, cod sau callout-uri;
- la mobil, side nav-ul devine un disclosure sau un grup de ancore deasupra conținutului;
- verifică 320px, 375px, 768px și desktop larg, plus zoom 200%.

**Recomandare proprie.** Adaugă un @media print simplu: ascunde nav-ul sticky și controalele decorative, păstrează textul, linkurile și ordinea pașilor. Skill-ul teach insistă că materialele de referință trebuie să rămână lizibile și la print.

### Interacțiuni și progres

**Recomandare proprie.** Un checklist bun are trei părți:

    [ ] Acțiune: rulează cazul pozitiv
        Output: există un rezultat cu URL și timestamp
        Done when: poți arăta dovada fără să explici manual ce s-a întâmplat

În UI, checkbox-ul trebuie să fie legat de un label cu text complet. Progresul poate fi redat ca 3 din 8 pași finalizați, nu doar ca o bară.

**Adaptare pentru local.** Starea poate rămâne în memorie și se poate reseta la refresh. Dacă vrei să păstrezi progresul între sesiuni, adaugă localStorage numai după ce traseul de bază este clar și oferă un control explicit pentru reset. Nu transforma ghidul într-o aplicație de task management.

## Accesibilitate: bară minimă de calitate

### Conținut și structură

**Recomandare proprie, susținută de surse.**

- lang="ro", un title descriptiv și un singur h1;
- headings în ordine logică, fără să sari de la h2 la h4 doar pentru dimensiune;
- texte de link care au sens scoase din paragraf;
- nav, main, aside, section și footer pentru regiuni reale;
- source order care rămâne coerent dacă CSS-ul este dezactivat;
- instrucțiuni în limbaj simplu și abrevieri explicate la prima apariție.

Acestea urmează recomandările MDN despre semantic HTML și text clar și SC 2.4.6 despre headings și labels descriptive. [MDN accessibility](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML), [W3C Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html)

### Tastatură

**Fapt din sursă.** WCAG cere un mod de operare cu focus vizibil pentru interfețele operabile prin tastatură. [W3C: Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html)

**Fapt din sursă.** MDN documentează :focus-visible ca pseudo-clasă pentru a stiliza focusul când browserul determină că acesta trebuie făcut evident și avertizează că eliminarea focusului reduce usability pentru navigarea prin tastatură. [MDN: :focus-visible](https://developer.mozilla.org/en-US/docs/Web/CSS/%3Afocus-visible)

**Recomandare proprie.** Testează:

- Tab și Shift+Tab trec prin controale în ordinea logică;
- Enter și Space activează controlul corect;
- focus ring-ul este evident pe paper și pe accent;
- nu există outline: none fără un înlocuitor suficient de vizibil;
- un disclosure se poate deschide și închide fără mouse;
- nu există focus trap și nu sar utilizatorul la o poziție neașteptată.

### Contrast, culoare și text mărit

**Fapt din sursă.** WCAG 2.2 cere contrast minim pentru text, nu doar pentru textul din body, ci și pentru label-uri, butoane și stări. [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)

**Fapt din sursă.** SC 1.4.4 cere ca textul să poată fi mărit la 200% fără pierdere de conținut sau funcționalitate. [W3C: Resize Text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html)

**Recomandare proprie.** Nu fixa textul în imagini, nu tăia titluri cu overflow: hidden și nu face statusul dependent de hue. Dacă un card este verde, scrie și Trecut.

### Motion și preferințe

**Fapt din sursă.** prefers-reduced-motion detectează preferința utilizatorului de a elimina, reduce sau înlocui animațiile non-esențiale; MDN explică faptul că scale și pan pe obiecte mari pot declanșa disconfort vestibular. [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/%40media/prefers-reduced-motion)

**Recomandare proprie.** Evită animațiile continue. Dacă există tranziții pentru disclosure sau feedback, oprește-le sau redu-le în @media (prefers-reduced-motion: reduce). Progresul trebuie să rămână lizibil și fără mișcare.

**Opțional.** prefers-color-scheme poate schimba tema în funcție de preferința OS, dar nu îl trata ca prioritate. O temă light foarte bună este mai utilă decât două teme mediocre. [MDN: prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/%40media/prefers-color-scheme)

### Zone de atingere

**Fapt din sursă.** WCAG 2.2 SC 2.5.8 definește pentru pointer input un target de cel puțin 24 × 24 CSS px, cu excepțiile standardului, și notează că target-urile mai mari ajută utilizatorii. [W3C: Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)

**Recomandare proprie.** Pentru butoanele de progres și jump links țintește 40–44px înălțime vizibilă, cu spațiu între elemente. 24px este pragul minim din WCAG, nu ținta ergonomică pentru o seară aglomerată și un trackpad folosit rapid.

## Ce să evităm ca să nu arate ca AI slop

### Semnale vizuale

**Recomandare proprie, informată de unslop, sites-building și HTML-REPORT.md:**

- hero centrat cu titlu uriaș și o propoziție generică despre viitor;
- gradient violet-albastru, glow, glassmorphism și umbre decorative fără rol;
- trei sau patru coloane de carduri identice, fiecare cu un emoji și o promisiune abstractă;
- pill-uri pentru fiecare cuvânt, badge-uri pentru lucruri care nu sunt stări reale;
- dashboard chrome generic: sidebar voluminos, top bar, avatar fictiv și metrici fără date;
- iconițe inventate în SVG doar pentru ornament;
- fake terminal, fake typing animation și loading state care nu încarcă nimic;
- parallax, confetti și micro-animații la fiecare bifă;
- o paletă saturată în care textul secundar devine ilizibil;
- blocuri cu aceeași dimensiune când conținutul lor are importanță diferită.

### Semnale de text

- unlock, transform, seamless, powerful, game-changing, next-generation;
- "în peisajul în continuă schimbare" fără un fapt concret;
- "experții spun" fără nume și sursă;
- cinci variante ale aceluiași termen în același paragraf doar ca să sune variat;
- regula de trei forțată în fiecare secțiune;
- titluri care sună ca sloganuri, dar nu spun ce trebuie făcut;
- fraze de tip "nu este doar X, ci Y" când ideea poate fi spusă direct;
- concluzie generică despre un viitor luminos;
- repetarea aceleiași explicații în hero, card, callout și footer;
- exemple fabricate, statusuri inventate sau statistici fără sursă.

### Înlocuiri concrete

| Slop | Text util |
|---|---|
| Unlock your GTM potential | Alege un job GTM pe care îl poți demonstra în trei ore |
| Learn more | Vezi exemplul de eval pentru cazul negativ |
| Build something amazing | La finalul blocului ai input, output și un caz de test |
| AI-powered growth | Găsește un semnal public recent și citează-l |
| Your journey starts here | Începe cu propoziția: "Pentru [utilizator], skill-ul face [job]" |
| Success metrics | Done when: ai trei fixture-uri și un verdict pentru fiecare |

**Recomandare proprie.** Lasă ghidul să aibă o voce umană prin exemple precise, mici avertismente și recunoașterea limitelor. "Dacă Actorul rulează de cinci minute, oprește-l și treci la fixture-ul local" este mai credibil decât "rămâi perseverent".

## O implementare de un singur fișier

### Decizia de dependențe

**Recomandare proprie.** Pentru versiunea de hackathon:

- HTML semantic în document;
- CSS inline într-un singur style;
- JavaScript inline, doar pentru checklist, status și eventual copy-to-clipboard;
- fără React, Tailwind, Mermaid, icon library sau font CDN;
- fără fetch la pornirea paginii;
- conținutul critic complet în HTML, ca să meargă offline și cu JavaScript dezactivat.

**Fapt din sursă.** improve-codebase-architecture/HTML-REPORT.md recomandă Tailwind și Mermaid prin CDN pentru un anumit tip de raport vizual. Aceasta este o prescripție a acelui raport, nu o cerință generală pentru orice HTML. În cazul nostru, cerința de fișier local și riscul de rețea justifică adaptarea la CSS și JavaScript native.

**Notă despre biblioteci/framework-uri.** Nu există aici o recomandare de bibliotecă care să merite adăugată. Platforma HTML/CSS are deja elemente native pentru structură, ancore, disclosure și form controls. Dacă ulterior se decide introducerea unei biblioteci, documentația oficială a acelei biblioteci trebuie verificată separat și trebuie justificată printr-o funcție pe care HTML-ul nativ nu o acoperă.

### Structura internă recomandată

**Recomandare proprie.** Păstrează în fișier blocuri ușor de găsit:

1. head: charset, viewport, title, eventual meta description;
2. style: tokens, reset mic, layout, componente și print/reduced-motion;
3. body semantic, cu conținutul în ordinea în care trebuie parcurs;
4. script final, cu progressive enhancement pentru checkbox-uri și copy;
5. footer cu data ghidului, sursele și un link de reset.

Nu genera conținutul principal dintr-un array JavaScript. Pentru un guide local, HTML-ul vizibil este sursa de adevăr și poate fi căutat, printat și parcurs de un screen reader.

### Ce înseamnă interactiv aici

**Recomandare proprie.** Interactivitatea trebuie să accelereze decizia, nu să transforme ghidul într-un joc:

- checkbox-urile marchează pași reali;
- un text 4 din 9 pași arată progresul;
- details arată explicații și fallback-uri la cerere;
- un buton copiază o comandă și confirmă textual Copiat;
- un link Sari la următorul bloc duce la următoarea acțiune;
- resetul este explicit și nu șterge nimic în afară de starea locală a ghidului.

Nu simula lucru care nu s-a întâmplat. Un progress bar nu trebuie să avanseze pentru că utilizatorul a scrollat, iar o etichetă Live nu trebuie să apară dacă nu există o rulare live.

## Checklist vizual și UX pentru HTML

### Înainte de primul demo

- [ ] Fișierul se deschide prin dublu-click și rămâne util fără rețea.
- [ ] Nu există eroare în consola browserului la încărcare.
- [ ] Primul viewport spune scopul, următorul pas și rezultatul așteptat.
- [ ] Există un singur h1 și titlul paginii este descriptiv.
- [ ] lang="ro", diacritice și text fără jargon neexplicat.
- [ ] Navigarea către cele mai importante secțiuni se face în cel mult două interacțiuni.
- [ ] Fiecare secțiune are un Done when concret.
- [ ] Informația critică nu este ascunsă într-un disclosure închis.

### Tastatură și accesibilitate

- [ ] Skip link-ul apare la focus și duce la main.
- [ ] Tab/Shift+Tab au o ordine logică.
- [ ] Enter/Space funcționează pentru fiecare buton și disclosure.
- [ ] Focusul este vizibil și are contrast suficient.
- [ ] Stările nu sunt comunicate doar prin culoare.
- [ ] Textul, linkurile și controalele trec verificarea de contrast.
- [ ] Zoom 200% nu taie text, butoane sau callout-uri.
- [ ] Nu există două direcții de scroll pentru conținut normal.
- [ ] Animațiile sunt reduse când utilizatorul cere prefers-reduced-motion.

### Scanare și responsive

- [ ] Titlurile spun ce conține secțiunea și se pot scana singure.
- [ ] Paragrafele lungi au fost transformate în pași, tabel sau exemplu.
- [ ] Desktopul nu este un dashboard și mobilul nu este o versiune înghesuită a desktopului.
- [ ] Testat la 320px, 375px, 768px și o lățime desktop.
- [ ] Testat cu Cmd/Ctrl+F, fără să fie nevoie de search custom.
- [ ] Print preview-ul păstrează traseul și sursele.

### Anti-slop

- [ ] Nu există slogan fără acțiune sau exemplu.
- [ ] Nu există card, badge, icon sau animație care nu ajută o decizie.
- [ ] Nu există statistică, status sau citat inventat.
- [ ] Exemplele au input, output și limită, nu doar adjective.
- [ ] Tonul este direct, specific și suficient de uman încât să poată fi citit cu voce tare.

## Registrul surselor primare

### Surse locale

- /Users/teo/.codex/skills/research/SKILL.md pentru cercetare pe surse primare și un singur Markdown citat.
- /Users/teo/.codex/skills/prototype/SKILL.md pentru HTML local trivial de rulat, stare vizibilă și lipsa persistenței implicite.
- /Users/teo/.codex/skills/teach/SKILL.md pentru lecții HTML self-contained, feedback și tipografie lizibilă.
- /Users/teo/.codex/plugins/cache/openai-bundled/sites/0.1.43/skills/sites-building/SKILL.md pentru first meaningful preview, copy concret, responsive și accesibilitate practică.
- /Users/teo/.codex/skills/improve-codebase-architecture/SKILL.md și /Users/teo/.codex/skills/improve-codebase-architecture/HTML-REPORT.md pentru stil editorial de raport și direcție vizuală austeră.
- /Users/teo/.codex/skills/unslop/SKILL.md pentru eliminarea tiparelor de text AI și a hype-ului.
- /Users/teo/.codex/skills/writing-for-agents/SKILL.md pentru progressive disclosure, co-location, pruning și completion criteria.
- /Users/teo/.codex/skills/codebase-design/SKILL.md pentru analogia interfață mică, leverage și locality.

### Surse oficiale web

- [GTM Skillathon 2026 pe Luma](https://luma.com/82q9aclg) pentru misiune, public, program și cerința de skill reutilizabilă cu live web data și evals.
- [Total TypeScript: Free Tutorials](https://www.totaltypescript.com/tutorials) pentru abordarea exercise-driven.
- [Total TypeScript: Beginner's TypeScript](https://www.totaltypescript.com/tutorials/beginners-typescript) pentru secvența problemă → documentație → încercare → soluție.
- [Total TypeScript: How To Learn TypeScript](https://www.totaltypescript.com/learn-typescript) pentru întrebări pas cu pas, explicații scurte și linkuri către surse.
- [MDN: HTML ca bază pentru accesibilitate](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML) pentru semantic HTML, source order, limbaj simplu, controls native și keyboard accessibility.
- [MDN: Responsive web design](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design) pentru layout flexibil, mobile-first, media queries și viewport.
- [MDN: details](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details) pentru disclosure nativ și starea open.
- [MDN: focus-visible](https://developer.mozilla.org/en-US/docs/Web/CSS/%3Afocus-visible) pentru focus vizibil fără eliminarea indicatorului de tastatură.
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/%40media/prefers-reduced-motion) pentru reducerea motion-ului la cererea utilizatorului.
- [MDN: prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/%40media/prefers-color-scheme) pentru preferința de light/dark theme, dacă va fi necesară.
- [MDN: clamp](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp) pentru tipografie fluidă cu limite.
- [W3C: WCAG 2.2](https://www.w3.org/TR/WCAG22/) pentru contrast, resize, reflow și cerințele de accesibilitate.
- [W3C: Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html) pentru a nu transmite stări doar prin culoare.
- [W3C: Bypass Blocks](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html) pentru skip link și navigare eficientă.
- [W3C: Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html) pentru titluri și label-uri descriptive.
- [W3C: Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) pentru indicator vizibil de focus.
- [W3C: Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) pentru target-uri pointer de minimum 24 × 24 CSS px, cu excepții.
- [W3C: Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) pentru lățimea echivalentă de 320 CSS px fără scroll bidimensional.
- [W3C: Resize Text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html) pentru text mărit la 200% fără pierdere de funcționalitate.
- [W3C WAI-ARIA APG: Disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/) pentru pattern-ul show/hide accesibil.
- [W3C WAI-ARIA APG: Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) pentru complexitatea reală a tabs-urilor accesibile.

## Verdict final

**Recomandare proprie:** construiește ghidul ca o pagină editorială single-file, cu semantic HTML, un singur traseu principal, jump links, disclosure-uri native, checklist cu feedback textual, timeline clar și un fallback explicit pentru fiecare risc al hackathonului.

Împrumută de la Matt Pocock structura de învățare: problemă, încercare, documentație, soluție. Împrumută din skill-urile locale disciplina: first meaningful preview, progressive disclosure, criterii "Done when" și text fără hype. Lasă standardele W3C și platforma HTML să dicteze comportamentul accesibil. Păstrează CSS-ul și JavaScript-ul mici, ca să nu plătești complexitate pentru efecte care nu ajută pe nimeni să termine un pas.
