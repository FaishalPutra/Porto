/* ═══════════════════════════════════════════════════════════════
   PORTFOLIO : INTERACTIONS
   Content lives in js/data.js (SITE object). This file renders it
   and wires up every interaction. No libraries, no build step.
   ═══════════════════════════════════════════════════════════════ */
"use strict";

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

const REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const TOUCH = window.matchMedia("(pointer: coarse)").matches;

/* ────────────────────────────────────────────────────────────
   SVG ICON LIBRARY (inline, no external requests)
   ──────────────────────────────────────────────────────────── */
const ICONS = {
  ai: '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 1 3 3v1a3 3 0 0 1 3 3 3 3 0 0 1 2 3 3 3 0 0 1-2 3 3 3 0 0 1-3 3v1a3 3 0 0 1-6 0v-1a3 3 0 0 1-3-3 3 3 0 0 1-2-3 3 3 0 0 1 2-3 3 3 0 0 1 3-3V5a3 3 0 0 1 3-3z"/><path d="M12 8v8M9 11h6"/></svg>',
  data: '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></svg>',
  code: '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m8 7-5 5 5 5M16 7l5 5-5 5M13 4l-3 16"/></svg>',
  web: '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 4 5.6 4 9s-1.5 6.4-4 9c-2.5-2.6-4-5.6-4-9s1.5-6.4 4-9z"/></svg>',
  tools: '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4.5 4.5 0 0 0-6 6L3 18l3 3 5.7-5.7a4.5 4.5 0 0 0 6-6L14 13l-3-3 3.7-3.7z"/></svg>',
  spark: '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.2 2.2M16.2 16.2l2.2 2.2M5.6 18.4l2.2-2.2M16.2 7.8l2.2-2.2"/><circle cx="12" cy="12" r="3.2"/></svg>',
  work: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
  education: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 4 10 5-10 5L2 9l10-5z"/><path d="M6 11.5V16c0 1.1 2.7 2.5 6 2.5s6-1.4 6-2.5v-4.5"/></svg>',
  milestone: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l2.9 6.3 6.6.7-5 4.6 1.4 6.6L12 16.9 6.1 20.2l1.4-6.6-5-4.6 6.6-.7L12 2z"/></svg>',
  arrow: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>',
  plus: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
};

/* ────────────────────────────────────────────────────────────
   RENDER : populate the page from SITE (js/data.js)
   ──────────────────────────────────────────────────────────── */
function chipList(items, cls = "chip", tag = "li") {
  return (items || []).map((t) => `<${tag} class="${cls}">${t}</${tag}>`).join("");
}

function projectLinks(links = {}) {
  return [
    { url: links.github, label: "GitHub", style: "btn-ghost" },
    { url: links.demo, label: "Demo Langsung", style: "btn-primary" },
  ]
    .filter((link) => link.url && link.url !== "#")
    .map((link) => `<a href="${link.url}" class="btn ${link.style}" data-link data-cursor target="_blank" rel="noopener"><span>${link.label}</span>${ICONS.arrow}</a>`)
    .join("");
}

