export function initGiftModal() {
  const overlay = document.getElementById('gift-modal-overlay');
  if (!overlay) return;

  const modal = overlay.querySelector('.gift-modal');
  const closeBtn = overlay.querySelector('.gift-modal-close');
  const nameEl = overlay.querySelector('.gift-modal-name');
  const priceEl = overlay.querySelector('.gift-modal-price');
  const imageEl = overlay.querySelector('.gift-modal-image');
  const pixBtn = overlay.querySelector('.pix-copy-btn');

  const PIX_KEY_DEFAULT = pixBtn?.getAttribute('data-pix');

  function openModal({ title, price, imgSrc, thankUrl } = {}) {
    if (!overlay) return;
    nameEl.textContent = title || '';
    priceEl.textContent = price || '';
    if (imgSrc && imageEl) {
      imageEl.src = imgSrc;
      imageEl.alt = title || 'Imagem do presente';
      imageEl.style.display = '';
    } else if (imageEl) {
      imageEl.style.display = 'none';
    }

    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    // prevent background scroll
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

  // focus management: focus the modal container (it has tabindex="-1")
  // store last focused element so we can restore focus on close
  lastFocused = document.activeElement;
  if (modal && typeof modal.focus === 'function') modal.focus();

    // attach key handlers
    document.addEventListener('keydown', onKeyDown);
  }

  function closeModal() {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKeyDown);
    // restore focus to the element that opened the modal
    try { if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus(); } catch (e) {}
  }

  function onKeyDown(e) {
    if (e.key === 'Escape') closeModal();
    // Ctrl+C to copy PIX when modal open
    if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C')) {
      copyToClipboard(PIX_KEY_DEFAULT);
    }
  }

  async function copyToClipboard(text) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'absolute';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      // visual feedback
      const original = pixBtn.textContent;
      pixBtn.textContent = 'Copiado!';
      setTimeout(() => (pixBtn.textContent = original), 1500);
    } catch (err) {
      console.error('Copy failed', err);
    }
  }

  // close on overlay click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  closeBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    closeModal();
  });

  pixBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    const pixKey = pixBtn.getAttribute('data-pix') || PIX_KEY_DEFAULT;
    copyToClipboard(pixKey);
  });

  // open modal when clicking on .gift or the internal .gift-list-button
  const gifts = Array.from(document.querySelectorAll('.gift'));
  gifts.forEach((giftEl) => {
    // read data from DOM
    giftEl.addEventListener('click', (e) => {
      // prevent if clicked on an actual link inside
      if (e.target.closest('a') && !e.target.classList.contains('gift-list-button')) return;
      const title = giftEl.querySelector('.gift-info h5')?.textContent?.trim();
      const price = giftEl.querySelector('.gift-info p span')?.textContent?.trim();
      const imgSrc = giftEl.querySelector('img')?.getAttribute('src');
      openModal({ title, price: price ? `R$ ${price}` : '', imgSrc });
      e.preventDefault();
    });

    const btn = giftEl.querySelector('.gift-list-button');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const title = giftEl.querySelector('.gift-info h5')?.textContent?.trim();
        const price = giftEl.querySelector('.gift-info p span')?.textContent?.trim();
        const imgSrc = giftEl.querySelector('img')?.getAttribute('src');
        openModal({ title, price: price ? `R$ ${price}` : '', imgSrc });
      });
    }
  });
}
