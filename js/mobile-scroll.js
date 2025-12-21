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
  let isScrolling = false;
  let scrollTimeout;

  if (!projectSection || totalProjects === 0) {
    return;
  }

  // Prevent default scroll behavior in project section
  let touchStartY = 0;
  let lastScrollTime = 0;
  const scrollCooldown = 800; // ms between project switches

  function updateActiveProject(index) {
    projectItems.forEach((item, i) => {
      if (i === index) {
        item.classList.add('mobile-active');
      } else {
        item.classList.remove('mobile-active');
      }
    });
    currentProjectIndex = index;
  }

  function handleScroll(direction) {
    const now = Date.now();
    if (now - lastScrollTime < scrollCooldown || isScrolling) {
      return;
    }

    if (direction === 'down') {
      if (currentProjectIndex < totalProjects - 1) {
        // Move to next project
        currentProjectIndex++;
        updateActiveProject(currentProjectIndex);
        lastScrollTime = now;
      } else {
        // At last project, allow scroll to next section
        const teamSection = document.querySelector('#team');
        if (teamSection) {
          isScrolling = true;
          teamSection.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            isScrolling = false;
          }, 1000);
        }
      }
    } else if (direction === 'up') {
      if (currentProjectIndex > 0) {
        // Move to previous project
        currentProjectIndex--;
        updateActiveProject(currentProjectIndex);
        lastScrollTime = now;
      }
      // If at first project, allow normal scroll up
    }
  }

  // Touch event handlers
  projectSection.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  projectSection.addEventListener('touchmove', (e) => {
    if (isScrolling) return;

    const touchY = e.touches[0].clientY;
    const deltaY = touchStartY - touchY;

    if (Math.abs(deltaY) > 50) { // Threshold for swipe
      if (deltaY > 0) {
        // Swiping up (scrolling down)
        handleScroll('down');
      } else {
        // Swiping down (scrolling up)
        handleScroll('up');
      }
      touchStartY = touchY;
    }
  }, { passive: true });

  // Wheel event for mouse scroll (if testing on desktop with mobile view)
  projectSection.addEventListener('wheel', (e) => {
    if (!isMobile()) return;
    
    const rect = projectSection.getBoundingClientRect();
    if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
      // Project section is in view
      if (currentProjectIndex < totalProjects - 1 || e.deltaY < 0) {
        e.preventDefault();
      }
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (e.deltaY > 0) {
          handleScroll('down');
        } else {
          handleScroll('up');
        }
      }, 50);
    }
  }, { passive: false });

  // Initialize first project as active
  updateActiveProject(0);

  // Update on resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (!isMobile()) {
        // Switched to desktop, remove mobile classes
        projectItems.forEach(item => item.classList.remove('mobile-active'));
      }
    }, 250);
  });
})();

