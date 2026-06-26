// --- Script Block 1 ---
// ─── DARK MODE ───
const root = document.documentElement;
const darkBtn = document.getElementById('dark-toggle');
const darkIcon = darkBtn.querySelector('i');

let isDark = localStorage.getItem('jainatva-dark') === 'true';
if (isDark) { root.setAttribute('data-theme', 'dark'); darkIcon.className = 'fas fa-sun'; }

darkBtn.addEventListener('click', () => {
  isDark = !isDark;
  root.setAttribute('data-theme', isDark ? 'dark' : '');
  darkIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
  localStorage.setItem('jainatva-dark', isDark);
});

// ─── HAMBURGER ───
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

hamburger.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

// ─── BACK TO TOP ───
const backBtn = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) backBtn.classList.add('visible');
  else backBtn.classList.remove('visible');
});

// ─── ACTIVE NAV ───
const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
const currentPath = window.location.pathname;
const page = currentPath.substring(currentPath.lastIndexOf('/') + 1);

navLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (href) {
    const linkPage = href.substring(href.lastIndexOf('/') + 1);
    if ((page === '' || page === 'index.html') && (linkPage === 'index.html' || linkPage === './' || linkPage === '')) {
      link.classList.add('active');
    } else if (page && linkPage && page === linkPage) {
      link.classList.add('active');
    } else if (page === 'education.html' && linkPage === 'work.html') {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  }
});

// ─── SCROLL REVEAL ───
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(el => revealObserver.observe(el));

// ─── COUNTER ANIMATION ───
const counters = document.querySelectorAll('.counter-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = target >= 1000 
      ? (current >= 1000 ? Math.floor(current/1000) + 'K+' : Math.floor(current))
      : Math.floor(current) + (target >= 50 ? '+' : '');
  }, 16);
}

// ─── GALLERY FILTER ───
function filterGallery(btn, cat) {
  document.querySelectorAll('.gallery-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  btn.setAttribute('aria-selected', true);

  const items = document.querySelectorAll('.gallery-item');
  items.forEach(item => {
    if (cat === 'all' || item.dataset.cat === cat) {
      item.style.display = '';
      item.style.animation = 'fadeIn 0.4s ease';
    } else {
      item.style.display = 'none';
    }
  });
}

// ─── VOLUNTEER FORM ───
function handleFormSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('volunteer-form');
  const success = document.getElementById('form-success');
  form.style.display = 'none';
  success.classList.add('show');
}

// ─── NEWSLETTER ───
function handleNewsletter(btn) {
  const input = btn.previousElementSibling;
  if (!input.value || !input.value.includes('@')) {
    input.focus();
    input.style.borderColor = '#E53935';
    setTimeout(() => { input.style.borderColor = ''; }, 2000);
    return;
  }
  btn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
  btn.style.background = 'linear-gradient(135deg, var(--green), var(--green-dark))';
  input.value = '';
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Subscribe';
    btn.style.background = '';
  }, 4000);
}

// ─── NAVBAR SHADOW ON SCROLL ───
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 20) {
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
  } else {
    navbar.style.boxShadow = 'none';
  }
}, { passive: true });

