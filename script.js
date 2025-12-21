// =========================
// Mobile menu
// =========================
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");

if (menuBtn && mobileNav) {
  menuBtn.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("show");
    menuBtn.setAttribute("aria-expanded", String(open));
  });
}

// =========================
// Smooth scroll + close mobile nav
// =========================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href");
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });

    if (mobileNav) mobileNav.classList.remove("show");
    if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
  });
});

// =========================
// Active nav link on scroll
// =========================
const navLinks = document.querySelectorAll(".nav .nav-link");
const mobileLinks = document.querySelectorAll("#mobileNav .nav-link");

function setActive(hash) {
  [...navLinks, ...mobileLinks].forEach(l => l.classList.remove("active"));
  [...navLinks, ...mobileLinks].forEach(l => {
    if (l.getAttribute("href") === hash) l.classList.add("active");
  });
}

const watchSections = ["about", "skills", "projects", "education", "contact"]
  .map(id => document.getElementById(id))
  .filter(Boolean);

if (watchSections.length) {
  const obs = new IntersectionObserver((entries) => {
    const top = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (top?.target?.id) setActive(`#${top.target.id}`);
  }, { threshold: [0.25, 0.5, 0.7] });

  watchSections.forEach(s => obs.observe(s));
}

// =========================
// Contact form -> mailto
// =========================
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("from_name")?.value.trim();
    const email = document.getElementById("reply_to")?.value.trim();
    const message = document.getElementById("message")?.value.trim();

    if (!name || !email || !message) {
      if (statusEl) statusEl.textContent = "Please fill all fields.";
      return;
    }

    const to = "veerendrasabbina752@gmail.com";
    const subject = encodeURIComponent("Portfolio inquiry");
    const body = encodeURIComponent(
      `Name: ${name}\n` +
      `Email: ${email}\n\n` +
      `Message:\n${message}\n`
    );

    const mailtoUrl = `mailto:${encodeURIComponent(to)}?subject=${subject}&body=${body}`;

    // Open default mail client
    window.location.href = mailtoUrl;

    if (statusEl) statusEl.textContent = "Opening your email client...";
  });
}

// =========================
// Typing effect (cycle phrases)
// =========================
const typingTextEl = document.getElementById("typingText");

if (typingTextEl) {
  const phrases = [
    "Building secure Spring Boot microservices.",
    "Shipping cloud-native apps on AWS.",
    "Designing clean Angular & React UIs.",
    "Automating CI/CD for fast releases."
  ];

  let phraseIndex = 0;
  let i = 0;
  let deleting = false;

  const typeSpeed = 55;
  const deleteSpeed = 34;
  const pauseAtEnd = 1100;
  const pauseAtStart = 300;

  function tick() {
    const text = phrases[phraseIndex];

    if (!deleting) {
      i++;
      typingTextEl.textContent = text.slice(0, i);

      if (i >= text.length) {
        deleting = true;
        setTimeout(tick, pauseAtEnd);
        return;
      }
      setTimeout(tick, typeSpeed);
    } else {
      i--;
      typingTextEl.textContent = text.slice(0, i);

      if (i <= 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, pauseAtStart);
        return;
      }
      setTimeout(tick, deleteSpeed);
    }
  }

  tick();
}

// =========================
// Render Experience from projects.js
// =========================
function renderExperience() {
  const grid = document.getElementById("experienceGrid");
  if (!grid) return;

  const items = window.EXPERIENCE || [];

  grid.innerHTML = items.map((exp, i) => {
    const bullets = (exp.bullets || []).map(b => `<li>${b}</li>`).join("");

    return `
      <article class="exp-card">
        <div class="exp-head">
          <div class="proj-badge"><span class="badge-dot" aria-hidden="true"></span>${exp.badge || `Experience ${i + 1}`}</div>
          <div class="exp-dates">${exp.dates || ""}</div>
        </div>

        <h3 class="exp-role">${exp.role || ""}</h3>
        <div class="exp-meta">${exp.company || ""}${exp.location ? ` • ${exp.location}` : ""}</div>

        ${bullets ? `<ul class="exp-list">${bullets}</ul>` : ""}
      </article>
    `;
  }).join("");
}

renderExperience();

// =========================
// Footer year
// =========================
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());
