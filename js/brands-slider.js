// Brands Slider Infinite Scroll
document.addEventListener('DOMContentLoaded', function() {
  const sliderTrack = document.querySelector('.album-slider .slider-track');
  
  if (!sliderTrack) return;

  // Clone the images for seamless infinite scroll
  const images = sliderTrack.querySelectorAll('img');
  const originalImages = Array.from(images).slice(0, 4); // Get first 4 images (original set)
  
  // Clear the track and add original images
  sliderTrack.innerHTML = '';
  originalImages.forEach(img => {
    const clone = img.cloneNode(true);
    sliderTrack.appendChild(clone);
  });
  
  // Add duplicates for seamless loop
  originalImages.forEach(img => {
    const clone = img.cloneNode(true);
    sliderTrack.appendChild(clone);
  });

  // Calculate the width of one set of images
  const imageWidth = 120; // Width from CSS
  const gap = 24; // Gap from CSS
  const totalWidth = (imageWidth + gap) * originalImages.length;
  
  // Set initial position
  let currentPosition = 0;
  const speed = 1; // Pixels per frame
  
  function animate() {
    currentPosition -= speed;
    
    // Reset position when first set is completely out of view
    if (currentPosition <= -totalWidth) {
      currentPosition = 0;
    }
    
    sliderTrack.style.transform = `translateX(${currentPosition}px)`;
    requestAnimationFrame(animate);
  }
  
  // Start animation
  animate();
  
  // Pause on hover
  const slider = document.querySelector('.album-slider');
  let isPaused = false;
  
  slider.addEventListener('mouseenter', () => {
    isPaused = true;
  });
  
  slider.addEventListener('mouseleave', () => {
    isPaused = false;
  });
  
  // Modified animate function with pause functionality
  function animateWithPause() {
    if (!isPaused) {
      currentPosition -= speed;
      
      // Reset position when first set is completely out of view
      if (currentPosition <= -totalWidth) {
        currentPosition = 0;
      }
      
      sliderTrack.style.transform = `translateX(${currentPosition}px)`;
    }
    requestAnimationFrame(animateWithPause);
  }
  
  // Start the improved animation
  animateWithPause();
}); 