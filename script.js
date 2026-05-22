/**
 * portfolio/script.js
 * Author : Mo Salah
 * Stack  : Vanilla JavaScript (ES2020+) — zero dependencies, no jQuery
 */

/* ── DOM refs ─────────────────────────────────────────────── */
const navbar         = document.querySelector('.navbar');
const hamburger      = document.getElementById('hamburger');
const navLinks       = document.getElementById('nav-links');
const themeToggle    = document.getElementById('theme-toggle');
const html           = document.documentElement;
const contactForm    = document.getElementById('contact-form');
const submitBtn      = document.getElementById('submit-btn');
const formSuccess    = document.getElementById('form-success');
const footerYear     = document.getElementById('footer-year');
const cursor         = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

/* ============================================================
   PROJECTS DATA
   To add a new project, push a new object to this array.
   featured: true → spans full width
   liveDemo: null  → button shows "Coming Soon" (disabled)
   video: null     → no video, thumbnail only
   ============================================================ */
const PROJECTS = [
  {
    id: 'ecommerce',
    title: 'E-Commerce Platform',
    description: 'A responsive e-commerce platform featuring product discovery, smart search and filtering, and a dynamic shopping cart.',
    tech: ['React', 'JavaScript', 'CSS'],
    liveDemo: null,
    github: 'https://github.com/mohammed78787/E-Commerce',
    image: 'https://assets.awwwards.com/awards/element/2026/05/6a01a328c70d9188508026_static.jpeg',
    video: 'https://assets.awwwards.com/awards/element/2026/05/6a01a328c70d9188508026.mp4',
    featured: true,
  },
  {
    id: 'pwa-todo',
    title: 'PWA Task Manager',
    description: 'PWA task manager featuring offline capabilities, custom drag-and-drop functionality, and a seamless mobile-first experience.',
    tech: ['React', 'JavaScript', 'CSS', 'Service Worker', 'LocalStorage'],
    liveDemo: 'https://mohammed78787.github.io/React-to-do/',
    github: 'https://github.com/mohammed78787/React-to-do',
    image: 'assets/projects/todo//todo1.png',
    video: 'assets/projects/todo/todo1.mp4',
    featured: false,
  },
  {
    id: 'crud',
    title: 'CRUD Task Manager',
    description: 'A responsive CRUD task manager with persistent local storage and optimized DOM rendering for a smooth user experience.',
    tech: ['JavaScript', 'HTML5', 'CSS3', 'LocalStorage API'],
    liveDemo: 'https://mohammed78787.github.io/CRUDS/',
    github: 'https://github.com/mohammed78787/CRUDS',
    image: 'assets/projects/cruds/cruds.png',
    video: 'assets/projects/cruds/cruds1.mp4',
    featured: false,
  },
  {
    id: 'andra',
    title: 'Andra Artist Website',
    description: "A modern and responsive artist showcase website designed to present Andra's music, content, and visual identity through a clean and engaging experience.",
    tech: ['HTML5', 'CSS3'],
    liveDemo: 'https://mohammed78787.github.io/Andra-template/',
    github: 'https://github.com/mohammed78787/Andra-template',
    image: 'assets/projects/andra/andra.png',
    video: 'https://assets.awwwards.com/awards/element/2026/05/6a01a328c70d9188508026.mp4',
    featured: false,
  },
];

