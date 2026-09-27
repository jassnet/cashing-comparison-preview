(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#global-nav');

  if (toggle && nav) {
    const close = () => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'メニューを開く');
      nav.classList.remove('is-open');
    };

    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
      nav.classList.toggle('is-open', open);
    });

    nav.addEventListener('click', close);
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') close();
    });
  }
})();

(() => {
  const button = document.querySelector('.filter-button');
  const cards = [...document.querySelectorAll('[data-product]')];
  const status = document.querySelector('.filter-status');
  const reset = document.querySelector('[data-reset-cashing]');
  const ranking = document.querySelector('#ranking');

  if (!button || !cards.length) return;

  button.addEventListener('click', () => {
    const speed = Number(document.querySelector('input[name="speed"]:checked')?.value || 20);
    const priority = document.querySelector('input[name="priority"]:checked')?.value || 'balance';
    let visible = 0;

    cards.forEach((card) => {
      const productSpeed = Number(card.dataset.speed || 99);
      const strengths = (card.dataset.strength || '').split(' ');
      const match = productSpeed <= speed && strengths.includes(priority);
      card.classList.toggle('is-hidden', !match);
      if (match) visible += 1;
    });

    if (status) {
      status.textContent = visible
        ? `${visible}社が条件に合いました。比較詳細を表示しています。`
        : 'この条件に合うサービスがありません。条件を変更してください。';
    }

    ranking?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  });

  const showAll = () => {
    cards.forEach((card) => card.classList.remove('is-hidden'));
    document.querySelector('input[name="priority"][value="balance"]').checked = true;
    document.querySelector('input[name="speed"][value="20"]').checked = true;
    if (status) status.textContent = '3社を表示しています';
  };
  reset?.addEventListener('click', showAll);
  // Summary cards and the comparison table always offer all three products.
  document.querySelectorAll('a[href$="-detail"]').forEach((link) => {
    link.addEventListener('click', showAll);
  });
})();

(() => {
  const floating = document.querySelector('.floating-cta');
  const ranking = document.querySelector('#ranking');
  if (!floating) return;

  const update = () => floating.classList.toggle('is-visible', window.scrollY > (ranking?.offsetTop ?? 520));
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
})();
