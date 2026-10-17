/* Luminary Atelier: page behaviour (menu, header, active nav, form).
   All animation lives in motion.js. */
(function () {
  'use strict';

  var header = document.querySelector('[data-header]');
  var menuButton = document.querySelector('[data-menu-button]');
  var nav = document.querySelector('[data-nav]');

  /* ---------- Mobile menu ---------- */
  function setMenu(open) {
    if (!header || !menuButton) return;
    header.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    if (open) header.classList.remove('is-hidden');
  }

  if (menuButton) {
    menuButton.addEventListener('click', function () {
      setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
    });
  }
  if (nav) {
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && header && header.classList.contains('is-open')) {
      setMenu(false);
      menuButton.focus();
    }
  });
  window.matchMedia('(min-width: 900px)').addEventListener('change', function (mq) {
    if (mq.matches) setMenu(false);
  });

  /* ---------- Header: solid once scrolled, hides on scroll down, returns on scroll up ---------- */
  if (header) {
    var lastY = window.scrollY;
    var ticking = false;
    function updateHeader() {
      var y = window.scrollY;
      header.classList.toggle('is-scrolled', y > 8);
      var goingDown = y > lastY;
      var pastHero = y > header.offsetHeight * 2;
      var keepVisible = header.classList.contains('is-open') || header.contains(document.activeElement);
      if (goingDown && pastHero && !keepVisible) header.classList.add('is-hidden');
      else if (!goingDown) header.classList.remove('is-hidden');
      lastY = y;
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(updateHeader); ticking = true; }
    }, { passive: true });
    header.addEventListener('focusin', function () { header.classList.remove('is-hidden'); });
    updateHeader();
  }

  /* ---------- Active section in the nav ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.site-nav__link'));
  if ('IntersectionObserver' in window && navLinks.length) {
    var byId = {};
    navLinks.forEach(function (link) { byId[link.getAttribute('href').slice(1)] = link; });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (l) { l.classList.remove('is-active'); l.removeAttribute('aria-current'); });
        var link = byId[entry.target.id];
        if (link) { link.classList.add('is-active'); link.setAttribute('aria-current', 'true'); }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(function (s) { observer.observe(s); });
  }

  /* ---------- "Ask about this gathering" preselects the form ---------- */
  var gatheringSelect = document.querySelector('[data-gathering-select]');
  function preselect(n) {
    var i = parseInt(n, 10) - 1;
    if (gatheringSelect && i >= 0 && i < gatheringSelect.options.length) gatheringSelect.selectedIndex = i;
  }
  document.querySelectorAll('[data-gathering]').forEach(function (link) {
    link.addEventListener('click', function () { preselect(link.getAttribute('data-gathering')); });
  });
  var param = new URLSearchParams(window.location.search).get('gathering');
  if (param) preselect(param);

  /* ---------- Inquiry form: fetch to Formspree, normal POST if JS is off ---------- */
  var form = document.querySelector('[data-form]');
  if (!form) return;

  // JS takes over validation so it can mark fields; without JS the browser validates.
  form.noValidate = true;
  var status = form.querySelector('[data-form-status]');
  var submit = form.querySelector('[data-submit]');
  var MSG_SUCCESS = "Thank you for reaching out. I'll read this myself and write back to you.";
  var MSG_ERROR = 'Something went wrong sending your message. Please try again, or write to me at merley@theluminaryatelier.com.';

  function showStatus(text, isError) {
    status.textContent = text;
    status.classList.toggle('is-error', !!isError);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Built-in validation, with the first problem field focused
    var fields = Array.prototype.slice.call(form.querySelectorAll('.field__input'));
    var firstInvalid = null;
    fields.forEach(function (f) {
      var ok = f.checkValidity();
      f.setAttribute('aria-invalid', ok ? 'false' : 'true');
      if (!ok && !firstInvalid) firstInvalid = f;
    });
    if (firstInvalid) {
      firstInvalid.reportValidity();
      firstInvalid.focus();
      return;
    }

    submit.disabled = true;
    showStatus('');

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    }).then(function (res) {
      if (!res.ok) throw new Error('Request failed: ' + res.status);
      form.classList.add('is-sent');
      form.reset();
      showStatus(MSG_SUCCESS, false);
      status.setAttribute('tabindex', '-1');
      status.focus();
    }).catch(function () {
      showStatus(MSG_ERROR, true);
    }).then(function () {
      submit.disabled = false;
    });
  });

  form.addEventListener('input', function (e) {
    if (e.target.getAttribute('aria-invalid') === 'true' && e.target.checkValidity()) {
      e.target.setAttribute('aria-invalid', 'false');
    }
  });
})();
