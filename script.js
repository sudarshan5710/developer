// Nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('#nav-menu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('show');
  });
}

// Theme toggle with persistence
const themeToggle = document.querySelector('.theme-toggle');
const root = document.documentElement;
const THEME_KEY = 'theme-preference';

function updateThemeButton(mode) {
  if (!themeToggle) return;
  if (mode === 'light') {
    themeToggle.setAttribute('aria-label', 'Switch to dark theme');
    themeToggle.setAttribute('data-mode', 'light');
    themeToggle.title = 'Switch to dark';
  } else {
    themeToggle.setAttribute('aria-label', 'Switch to light theme');
    themeToggle.setAttribute('data-mode', 'dark');
    themeToggle.title = 'Switch to light';
  }
}

function setTheme(mode) {
  if (mode === 'light') {
    root.classList.add('light');
  } else {
    root.classList.remove('light');
  }
  localStorage.setItem(THEME_KEY, mode);
  updateThemeButton(mode);
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) {
    setTheme(saved);
    return;
  }
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  setTheme(prefersLight ? 'light' : 'dark');
}
initTheme();

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isLight = !root.classList.contains('light') ? true : false;
    setTheme(isLight ? 'light' : 'dark');
  });
}

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  }
}, { threshold: 0.12 });
revealEls.forEach((el) => io.observe(el));

// Footer year
const yearEl = document.querySelector('#year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// palette removed


