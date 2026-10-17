/* Luminary Atelier: all animation, in one place.
   Only the moments listed in OUTPUTS/design-direction.md (Motion section):
   1 opening intro, 2 Philosophy word lighting, 3 heading line rise,
   4 image wipe and hero drift, 5 card rise, 6 story paragraphs,
   8 header (CSS, see main.js), 9 Lenis smooth scroll.
   Timing values come from the CSS custom properties in styles.css. */
(function () {
  'use strict';

  var root = document.documentElement;

  // The <head> script only adds .motion when reduced motion is NOT requested.
  if (!root.classList.contains('motion')) return;
  if (!window.gsap || !window.ScrollTrigger || !window.SplitText) {
    root.classList.remove('motion', 'intro');
    return;
  }
  window.__laMotionStarted = true;

  var gsap = window.gsap;
  var ScrollTrigger = window.ScrollTrigger;
  var SplitText = window.SplitText;
  gsap.registerPlugin(ScrollTrigger, SplitText);

  /* ---------- Tokens from CSS ---------- */
  var css = getComputedStyle(root);
  function token(name) { return css.getPropertyValue(name).trim(); }
  function seconds(name) { return parseFloat(token(name)) / 1000; }

  var EASE_OUT = token('--gsap-ease-out') || 'power4.out';
  var EASE_INOUT = token('--gsap-ease-inout') || 'power2.inOut';
  var DUR_REVEAL = seconds('--dur-reveal');
  var DUR_IMAGE = seconds('--dur-image');
  var STAGGER = seconds('--stagger');
  var EYEBROW_LEAD = seconds('--eyebrow-lead');
  var RISE = parseFloat(token('--rise'));
  var INTRO_RISE = parseFloat(token('--intro-rise'));
  var PHILOSOPHY_START = parseFloat(token('--philosophy-start'));
  var STONE = token('--stone');
  var AMBER = token('--amber');

  // Reveals fire once, when the element is 15% into the viewport.
  var START = 'top 85%';

  /* ---------- 9. Smooth scroll ---------- */
  var lenis = null;
  if (window.Lenis) {
    lenis = new window.Lenis({ lerp: 0.1, autoRaf: false });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    // Anchor links glide to their section, then move focus there for keyboard users.
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;
      var hash = link.getAttribute('href');
      if (hash.length < 2) return;
      var target = document.getElementById(hash.slice(1));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(hash === '#top' ? 0 : target, {
        onComplete: function () {
          if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        }
      });
      if (history.pushState) history.pushState(null, '', hash);
    });
  }

  // Line splitting needs the real display font, but the headline must not wait long for it.
  function whenFontsReady(fn) {
    var done = false;
    function run() { if (!done) { done = true; fn(); } }
    if (document.fonts && document.fonts.load) {
      document.fonts.load('400 1em "Bodoni Moda"').then(run, run);
    } else {
      run();
    }
    window.setTimeout(run, 500);
  }

  function splitLines(el) {
    return SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'split-line', aria: 'none' });
  }

  whenFontsReady(function () {

    /* ---------- 1. Opening, once per visit ---------- */
    if (root.classList.contains('intro')) {
      try { sessionStorage.setItem('la-intro-seen', '1'); } catch (e) { /* private mode */ }

      var heroTitle = document.querySelector('[data-intro="title"]');
      var heroSplit = splitLines(heroTitle);
      gsap.set(heroSplit.lines, { yPercent: 100 });
      gsap.set(heroTitle, { opacity: 1 });

      gsap.timeline({
        defaults: { ease: EASE_OUT },
        onComplete: function () {
          heroSplit.revert();
          root.classList.remove('intro');
          gsap.set('[data-intro]', { clearProps: 'opacity,transform' });
          gsap.set('[data-intro="image"] picture', { clearProps: 'clipPath' });
        }
      })
        .fromTo('[data-intro="brand"]', { opacity: 0, y: INTRO_RISE }, { opacity: 1, y: 0, duration: 0.6 }, 0)
        .fromTo('[data-intro="rule"]', { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: EASE_INOUT }, 0.1)
        .to(heroSplit.lines, { yPercent: 0, duration: DUR_REVEAL, stagger: STAGGER }, 0.3)
        .fromTo('[data-intro="image"] picture',
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: DUR_IMAGE, ease: EASE_INOUT }, 0.35)
        .fromTo('[data-intro="image"] img', { scale: 1.08 }, { scale: 1, duration: DUR_IMAGE }, 0.35);
    }

    /* ---------- 3. Section headings: masked line rise, eyebrow 120ms ahead ---------- */
    gsap.utils.toArray('[data-heading]').forEach(function (heading) {
      var split = splitLines(heading);
      gsap.set(split.lines, { yPercent: 100 });
      gsap.set(heading, { opacity: 1 });
      gsap.to(split.lines, {
        yPercent: 0,
        duration: DUR_REVEAL,
        stagger: STAGGER,
        delay: EYEBROW_LEAD,
        ease: EASE_OUT,
        scrollTrigger: { trigger: heading, start: START, once: true },
        onComplete: function () { split.revert(); }
      });
    });

    gsap.utils.toArray('[data-eyebrow]').forEach(function (eyebrow) {
      gsap.to(eyebrow, {
        opacity: 1,
        duration: DUR_REVEAL,
        ease: EASE_OUT,
        scrollTrigger: { trigger: eyebrow.nextElementSibling || eyebrow, start: START, once: true }
      });
    });

    /* ---------- 2. Philosophy, the signature moment ---------- */
    var philTitle = document.querySelector('[data-philosophy-title]');
    var philBody = document.querySelector('[data-philosophy-body]');
    if (philTitle && philBody) {
      // The headline lights from stone to amber first (color scrub only, no rise).
      var titleLight = gsap.fromTo(philTitle, { color: STONE }, { color: AMBER, ease: 'none', paused: true });
      var titleMax = 0;
      ScrollTrigger.create({
        trigger: philTitle,
        start: 'top 80%',
        end: 'top 50%',
        onUpdate: function (self) {
          if (self.progress > titleMax) { titleMax = self.progress; titleLight.progress(titleMax); }
        },
        onLeave: function () { titleMax = 1; titleLight.progress(1); }
      });

      // Then each word warms from half to full ivory, like a lamp moving down the page.
      // As the block scrolls, the lit edge travels from 80% to 35% of the viewport.
      // Scrubbed with the scroll, but one way only: once a word is lit it stays lit,
      // so scrolling back up never dims what has been read.
      var wordSplit = SplitText.create(philBody.querySelectorAll('p'), { type: 'words', wordsClass: 'word', aria: 'none' });
      gsap.set(wordSplit.words, { opacity: PHILOSOPHY_START });
      var lamp = gsap.timeline({ paused: true })
        .to(wordSplit.words, { opacity: 1, duration: 1, ease: 'none', stagger: 0.15 });
      var lampMax = 0;
      ScrollTrigger.create({
        trigger: philBody,
        start: 'top 80%',
        end: 'bottom 35%',
        onUpdate: function (self) {
          if (self.progress > lampMax) { lampMax = self.progress; lamp.progress(lampMax); }
        },
        onLeave: function () { lampMax = 1; lamp.progress(1); }
      });
    }

    /* ---------- 4. Images: bottom-up wipe with a scale settle ---------- */
    gsap.utils.toArray('[data-reveal-image]').forEach(function (frame) {
      var img = frame.querySelector('img');
      gsap.timeline({ scrollTrigger: { trigger: frame, start: START, once: true } })
        .fromTo(img,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: DUR_IMAGE, ease: EASE_INOUT }, 0)
        .fromTo(img, { scale: 1.08 }, { scale: 1, duration: DUR_IMAGE, ease: EASE_OUT }, 0);
    });

    // The hero image drifts upward 6% across the hero. Tablet and desktop only.
    gsap.matchMedia().add('(min-width: 768px)', function () {
      gsap.to('[data-parallax]', {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
      });
    });

    /* ---------- 5. Experience cards ---------- */
    var cards = gsap.utils.toArray('[data-card]');
    if (cards.length) {
      gsap.fromTo(cards, { opacity: 0, y: RISE }, {
        opacity: 1,
        y: 0,
        duration: DUR_REVEAL,
        stagger: STAGGER,
        ease: EASE_OUT,
        clearProps: 'transform',
        scrollTrigger: { trigger: cards[0].parentNode, start: START, once: true }
      });
    }

    /* ---------- 6. Her story: paragraphs fade up one by one ---------- */
    gsap.utils.toArray('[data-reveal]').forEach(function (el) {
      gsap.fromTo(el, { opacity: 0, y: RISE }, {
        opacity: 1,
        y: 0,
        duration: DUR_REVEAL,
        ease: EASE_OUT,
        clearProps: 'transform',
        scrollTrigger: { trigger: el, start: START, once: true }
      });
    });

    ScrollTrigger.refresh();
  });

  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