const COVER_ART = {
  tourism: `<svg viewBox="0 0 640 360" role="presentation"><path class="art-grid" d="M58 70H582M58 130H582M58 190H582M58 250H582M58 310H582M118 48V312M208 48V312M298 48V312M388 48V312M478 48V312M568 48V312"/><path class="art-area" d="M72 254 153 222 228 239 300 156 365 187 437 119 505 143 566 81V312H72Z"/><path class="art-line" d="M72 254 153 222 228 239 300 156 365 187 437 119 505 143 566 81"/><circle class="art-spot" cx="437" cy="119" r="9"/><circle class="art-spot" cx="566" cy="81" r="9"/><text x="76" y="42">SINYAL DESTINASI</text></svg>`,
  hrms: `<svg viewBox="0 0 640 360" role="presentation"><rect class="art-panel" x="66" y="54" width="508" height="252" rx="18"/><path class="art-grid" d="M90 106H550M90 168H550M90 230H550"/><circle class="art-node" cx="158" cy="137" r="25"/><circle class="art-node" cx="320" cy="137" r="25"/><circle class="art-node" cx="482" cy="137" r="25"/><path class="art-line" d="M183 137H295M345 137H457M158 162V199H482V162"/><rect class="art-bar" x="128" y="214" width="68" height="42" rx="8"/><rect class="art-bar" x="286" y="214" width="68" height="42" rx="8"/><rect class="art-bar" x="448" y="214" width="68" height="42" rx="8"/><text x="115" y="87">KARYAWAN · PELATIHAN · OPERASI</text></svg>`,
  retail: `<svg viewBox="0 0 640 360" role="presentation"><rect class="art-panel" x="54" y="48" width="532" height="264" rx="18"/><path class="art-grid" d="M78 112H562M78 170H562M78 228H562M78 276H562"/><path class="art-line" d="M86 201 161 175 232 191 308 132 375 153 454 96 552 116"/><rect class="art-bar" x="104" y="246" width="34" height="36" rx="6"/><rect class="art-bar" x="164" y="222" width="34" height="60" rx="6"/><rect class="art-bar" x="224" y="235" width="34" height="47" rx="6"/><rect class="art-bar" x="284" y="194" width="34" height="88" rx="6"/><rect class="art-bar" x="344" y="211" width="34" height="71" rx="6"/><circle class="art-spot" cx="454" cy="96" r="8"/><text x="80" y="88">PESANAN / STOK / ARUS KAS</text></svg>`,
  architecture: `<svg viewBox="0 0 640 360" role="presentation"><rect class="art-panel" x="48" y="56" width="544" height="248" rx="18"/><rect class="art-layer" x="86" y="88" width="188" height="56" rx="10"/><rect class="art-layer" x="366" y="88" width="188" height="56" rx="10"/><rect class="art-layer" x="86" y="206" width="188" height="56" rx="10"/><rect class="art-layer" x="366" y="206" width="188" height="56" rx="10"/><path class="art-line" d="M274 116H366M180 144V206M460 144V206M274 234H366"/><circle class="art-spot" cx="320" cy="175" r="18"/><text x="108" y="122">KEBUTUHAN KLIEN</text><text x="398" y="122">PROSES DESAIN</text><text x="108" y="240">TINJAUAN & HAK</text><text x="399" y="240">PENYERAHAN</text></svg>`,
  strategy: `<svg viewBox="0 0 640 360" role="presentation"><rect class="art-panel" x="62" y="48" width="516" height="264" rx="18"/><path class="art-grid" d="M320 76V286M88 180H554"/><circle class="art-radar" cx="320" cy="180" r="77"/><circle class="art-radar" cx="320" cy="180" r="48"/><circle class="art-radar" cx="320" cy="180" r="19"/><path class="art-line" d="M320 180 411 122 465 174 389 245 320 180"/><circle class="art-spot" cx="411" cy="122" r="8"/><text x="94" y="91">PASAR</text><text x="478" y="91">KAPABILITAS</text><text x="94" y="282">PROSES</text><text x="472" y="282">PERTUMBUHAN</text></svg>`,
  agritech: `<svg viewBox="0 0 640 360" role="presentation"><path class="art-field" d="M84 277 270 91 555 91 369 277Z"/><path class="art-grid" d="m116 277 186-186M165 277 351 91M214 277 400 91M263 277 449 91M312 277 498 91M84 228H418M134 178H467M184 129H516"/><path class="art-line" d="M320 106V210M320 152 279 127M320 169 360 140M320 195 281 178"/><circle class="art-spot" cx="320" cy="104" r="12"/><text x="84" y="324">DATA · KEPUTUSAN · TI MODULAR</text></svg>`,
  learning: `<svg viewBox="0 0 640 360" role="presentation"><rect class="art-panel" x="58" y="50" width="524" height="260" rx="18"/><rect class="art-bar" x="91" y="216" width="54" height="64" rx="8"/><rect class="art-bar" x="164" y="184" width="54" height="96" rx="8"/><rect class="art-bar" x="237" y="150" width="54" height="130" rx="8"/><rect class="art-bar" x="310" y="174" width="54" height="106" rx="8"/><path class="art-line" d="M390 242 433 204 476 214 536 116"/><circle class="art-spot" cx="536" cy="116" r="9"/><path class="art-grid" d="M88 280H554M88 140H554M88 94H554"/><text x="90" y="82">PRODUK · SDM · ORGANISASI</text></svg>`,
  matching: `<svg viewBox="0 0 640 360" role="presentation"><path class="art-line" d="M170 112 320 180 470 112M170 248 320 180 470 248M170 112V248M470 112V248"/><circle class="art-node" cx="170" cy="112" r="29"/><circle class="art-node" cx="170" cy="248" r="29"/><circle class="art-node" cx="320" cy="180" r="42"/><circle class="art-node" cx="470" cy="112" r="29"/><circle class="art-node" cx="470" cy="248" r="29"/><circle class="art-spot" cx="320" cy="180" r="11"/><text x="110" y="64">MINAT MAHASISWA</text><text x="425" y="64">KELOMPOK YANG SESUAI</text></svg>`,
  inventory: `<svg viewBox="0 0 640 360" role="presentation"><rect class="art-panel" x="58" y="50" width="524" height="260" rx="18"/><path class="art-grid" d="M90 110H550M90 165H550M90 220H550M90 274H550"/><path class="art-line" d="M90 242 151 226 207 235 267 182 327 193 388 144 443 160 502 106 550 120"/><path class="art-area" d="M90 242 151 226 207 235 267 182 327 193 388 144 443 160 502 106 550 120V274H90Z"/><circle class="art-spot" cx="502" cy="106" r="9"/><text x="88" y="84">STOK · PREDIKSI · ASISTEN</text></svg>`,
};

