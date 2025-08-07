document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-carousel]').forEach(container => {
    const inner = container.querySelector('[data-carousel-inner]');
    const prev = container.querySelector('[data-carousel-prev]');
    const next = container.querySelector('[data-carousel-next]');
    const slides = inner.querySelectorAll('img');
    let index = 0;
    let autoSlideInterval;
    let autoSlideDelayTimeout;

    const scrollToIndex = (i) => {
      const width = inner.offsetWidth;
      inner.scrollTo({ left: i * width, behavior: 'smooth' });
    };

    const startAutoSlide = () => {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(() => {
        index = (index + 1) % slides.length;
        scrollToIndex(index);
      }, 3000);
    };

    const pauseAutoSlide = () => {
      clearInterval(autoSlideInterval);
      clearTimeout(autoSlideDelayTimeout);
      autoSlideDelayTimeout = setTimeout(() => {
        startAutoSlide();
      }, 3000); // resume after 5s
    };

    prev.addEventListener('click', () => {
      index = (index - 1 + slides.length) % slides.length;
      scrollToIndex(index);
      pauseAutoSlide();
    });

    next.addEventListener('click', () => {
      index = (index + 1) % slides.length;
      scrollToIndex(index);
      pauseAutoSlide();
    });

    startAutoSlide();
  });
});
