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

  // Clients carousel
  const carousel = document.querySelector('[data-clients-carousel]');
  if (carousel) {
    const track = carousel.querySelector('.clients-carousel__track');
    const items = Array.from(carousel.querySelectorAll('.clients-carousel__item'));
    const prevBtn = carousel.querySelector('.clients-carousel__btn--prev');
    const nextBtn = carousel.querySelector('.clients-carousel__btn--next');
    const dotsContainer = carousel.querySelector('.clients-carousel__dots');

    let currentIndex = 0;
    let visibleCount = 4;
    let autoplayTimer = null;
    let isPaused = false;

    function getVisibleCount() {
      if (window.innerWidth <= 480) return 1;
      if (window.innerWidth <= 768) return 2;
      if (window.innerWidth <= 1024) return 3;
      return 4;
    }

    function getMaxIndex() {
      return Math.max(0, items.length - visibleCount);
    }

    function buildDots() {
      dotsContainer.innerHTML = '';
      const total = getMaxIndex() + 1;
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'clients-carousel__dot' + (i === currentIndex ? ' clients-carousel__dot--active' : '');
        dot.setAttribute('aria-label', `Ir para slide ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      }
    }

    function updateDots() {
      dotsContainer.querySelectorAll('.clients-carousel__dot').forEach((dot, i) => {
        dot.classList.toggle('clients-carousel__dot--active', i === currentIndex);
      });
    }

    function goTo(index) {
      currentIndex = Math.max(0, Math.min(index, getMaxIndex()));
      const itemWidth = items[0].offsetWidth + 24;
      track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
      updateDots();
    }

    function next() {
      goTo(currentIndex >= getMaxIndex() ? 0 : currentIndex + 1);
    }

    function prev() {
      goTo(currentIndex <= 0 ? getMaxIndex() : currentIndex - 1);
    }

    function startAutoplay() {
      stopAutoplay();
      autoplayTimer = setInterval(() => {
        if (!isPaused) next();
      }, 3500);
    }

    function stopAutoplay() {
      if (autoplayTimer) clearInterval(autoplayTimer);
    }

    prevBtn.addEventListener('click', () => { prev(); startAutoplay(); });
    nextBtn.addEventListener('click', () => { next(); startAutoplay(); });

    carousel.addEventListener('mouseenter', () => { isPaused = true; });
    carousel.addEventListener('mouseleave', () => { isPaused = false; });

    window.addEventListener('resize', () => {
      visibleCount = getVisibleCount();
      if (currentIndex > getMaxIndex()) currentIndex = getMaxIndex();
      buildDots();
      goTo(currentIndex);
    });

    visibleCount = getVisibleCount();
    buildDots();
    goTo(0);
    startAutoplay();
  }
})();
