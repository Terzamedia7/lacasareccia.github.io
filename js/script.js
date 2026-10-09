/* La Casareccia — frontend statico: menu, modali, caroselli e contatti */
(() => {
  'use strict';
  const $ = (selector, base = document) => base.querySelector(selector);
  const $$ = (selector, base = document) => [...base.querySelectorAll(selector)];
  const menuToggle = $('[data-menu-toggle]');
  const mobileNav = $('#mobile-navigation');
  const dishDialog = $('#dish-dialog');
  const phoneDialog = $('#phone-dialog');
  const useReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scrollMode = useReducedMotion ? 'auto' : 'smooth';

  function svg(icon, extra = '') {
    const icons = {
      pizza: '<path d="M3 20 12 3c5 0 8 4 9 9L3 20Z"/><path d="M7 13c4 0 8 1 10 3"/><circle cx="13" cy="9" r="1"/><circle cx="10" cy="15" r="1"/>',
      bread: '<path d="M3 14c2-8 12-12 18-3l-2 5-14 4-2-6Z"/><path d="M6 14c4 0 9-1 13-3"/>',
      bag: '<path d="M4 8h16l-1 13H5L4 8ZM9 9V6a3 3 0 0 1 6 0v3"/>',
      leaf: '<path d="M21 3c-8 0-15 4-15 12a6 6 0 0 0 6 6c8 0 12-7 9-18ZM3 21c5-7 10-9 16-13"/>',
      bowl: '<path d="M3 11h18a9 9 0 0 1-18 0ZM7 22h10M12 16v6M7 6c0-2 2-2 2-4M12 6c0-2 2-2 2-4M17 6c0-2 2-2 2-4"/>',
      left: '<path d="m15 18-6-6 6-6"/>',
      right: '<path d="m9 18 6-6-6-6"/>',
      info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>',
      phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2A19 19 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 3a2 2 0 0 1-.6 1.8l-2 2a16 16 0 0 0 6.5 6.5l2-2a2 2 0 0 1 1.8-.6l3 .5a2 2 0 0 1 1.7 2Z"/>'
    };
    return `<svg class="icon ${extra}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${icons[icon] || icons.info}</svg>`;
  }

  function openNav() {
    if (!menuToggle || !mobileNav) return;
    mobileNav.classList.add('open');
    document.body.classList.add('nav-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Chiudi il menu di navigazione');
  }
  function closeNav() {
    if (!menuToggle || !mobileNav) return;
    mobileNav.classList.remove('open');
    document.body.classList.remove('nav-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Apri il menu di navigazione');
  }
  menuToggle?.addEventListener('click', () => mobileNav.classList.contains('open') ? closeNav() : openNav());
  mobileNav?.addEventListener('click', e => {
    if (e.target === mobileNav || e.target.closest('a') || e.target.closest('[data-open-phone]')) closeNav();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });
  $$('[data-current-year]').forEach(el => { el.textContent = String(new Date().getFullYear()); });

  function openDialog(dialog) {
    if (!dialog) return;
    if (typeof dialog.showModal !== 'function') { window.location.href = 'contatti.html'; return; }
    dialog.showModal();
    document.body.classList.add('modal-open');
  }
  function closeDialog(dialog) {
    if (dialog?.open) dialog.close();
    document.body.classList.remove('modal-open');
  }
  [dishDialog, phoneDialog].forEach(dialog => {
    if (!dialog) return;
    $$('[data-close-dialog]', dialog).forEach(btn => btn.addEventListener('click', () => closeDialog(dialog)));
    dialog.addEventListener('click', e => { if (e.target === dialog) closeDialog(dialog); });
    dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
  });
  $$('[data-open-phone]').forEach(button => button.addEventListener('click', () => {
    closeNav();
    openDialog(phoneDialog);
  }));

  const menuRoot = $('#menu-categories');
  const navRoot = $('#category-nav');
  const searchInput = $('#menu-search');
  let catalog = window.CASARECCIA_MENU || [];
  const normalize = text => String(text).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('it-IT');

  function presentPrice(item) { return item.verified && item.price !== null && item.price !== undefined ? `€ ${Number(item.price).toFixed(2).replace('.', ',')}` : 'Prezzo da confermare'; }
  function makeFoodCard(item, category) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'food-card';
    button.dataset.title = normalize(item.name);
    button.setAttribute('aria-label', `Dettagli di ${item.name}, categoria ${category.label}`);
    const image = document.createElement('img');
    image.src = item.image;
    image.alt = `Foto illustrativa: ${item.name}`;
    image.loading = 'lazy';
    image.width = 440;
    image.height = 330;
    const info = document.createElement('span');
    info.className = 'food-card-details';
    const title = document.createElement('span');
    title.className = 'food-card-name';
    title.textContent = item.name;
    const price = document.createElement('span');
    price.className = 'food-card-price';
    price.textContent = presentPrice(item);
    info.append(title, price);
    button.append(image, info);
    button.addEventListener('click', () => showDish(item, category));
    return button;
  }
  function showDish(item, category) {
    if (!dishDialog) return;
    const target = $('#dish-dialog-body');
    target.replaceChildren();
    const wrapper = document.createElement('div');
    wrapper.className = 'dish-dialog-inner';
    const image = document.createElement('img');
    image.src = item.image;
    image.alt = `Foto illustrativa del piatto ${item.name}`;
    image.className = 'dish-dialog-image';
    image.width = 440;
    image.height = 330;
    const info = document.createElement('div');
    info.className = 'dish-dialog-info';
    const eyebrow = document.createElement('p');
    eyebrow.className = 'eyebrow';
    eyebrow.textContent = category.label;
    const heading = document.createElement('h2');
    heading.id = 'dish-dialog-title';
    heading.textContent = item.name;
    const description = document.createElement('p');
    description.className = 'dish-description';
    description.textContent = item.description || 'Chiedi informazioni al personale.';
    const sep = document.createElement('div');
    sep.className = 'divider';
    const details = document.createElement('div');
    details.className = 'dish-info-box';
    const price = document.createElement('p');
    price.innerHTML = `<strong>Prezzo</strong>`;
    price.append(document.createTextNode(presentPrice(item)));
    const ingredients = document.createElement('p');
    ingredients.innerHTML = '<strong>Ingredienti e allergeni</strong>';
    if (item.verified && item.ingredients) {
      ingredients.append(document.createTextNode(`Ingredienti: ${item.ingredients}. `));
    }
    if (item.verified && Array.isArray(item.allergens) && item.allergens.length) {
      ingredients.append(document.createTextNode(`Allergeni dichiarati: ${item.allergens.join(', ')}. Verificare sempre con il personale.`));
    } else {
      ingredients.append(document.createTextNode('Informazioni sugli allergeni da chiedere al personale prima di ordinare.'));
    }
    details.append(price, ingredients);
    const warning = document.createElement('p');
    warning.className = 'dialog-disclaimer';
    warning.textContent = item.verified ? 'Immagine illustrativa. Verifica sempre le informazioni sugli allergeni con il personale.' : 'Scheda dimostrativa, non ancora verificata dal ristorante. L’immagine è illustrativa.';
    const actions = document.createElement('div');
    actions.className = 'dialog-actions';
    const call = document.createElement('a');
    call.className = 'btn btn-light';
    call.href = 'tel:+39081930964';
    call.innerHTML = `${svg('phone')} Chiedi informazioni`;
    const phoneButton = document.createElement('button');
    phoneButton.className = 'btn';
    phoneButton.type = 'button';
    phoneButton.textContent = 'Prenota al telefono';
    phoneButton.addEventListener('click', () => { closeDialog(dishDialog); openDialog(phoneDialog); });
    actions.append(call, phoneButton);
    info.append(eyebrow, heading, description, sep, details, warning, actions);
    wrapper.append(image, info);
    target.append(wrapper);
    openDialog(dishDialog);
  }
  function updateArrows(section) {
    const track = $('.food-track', section);
    const prev = $('.carousel-arrow.prev', section);
    const next = $('.carousel-arrow.next', section);
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    if (prev) prev.disabled = track.scrollLeft < 3;
    if (next) next.disabled = max - track.scrollLeft < 3;
  }
  function buildMenu() {
    if (!menuRoot || !navRoot || !catalog.length) return;
    menuRoot.replaceChildren();
    navRoot.replaceChildren();
    const listFragment = document.createDocumentFragment();
    for (const category of catalog) {
      const link = document.createElement('a');
      link.className = 'chip';
      link.href = `#${category.id}`;
      link.textContent = category.label;
      if (category.id === catalog[0].id) link.classList.add('active');
      navRoot.append(link);
      const section = document.createElement('section');
      section.className = 'menu-category';
      section.id = category.id;
      section.setAttribute('aria-label', category.label);
      const head = document.createElement('div');
      head.className = 'category-head';
      const symbol = document.createElement('span');
      symbol.className = 'category-icon';
      symbol.innerHTML = svg(category.icon);
      const textWrap = document.createElement('div');
      const title = document.createElement('h2');
      title.textContent = category.label;
      const subtitle = document.createElement('p');
      subtitle.className = 'category-copy';
      subtitle.textContent = category.subtitle;
      textWrap.append(title, subtitle);
      head.append(symbol, textWrap);
      const outer = document.createElement('div');
      outer.className = 'carousel-outer';
      const track = document.createElement('div');
      track.className = 'food-track';
      track.id = `track-${category.id}`;
      track.setAttribute('role', 'group');
      track.setAttribute('aria-label', `Scorrimento ${category.label}`);
      for (const item of category.items) track.append(makeFoodCard(item, category));
      const prev = document.createElement('button');
      prev.type = 'button';
      prev.className = 'carousel-arrow prev';
      prev.setAttribute('aria-label', `Scorri ${category.label} a sinistra`);
      prev.innerHTML = svg('left');
      const next = document.createElement('button');
      next.type = 'button';
      next.className = 'carousel-arrow next';
      next.setAttribute('aria-label', `Scorri ${category.label} a destra`);
      next.innerHTML = svg('right');
      [prev, next].forEach((button, idx) => button.addEventListener('click', () => {
        track.scrollBy({ left: (idx ? 1 : -1) * (track.clientWidth * 0.76), behavior: scrollMode });
      }));
      track.addEventListener('scroll', () => updateArrows(section), { passive: true });
      outer.append(prev, track, next);
      section.append(head, outer);
      listFragment.append(section);
    }
    menuRoot.append(listFragment);
    $$('.menu-category').forEach(section => updateArrows(section));
    window.addEventListener('resize', () => $$('.menu-category').forEach(section => updateArrows(section)), { passive: true });
    const anchors = $$('.chip', navRoot);
    navRoot.addEventListener('click', e => {
      const target = e.target.closest('a');
      if (!target) return;
      anchors.forEach(link => link.classList.toggle('active', link === target));
    });
    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            anchors.forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
          }
        });
      }, { rootMargin: '-28% 0px -55% 0px', threshold: 0 });
      $$('.menu-category').forEach(section => observer.observe(section));
    }
    // Open the exact category when coming from the Home (e.g. menu.html#antipasti).
    if (location.hash) {
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target) requestAnimationFrame(() => target.scrollIntoView({ behavior: 'auto', block: 'start' }));
    }
  }
  // Il catalogo è locale: funziona con file://, XAMPP e hosting statici.
  buildMenu();

  searchInput?.addEventListener('input', () => {
    const query = normalize(searchInput.value.trim());
    let visibleTotal = 0;
    $$('.menu-category').forEach(section => {
      let sectionTotal = 0;
      $$('.food-card', section).forEach(card => {
        const match = !query || card.dataset.title.includes(query) || normalize($('.category-head h2', section).textContent).includes(query);
        card.hidden = !match;
        if (match) sectionTotal++;
      });
      section.hidden = sectionTotal === 0;
      visibleTotal += sectionTotal;
      updateArrows(section);
    });
    let empty = $('#menu-no-results');
    if (!visibleTotal && !empty) {
      empty = document.createElement('p');
      empty.id = 'menu-no-results';
      empty.className = 'empty-search';
      empty.textContent = 'Nessun piatto trovato. Prova un altro termine.';
      menuRoot.append(empty);
    } else if (empty) empty.hidden = !!visibleTotal;
  });

  // WhatsApp è attivato solo dopo la configurazione del numero confermato.
  // Il numero fisso 081 930964 NON viene automaticamente usato come WhatsApp.
  const whatsappConfig = window.CASARECCIA_CONTACTS || {};
  const whatsappNumber = String(whatsappConfig.whatsappNumber || '').replace(/[\s()+.-]/g, '');
  const hasWhatsapp = /^[1-9][0-9]{7,14}$/.test(whatsappNumber);
  $$('[data-whatsapp-action]').forEach(link => {
    if (hasWhatsapp) {
      const message = String(whatsappConfig.whatsappMessage || 'Salve, vorrei chiedere informazioni per prenotare un tavolo.');
      link.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      link.hidden = false;
    } else {
      link.hidden = true;
      link.removeAttribute('href');
    }
  });
  $$('[data-whatsapp-pending]').forEach(block => {
    block.hidden = hasWhatsapp;
  });
})();