function projectCover(project) {
  if (project.coverImage) {
    return `<span class="cover-art cover-image"><img src="${project.coverImage}" alt="" loading="lazy" decoding="async"></span>`;
  }
  const art = COVER_ART[project.cover] || COVER_ART.strategy;
  return `<span class="cover-art cover-${project.cover || "strategy"}">${art}<span class="cover-caption">${project.coverLabel || project.category}</span></span>`;
}

function renderAll() {
  // Identity
  $("#brandName").textContent = SITE.firstName;
  $("#heroName").textContent = SITE.firstName;
  $("#heroStatus").textContent = SITE.status;
  $("#heroTagline").textContent = SITE.tagline;
  $("#footerName").textContent = SITE.name;
  $("#year").textContent = new Date().getFullYear();
  $("#mobileMenuMail").textContent = SITE.email;
  document.title = `${SITE.name.replace(/[\[\]]/g, "")} · Portfolio`;

  // Hero + contact chips
  $("#heroChips").innerHTML = chipList(SITE.heroChips);
  $("#contactChips").innerHTML = chipList(SITE.heroChips);

  // About
  $("#profileName").textContent = SITE.name;
  $("#profileRole").textContent = SITE.about.role;
  $("#profileMeta").innerHTML = SITE.about.facts
    .map((f) => `<li><span class="k">${f.label}</span><span class="v">${f.value}</span></li>`)
    .join("");
  $("#aboutParas").innerHTML = SITE.about.paragraphs.map((p) => `<p>${p}</p>`).join("");
  $("#aboutHighlights").innerHTML = SITE.about.highlights
    .map(
      (item) => `
      <article class="about-highlight reveal">
        <p class="highlight-label mono">${item.label}</p>
        <h3>${item.title}</h3>
        <p class="highlight-desc">${item.desc}</p>
      </article>`
    )
    .join("");

  // Work experience
  $("#experienceList").innerHTML = SITE.experience
    .map((job) => `<article class="experience-card glass reveal">
      <div class="experience-header">
        <div class="experience-title-group">
          ${job.logo ? `<img class="experience-logo" src="${job.logo}" alt="Logo ${job.org}" loading="lazy" decoding="async">` : ""}
          <div><p class="mono experience-type">${job.type}</p>
            <h3>${job.title}</h3><p class="experience-org">${job.org}</p></div>
        </div>
        <p class="mono experience-period">${job.period}</p>
      </div>
      <ul class="experience-highlights">${job.highlights.map((item) => `<li>${item}</li>`).join("")}</ul>
      <ul class="chip-row">${chipList(job.tags)}</ul>
    </article>`)
    .join("");

  // Skills
  $("#skillsGrid").innerHTML = SITE.skills
    .map(
      (s, i) => `
      <article class="skill-card glow-track reveal ${s.wide ? "wide" : ""}" style="--d:${i * 0.06}s">
        <div class="skill-icon">${ICONS[s.icon] || ICONS.spark}</div>
        <h3 class="skill-title">${s.title}</h3>
        <p class="skill-blurb">${s.blurb}</p>
        <ul class="chip-row">${chipList(s.tags)}</ul>
      </article>`
    )
    .join("");

  // Project filters
  const cats = ["Semua", ...new Set(SITE.projects.map((p) => p.category))];
  const projectCounts = SITE.projects.reduce((counts, project) => {
    counts[project.category] = (counts[project.category] || 0) + 1;
    return counts;
  }, {});
  $("#filterRow").innerHTML = cats
    .map(
      (c, i) =>
        `<button class="filter-btn ${i === 0 ? "active" : ""}" data-cat="${c}" data-cursor>${c}<span class="filter-count">(${c === "Semua" ? SITE.projects.length : projectCounts[c]})</span></button>`
    )
    .join("");

  renderProjects("Semua");

  // Featured
  const f = SITE.featured;
  $("#featuredPreview").innerHTML = `<ol class="project-flow">${f.flow
    .map((step, i) => `<li><span class="mono">0${i + 1}</span><span>${step}</span></li>`)
    .join("")}</ol>`;
  $("#featuredMedia .frame-thumbs").innerHTML = f.highlights
    .map((text) => `<div class="frame mini"><span class="mono">${text}</span></div>`)
    .join("");
  $("#featuredTitle").textContent = f.title;
  $("#featuredDesc").textContent = f.desc;
  $("#featuredTech").innerHTML = chipList(f.tech);
  $("#featuredAccordion").innerHTML = f.sections
    .map(
      (s, i) => `
      <div class="acc-item ${i === 0 ? "open" : ""}">
        <button class="acc-btn" data-cursor aria-expanded="${i === 0}">
          <span>${s.title}</span>${ICONS.plus}
        </button>
        <div class="acc-panel"><div class="acc-panel-inner"><p>${s.body}</p></div></div>
      </div>`
    )
    .join("");
  $("#featuredLinks").innerHTML = projectLinks(f.links);

  // Timeline
  $("#timeline").innerHTML = SITE.timeline
    .map(
      (t) => `
      <div class="tl-item reveal">
        <div class="tl-dot">${ICONS[t.type] || ICONS.milestone}</div>
        <div class="tl-card">
          <p class="tl-period">${t.period}</p>
          <h3 class="tl-title">${t.title}</h3>
          <p class="tl-org">${t.org}</p>
          <p class="tl-desc">${t.desc}</p>
        </div>
      </div>`
    )
    .join("");

  $("#certificationsGrid").innerHTML = SITE.certifications
    .map((cert) => `<article class="cert-card glass reveal">
      <p class="mono cert-issuer">${cert.issuer} · ${cert.year}</p>
      <h3>${cert.title}</h3>
      ${cert.code ? `<p class="mono cert-code">${cert.code}</p>` : ""}
      ${cert.url ? `<a class="cert-link mono" href="${cert.url}" target="_blank" rel="noopener" data-cursor aria-label="Verifikasi sertifikat ${cert.title}">Verifikasi sertifikat ${ICONS.arrow}</a>` : ""}
    </article>`)
    .join("");

  // Marquee (duplicate content for a seamless loop)
  const chips = SITE.exploring
    .map((e) => `<span class="marquee-chip"><span class="dot"></span>${e}</span>`)
    .join("");
  $("#marqueeA .marquee-track").innerHTML = chips + chips;
  $("#marqueeB .marquee-track").innerHTML = chips + chips;

  // Contact
  $("#emailText").textContent = SITE.email;
  $("#socialRow").innerHTML = SITE.socials
    .map(
      (s) => `
      <li><a class="social-card" href="${s.url}" data-link data-cursor target="_blank" rel="noopener">
        <span class="social-label">${s.label.toUpperCase()} ${ICONS.arrow}</span>
        <span class="social-handle">${s.handle}</span>
      </a></li>`
    )
    .join("");
}

