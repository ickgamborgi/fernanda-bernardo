export function initCounter() {
  const countdownElement = document.getElementById('countdown-container');
  if (!countdownElement) return;

  // Target date: April 18, 2026 at 12:00 PM (noon)
  const targetDate = new Date('2026-04-18T12:00:00').getTime();

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

      countdownElement.innerHTML = `Faltam<br> <span class="counter-highlight">${daysFormatted}</span> dias e <span class="counter-highlight">${hoursFormatted}</span> h<br> para o Grande Momento`;
    } else {
      countdownElement.innerHTML = '<p style="font-family: MonteCarlo; font-size: 48px; color: #5e753f;">Nosso Grande Dia Chegou! 🎉</p>';
    }
  }

  // Update on page load
  updateCounter();

  // Update every minute (check if time changed)
  setInterval(updateCounter, 60000);
}