/* SVG icons as strings */
const ICON_GITHUB = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`;
const ICON_EXTERNAL = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;

/**
 * Build and inject all project cards into #projects-showcase.
 */
function renderProjects() {
  const showcase = document.getElementById('projects-showcase');
  if (!showcase) return;

  const isMobile = !window.matchMedia('(hover: hover)').matches;

  showcase.innerHTML = PROJECTS.map((proj, i) => {
    const delayClass = `delay-${Math.min(i + 1, 5)}`;
    const featuredClass = proj.featured ? 'pcard--featured' : '';
    const featuredBadge = proj.featured
      ? `<span class="pcard__featured-badge" aria-label="Featured project">Featured</span>`
      : '';

    const liveDemoBtn = proj.liveDemo
      ? `<a href="${proj.liveDemo}" target="_blank" rel="noopener noreferrer" class="pcard__btn pcard__btn--primary" aria-label="Live demo of ${proj.title}">
           ${ICON_EXTERNAL} Live Demo
         </a>`
      : `<span class="pcard__btn pcard__btn--disabled" aria-label="Live demo coming soon">
           ${ICON_EXTERNAL} Coming Soon
         </span>`;

    const videoEl = proj.video
      ? `<video
           src="${proj.video}"
           muted
           loop
           playsinline
           preload="none"
           aria-hidden="true"
           data-src="${proj.video}"
         ></video>
         <span class="pcard__tap-hint" aria-hidden="true">tap for preview</span>`
      : '';

    const tags = proj.tech
      .map(t => `<li>${t}</li>`)
      .join('');

    return `
      <article
        class="pcard ${featuredClass} reveal-up ${delayClass}"
        role="listitem"
        aria-label="Project: ${proj.title}"
        data-project-id="${proj.id}"
      >
        ${featuredBadge}
        <div class="pcard__media" aria-hidden="true">
          <img
            src="${proj.image}"
            alt="${proj.title} preview"
            loading="lazy"
            decoding="async"
          />
          ${videoEl}
        </div>
        <div class="pcard__body">
          <h3 class="pcard__title">${proj.title}</h3>
          <p class="pcard__desc">${proj.description}</p>
          <ul class="pcard__tags" role="list" aria-label="Technologies used">${tags}</ul>
          <div class="pcard__actions">
            ${liveDemoBtn}
            <a href="${proj.github}" target="_blank" rel="noopener noreferrer" class="pcard__btn pcard__btn--ghost" aria-label="${proj.title} on GitHub">
              ${ICON_GITHUB} GitHub
            </a>
          </div>
        </div>
      </article>
    `;
  }).join('');

  /* ── Make newly rendered cards visible ──
     revealObserver only scanned the DOM before renderProjects ran,
     so we must register the new cards manually. ── */
  showcase.querySelectorAll('.reveal-up, .reveal-fade').forEach(el => {
    // If already in viewport (user hasn't scrolled yet), make visible immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('is-visible');
    } else {
      // Otherwise hand off to the shared scroll observer
      revealObserver.observe(el);
    }
  });

  /* ── Lazy-load videos on hover / tap ── */
  showcase.querySelectorAll('.pcard').forEach(card => {
    const video = card.querySelector('video[data-src]');
    if (!video) return;

    let loaded = false;

    function loadVideo() {
      if (loaded) return;
      loaded = true;
      video.src = video.dataset.src;
      video.load();
    }

    if (isMobile) {
      // Mobile: tap to toggle video
      card.querySelector('.pcard__media').addEventListener('click', () => {
        loadVideo();
        const media = card.querySelector('.pcard__media');
        const isActive = media.classList.toggle('pcard__media--video-active');
        if (isActive) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    } else {
      // Desktop: hover to play
      card.addEventListener('mouseenter', () => {
        loadVideo();
        video.play().catch(() => {});
      });
      card.addEventListener('mouseleave', () => {
        video.pause();
      });
    }
  });
}

/* Run on DOM ready */
document.addEventListener('DOMContentLoaded', renderProjects);

/* ── Footer year ──────────────────────────────────────────── */
if (footerYear) footerYear.textContent = new Date().getFullYear();

/* ============================================================
   THEME TOGGLE (dark / light)
   ============================================================ */
(function initTheme() {
  // Persist choice in localStorage
  const saved = localStorage.getItem('portfolio-theme') || 'dark';
  html.setAttribute('data-theme', saved);
})();

themeToggle?.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('portfolio-theme', next);
});

/* ============================================================
   STICKY NAVBAR — add .scrolled class after 10px
   ============================================================ */
function handleNavbarScroll() {
  navbar?.classList.toggle('scrolled', window.scrollY > 10);
}
window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll(); // run on load

/* ============================================================
   HAMBURGER MENU TOGGLE
   ============================================================ */
hamburger?.addEventListener('click', () => {
  const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', String(!isOpen));
  navLinks?.classList.toggle('is-open', !isOpen);
  // Prevent body scroll when menu is open on mobile
  document.body.style.overflow = !isOpen ? 'hidden' : '';
});

// Close menu when any nav link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger?.setAttribute('aria-expanded', 'false');
    navLinks?.classList.remove('is-open');
    document.body.style.overflow = '';
  });
});

// Close menu on resize to desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 640) {
    hamburger?.setAttribute('aria-expanded', 'false');
    navLinks?.classList.remove('is-open');
    document.body.style.overflow = '';
  }
});

/* ============================================================
   ACTIVE NAV LINK — highlight link for current section
   ============================================================ */
const sections = [...document.querySelectorAll('section[id]')];
const navItems  = [...document.querySelectorAll('.nav-link[data-section]')];

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navItems.forEach(link => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(sec => sectionObserver.observe(sec));

/* ============================================================
   SCROLL REVEAL — uses IntersectionObserver
   Adds .is-visible to .reveal-up and .reveal-fade elements
   ============================================================ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Unobserve after reveal so it doesn't re-trigger
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal-up, .reveal-fade').forEach(el => revealObserver.observe(el));

/* ============================================================
   SKILL BARS — animate width when section enters viewport
   ============================================================ */
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const targetWidth = fill.dataset.width + '%';
        // Small rAF delay so transition fires after paint
        requestAnimationFrame(() => { fill.style.width = targetWidth; });
        skillObserver.unobserve(fill);
      }
    });
  },
  { threshold: 0.3 }
);

skillFills.forEach(fill => skillObserver.observe(fill));

/* ============================================================
   CUSTOM CURSOR
   ============================================================ */
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursor) {
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  }
});

// Smooth follower using rAF
(function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  if (cursorFollower) {
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top  = followerY + 'px';
  }
  requestAnimationFrame(animateFollower);
})();

// Hide cursor when it leaves the window
document.addEventListener('mouseleave', () => {
  cursor?.style.setProperty('opacity', '0');
  cursorFollower?.style.setProperty('opacity', '0');
});
document.addEventListener('mouseenter', () => {
  cursor?.style.setProperty('opacity', '1');
  cursorFollower?.style.setProperty('opacity', '.4');
});

/* ============================================================
   CONTACT FORM VALIDATION
   ============================================================ */

/** Validation rules map: fieldId → { test, message } */
const validations = {
  'cf-name': {
    test: val => val.trim().length >= 2,
    message: 'Please enter at least 2 characters.'
  },
  'cf-email': {
    test: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()),
    message: 'Please enter a valid email address.'
  },
  'cf-subject': {
    test: val => val.trim().length >= 3,
    message: 'Subject must be at least 3 characters.'
  },
  'cf-message': {
    test: val => val.trim().length >= 20,
    message: 'Message must be at least 20 characters.'
  }
};

/**
 * Validate a single field.
 * @param {HTMLElement} input
 * @returns {boolean} isValid
 */
function validateField(input) {
  const rule = validations[input.id];
  if (!rule) return true;

  const errorEl = document.getElementById(input.getAttribute('aria-describedby'));
  const isValid = rule.test(input.value);

  input.classList.toggle('has-error', !isValid);
  if (errorEl) errorEl.textContent = isValid ? '' : rule.message;

  return isValid;
}

// Real-time validation on blur
Object.keys(validations).forEach(id => {
  const field = document.getElementById(id);
  field?.addEventListener('blur', () => validateField(field));
  // Clear error on input after first blur
  field?.addEventListener('input', () => {
    if (field.classList.contains('has-error')) validateField(field);
  });
});

// Form submit handler
contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Validate all fields
  const fields = Object.keys(validations).map(id => document.getElementById(id));
  const allValid = fields.every(field => validateField(field));

  if (!allValid) {
    // Focus first invalid field for a11y
    const firstInvalid = fields.find(f => f.classList.contains('has-error'));
    firstInvalid?.focus();
    return;
  }

  // Simulate async send
  submitBtn?.classList.add('loading');
  submitBtn.disabled = true;

  await new Promise(resolve => setTimeout(resolve, 1600)); // mock network delay

  submitBtn?.classList.remove('loading');
  submitBtn.disabled = false;
  contactForm.reset();
  formSuccess?.classList.add('show');
  formSuccess?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Auto-hide success message after 5 s
  setTimeout(() => formSuccess?.classList.remove('show'), 5000);
});

/* ============================================================
   SMOOTH SCROLL for anchor links that JS didn't already handle
   (CSS scroll-behavior handles most cases; this is a fallback)
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.getElementById(anchor.getAttribute('href').slice(1));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ============================================================
   PROJECT CARDS — tilt effect on hover (desktop only)
   ============================================================ */
if (window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;  // -0.5 to 0.5
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `
        translateY(-6px)
        rotateX(${(-y * 6).toFixed(2)}deg)
        rotateY(${(x * 6).toFixed(2)}deg)
      `;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ============================================================
   PAGE LOAD — trigger hero reveals immediately
   ============================================================ */
window.addEventListener('DOMContentLoaded', () => {
  // Kick off hero animations (elements are in viewport on load)
  document.querySelectorAll('#home .reveal-up, #home .reveal-fade').forEach(el => {
    el.classList.add('is-visible');
  });
  // renderProjects() already called above — no duplicate needed
});