function renderProjects(cat) {
  const list = SITE.projects
    .filter((p) => cat === "Semua" || p.category === cat)
    .sort((a, b) => Number(b.category === "Business Analysis") - Number(a.category === "Business Analysis"));
  const track = $("#projectsGrid");
  track.innerHTML = list
    .map(
      (p, i) => `
      <button class="project-card tilt" data-project="${p.id}" style="--d:${i * 0.07}s"
              data-cursor-label="LIHAT" aria-haspopup="dialog" aria-label="Buka detail ${p.title}">
          <span class="project-preview" aria-hidden="true">${projectCover(p)}</span>
        <span class="project-info">
          <span class="project-top">
            <span class="project-cat">${p.category}</span>
            <span class="project-year">${p.year}</span>
          </span>
          <span class="project-title">${p.title} ${ICONS.arrow}</span>
          <span class="project-desc">${p.desc}</span>
          <span class="chip-row">${chipList(p.tech, "chip", "span")}</span>
        </span>
      </button>`
    )
    .join("");
  track.scrollTo({ left: 0, behavior: "auto" });
  bindTilt(track);
  updateProjectCarousel();
}

function getActiveProjectIndex(track, cards) {
  if (!cards.length) return 0;
  let activeIndex = 0;
  let closestDistance = Infinity;
  cards.forEach((card, index) => {
    const cardScrollLeft = card.offsetLeft - track.offsetLeft;
    const distance = Math.abs(cardScrollLeft - track.scrollLeft);
    if (distance < closestDistance) {
      closestDistance = distance;
      activeIndex = index;
    }
  });
  return activeIndex;
}

