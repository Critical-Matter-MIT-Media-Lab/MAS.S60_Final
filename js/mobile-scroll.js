// Mobile sticky scroll for project section
(function() {
  // Only run on mobile
  if (window.innerWidth > 960) {
    return;
  }

  let currentProjectIndex = 0;
  const projectSection = document.querySelector('#selected_work');
  const projectItems = document.querySelectorAll('#selected_work ol li');
  const totalProjects = projectItems.length;
  let isLocked = false;
  let touchStartY = 0;
  let lastSwipeTime = 0;
  const swipeCooldown = 400;
  const swipeThreshold = 30;

  if (!projectSection || totalProjects === 0) {
    return;
  }

  // Randomly select starting project
  currentProjectIndex = Math.floor(Math.random() * totalProjects);

  function updateActiveProject(index) {
    // Update text highlighting
    projectItems.forEach((item, i) => {
      const link = item.querySelector('a');
      if (i === index) {
        item.classList.add('mobile-active');
        if (link) link.classList.add('mobile-active');
      } else {
        item.classList.remove('mobile-active');
        if (link) link.classList.remove('mobile-active');
      }
    });
    currentProjectIndex = index;
    
    // Update GIF visibility
    const bg = document.querySelector('#selected_work .bg');
    if (!bg) return;
    
    const gifWrappers = bg.querySelectorAll('.gif-wrapper-preload');
    const currentLink = projectItems[index]?.querySelector('a');
    const currentGifUrl = currentLink?.getAttribute('data-gif');
    
    gifWrappers.forEach((wrapper) => {
      const wrapperGifUrl = wrapper.getAttribute('data-gif-url');
      if (wrapperGifUrl === currentGifUrl) {
        wrapper.style.opacity = '1';
        wrapper.style.zIndex = '1';
      } else {
        wrapper.style.opacity = '0';
        wrapper.style.zIndex = '0';
      }
    });
  }

  function isProjectSectionInView() {
    const rect = projectSection.getBoundingClientRect();
    return rect.top <= 100 && rect.bottom >= window.innerHeight - 100;
  }

  function lockScroll() {
    if (isLocked) return;
    isLocked = true;
    document.body.style.overflow = 'hidden';
  }

  function unlockScroll() {
    if (!isLocked) return;
    isLocked = false;
    document.body.style.overflow = '';
  }

  function handleSwipe(direction) {
    const now = Date.now();
    if (now - lastSwipeTime < swipeCooldown) {
      return false;
    }
    lastSwipeTime = now;

    if (direction === 'down') {
      if (currentProjectIndex < totalProjects - 1) {
        currentProjectIndex++;
        updateActiveProject(currentProjectIndex);
        return true;
      } else {
        unlockScroll();
        setTimeout(() => {
          const teamSection = document.querySelector('#team');
          if (teamSection) {
            teamSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 50);
        return false;
      }
    } else if (direction === 'up') {
      if (currentProjectIndex > 0) {
        currentProjectIndex--;
        updateActiveProject(currentProjectIndex);
        return true;
      } else {
        unlockScroll();
        return false;
      }
    }
    return false;
  }

  // Touch event handlers
  document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
    
    if (isProjectSectionInView() && !isLocked) {
      lockScroll();
    }
  }, { passive: true });

  document.addEventListener('touchmove', (e) => {
    if (!isLocked) return;
    e.preventDefault();
  }, { passive: false });

  document.addEventListener('touchend', (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY - touchEndY;

    if (isLocked && Math.abs(deltaY) > swipeThreshold) {
      if (deltaY > 0) {
        handleSwipe('down');
      } else {
        handleSwipe('up');
      }
    }
  }, { passive: true });

  // Re-lock when entering project section
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (isLocked) return;
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (isProjectSectionInView()) {
        lockScroll();
        updateActiveProject(currentProjectIndex);
      }
    }, 150);
  }, { passive: true });

  // Initialize
  function init() {
    const bg = document.querySelector('#selected_work .bg');
    const gifWrappers = bg ? bg.querySelectorAll('.gif-wrapper-preload') : [];
    
    if (gifWrappers.length > 0) {
      updateActiveProject(currentProjectIndex);
      if (isProjectSectionInView()) {
        lockScroll();
      }
    } else {
      setTimeout(init, 150);
    }
  }
  
  setTimeout(init, 300);

  // Handle resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 960 && isLocked) {
      unlockScroll();
    }
  });
})();
