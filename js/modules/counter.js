export function initCounter() {
  const countdownElement = document.getElementById('countdown-container');
  if (!countdownElement) return;

  // Target date: April 18, 2026 at 12:00 PM (noon)
  const targetDate = new Date('2026-04-18T12:00:00').getTime();

  // Typewriter effect using GSAP
  function typewriterEffect(text, duration = 1.5) {
    countdownElement.textContent = '';
    
    if (typeof window !== 'undefined' && window.gsap) {
      const gsap = window.gsap;
      
      // Split text but preserve spaces
      const textArray = text.split('');
      
      gsap.to({}, {
        duration: duration,
        onUpdate: function() {
          const progress = this.progress();
          const charIndex = Math.floor(progress * textArray.length);
          countdownElement.textContent = textArray.slice(0, charIndex).join('');
        },
      });
    } else {
      // Fallback if GSAP not available
      countdownElement.textContent = text;
    }
  }

  function updateCounter() {
    const now = new Date().getTime();
    const timeRemaining = targetDate - now;

    if (timeRemaining > 0) {
      // Calculate days and hours
      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

      // Format with leading zeros
      const daysFormatted = String(days).padStart(2, '0');
      const hoursFormatted = String(hours).padStart(2, '0');

      // Use HTML for styled numbers, but typewriter effect on plain text version
      const textContent = `Faltam ${daysFormatted} dias e ${hoursFormatted}h para o Grande Momento!`;
      
      // Show styled HTML immediately
      countdownElement.innerHTML = `Faltam<br> <span class="counter-highlight">${daysFormatted}</span> dias e <span class="counter-highlight">${hoursFormatted}</span> h<br> para o Grande Momento!`;
      
      // Apply typewriter only on first load
      if (!countdownElement.classList.contains('animated')) {
        typewriterEffect(textContent);
        countdownElement.classList.add('animated');
      }
    } else {
      countdownElement.innerHTML = '<p style="font-family: MonteCarlo; font-size: 48px; color: #5e753f;">Nosso Grande Dia Chegou! 🎉</p>';
      countdownElement.classList.add('animated');
    }
  }

  // Update on page load
  updateCounter();

  // Update every minute (check if time changed)
  setInterval(updateCounter, 60000);
}