function updateProjectCarousel() {
  const track = $("#projectsGrid");
  if (!track) return;
  const cards = $$(".project-card", track);
  const index = getActiveProjectIndex(track, cards);
  const counter = $("#projectCounter");
  counter.textContent = `${String(index + 1).padStart(2, "0")} / ${String(cards.length).padStart(2, "0")}`;
  counter.setAttribute("aria-label", `Project ${index + 1} of ${cards.length}`);
  $("#previousProject").disabled = index === 0 || cards.length < 2;
  $("#nextProject").disabled = index === cards.length - 1 || cards.length < 2;
}

function slideProject(direction) {
  const track = $("#projectsGrid");
  const cards = $$(".project-card", track);
  const index = getActiveProjectIndex(track, cards);
  const nextCard = cards[index + direction];
  if (!nextCard) return;
  const targetLeft = nextCard.offsetLeft - track.offsetLeft;
  track.scrollTo({ left: targetLeft, behavior: REDUCE ? "auto" : "smooth" });
}

function initProjectCarousel() {
  const track = $("#projectsGrid");
  track.addEventListener("scroll", updateProjectCarousel, { passive: true });
  track.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      slideProject(event.key === "ArrowLeft" ? -1 : 1);
    }
  });
  $("#previousProject").addEventListener("click", () => slideProject(-1));
  $("#nextProject").addEventListener("click", () => slideProject(1));
  window.addEventListener("resize", updateProjectCarousel, { passive: true });
}

/* ────────────────────────────────────────────────────────────
   TOAST
   ──────────────────────────────────────────────────────────── */
let toastTimer;
function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
}

/* ────────────────────────────────────────────────────────────
   BEHAVIOR
   ──────────────────────────────────────────────────────────── */
function initPreloader() {
  const pre = $("#preloader");
  const done = () => {
    pre.classList.add("done");
    setTimeout(() => pre.remove(), 400);
  };
  if (REDUCE) return done();
  // Let the first rendered frame appear, but never wait for remote fonts or images.
  setTimeout(done, 240);
}

function initTheme() {
  $("#themeToggle").addEventListener("click", () => {
    const html = document.documentElement;
    const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    try { localStorage.setItem("pf-theme", next); } catch (e) { /* private mode */ }
  });
}

function initMobileMenu() {
  const btn = $("#menuToggle");
  const menu = $("#mobileMenu");
  const setOpen = (open) => {
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.classList.toggle("open", open);
    menu.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
  };
  btn.addEventListener("click", () => setOpen(btn.getAttribute("aria-expanded") !== "true"));
  $$("#mobileMenu a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("open")) setOpen(false);
  });
}

function initScrollProgress() {
  const bar = $("#scrollProgress");
  let ticking = false;
  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    ticking = false;
  };
  addEventListener("scroll", () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
}

function initNavSpy() {
  const links = $$(".nav-links a");
  const map = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((a) => { a.classList.remove("active"); a.removeAttribute("aria-current"); });
        const link = map.get(en.target.id);
        if (link) { link.classList.add("active"); link.setAttribute("aria-current", "true"); }
      });
    },
    { rootMargin: "-35% 0px -55% 0px" }
  );
  ["home", "about", "experience", "skills", "projects", "certifications", "contact"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) obs.observe(el);
  });
}

