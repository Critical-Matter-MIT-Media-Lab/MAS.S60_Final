// Project background image handler
(function() {
  'use strict';
  
  function init() {
    const bg = document.querySelector('#selected_work .bg');
    if (!bg) {
      console.log('Background container not found');
      return;
    }
    
    const projectLinks = document.querySelectorAll('#selected_work ol li a[data-bg]');
    console.log('Found ' + projectLinks.length + ' links with data-bg');
    
    projectLinks.forEach(function(link, index) {
      console.log('Adding listener to link', index, link.textContent.substring(0, 20));
      
      link.addEventListener('mouseover', function(e) {
        const bgUrl = this.getAttribute('data-bg');
        const shouldRotate = this.getAttribute('data-rotate');
        const shouldZoom = this.getAttribute('data-zoom');
        console.log('MOUSEOVER! Loading image:', bgUrl, 'Rotate:', shouldRotate, 'Zoom:', shouldZoom);
        
        if (bgUrl) {
          // Clear existing images
          bg.innerHTML = '';
          
          // Create and add new image
          const img = document.createElement('img');
          img.id = 'project-bg-img';
          img.src = bgUrl;
          
          // Add classes based on data attributes
          var classes = [];
          if (shouldRotate === 'true') {
            classes.push('rotated');
          }
          if (shouldZoom === 'true') {
            classes.push('zoomed');
          }
          if (classes.length > 0) {
            img.className = classes.join(' ');
          }
          
          img.style.cssText = 'opacity: 0.6 !important; position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0;';
          bg.appendChild(img);
          
          console.log('Image added to background, classes:', img.className);
        }
      });
      
      link.addEventListener('mouseout', function(e) {
        console.log('MOUSEOUT! Removing image');
        bg.innerHTML = '';
      });
    });
  }
  
  // Try multiple initialization methods
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  window.addEventListener('load', init);
})();

