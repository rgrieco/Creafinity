/**
 * Creafinity Modern — devcloud branch
 * Interactividad: scroll reveal, contador, typewriter, WhatsApp float
 */

(function () {
  'use strict';

  /* =============================================
     WHATSAPP FLOATING BUTTON — inyectado en todas
     ============================================= */
  function injectWhatsApp() {
    var btn = document.createElement('a');
    btn.href = 'https://wa.me/message/AZCW3NA5EAY7F1';
    btn.target = '_blank';
    btn.rel = 'noopener noreferrer';
    btn.className = 'cf-wa-float';
    btn.title = 'Contactanos por WhatsApp';
    btn.setAttribute('aria-label', 'Contactar por WhatsApp');
    btn.innerHTML =
      '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15' +
      '-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475' +
      '-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52' +
      '.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207' +
      '-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372' +
      '-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487' +
      '.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413' +
      '.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004' +
      'a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374' +
      'a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898' +
      'a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297' +
      'A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945' +
      'L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893' +
      'a11.821 11.821 0 00-3.48-8.413z"/>' +
      '</svg>';
    document.body.appendChild(btn);
  }

  /* =============================================
     SCROLL REVEAL — IntersectionObserver
     ============================================= */
  function initScrollReveal() {
    var elements = document.querySelectorAll('.cf-reveal, .cf-reveal-left, .cf-reveal-right');
    if (!elements.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('cf-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(function (el) { observer.observe(el); });
  }

  /* =============================================
     COUNTER ANIMATION
     ============================================= */
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1800;
    var startTime = null;

    function easeOut(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var value = Math.floor(easeOut(progress) * target);
      el.textContent = value + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  function initCounters() {
    var counters = document.querySelectorAll('.cf-counter');
    if (!counters.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { observer.observe(el); });
  }

  /* =============================================
     TYPEWRITER EFFECT
     ============================================= */
  function initTypewriter() {
    var el = document.querySelector('.cf-typewriter-text');
    if (!el) return;

    var words = ['tu negocio', 'tu marca', 'tu empresa', 'tus ideas', 'tu futuro'];
    var wordIndex = 0;
    var charIndex = 0;
    var isDeleting = false;

    function type() {
      var currentWord = words[wordIndex];
      var speed;

      if (isDeleting) {
        charIndex--;
        el.textContent = currentWord.substring(0, charIndex);
        speed = 55;
      } else {
        charIndex++;
        el.textContent = currentWord.substring(0, charIndex);
        speed = 95;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        speed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 320;
      }

      setTimeout(type, speed);
    }

    setTimeout(type, 1000);
  }

  /* =============================================
     NAVBAR — scroll shrink
     ============================================= */
  function initNavbar() {
    var header = document.querySelector('.u-header');
    if (!header) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 60) {
        header.style.boxShadow = '0 4px 30px rgba(71, 138, 201, 0.18)';
      } else {
        header.style.boxShadow = '0 2px 24px rgba(71, 138, 201, 0.10)';
      }
    }, { passive: true });
  }

  /* =============================================
     INIT
     ============================================= */
  document.addEventListener('DOMContentLoaded', function () {
    injectWhatsApp();
    initScrollReveal();
    initCounters();
    initTypewriter();
    initNavbar();
  });

})();
