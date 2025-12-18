// Project background video/image handler with preloading
(function() {
  'use strict';
  
  var videoCache = {};
  
  function init() {
    const bg = document.querySelector('#selected_work .bg');
    if (!bg) {
      console.log('Background container not found');
      return;
    }
    
    const projectLinks = document.querySelectorAll('#selected_work ol li a[data-video]');
    console.log('Found ' + projectLinks.length + ' links with data-video');
    
    // Preload all videos
    projectLinks.forEach(function(link, index) {
      const videoId = link.getAttribute('data-video');
      const videoStart = link.getAttribute('data-video-start') || '0';
      const videoZoom = link.getAttribute('data-video-zoom');
      
      if (videoId && !videoCache[videoId]) {
        console.log('Preloading video:', videoId, 'start:', videoStart, 'zoom:', videoZoom);
        
        const wrapper = document.createElement('div');
        wrapper.className = 'video-wrapper-preload';
        if (videoZoom === 'true') {
          wrapper.classList.add('video-zoomed');
        }
        wrapper.setAttribute('data-video-id', videoId);
        wrapper.style.cssText = 'position: absolute !important; top: 0 !important; left: 0 !important; width: 100% !important; height: 100% !important; overflow: hidden !important; opacity: 0 !important; pointer-events: none !important; z-index: 0 !important; transition: opacity 0.5s ease !important;';
        
        const iframe = document.createElement('iframe');
        iframe.style.cssText = 'position: absolute !important; top: 50% !important; left: 50% !important; width: 177.78vh !important; height: 100vh !important; min-width: 100vw !important; min-height: 56.25vw !important; transform: translate(-50%, -50%) !important; border: none !important;';
        iframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&mute=1&loop=1&playlist=' + videoId + '&start=' + videoStart + '&controls=0&modestbranding=1&playsinline=1&rel=0';
        iframe.title = 'YouTube video player';
        iframe.frameBorder = '0';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        
        wrapper.appendChild(iframe);
        bg.appendChild(wrapper);
        videoCache[videoId] = wrapper;
        
        console.log('Video wrapper added to bg, total children:', bg.children.length);
      }
    });
    
    console.log('Preloaded ' + Object.keys(videoCache).length + ' videos');
    
    // Add hover listeners
    projectLinks.forEach(function(link, index) {
      link.addEventListener('mouseover', function(e) {
        const videoId = this.getAttribute('data-video');
        
        console.log('Mouseover, showing video:', videoId);
        
        // Hide all videos first
        for (var id in videoCache) {
          if (videoCache[id]) {
            videoCache[id].style.opacity = '0';
          }
        }
        
        // Show the hovered video
        if (videoId && videoCache[videoId]) {
          videoCache[videoId].style.cssText = 'position: absolute !important; top: 0 !important; left: 0 !important; width: 100% !important; height: 100% !important; overflow: hidden !important; opacity: 0.6 !important; pointer-events: none !important; z-index: 1 !important; transition: opacity 0.5s ease !important;';
          console.log('Video shown, opacity set to 0.6, element:', videoCache[videoId]);
        }
      });
      
      link.addEventListener('mouseout', function(e) {
        console.log('Mouseout, hiding all videos');
        // Hide all videos
        for (var id in videoCache) {
          if (videoCache[id]) {
            videoCache[id].style.cssText = 'position: absolute !important; top: 0 !important; left: 0 !important; width: 100% !important; height: 100% !important; overflow: hidden !important; opacity: 0 !important; pointer-events: none !important; z-index: 0 !important; transition: opacity 0.5s ease !important;';
          }
        }
      });
    });
  }
  
  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

