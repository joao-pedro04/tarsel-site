(function () {
  'use strict';

  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');
  const contactForm = document.getElementById('contact-form');

  // Header scroll shadow
  window.addEventListener('scroll', () => {
    header.classList.toggle('header--scrolled', window.scrollY > 10);
  }, { passive: true });

  // Mobile menu
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('nav--open');
      menuToggle.classList.toggle('header__toggle--active', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('nav--open');
        menuToggle.classList.remove('header__toggle--active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Animated stats counter
  const statValues = document.querySelectorAll('.stat__value[data-target]');

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  if (statValues.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statValues.forEach(el => observer.observe(el));
  }

  // Contact form (placeholder — wire to backend later)
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Mensagem enviada!';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        contactForm.reset();
      }, 3000);
    });
  }
})();