function initReveal() {
  const els = $$(".reveal");
  if (REDUCE) { els.forEach((el) => el.classList.add("in")); return; }
  const obs = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("in"); obs.unobserve(en.target); }
    }),
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );
  els.forEach((el) => obs.observe(el));
}

/* 3D tilt + mouse-follow glow (shared handler) */
function bindTilt(scope) {
  if (TOUCH || REDUCE) return;
  $$(".tilt, .glow-track", scope || document).forEach((card) => {
    if (card.dataset.tiltBound) return;
    card.dataset.tiltBound = "1";
    let raf = null;
    card.addEventListener("pointermove", (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        card.style.setProperty("--mx", `${px * 100}%`);
        card.style.setProperty("--my", `${py * 100}%`);
        if (card.classList.contains("tilt")) {
          card.style.setProperty("--ry", `${(px - 0.5) * 7}deg`);
          card.style.setProperty("--rx", `${(0.5 - py) * 7}deg`);
        }
        raf = null;
      });
    });
    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    });
  });
}

/* Magnetic buttons */
function initMagnetic() {
  if (TOUCH || REDUCE) return;
  $$(".magnetic").forEach((btn) => {
    btn.addEventListener("pointermove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.18;
      const y = (e.clientY - r.top - r.height / 2) * 0.3;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener("pointerleave", () => { btn.style.transform = ""; });
  });
}

/* Custom cursor ring */
function initCursor() {
  if (TOUCH || REDUCE) return;
  const ring = $("#cursorRing");
  const label = $("#cursorLabel");
  let x = -100, y = -100, cx = -100, cy = -100;
  addEventListener("pointermove", (e) => {
    x = e.clientX; y = e.clientY;
    ring.classList.add("visible");
  }, { passive: true });
  document.addEventListener("mouseleave", () => ring.classList.remove("visible"));
  (function loop() {
    cx += (x - cx) * 0.16;
    cy += (y - cy) * 0.16;
    const half = ring.offsetWidth / 2;
    ring.style.transform = `translate(${cx - half}px, ${cy - half}px)`;
    requestAnimationFrame(loop);
  })();
  document.addEventListener("mouseover", (e) => {
    const labeled = e.target.closest("[data-cursor-label]");
    const hover = e.target.closest("[data-cursor], a, button");
    if (labeled) {
      label.textContent = labeled.dataset.cursorLabel;
      ring.classList.add("labeled");
      ring.classList.remove("hovering");
    } else if (hover) {
      ring.classList.add("hovering");
      ring.classList.remove("labeled");
    } else {
      ring.classList.remove("hovering", "labeled");
    }
  });
}

/* Ambient canvas particles */
function initParticles() {
  const canvas = $("#bgCanvas");
  const ctx = canvas.getContext("2d");
  let w, h, dpr, particles = [];
  let mx = 0.5, my = 0.5;

  const resize = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = canvas.width = innerWidth * dpr;
    h = canvas.height = innerHeight * dpr;
    canvas.style.width = innerWidth + "px";
    canvas.style.height = innerHeight + "px";
  };
  resize();

  const N = Math.min(70, Math.floor(innerWidth / 22));
  for (let i = 0; i < N; i++) {
    particles.push({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.4 + 0.4,
      vx: (Math.random() - 0.5) * 0.00022,
      vy: (Math.random() - 0.5) * 0.00022,
      depth: Math.random() * 0.7 + 0.3,
      hue: Math.random() < 0.6 ? "90,155,235" : "255,230,70",
      tw: Math.random() * Math.PI * 2,
    });
  }

  const draw = (t) => {
    ctx.clearRect(0, 0, w, h);
    const light = document.documentElement.getAttribute("data-theme") === "light";
    particles.forEach((p) => {
      p.x = (p.x + p.vx + 1) % 1;
      p.y = (p.y + p.vy + 1) % 1;
      const ox = (mx - 0.5) * 30 * p.depth * dpr;
      const oy = (my - 0.5) * 20 * p.depth * dpr;
      const alpha = (0.14 + 0.12 * Math.sin(t / 1400 + p.tw)) * p.depth * (light ? 0.9 : 1);
      ctx.beginPath();
      ctx.arc(p.x * w + ox, p.y * h + oy, p.r * dpr, 0, Math.PI * 2);
      ctx.fillStyle = light ? `rgba(0,77,152,${alpha})` : `rgba(${p.hue},${alpha})`;
      ctx.fill();
    });
  };

  if (REDUCE) { draw(0); return; }

  addEventListener("pointermove", (e) => {
    mx = e.clientX / innerWidth;
    my = e.clientY / innerHeight;
  }, { passive: true });

  let resizeTimer;
  addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  (function loop(t) {
    draw(t || 0);
    requestAnimationFrame(loop);
  })(0);
}

