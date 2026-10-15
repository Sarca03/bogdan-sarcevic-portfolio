const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* ignore */ } }
};
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile = () => window.matchMedia('(max-width: 767px)').matches;

// Prevodi
const translations = {
    sr: {
        boot1: "> Pokrećem sistem...",
        boot2: "> Učitavam projekte... 4 pronađena",
        boot3: "> Spremno.",
        icon_about: "O meni", icon_skills: "Alati", icon_projects: "Projekti", icon_services: "Usluge", icon_contact: "Kontakt",
        win_about: "O meni", win_skills: "Alati", win_projects: "Projekti", win_services: "Usluge", win_contact: "Kontakt",
        readme_role: "Sajtovi i web aplikacije, Užice",
        readme_text: "Pravim sajtove za male firme i ljude koji rade za sebe, u Užicu i online. Dizajniram u Figmi i kodiram sam, pa ono što vidiš u mockupu to i dobiješ u browseru.",
        readme_cta: "[ Pošalji upit ]",
        readme_cta2: "[ Pogledaj radove ]",
        readme_status: "Slobodan za nove projekte",
        about_subtitle: "Sajtovi i web aplikacije",
        about_text: "Dizajniram i kodiram sam, pa nema gubitka između skice i gotovog sajta. Kad treba, napravim i ceo backend sa bazom i prijavom korisnika.",
        about_personal: "Van programiranja igram košarku i idem u teretanu.",
        proj_desc1: "Ovaj sajt. Retro operativni sistem u čistom HTML-u, CSS-u i JavaScriptu: prozori koji se pomeraju, terminal i zvuk generisan u kodu.",
        proj_desc2: "Sistem za upravljanje auto perionicom: klijenti, vozila, termini, radnici i usluge, sa PostgreSQL bazom u oblaku.",
        proj_desc3: "Blog u Flasku gde pišem o greškama na koje sam naišao u projektima. Čitaoci mogu da se registruju i komentarišu.",
        proj_hard3: "uloge. Svako može da komentariše, ali članke objavljuje samo admin, a svaka forma je zaštićena CSRF tokenom.",
        proj_desc4: "Menadžer zadataka sa prioritetima, rokovima, pretragom i pregledom za narednih 7 dana. Svaki korisnik vidi samo svoje zadatke.",
        proj_hard4: "prebaciti aplikaciju sa MySQL-a na PostgreSQL u oblaku i spakovati je u Docker da radi na Render-u.",
        proj_live: "[ Pogledaj uživo -> ]",
        proj_code: "[ Kod na GitHub-u ]",
        proj_hard_label: "Najteže:", proj_personal: "Lični projekat",
        proj_hard2: "povezati sve sa bazom. Prijava i registracija rade preko JWT tokena, a prihod se računa samo od završenih termina.",
        sk1: "> Svaki dan", sk1_note: "Ovim radim svaki sajt.",
        sk2: "> Na projektima", sk2_note: "Na ovome su napravljeni moji projekti.",
        sk3: "> Znam osnove",
        todo1: "auto perionica", todo2: "ovaj sajt", todo3: "tvoj projekat", todo4: "blog", todo5: "task menadžer",
        sound_on: "ZVUK: DA", sound_off: "ZVUK: NE",
        svc1_title: "Sajt od nule", svc1_text: "Dizajn i kod, od skice do objave na tvom domenu.",
        svc2_title: "Redizajn", svc2_text: "Imaš sajt koji ti je neprijatno da pošalješ klijentu? Napravimo ga ponovo.",
        proc_title: "> Kako radim",
        proc1: "1. Kratak razgovor: šta ti treba i za koga je sajt.",
        proc2: "2. Plan i cena: tačno šta ulazi u posao, pre nego što počnem.",
        proc3: "3. Dizajn u Figmi, pa tvoje izmene.",
        proc4: "4. Izrada i probna verzija na linku.",
        proc5: "5. Objava na tvom domenu i uputstvo kako da menjaš sadržaj.",
        svc3_title: "Grafički dizajn", svc3_text: "Logo i vizuelni identitet, materijali za društvene mreže.",
        contact_text: "Javi se i napiši par rečenica o tome šta ti treba.",
        contact_copy: "[ kopiraj ]", contact_copied: "[ kopirano ]",
        contact_profile: "Profil ->",
        term_label: "> TERMINAL (ukucaj help)",
        term_ready: "Sistem spreman. Unesi komandu u polje ispod.",
        term_placeholder: "npr. help, projects, contact...",
        term_help: "Komande: about, skills, projects, services, contact, clear, lang",
        term_open: "Otvaram: ",
        term_unknown: "Nepoznata komanda: ",
        aria_todo: "Otvori kontakt", aria_min: "Minimizuj", aria_close: "Zatvori", aria_taskbar: "Otvoreni prozori",
        alt_carwash: "Auto perionica, kontrolna tabla", alt_blog: "DevBlog, početna strana",
        alt_protask: "ProTask, kontrolna tabla sa zadacima", alt_portfolio: "Bogdan OS, ovaj sajt"
    },
    en: {
        boot1: "> Starting system...",
        boot2: "> Loading projects... 4 found",
        boot3: "> Ready.",
        icon_about: "About me", icon_skills: "Tools", icon_projects: "Projects", icon_services: "Services", icon_contact: "Contact",
        win_about: "About me", win_skills: "Tools", win_projects: "Projects", win_services: "Services", win_contact: "Contact",
        readme_role: "Websites and web apps, Užice",
        readme_text: "I build websites for small businesses and people who work for themselves, in Užice and online. I design in Figma and code it myself, so what you see in the mockup is what you get in the browser.",
        readme_cta: "[ Send an inquiry ]",
        readme_cta2: "[ See my work ]",
        readme_status: "Available for new projects",
        about_subtitle: "Websites and web apps",
        about_text: "I design and code everything myself, so nothing gets lost between the sketch and the finished site. When needed, I also build the backend with a database and user login.",
        about_personal: "Outside of coding I play basketball and go to the gym.",
        proj_desc1: "This site. A retro operating system in plain HTML, CSS and JavaScript: draggable windows, a terminal and sound generated in code.",
        proj_desc2: "Car wash management system: clients, vehicles, appointments, workers and services, backed by a PostgreSQL database in the cloud.",
        proj_desc3: "A Flask blog where I write about bugs I ran into on my projects. Readers can sign up and comment.",
        proj_hard3: "roles. Anyone can comment, only the admin can publish posts, and every form is protected with a CSRF token.",
        proj_desc4: "A task manager with priorities, due dates, search and a 7-day overview. Every user sees only their own tasks.",
        proj_hard4: "moving the app from MySQL to a cloud PostgreSQL database and packaging it in Docker so it runs on Render.",
        proj_live: "[ View live -> ]",
        proj_code: "[ Code on GitHub ]",
        proj_hard_label: "Hardest part:", proj_personal: "Personal project",
        proj_hard2: "wiring everything to the database. Login and sign-up use JWT tokens, and revenue only counts completed appointments.",
        sk1: "> Every day", sk1_note: "Every site I build uses these.",
        sk2: "> On projects", sk2_note: "My projects are built with these.",
        sk3: "> Know the basics",
        todo1: "car wash app", todo2: "this site", todo3: "your project", todo4: "blog", todo5: "task manager",
        sound_on: "SOUND: ON", sound_off: "SOUND: OFF",
        svc1_title: "Website from scratch", svc1_text: "Design and code, from sketch to launch on your domain.",
        svc2_title: "Redesign", svc2_text: "Have a site you're embarrassed to send to clients? Let's rebuild it.",
        proc_title: "> How I work",
        proc1: "1. A short call: what you need and who the site is for.",
        proc2: "2. Plan and price: exactly what the job includes, before I start.",
        proc3: "3. Design in Figma, then your changes.",
        proc4: "4. Build, with a preview version on a link.",
        proc5: "5. Launch on your domain, plus a short guide for editing the content.",
        svc3_title: "Graphic design", svc3_text: "Logo and visual identity, social media materials.",
        contact_text: "Get in touch and write a few sentences about what you need.",
        contact_copy: "[ copy ]", contact_copied: "[ copied ]",
        contact_profile: "Profile ->",
        term_label: "> TERMINAL (type help)",
        term_ready: "System ready. Enter a command below.",
        term_placeholder: "e.g. help, projects, contact...",
        term_help: "Commands: about, skills, projects, services, contact, clear, lang",
        term_open: "Opening: ",
        term_unknown: "Unknown command: ",
        aria_todo: "Open contact", aria_min: "Minimize", aria_close: "Close", aria_taskbar: "Open windows",
        alt_carwash: "Car wash app, dashboard", alt_blog: "DevBlog, home page",
        alt_protask: "ProTask, task dashboard", alt_portfolio: "Bogdan OS, this site"
    }
};

