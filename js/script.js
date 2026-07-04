(function () {
  "use strict";

  /* ---------- Theme toggle (persisted) ---------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("theme");
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    themeToggle.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
    localStorage.setItem("theme", theme);
  }
  applyTheme(savedTheme || (prefersLight ? "light" : "dark"));

  themeToggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    applyTheme(current === "light" ? "dark" : "light");
  });

  /* ---------- Sticky navbar shadow + active link ---------- */
  const navbar = document.getElementById("navbar");
  const sections = document.querySelectorAll("main .section, #hero");
  const navLinks = document.querySelectorAll(".nav-link");

  function onScroll() {
    navbar.classList.toggle("scrolled", window.scrollY > 12);

    let currentId = "";
    sections.forEach((sec) => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 120) currentId = sec.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  navToggle.addEventListener("click", () => {
    const open = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  navMenu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      navMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    })
  );

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------- Hero SVG chart animation ---------- */
  const heroVisual = document.querySelector(".hero-visual");
  const bars = document.querySelectorAll(".hbar");
  const heroObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          bars.forEach((bar, i) => {
            const h = parseFloat(bar.dataset.h);
            setTimeout(() => {
              bar.setAttribute("height", h);
              bar.setAttribute("y", 270 - h);
            }, i * 90);
          });
          heroObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  if (heroVisual) heroObserver.observe(heroVisual);

  /* ---------- Skill bar fill on view ---------- */
  const skillRows = document.querySelectorAll(".skill-row");
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fill = entry.target.querySelector(".skill-fill");
          const level = entry.target.dataset.level;
          requestAnimationFrame(() => {
            fill.style.width = `${level}%`;
          });
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  skillRows.forEach((row) => skillObserver.observe(row));

  /* ---------- Rotating role text ---------- */
  const roles = [
    "building with Python",
    "modelling in Power BI",
    "querying with SQL",
    "shaping raw data into decisions",
  ];
  const rotator = document.getElementById("roleRotator");
  let roleIndex = 0;
  if (rotator && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setInterval(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      rotator.style.opacity = 0;
      setTimeout(() => {
        rotator.textContent = roles[roleIndex];
        rotator.style.opacity = 1;
      }, 250);
    }, 3200);
    rotator.style.transition = "opacity .25s ease";
  }

  /* ---------- Contact form (front-end only) ---------- */
  const form = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        formNote.textContent = "Please fill in every field before sending.";
        return;
      }

      const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:nivethassellam@gmail.com?subject=${subject}&body=${body}`;
      formNote.textContent = "Opening your email app to send this message…";
      form.reset();
    });
  }

  /* ---------- Scroll to top ---------- */
  const toTop = document.getElementById("toTop");
  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