/* Role rotator : gentle crossfade between roles */
function initRoles() {
  const el = $("#roleText");
  const roles = SITE.roles.length ? SITE.roles : [SITE.about.role];
  el.textContent = roles[0];
  if (REDUCE || roles.length === 1) return;
  let i = 0;
  setInterval(() => {
    el.classList.add("swapping");
    setTimeout(() => {
      i = (i + 1) % roles.length;
      el.textContent = roles[i];
      el.classList.remove("swapping");
    }, 420);
  }, 3200);
}

/* Project modal */
function initModal() {
  const modal = $("#projectModal");
  const body = $("#modalBody");
  const closeBtn = $("#modalClose");
  let lastFocus = null;

  const open = (id) => {
    const p = SITE.projects.find((x) => x.id === id);
    if (!p) return;
    lastFocus = document.activeElement;
    body.innerHTML = `
      <h3 id="modalTitle" class="visually-hidden">Detail ${p.title}</h3>
        <div class="modal-preview">${projectCover(p)}</div>
      <div class="modal-meta"><span class="mono cat">${p.category}</span><span class="mono year">${p.year}</span></div>
      <p class="modal-title-text">${p.title}</p>
      <p class="modal-desc">${p.desc}</p>
      <p class="modal-details">${p.details}</p>
      <p class="modal-section-label">PERANGKAT & METODE</p>
      <ul class="chip-row">${chipList(p.tech)}</ul>
      <div class="modal-links">
        ${projectLinks(p.links)}
      </div>`;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  };

  const close = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  };

  document.addEventListener("click", (e) => {
    const card = e.target.closest("[data-project]");
    if (card) open(card.dataset.project);
  });
  closeBtn.addEventListener("click", close);
  $("#modalBackdrop").addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "Tab") {
      // simple focus trap
      const focusables = $$("button, a[href]", modal);
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
      else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
    }
  });
}

/* Filters */
function initFilters() {
  $("#filterRow").addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    $$(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderProjects(btn.dataset.cat);
  });
}

/* Featured accordion */
function initAccordion() {
  $("#featuredAccordion").addEventListener("click", (e) => {
    const btn = e.target.closest(".acc-btn");
    if (!btn) return;
    const item = btn.parentElement;
    const isOpen = item.classList.contains("open");
    $$("#featuredAccordion .acc-item").forEach((i) => {
      i.classList.remove("open");
      i.querySelector(".acc-btn").setAttribute("aria-expanded", "false");
    });
    if (!isOpen) {
      item.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
    }
  });
}

/* Link fallback + email copy */
function initLinks() {
  document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-link]");
    if (link && (link.getAttribute("href") === "#" || link.getAttribute("href") === "")) {
      e.preventDefault();
      toast("This link is not available yet.");
    }
  });

  $("#emailBtn").addEventListener("click", async () => {
    const email = SITE.email;
    try {
      await navigator.clipboard.writeText(email);
      toast("Alamat surel tersalin ✓");
    } catch (err) {
      toast(email);
    }
  });
}

function initToTop() {
  $("#toTop").addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: REDUCE ? "auto" : "smooth" })
  );
}

/* ────────────────────────────────────────────────────────────
   BOOT
   ──────────────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  // Dev/QA helper: ?snapshot renders everything revealed (used for full-page screenshots)
  if (location.search.includes("snapshot")) document.documentElement.classList.add("snapshot");
  const themeParam = location.search.match(/theme=(light|dark)/);
  if (themeParam) document.documentElement.setAttribute("data-theme", themeParam[1]);
  renderAll();
  initPreloader();
  initTheme();
  initMobileMenu();
  initScrollProgress();
  initNavSpy();
  initReveal();
  bindTilt(document);
  initMagnetic();
  initCursor();
  initParticles();
  initRoles();
  initModal();
  initFilters();
  initProjectCarousel();
  initAccordion();
  initLinks();
  initToTop();
});