let currentLang = 'sr';
const t = (key) => (translations[currentLang] && translations[currentLang][key]) || key;

let audioCtx = null;
// Zvuk je ugašen dok ga posetilac sam ne uključi
let soundOn = store.get('sound') === 'on';

function getAudioCtx() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
}

function playBeep(frequency = 440, duration = 0.05, type = 'square') {
    if (!soundOn) return;
    try {
        const ctx = getAudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.value = frequency;
        gain.gain.setValueAtTime(0.03, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
    } catch (err) {
        console.warn('Zvuk nije dostupan:', err);
    }
}

const soundBtn = $('#sound-btn');
function renderSoundBtn() { soundBtn.textContent = t(soundOn ? 'sound_on' : 'sound_off'); }
soundBtn.addEventListener('click', () => {
    soundOn = !soundOn;
    store.set('sound', soundOn ? 'on' : 'off');
    renderSoundBtn();
    playBeep(800, 0.05);
});
renderSoundBtn();

function updateClock() {
    const el = $('#live-clock');
    if (el) el.textContent = new Date().toTimeString().split(' ')[0];
}
updateClock();
setInterval(updateClock, 1000);

/* Boot ide sam, traje kratko, preskače se klikom ili tasterom
   i prikazuje se samo jednom po sesiji. */
const introScreen = $('#intro-screen');
const mainDesktop = $('#main-desktop');
let booted = false;

function showDesktop() {
    if (booted) return;
    booted = true;
    introScreen.style.opacity = '0';
    mainDesktop.classList.remove('hidden');
    requestAnimationFrame(() => { mainDesktop.style.opacity = '1'; });
    setTimeout(() => { introScreen.style.display = 'none'; }, 500);
    try { sessionStorage.setItem('booted', '1'); } catch { /* ignore */ }
}

let seenBoot = false;
try { seenBoot = sessionStorage.getItem('booted') === '1'; } catch { /* ignore */ }

if (seenBoot || prefersReduced) {
    introScreen.style.display = 'none';
    booted = true;
    mainDesktop.classList.remove('hidden');
    mainDesktop.style.opacity = '1';
} else {
    $$('.boot-line').forEach((line, i) => {
        setTimeout(() => { line.style.opacity = '1'; }, 200 * (i + 1));
    });
    setTimeout(showDesktop, 1300);
    introScreen.addEventListener('click', showDesktop);
    document.addEventListener('keydown', showDesktop, { once: true });
}

// Prozori
const WIN_IDS = ['about', 'skills', 'projects', 'services', 'contact'];
const winState = {};            // 'closed' | 'open' | 'min'
WIN_IDS.forEach(id => { winState[id] = 'closed'; });
let order = [];
let zTop = 20;
let activeId = null;
const lastTrigger = {};

const winEl = (id) => document.getElementById(id + '-window');

function placeWindow(el) {
    const n = order.length;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    let x = 72 + n * 32;
    let y = 220 + n * 28;
    x = Math.max(8, Math.min(x, window.innerWidth - w - 16));
    y = Math.max(52, Math.min(y, window.innerHeight - h - 56));
    el.style.left = x + 'px';
    el.style.top = y + 'px';
}

function topmostOpen() {
    let best = null;
    let bestZ = -1;
    order.forEach(id => {
        if (winState[id] !== 'open') return;
        const z = parseInt(winEl(id).style.zIndex || '0', 10);
        if (z > bestZ) { bestZ = z; best = id; }
    });
    return best;
}

function focusWindow(id, grab = false) {
    const el = winEl(id);
    if (!el) return;
    zTop++;
    el.style.zIndex = zTop;
    activeId = id;
    WIN_IDS.forEach(w => winEl(w).classList.toggle('is-active', w === id));
    if (grab) el.focus({ preventScroll: true });
    renderTaskbar();
}

function openWindow(id, trigger, grab = true) {
    const el = winEl(id);
    if (!el) return;
    playBeep(520, 0.08);
    if (trigger) lastTrigger[id] = trigger;
    if (winState[id] === 'closed') {
        el.classList.remove('hidden');
        placeWindow(el);
        order.push(id);
    } else if (winState[id] === 'min') {
        el.classList.remove('hidden');
    }
    winState[id] = 'open';
    focusWindow(id, grab);
}

function closeWindow(id) {
    const el = winEl(id);
    if (!el || winState[id] === 'closed') return;
    playBeep(300, 0.08);
    el.classList.add('hidden');
    winState[id] = 'closed';
    order = order.filter(x => x !== id);
    if (activeId === id) {
        activeId = null;
        const next = topmostOpen();
        if (next) focusWindow(next, true);
        else if (lastTrigger[id] && document.contains(lastTrigger[id])) lastTrigger[id].focus();
    }
    renderTaskbar();
}

function minimizeWindow(id) {
    const el = winEl(id);
    if (!el || winState[id] !== 'open') return;
    playBeep(400, 0.06);
    el.classList.add('hidden');
    winState[id] = 'min';
    if (activeId === id) {
        activeId = null;
        const next = topmostOpen();
        if (next) focusWindow(next);
    }
    renderTaskbar();
}

function renderTaskbar() {
    const bar = $('#taskbar-tasks');
    if (!bar) return;
    bar.replaceChildren();
    order.forEach(id => {
        const b = document.createElement('button');
        b.type = 'button';
        b.dataset.task = id;
        b.className = 'task-btn' + (activeId === id && winState[id] === 'open' ? ' is-active' : '');
        b.textContent = t('win_' + id);
        bar.appendChild(b);
    });
}

/* Klikovi (delegacija) */
document.addEventListener('click', (e) => {
    const openBtn = e.target.closest('[data-open]');
    if (openBtn) { openWindow(openBtn.dataset.open, openBtn); return; }

    const closeBtn = e.target.closest('[data-close]');
    if (closeBtn) { closeWindow(closeBtn.dataset.close); return; }

    const minBtn = e.target.closest('[data-min]');
    if (minBtn) { minimizeWindow(minBtn.dataset.min); return; }

    const task = e.target.closest('[data-task]');
    if (task) {
        const id = task.dataset.task;
        if (winState[id] === 'min') openWindow(id);
        else if (activeId === id) minimizeWindow(id);
        else focusWindow(id, true);
        return;
    }

    const copyBtn = e.target.closest('[data-copy]');
    if (copyBtn && navigator.clipboard) {
        navigator.clipboard.writeText(copyBtn.dataset.copy).then(() => {
            copyBtn.textContent = t('contact_copied');
            setTimeout(() => { copyBtn.textContent = t('contact_copy'); }, 1500);
        }).catch(() => { /* ignore */ });
    }
});

/* Fokus kad klikneš bilo gde u prozoru */
WIN_IDS.forEach(id => {
    winEl(id).addEventListener('pointerdown', () => {
        if (activeId !== id) focusWindow(id);
    });
});

/* Esc zatvara samo aktivan prozor */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeId) closeWindow(activeId);
});

