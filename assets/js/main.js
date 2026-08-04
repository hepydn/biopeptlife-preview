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

  const heroSlider = document.getElementById('hero-slider');
  if (heroSlider) {
    const slides = heroSlider.querySelectorAll('.hero-slide-img');
    const contents = heroSlider.querySelectorAll('.hero-slide-content');
    const dots = heroSlider.querySelectorAll('.hero-dot');
    let current = 0;
    let timer;

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle('is-active', i === current));
      contents.forEach((c, i) => c.classList.toggle('is-active', i === current));
      dots.forEach((d, i) => d.classList.toggle('is-active', i === current));
    }

    function startAutoplay() {
      timer = setInterval(() => goTo(current + 1), 6000);
    }

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        clearInterval(timer);
        goTo(Number(dot.dataset.slideDot));
        startAutoplay();
      });
    });

    if (slides.length > 1) startAutoplay();
  }
});
