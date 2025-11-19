export function initCounter() {
  const countdownElement = document.getElementById('countdown-container');
  if (!countdownElement) return;

  // Target date: April 18, 2026 at 12:00 PM (noon)
  const targetDate = new Date('2026-04-18T12:00:00').getTime();

  // Simple typewriter effect for text content
  function typewriterEffect(fullHtml, duration = 2.5) {
    if (typeof window === 'undefined' || !window.gsap) {
      countdownElement.innerHTML = fullHtml;
      return;
    }

    const gsap = window.gsap;
    
    // Split HTML into segments (text + tags)
    const segments = [];
    let lastIndex = 0;
    const tagRegex = /<[^>]*>/g;
    let match;
    
    while ((match = tagRegex.exec(fullHtml)) !== null) {
      // Add text before tag
      if (match.index > lastIndex) {
        segments.push({
          type: 'text',
          content: fullHtml.substring(lastIndex, match.index)
        });
      }
      // Add tag
      segments.push({
        type: 'tag',
        content: match[0]
      });
      lastIndex = match.index + match[0].length;
    }
    // Add remaining text
    if (lastIndex < fullHtml.length) {
      segments.push({
        type: 'text',
        content: fullHtml.substring(lastIndex)
      });
    }

    // Count only text characters
    let textCharCount = 0;
    for (const seg of segments) {
      if (seg.type === 'text') {
        textCharCount += seg.content.length;
      }
    }

    countdownElement.innerHTML = '';
    
    gsap.to({ charIndex: 0 }, {
      charIndex: textCharCount,
      duration: duration,
      ease: 'none',
      onUpdate: function() {
        const targetChars = Math.floor(this.targets()[0].charIndex);
        let charCount = 0;
        let result = '';

        for (const seg of segments) {
          if (seg.type === 'tag') {
            result += seg.content;
          } else {
            // Text segment
            for (let i = 0; i < seg.content.length; i++) {
              if (charCount < targetChars) {
                result += seg.content[i];
                charCount++;
              } else {
                break;
              }
            }
            if (charCount >= targetChars) break;
          }
        }

        countdownElement.innerHTML = result;
      },
    });
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

      // HTML with mixed fonts: MonteCarlo for text, Caveat for numbers
      const htmlContent = `Faltam <span class="counter-highlight">${daysFormatted}</span> dias e <span class="counter-highlight">${hoursFormatted}</span> h para o Grande Momento!`;
      
      // Apply typewriter effect only on first load
      if (!countdownElement.classList.contains('animated')) {
        // Set up ScrollTrigger if available
        if (typeof window !== 'undefined' && window.gsap && window.gsap.ScrollTrigger) {
          const gsap = window.gsap;
          gsap.registerPlugin(window.gsap.ScrollTrigger);
          
          // Create a timeline with ScrollTrigger
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: '#counter',
              start: 'top 85%',
              toggleActions: 'play none reset none',
            },
          });
          
          tl.call(() => typewriterEffect(htmlContent), null, 0);
        } else {
          // Fallback without ScrollTrigger
          typewriterEffect(htmlContent);
        }
        
        countdownElement.classList.add('animated');
      } else {
        // On subsequent updates, just show the HTML
        countdownElement.innerHTML = htmlContent;
      }
    } else {
      countdownElement.innerHTML = '<p style="font-family: MonteCarlo; font-size: 48px; color: #5e753f;">Nosso Grande Momento Chegou! 🎉</p>';
      countdownElement.classList.add('animated');
    }
  }

  // Update on page load
  updateCounter();

  // Update every minute (check if time changed)
  setInterval(updateCounter, 60000);
}