$$('.window-header').forEach(header => {
    header.addEventListener('pointerdown', (e) => {
        if (isMobile()) return;
        if (e.target.closest('button')) return;
        const el = header.closest('.os-window');
        focusWindow(el.dataset.win);

        const rect = el.getBoundingClientRect();
        const dx = e.clientX - rect.left;
        const dy = e.clientY - rect.top;
        header.setPointerCapture(e.pointerId);

        const move = (ev) => {
            const minVisible = 80;
            let x = ev.clientX - dx;
            let y = ev.clientY - dy;
            x = Math.max(-el.offsetWidth + minVisible, Math.min(x, window.innerWidth - minVisible));
            y = Math.max(44, Math.min(y, window.innerHeight - 60));
            el.style.left = x + 'px';
            el.style.top = y + 'px';
        };
        const up = (ev) => {
            header.releasePointerCapture(ev.pointerId);
            header.removeEventListener('pointermove', move);
            header.removeEventListener('pointerup', up);
            header.removeEventListener('pointercancel', up);
        };
        header.addEventListener('pointermove', move);
        header.addEventListener('pointerup', up);
        header.addEventListener('pointercancel', up);
    });
});

// Terminal
const termInput = $('#terminal-input');
const termOut = $('#terminal-output');
const termHistory = [];
let histIdx = 0;

