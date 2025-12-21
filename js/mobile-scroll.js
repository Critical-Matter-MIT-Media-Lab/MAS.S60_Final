// Mobile sticky scroll for project section
(function() {
  // Only run on mobile
  function isMobile() {
    return window.innerWidth <= 960;
  }

  if (!isMobile()) {
    return; // Exit if not mobile
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
  
  // Cache DOM elements for performance
  const bg = document.querySelector('#selected_work .bg');
  let gifWrappers = [];
  let projectLinks = [];
  let savedScrollY = 0;

  if (!projectSection || totalProjects === 0) {
    return;
  }

  // Cache project links
  projectItems.forEach((item, i) => {
    projectLinks[i] = item.querySelector('a');
  });

  // Randomly select starting project
  currentProjectIndex = Math.floor(Math.random() * totalProjects);

  function updateActiveProject(index) {
    // Use requestAnimationFrame for smooth updates
    requestAnimationFrame(() => {
      // Update text highlighting
      for (let i = 0; i < totalProjects; i++) {
        const item = projectItems[i];
        const link = projectLinks[i];
        if (i === index) {
          item.classList.add('mobile-active');
          if (link) link.classList.add('mobile-active');
        } else {
          item.classList.remove('mobile-active');
          if (link) link.classList.remove('mobile-active');
        }
      }
      currentProjectIndex = index;
      
      // Update GIF visibility
      const currentGifUrl = projectLinks[index]?.getAttribute('data-gif');
      
      for (let j = 0; j < gifWrappers.length; j++) {
        const wrapper = gifWrappers[j];
        const wrapperGifUrl = wrapper.getAttribute('data-gif-url');
        if (wrapperGifUrl === currentGifUrl) {
          wrapper.classList.add('active');
        } else {
          wrapper.classList.remove('active');
        }
      }
    });
  }

  function isProjectSectionInView() {
    const rect = projectSection.getBoundingClientRect();
    return rect.top <= 100 && rect.bottom >= window.innerHeight - 100;
  }

  // Simpler scroll lock - just use overflow hidden on html
  function lockScroll() {
    if (isLocked) return;
    isLocked = true;
    savedScrollY = window.scrollY;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }

  function unlockScroll() {
    if (!isLocked) return;
    isLocked = false;
    document.documentElement.style.overflow = '';
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
        // Move to next project
        currentProjectIndex++;
        updateActiveProject(currentProjectIndex);
        return true; // Consumed the swipe
      } else {
        // At last project, unlock and scroll to next section
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
        // Move to previous project
        currentProjectIndex--;
        updateActiveProject(currentProjectIndex);
        return true; // Consumed the swipe
      } else {
        // At first project, unlock scroll (allow scrolling up to intro)
        unlockScroll();
        return false;
      }
    }
    return false;
  }

  // Touch event handlers
  document.addEventListener('touchstart', (e) => {
    if (!isMobile()) return;
    touchStartY = e.touches[0].clientY;
    
    // Check if we should lock scroll
    if (isProjectSectionInView() && !isLocked) {
      lockScroll();
    }
  }, { passive: true });

  document.addEventListener('touchmove', (e) => {
    if (!isMobile() || !isLocked) return;
    
    // Prevent scrolling when locked
    e.preventDefault();
  }, { passive: false });

  document.addEventListener('touchend', (e) => {
    if (!isMobile()) return;
    
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY - touchEndY;

    if (isLocked && Math.abs(deltaY) > swipeThreshold) {
      if (deltaY > 0) {
        // Swiped up (scroll down)
        handleSwipe('down');
      } else {
        // Swiped down (scroll up)
        handleSwipe('up');
      }
    }
    
    // Always ensure current project is fully active after touch ends
    updateActiveProject(currentProjectIndex);
  }, { passive: true });

  // Check scroll position to re-lock when entering project section
  let scrollCheckTimeout;
  window.addEventListener('scroll', () => {
    if (!isMobile() || isLocked) return;
    
    clearTimeout(scrollCheckTimeout);
    scrollCheckTimeout = setTimeout(() => {
      if (isProjectSectionInView()) {
        // Determine which project to show based on scroll direction
        const rect = projectSection.getBoundingClientRect();
        if (rect.top <= 0) {
          lockScroll();
        }
      }
    }, 100);
  }, { passive: true });

  // Initialize with random project as active
  // Wait for projects.js to create GIF wrappers first
  function initializeProject() {
    const wrappers = bg ? bg.querySelectorAll('.gif-wrapper-preload') : [];
    
    if (wrappers.length > 0) {
      // Cache GIF wrappers for performance
      gifWrappers = Array.from(wrappers);
      
      // GIF wrappers are ready
      updateActiveProject(currentProjectIndex);
      if (isProjectSectionInView()) {
        lockScroll();
      }
    } else {
      // Wait and retry
      setTimeout(initializeProject, 100);
    }
  }
  
  // Start checking after a short delay to let projects.js run first
  setTimeout(initializeProject, 200);

  // Handle resize
  window.addEventListener('resize', () => {
    if (!isMobile() && isLocked) {
      unlockScroll();
      projectItems.forEach(item => item.classList.remove('mobile-active'));
    }
  });
})();
