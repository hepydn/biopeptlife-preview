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
  const revealSelectors = [
    '.hero-inner .eyebrow', '.hero-inner h1', '.hero-inner p.lead', '.hero-inner .hero-cta-row',
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
});