function termPrint(text, cls) {
    const p = document.createElement('p');
    p.textContent = text;
    if (cls) p.className = cls;
    termOut.appendChild(p);
    termOut.scrollTop = termOut.scrollHeight;
}

function openFromTerm(id) {
    openWindow(id, termInput, false);
    termPrint('> ' + t('term_open') + t('win_' + id));
}

const commands = {
    help: () => termPrint('> ' + t('term_help')),
    about: () => openFromTerm('about'),
    skills: () => openFromTerm('skills'),
    projects: () => openFromTerm('projects'),
    services: () => openFromTerm('services'),
    contact: () => openFromTerm('contact'),
    clear: () => termOut.replaceChildren(),
    lang: () => $('#lang-btn').click()
};

termInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        histIdx = Math.max(0, histIdx - 1);
        termInput.value = termHistory[histIdx] || '';
        return;
    }
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        histIdx = Math.min(termHistory.length, histIdx + 1);
        termInput.value = termHistory[histIdx] || '';
        return;
    }
    if (e.key !== 'Enter') return;

    const raw = termInput.value.trim();
    termInput.value = '';
    if (!raw) return;

    playBeep(700, 0.04);
    termHistory.push(raw);
    histIdx = termHistory.length;

    const cmd = raw.toLowerCase();
    if (cmd !== 'clear') termPrint('$ ' + raw, 'text-white');
    if (commands[cmd]) commands[cmd]();
    else termPrint('> ' + t('term_unknown') + '"' + raw + '"', 'text-red-400');
});

// Jezik
const langBtn = $('#lang-btn');

function applyLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    langBtn.textContent = lang === 'sr' ? 'EN' : 'SR';

    $$('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[lang][key]) el.textContent = translations[lang][key];
    });
    // Atributi koji se prevode: data-translate-placeholder, -aria, -alt
    const attrs = { placeholder: 'placeholder', aria: 'aria-label', alt: 'alt' };
    Object.entries(attrs).forEach(([name, attr]) => {
        $$(`[data-translate-${name}]`).forEach(el => {
            const text = translations[lang][el.getAttribute(`data-translate-${name}`)];
            if (text) el.setAttribute(attr, text);
        });
    });

    renderTaskbar();
    renderSoundBtn();
    store.set('preferredLang', lang);
}

langBtn.addEventListener('click', () => {
    playBeep(800, 0.05);
    applyLanguage(currentLang === 'sr' ? 'en' : 'sr');
});

const savedLang = store.get('preferredLang');
applyLanguage(savedLang && translations[savedLang] ? savedLang : 'sr');