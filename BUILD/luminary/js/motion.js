/* Luminary Atelier: all animation, in one place.
   The moments in OUTPUTS/design-direction-v2.md, plus the quiet v1 ones it keeps:
   0 intro curtain, 1 hero cards (pointer drift, scroll exit), 2 pinned filmstrip,
   3 Philosophy word lighting, 4 experience rows, 5 marquee, 6 footer wordmark,
   heading line rise, eyebrow fade, and Lenis smooth scroll.
   The header hide and nav underline live in main.js and CSS.
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

  /* ---------- Tokens from CSS ---------- */
  var css = getComputedStyle(root);
  function token(name) { return css.getPropertyValue(name).trim(); }
  function seconds(name) { return parseFloat(token(name)) / 1000; }

  var EASE_OUT = token('--gsap-ease-out') || 'power4.out';
  var EASE_INOUT = token('--gsap-ease-inout') || 'power2.inOut';
  var DUR_REVEAL = seconds('--dur-reveal');
  var STAGGER = seconds('--stagger');
  var EYEBROW_LEAD = seconds('--eyebrow-lead');
  var RISE = parseFloat(token('--rise'));
  var PHILOSOPHY_START = parseFloat(token('--philosophy-start'));
  var HERO_DRIFT = parseFloat(token('--hero-drift'));
  var FILM_SCROLL = parseFloat(token('--film-scroll'));
  var FILM_SKEW_MAX = parseFloat(token('--film-skew-max'));
  var MARQUEE_SPEED = parseFloat(token('--marquee-speed'));
  var STONE = token('--stone');
  var AMBER = token('--amber');

  // Reveals fire once, when the element is 15% into the viewport.
  var START = 'top 85%';
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* The intro needs only GSAP core, so it starts at once. Everything else (Lenis, ScrollTrigger,
     the pinned filmstrip, text splitting) is set up after the page has loaded and the browser is idle,
     so that work never delays the first paint of the headline. All of it applies below the fold. */
  var lenis = null;
  var introRunning = false;

  /* ---------- 0. Intro curtain, once per visit ---------- */
  if (root.classList.contains('intro')) {
    try { sessionStorage.setItem('la-intro-seen', '1'); } catch (e) { /* private mode */ }
    introRunning = true;
    gsap.timeline({
      onComplete: function () {
        root.classList.remove('intro');
        gsap.set('[data-intro="mark"]', { clearProps: 'all' });
        introRunning = false;
        if (lenis) lenis.start();
      }
    })
      // the hairline draws from the centre outwards
      .fromTo('.curtain__line', { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: EASE_INOUT }, 0.05)
      // the screen splits along it
      .to('.curtain__line', { opacity: 0, duration: 0.2 }, 0.55)
      .to('.curtain__half--top', { yPercent: -100, duration: 0.9, ease: EASE_INOUT }, 0.55)
      .to('.curtain__half--bottom', { yPercent: 100, duration: 0.9, ease: EASE_INOUT }, 0.55)
      // and the monogram rises 16px into the header
      .fromTo('[data-intro="mark"]', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, ease: EASE_OUT }, 0.8);
  }

  function setup() {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    /* ---------- Smooth scroll ---------- */
    if (window.Lenis) {
      lenis = new window.Lenis({ lerp: 0.1, autoRaf: false });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
      if (introRunning) lenis.stop();   // the intro restarts it when the curtain has opened

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

    /* ---------- 1. Hero cards: pointer drift and scroll exit ---------- */
    var hero = document.querySelector('[data-hero]');
    var cards = gsap.utils.toArray('.hcard');
    if (hero && cards.length) {
      // On scroll, the cards spread apart and come towards the viewer as the hero leaves.
      var stageBox = hero.getBoundingClientRect();
      var exitTl = gsap.timeline({
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true }
      });
      cards.forEach(function (card) {
        var b = card.getBoundingClientRect();
        var dx = (b.left + b.width / 2) - (stageBox.left + stageBox.width / 2);
        var dy = (b.top + b.height / 2) - (stageBox.top + stageBox.height / 2);
        var depth = parseFloat(getComputedStyle(card).getPropertyValue('--depth')) || 1;
        exitTl.to(card.querySelector('.hcard__exit'), {
          x: dx * 0.6,
          y: dy * 0.4 - 80,
          z: 260 * depth,
          ease: 'none'
        }, 0);
      });

      // Pointer drift, max 12px, smoothed. Desktop pointers only.
      if (finePointer && window.matchMedia('(min-width: 768px)').matches) {
        var drifts = cards.map(function (card) {
          var el = card.querySelector('.hcard__drift');
          var depth = parseFloat(getComputedStyle(card).getPropertyValue('--depth')) || 1;
          return {
            depth: depth,
            x: gsap.quickTo(el, 'x', { duration: 1.2, ease: 'power3.out' }),
            y: gsap.quickTo(el, 'y', { duration: 1.2, ease: 'power3.out' })
          };
        });
        hero.addEventListener('pointermove', function (e) {
          var nx = (e.clientX / window.innerWidth) * 2 - 1;
          var ny = (e.clientY / window.innerHeight) * 2 - 1;
          drifts.forEach(function (d) {
            d.x(nx * HERO_DRIFT * d.depth);
            d.y(ny * HERO_DRIFT * d.depth);
          });
        });
      }
    }

    /* ---------- 2. Filmstrip: pinned and scrubbed on pointer devices ---------- */
    var filmPin = document.querySelector('[data-film-pin]');
    var filmTrack = document.querySelector('[data-film-track]');
    var filmCurrent = document.querySelector('[data-film-current]');
    if (filmPin && filmTrack && finePointer) {
      root.classList.add('film-pinned');
      var frames = gsap.utils.toArray(filmTrack.children);
      var setScale = frames.map(function (f) { return gsap.quickSetter(f, 'scale'); });
      var setOpacity = frames.map(function (f) { return gsap.quickSetter(f, 'opacity'); });
      var skewTo = gsap.quickTo(filmTrack, 'skewX', { duration: 0.5, ease: 'power3.out' });
      var settle = null;
      var lastIndex = -1;

      // The frame nearest the centre is full size and fully opaque; the rest sit at 0.92 and 0.6.
      function updateFrames() {
        var centre = window.innerWidth / 2;
        var best = 0;
        var bestDist = Infinity;
        frames.forEach(function (f, i) {
          var b = f.getBoundingClientRect();
          var d = Math.abs(b.left + b.width / 2 - centre);
          var t = Math.max(0, 1 - d / (b.width * 1.1));
          setScale[i](0.92 + 0.08 * t);
          setOpacity[i](0.6 + 0.4 * t);
          if (d < bestDist) { bestDist = d; best = i; }
        });
        if (best !== lastIndex && filmCurrent) {
          lastIndex = best;
          filmCurrent.textContent = String(best + 1).padStart(2, '0');
        }
      }

      gsap.to(filmTrack, {
        // travel until the last frame's centre reaches the centre of the screen
        x: function () {
          var last = frames[frames.length - 1];
          return -(last.offsetLeft + last.offsetWidth / 2 - window.innerWidth / 2);
        },
        ease: 'none',
        scrollTrigger: {
          trigger: filmPin,
          pin: true,
          // pin with transforms, not position: fixed, so starting and ending the pin is never a layout shift
          pinType: 'transform',
          start: 'top top',
          end: function () { return '+=' + Math.round(window.innerHeight * FILM_SCROLL); },
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: function (self) {
            updateFrames();
            // A slight skew from scroll speed, max 3deg, easing back to 0 when scrolling stops.
            var skew = gsap.utils.clamp(-FILM_SKEW_MAX, FILM_SKEW_MAX, self.getVelocity() / -600);
            skewTo(skew);
            if (settle) settle.kill();
            settle = gsap.delayedCall(0.12, function () { skewTo(0); });
          },
          onRefresh: updateFrames
        }
      });
      updateFrames();
    }

    /* ---------- 4. Experience rows: the rule draws, then the content fades up ---------- */
    gsap.utils.toArray('[data-row]').forEach(function (row) {
      gsap.timeline({ scrollTrigger: { trigger: row, start: START, once: true } })
        .to(row.querySelector('.row__rule'), { scaleX: 1, duration: 0.9, ease: EASE_INOUT }, 0)
        .fromTo([row.querySelector('.row__num'), row.querySelector('.row__main'), row.querySelector('.row__aside')],
          { opacity: 0, y: RISE },
          { opacity: 1, y: 0, duration: DUR_REVEAL, stagger: STAGGER, ease: EASE_OUT, clearProps: 'transform' }, 0.35);
    });

    /* ---------- 5. Celebrate Sweetly marquee ---------- */
    var marquee = document.querySelector('[data-marquee]');
    var marqueeTrack = document.querySelector('[data-marquee-track]');
    if (marquee && marqueeTrack) {
      var set = marqueeTrack.firstElementChild;
      // Repeat the set until the track is comfortably wider than two screens, so the loop never shows a gap.
      var guard = 0;
      while (marqueeTrack.scrollWidth < window.innerWidth * 2 + set.offsetWidth && guard < 8) {
        marqueeTrack.appendChild(set.cloneNode(true));
        guard++;
      }
      var mx = 0;
      var boost = 0;
      var boostTarget = 0;
      var hovering = false;
      var active = false;
      var pace = 1;
      var setX = gsap.quickSetter(marqueeTrack, 'x', 'px');
      ScrollTrigger.create({
        trigger: marquee,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: function (self) { active = self.isActive; },
        // Speeds up slightly with scroll velocity, then settles back.
        onUpdate: function (self) { boostTarget = Math.min(Math.abs(self.getVelocity()) / 500, 3); }
      });
      marquee.addEventListener('mouseenter', function () { hovering = true; });
      marquee.addEventListener('mouseleave', function () { hovering = false; });
      gsap.ticker.add(function (time, deltaMs) {
        if (!active) return;
        var dt = Math.min(deltaMs, 64) / 1000;
        boost += (boostTarget - boost) * 0.08;
        boostTarget *= 0.92;
        pace += ((hovering ? 0 : 1) - pace) * 0.1;   // eases to a stop on hover
        mx -= MARQUEE_SPEED * (1 + boost) * pace * dt;
        var w = set.offsetWidth;
        if (-mx >= w) mx += w;
        setX(mx);
      });
    }

    /* ---------- 6. Footer wordmark rises into place as the page ends ---------- */
    var wordmark = document.querySelector('[data-wordmark]');
    if (wordmark) {
      gsap.fromTo(wordmark, { yPercent: 55 }, {
        yPercent: 0,
        ease: 'none',
        scrollTrigger: { trigger: '[data-footer]', start: 'top bottom', end: 'bottom bottom', scrub: true }
      });
    }

    /* ---------- Text moments that need the real fonts for line breaks ---------- */
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

      /* Section headings: masked line rise, eyebrow 120ms ahead */
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

      /* 3. Philosophy, the signature moment */
      var philTitle = document.querySelector('[data-philosophy-title]');
      var philBody = document.querySelector('[data-philosophy-body]');
      if (philTitle && philBody) {
        // The headline lights from stone to amber first (color only), one way.
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

        // Each word warms from half to full ivory, like a lamp moving down the page.
        // The lit edge travels from 80% to 35% of the viewport; once lit, a word stays lit.
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

      ScrollTrigger.refresh();
    });

  }   // end of setup()

  function whenSettled(fn) {
    var run = function () {
      if (window.requestIdleCallback) window.requestIdleCallback(fn, { timeout: 800 });
      else window.setTimeout(fn, 200);
    };
    if (document.readyState === 'complete') run();
    else window.addEventListener('load', run, { once: true });
  }
  whenSettled(setup);
})();
