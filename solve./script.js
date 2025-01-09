
const cards = document.querySelectorAll('.testimonials__card');

// IntersectionObserver to detect which card is visible
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('focused');
      } else {
        entry.target.classList.remove('focused');
      }
    });
  },
  {
    threshold: 0.5, // Trigger when 50% of the card is visible
  }
);

// Observe each card
cards.forEach((card) => observer.observe(card));

