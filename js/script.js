// SANJOG PRASAD — site scripts

document.addEventListener('DOMContentLoaded', function () {

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mobile nav toggle
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var btn = item.querySelector('.faq-q');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      var list = item.parentElement;
      list.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('open'); });
      if (!isOpen) item.classList.add('open');
    });
  });

  // Footer year
  document.querySelectorAll('#year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // ---------- Scroll reveal ----------
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) { el.classList.add('in-view'); });
    } else {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(function (el) { revealObserver.observe(el); });
    }
  }

  // ---------- Animated counters ----------
  var counters = document.querySelectorAll('[data-counter-target]');
  function animateCounter(el) {
    var target = parseFloat(el.getAttribute('data-counter-target'));
    var prefix = el.getAttribute('data-counter-prefix') || '';
    var suffix = el.getAttribute('data-counter-suffix') || '';
    var duration = parseInt(el.getAttribute('data-counter-duration') || '1400', 10);
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      var value = Math.round(target * eased);
      el.textContent = prefix + value + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = prefix + target + suffix;
      }
    }
    requestAnimationFrame(step);
  }
  if (counters.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      counters.forEach(function (el) {
        var target = el.getAttribute('data-counter-target');
        var prefix = el.getAttribute('data-counter-prefix') || '';
        var suffix = el.getAttribute('data-counter-suffix') || '';
        el.textContent = prefix + target + suffix;
      });
    } else {
      var counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      counters.forEach(function (el) { counterObserver.observe(el); });
    }
  }

  // ---------- Testimonial carousel ----------
  document.querySelectorAll('.carousel').forEach(function (carousel) {
    var track = carousel.querySelector('.carousel-track');
    var slides = carousel.querySelectorAll('.carousel-slide');
    var prevBtn = carousel.querySelector('.carousel-prev');
    var nextBtn = carousel.querySelector('.carousel-next');
    var dotsWrap = carousel.querySelector('.carousel-dots');
    if (!track || !slides.length) return;
    var index = 0;

    if (dotsWrap) {
      slides.forEach(function (_, i) {
        var dot = document.createElement('button');
        dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
        dot.addEventListener('click', function () { goTo(i); });
        dotsWrap.appendChild(dot);
      });
    }

    function update() {
      track.style.transform = 'translateX(-' + (index * 100) + '%)';
      if (dotsWrap) {
        dotsWrap.querySelectorAll('button').forEach(function (d, i) {
          d.classList.toggle('active', i === index);
        });
      }
    }
    function goTo(i) {
      index = (i + slides.length) % slides.length;
      update();
    }
    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(index - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(index + 1); });
    update();

    // Autoplay, pauses on hover/focus, respects reduced motion
    if (!reduceMotion && slides.length > 1) {
      var timer = setInterval(function () { goTo(index + 1); }, 6000);
      carousel.addEventListener('mouseenter', function () { clearInterval(timer); });
      carousel.addEventListener('mouseleave', function () { timer = setInterval(function () { goTo(index + 1); }, 6000); });
    }
  });

});

