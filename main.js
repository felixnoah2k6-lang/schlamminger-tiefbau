(function () {
  'use strict';

  // Sticky header shadow on scroll
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 8) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMain = document.querySelector('.nav-main');
  if (navToggle && navMain) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('is-open');
      navMain.classList.toggle('is-open');
      const open = navMain.classList.contains('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navMain.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navToggle.classList.remove('is-open');
        navMain.classList.remove('is-open');
      });
    });
  }

  // Reveal-on-scroll
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  // Reference filter tabs
  const refTabs = document.querySelectorAll('.ref-tabs button');
  const refBlocks = document.querySelectorAll('.ref-block');
  if (refTabs.length && refBlocks.length) {
    refTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        refTabs.forEach(t => t.classList.remove('is-active'));
        tab.classList.add('is-active');
        const filter = tab.getAttribute('data-filter');
        refBlocks.forEach(block => {
          const cat = block.getAttribute('data-category');
          block.style.display = (filter === 'all' || cat === filter) ? '' : 'none';
        });
      });
    });
  }

  // Contact form (mailto fallback — no backend on static hosting)
  const form = document.querySelector('.contact-form form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = new FormData(form);
      const lines = [];
      lines.push('Neue Anfrage über Website');
      lines.push('-----------------------------------');
      lines.push('Name:        ' + (data.get('name') || ''));
      lines.push('Firma:       ' + (data.get('firma') || ''));
      lines.push('Telefon:     ' + (data.get('telefon') || ''));
      lines.push('E-Mail:      ' + (data.get('email') || ''));
      lines.push('Ort:         ' + (data.get('ort') || ''));
      lines.push('Leistung:    ' + (data.get('leistung') || ''));
      lines.push('');
      lines.push('Nachricht:');
      lines.push(data.get('nachricht') || '');

      const subject = encodeURIComponent('Anfrage von ' + (data.get('name') || 'Website-Besucher'));
      const body = encodeURIComponent(lines.join('\n'));
      window.location.href = 'mailto:info@josef-schlamminger.de?subject=' + subject + '&body=' + body;

      const status = form.querySelector('.form-status');
      if (status) {
        status.textContent = 'Ihr E-Mail-Programm wird geöffnet, um die Anfrage zu versenden.';
        status.style.display = 'block';
      }
    });
  }

  // Year in footer
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
