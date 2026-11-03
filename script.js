(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'بستن منو' : 'باز کردن منو');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  const search = document.querySelector('[data-search]');
  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('[data-item]')];
  const empty = document.querySelector('.empty-state');
  let activeFilter = 'all';
  const update = () => {
    const term = (search?.value || '').trim().toLocaleLowerCase();
    let visible = 0;
    cards.forEach(card => {
      const text = (card.dataset.searchText || card.textContent).toLocaleLowerCase();
      const category = card.dataset.category || 'all';
      const matchesText = !term || text.includes(term);
      const matchesFilter = activeFilter === 'all' || category === activeFilter;
      const show = matchesText && matchesFilter;
      card.hidden = !show;
      if (show) visible++;
    });
    if (empty) empty.style.display = visible ? 'none' : 'block';
  };
  search?.addEventListener('input', update);
  filterButtons.forEach(button => button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    update();
  }));
})();
