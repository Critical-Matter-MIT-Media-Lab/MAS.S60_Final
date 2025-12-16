// Project background image handler
(function() {
  'use strict';
  
  const bg = document.querySelector('#selected_work .bg');
  const projectLinks = document.querySelectorAll('#selected_work a[data-bg]');
  
  projectLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      const bgUrl = this.getAttribute('data-bg');
      if (bgUrl) {
        // Clear existing images
        bg.innerHTML = '';
        
        // Create and add new image
        const img = document.createElement('img');
        img.src = bgUrl;
        img.style.opacity = '0';
        bg.appendChild(img);
        
        // Fade in the image
        setTimeout(() => {
          img.style.opacity = '1';
        }, 50);
      }
    });
    
    link.addEventListener('mouseleave', function() {
      const img = bg.querySelector('img');
      if (img) {
        img.style.opacity = '0';
        setTimeout(() => {
          bg.innerHTML = '';
        }, 500);
      }
    });
  });
})();

