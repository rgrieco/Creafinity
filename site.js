/**
 * Creafinity — site.js
 * Nav, scroll reveal, counters, typewriter, WhatsApp
 */
(function () {
  'use strict';

  /* ── Utilities ── */
  var $ = function (s, ctx) { return (ctx || document).querySelector(s); };
  var $$ = function (s, ctx) { return Array.from((ctx || document).querySelectorAll(s)); };

  /* ── Nav ── */
  function initNav() {
    var nav = $('#cf-nav');
    var hamburger = $('#cf-hamburger');
    var mobileMenu = $('#cf-mobile-menu');
    if (!nav) return;

    /* Scroll class */
    window.addEventListener('scroll', function () {
      nav.classList.toggle('is-scrolled', window.scrollY > 30);
    }, { passive: true });

    /* Hamburger */
    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', function () {
        mobileMenu.classList.toggle('is-open');
        hamburger.classList.toggle('is-active');
      });
      /* Close on link click */
      $$('a', mobileMenu).forEach(function (a) {
        a.addEventListener('click', function () {
          mobileMenu.classList.remove('is-open');
          hamburger.classList.remove('is-active');
        });
      });
    }

    /* Active link */
    var page = location.pathname.split('/').pop() || 'index.html';
    $$('.cf-nav__links a, .cf-nav__mobile a').forEach(function (a) {
      if (a.getAttribute('href') === page) a.classList.add('active');
    });
  }

  /* ── Scroll Reveal ── */
  function initReveal() {
    var els = $$('[data-reveal]');
    if (!els.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    els.forEach(function (el) { io.observe(el); });
  }

  /* ── Counters ── */
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function animateCounter(el) {
    var target = parseInt(el.dataset.target, 10);
    var suffix = el.dataset.suffix || '';
    var duration = 1600;
    var start = null;

    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      el.textContent = Math.floor(easeOut(p) * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }

  function initCounters() {
    var els = $$('[data-target]');
    if (!els.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          animateCounter(e.target);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });

    els.forEach(function (el) { io.observe(el); });
  }

  /* ── Typewriter ── */
  function initTypewriter() {
    var el = document.getElementById('cf-typewriter');
    if (!el) return;

    var words = JSON.parse(el.dataset.words || '[]');
    if (!words.length) return;

    var wi = 0, ci = 0, deleting = false;

    function tick() {
      var w = words[wi];
      if (deleting) {
        ci--;
        el.textContent = w.slice(0, ci);
      } else {
        ci++;
        el.textContent = w.slice(0, ci);
      }

      var delay = deleting ? 50 : 90;
      if (!deleting && ci === w.length) { delay = 2000; deleting = true; }
      else if (deleting && ci === 0)    { deleting = false; wi = (wi + 1) % words.length; delay = 300; }
      setTimeout(tick, delay);
    }
    setTimeout(tick, 800);
  }

  /* ── WhatsApp Float ── */
  function injectWA() {
    var wa = document.createElement('a');
    wa.href = 'https://wa.me/message/AZCW3NA5EAY7F1';
    wa.target = '_blank';
    wa.rel = 'noopener noreferrer';
    wa.className = 'cf-wa';
    wa.setAttribute('aria-label', 'Contactar por WhatsApp');
    wa.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
    document.body.appendChild(wa);
  }

  /* ── Contact Form ── */
  function initContactForm() {
    var form = document.getElementById('cf-contact-form');
    if (!form) return;

    var feedback = document.getElementById('cf-form-feedback');

    function showFeedback(ok, msg) {
      if (!feedback) return;
      feedback.textContent = msg;
      feedback.className = 'cf-form__feedback ' + (ok ? 'cf-form__feedback--ok' : 'cf-form__feedback--error');
      feedback.style.display = 'block';
    }

    function resetBtn(btn, orig) {
      btn.disabled = false;
      btn.textContent = orig;
      btn.style.background = '';
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('[type="submit"]');
      var orig = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Enviando...';
      if (feedback) feedback.style.display = 'none';

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form)
      })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data && data.success) {
          showFeedback(true, '¡Mensaje enviado! Te contactamos en menos de 24 horas.');
          form.reset();
          setTimeout(function () { resetBtn(btn, orig); }, 4000);
        } else {
          showFeedback(false, 'No se pudo enviar el mensaje. Intentá de nuevo o escribinos por WhatsApp.');
          resetBtn(btn, orig);
        }
      })
      .catch(function () {
        showFeedback(false, 'Error de conexión. Intentá de nuevo o escribinos por WhatsApp.');
        resetBtn(btn, orig);
      });
    });
  }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    initReveal();
    initCounters();
    initTypewriter();
    injectWA();
    initContactForm();
  });

})();
