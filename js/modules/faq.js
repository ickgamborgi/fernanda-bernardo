export function initFaq() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach((question) => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const faqAnswer = faqItem.querySelector('.faq-answer');
      const isActive = question.classList.contains('active');

      // Close all other FAQ items
      document.querySelectorAll('.faq-question').forEach((q) => {
        if (q !== question) {
          q.classList.remove('active');
          q.parentElement.querySelector('.faq-answer').classList.remove('active');
        }
      });

      // Toggle current item
      if (isActive) {
        question.classList.remove('active');
        faqAnswer.classList.remove('active');
      } else {
        question.classList.add('active');
        faqAnswer.classList.add('active');
      }
    });
  });
}
