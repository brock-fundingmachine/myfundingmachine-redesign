(() => {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  root.classList.add("js");

  // FM Live 2027 countdown.
  const countdown = document.getElementById("countdown");
  const eventStart = new Date("2027-02-25T09:00:00-05:00").getTime();
  const cd = countdown ? {
    d: countdown.querySelector('[data-cd="d"]'),
    h: countdown.querySelector('[data-cd="h"]'),
    m: countdown.querySelector('[data-cd="m"]')
  } : null;
  function tick() {
    const ms = eventStart - Date.now();
    if (ms <= 0) { countdown.textContent = "Happening now"; return; }
    cd.d.textContent = Math.floor(ms / 86400000);
    cd.h.textContent = String(Math.floor((ms % 86400000) / 3600000)).padStart(2, "0");
    cd.m.textContent = String(Math.floor((ms % 3600000) / 60000)).padStart(2, "0");
  }
  if (countdown) { tick(); setInterval(tick, 30000); }

  // Header gains a hairline once the page scrolls.
  const head = document.getElementById("site-head");
  if (head) {
    const onScroll = () => head.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Mobile navigation.
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  if (toggle && nav) {
    const set = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      nav.classList.toggle("is-open", open);
    };
    toggle.addEventListener("click", () => set(toggle.getAttribute("aria-expanded") !== "true"));
    nav.addEventListener("click", (e) => { if (e.target.closest("a")) set(false); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") { set(false); toggle.focus(); }
    });
    window.matchMedia("(min-width: 961px)").addEventListener("change", (e) => { if (e.matches) set(false); });
  }

  // How it works: browsers without scroll-driven animations get a one-shot fill when the steps arrive.
  const steps = document.getElementById("steps");
  const scrollDriven = window.CSS && CSS.supports("animation-timeline: view()");
  if (steps && !scrollDriven && !reduceMotion && "IntersectionObserver" in window) {
    steps.classList.add("is-pending");
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      steps.classList.add("is-running");
      requestAnimationFrame(() => requestAnimationFrame(() => steps.classList.remove("is-pending")));
    }, { threshold: 0.4 });
    io.observe(steps);
  }

  // Click-to-load video players.
  function load(player, src, title) {
    const frame = document.createElement("iframe");
    frame.src = src;
    frame.title = title;
    frame.allow = "autoplay; fullscreen; picture-in-picture";
    frame.allowFullscreen = true;
    player.querySelector("iframe")?.remove();
    player.appendChild(frame);
    player.querySelector(".player__play")?.setAttribute("hidden", "");
    return frame;
  }
  document.querySelectorAll(".player").forEach((player) => {
    player.querySelector(".player__play")?.addEventListener("click", () => {
      load(player, player.dataset.embed, player.dataset.title).focus();
    });
  });
  const stage = document.getElementById("voice-player");
  const caption = document.getElementById("voice-caption");
  const voiceButtons = document.querySelectorAll(".voice--play button");
  voiceButtons.forEach((btn) => {
    btn.setAttribute("aria-pressed", "false");
    btn.addEventListener("click", () => {
      voiceButtons.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      load(stage, btn.dataset.embed, btn.dataset.title);
      const name = btn.querySelector(".voice__name").textContent;
      const time = btn.querySelector(".voice__time").textContent;
      caption.textContent = `${name}, ${time}`;
      stage.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    });
  });

  // Revenue calculator.
  const money = (n) => "$" + Math.round(n).toLocaleString("en-US");
  const deals = document.getElementById("deals");
  const revenue = document.getElementById("revenue");
  const $ = (sel) => document.querySelector(sel);
  const out = {
    annual: $(".js-fm-annual"), weekly: $(".js-fm-weekly"), monthly: $(".js-fm-monthly"), client: $(".js-fm-client"),
    brClient: $(".js-br-client"), brWeekly: $(".js-br-weekly"), brMonthly: $(".js-br-monthly"), brAnnual: $(".js-br-annual"),
    diffBox: $(".js-difference"), diff: $(".js-diff")
  };
  function calc() {
    const d = Math.max(0, Math.floor(Number(deals.value) || 0));
    const r = Math.max(0, Number(revenue.value) || 0);
    const weekly = d * r, monthly = weekly * 4, annual = weekly * 52;
    const rate = 0.3;
    out.annual.textContent = money(annual);
    out.weekly.textContent = money(weekly);
    out.monthly.textContent = money(monthly);
    out.client.textContent = money(r);
    out.brClient.textContent = `${money(r * rate)}/client`;
    out.brWeekly.textContent = money(weekly * rate);
    out.brMonthly.textContent = money(monthly * rate);
    out.brAnnual.textContent = money(annual * rate);
    const diff = annual - annual * rate;
    out.diffBox.hidden = !(diff > 0);
    out.diff.textContent = money(diff);
  }
  if (deals && revenue) {
    [deals, revenue].forEach((el) => el.addEventListener("input", calc));
    calc();
  }
})();
