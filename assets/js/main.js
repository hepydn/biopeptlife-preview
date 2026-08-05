document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('is-open');
      toggle.classList.toggle('is-open');
    });
  }

  document.querySelectorAll('.has-dropdown > a.nav-link, .has-dropdown > button.nav-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 860) {
        e.preventDefault();
        link.parentElement.classList.toggle('is-open');
      }
    });
  });

  document.querySelectorAll('.cat-tab[data-filter]').forEach((tab) => {
    tab.addEventListener('click', () => {
      const filter = tab.dataset.filter;
      document.querySelectorAll('.cat-tab[data-filter]').forEach((t) => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      document.querySelectorAll('.catalog-group').forEach((group) => {
        group.style.display = (filter === 'all' || group.dataset.category === filter) ? '' : 'none';
      });
      if (filter !== 'all') {
        document.getElementById('catalogo-lista')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Animación de aparición al hacer scroll (texto y tarjetas), estilo Rohe.
  // Las clases .reveal se agregan acá por JS: si el script no corre, el contenido
  // nunca queda oculto (no depende de una clase fija en el HTML).
  // El hero (page-hero estático o el slider de inicio) ya tiene su propia
  // animación de entrada, así que no se duplica acá.
  const revealSelectors = [
    '.page-hero .eyebrow', '.page-hero h1', '.page-hero p.lead',
    '.section-head', '.obj-card', '.pillar-card', '.product-card', '.product-row',
    '.testimonial-card', '.trust-check', '.step-row', '.cert-card', '.cta-band',
  ];
  const revealEls = document.querySelectorAll(revealSelectors.join(', '));
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('is-visible'), (i % 4) * 90);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el) => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // Slider del hero de inicio (video + fotos rotando)
  const heroSlider = document.getElementById('hero-slider');
  if (heroSlider) {
    const media = heroSlider.querySelectorAll('.hero-slide-media');
    const contents = heroSlider.querySelectorAll('.hero-slide-content');
    const dots = heroSlider.querySelectorAll('.hero-dot');
    let current = 0;
    let timer;

    function goTo(index) {
      current = (index + media.length) % media.length;
      media.forEach((m, i) => {
        const active = i === current;
        m.classList.toggle('is-active', active);
        if (m.tagName === 'VIDEO') {
          if (active) m.play().catch(() => {});
        }
      });
      contents.forEach((c, i) => c.classList.toggle('is-active', i === current));
      dots.forEach((d, i) => d.classList.toggle('is-active', i === current));
    }

    function startAutoplay() {
      timer = setInterval(() => goTo(current + 1), 6500);
    }

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        clearInterval(timer);
        goTo(Number(dot.dataset.slideDot));
        startAutoplay();
      });
    });

    if (media.length > 1) startAutoplay();
  }
});
