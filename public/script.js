// Apple-style fade/scale animation for screenshots, one at a time
let autoCarouselTimers = new WeakMap();

function showScreenshot(row, index, images) {
  images.forEach((img, i) => {
    if (i === index) {
      img.classList.add('active');
      img.classList.remove('fade-out');
    } else {
      img.classList.remove('active');
      img.classList.remove('fade-out');
    }
  });
  row.setAttribute('data-index', index);
  // Update arrows
  const leftArrow = row.parentElement.querySelector('.slider-arrow.left');
  const rightArrow = row.parentElement.querySelector('.slider-arrow.right');
  if (leftArrow) leftArrow.disabled = images.length <= 1;
  if (rightArrow) rightArrow.disabled = images.length <= 1;
}

function carouselScreenshots(btn, direction) {
  const row = btn.parentElement.querySelector('.project-screenshots-row');
  if (!row) return;
  const images = Array.from(row.querySelectorAll('.project-mockup'));
  let index = parseInt(row.getAttribute('data-index')) || 0;
  const prevIndex = index;
  index += direction;
  if (index < 0) index = images.length - 1;
  if (index >= images.length) index = 0;
  if (index === prevIndex) return;
  // Remove .fade-out from all images first
  images.forEach(img => img.classList.remove('fade-out'));
  // Animate out current
  images[prevIndex].classList.remove('active');
  // Force reflow for transition
  void images[prevIndex].offsetWidth;
  images[prevIndex].classList.add('fade-out');
  // Animate in next
  images[index].classList.add('active');
  images[index].classList.remove('fade-out');
  row.setAttribute('data-index', index);
  // Pause auto-advance and resume after 5s
  clearTimeout(autoCarouselTimers.get(row));
  autoCarouselTimers.set(row, setTimeout(() => autoAdvanceCarousel(row), 5000));
}

function autoAdvanceCarousel(row) {
  const images = Array.from(row.querySelectorAll('.project-mockup'));
  if (images.length <= 1) return;
  let index = parseInt(row.getAttribute('data-index')) || 0;
  let next = (index + 1) % images.length;
  // Remove .fade-out from all images first
  images.forEach(img => img.classList.remove('fade-out'));
  // Animate out current
  images[index].classList.remove('active');
  // Force reflow for transition
  void images[index].offsetWidth;
  images[index].classList.add('fade-out');
  // Animate in next
  images[next].classList.add('active');
  images[next].classList.remove('fade-out');
  row.setAttribute('data-index', next);
  autoCarouselTimers.set(row, setTimeout(() => autoAdvanceCarousel(row), 2000));
}

window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.project-screenshots-row').forEach(row => {
    const images = Array.from(row.querySelectorAll('.project-mockup'));
    // Show only the first image
    images.forEach((img, i) => {
      img.classList.toggle('active', i === 0);
      img.classList.remove('fade-out');
    });
    row.setAttribute('data-index', 0);
    // Start auto-advance
    autoCarouselTimers.set(row, setTimeout(() => autoAdvanceCarousel(row), 2000));
    // Update arrows
    const leftArrow = row.parentElement.querySelector('.slider-arrow.left');
    const rightArrow = row.parentElement.querySelector('.slider-arrow.right');
    if (leftArrow) leftArrow.disabled = images.length <= 1;
    if (rightArrow) rightArrow.disabled = images.length <= 1;
  });

  // Copy email button
  const copyBtn = document.getElementById('copy-email');
  if (copyBtn) {
    copyBtn.addEventListener('click', function() {
      const email = this.getAttribute('data-email') || 'ertanyagmur@outlook.com';
      navigator.clipboard.writeText(email).then(function() {
        const feedback = document.getElementById('email-feedback');
        if (feedback) {
          feedback.style.display = 'inline';
          setTimeout(function() {
            feedback.style.display = 'none';
          }, 1500);
        }
      });
    });
  }
}); 