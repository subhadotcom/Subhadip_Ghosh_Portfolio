// Immediate mobile responsiveness fix
function fixMobileViewport() {
  // Ensure viewport meta tag is properly set
  let viewport = document.querySelector("meta[name=viewport]");
  if (viewport) {
    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes');
  }

  // Force layout recalculation on mobile
  if (window.innerWidth <= 768) {
    document.body.style.minWidth = '320px';
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';
  }
}

// Apply mobile fixes immediately
fixMobileViewport();

// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", function () {
  // Apply mobile fixes again when DOM is ready
  fixMobileViewport();

  const mobileMenu = document.getElementById("mobile-menu");
  const navMenu = document.querySelector(".nav-menu");

  if (mobileMenu && navMenu) {
    mobileMenu.addEventListener("click", function () {
      mobileMenu.classList.toggle("active");
      navMenu.classList.toggle("active");

      // Prevent body scroll when menu is open
      if (navMenu.classList.contains("active")) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.style.overflow = '';
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (event) {
      if (!mobileMenu.contains(event.target) && !navMenu.contains(event.target)) {
        mobileMenu.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.style.overflow = '';
      }
    });
  }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// JavaScript Powered Glass Header System
function initGlassHeader() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  function updateHeaderStyle() {
    const scrollPos = window.scrollY;
    // Calculate adaptive transparency: clearer at top, slightly more 'filtered' when scrolling
    const transparency = Math.max(0.01, Math.min(0.05, 0.02 + (scrollPos / 1000)));
    const blurAmount = Math.min(45, 30 + (scrollPos / 10));
    const shadowAlpha = Math.min(0.2, 0.05 + (scrollPos / 500));

    // Apply dynamic watercolor glass styles
    navbar.style.background = `
      radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.1) 0%, transparent 80%),
      linear-gradient(135deg, rgba(255, 255, 255, ${transparency}), rgba(100, 181, 246, ${transparency + 0.02}))
    `;
    navbar.style.backdropFilter = `blur(${blurAmount}px) saturate(140%)`;
    navbar.style.webkitBackdropFilter = `blur(${blurAmount}px) saturate(140%)`;
    navbar.style.boxShadow = `0 8px 32px rgba(0, 0, 0, ${shadowAlpha}), 0 0 0 1px rgba(255, 255, 255, 0.1) inset`;
    navbar.style.borderColor = `rgba(255, 255, 255, ${0.1 + (scrollPos / 1000)})`;
  }

  // Mouse move for dynamic glint
  document.addEventListener("mousemove", (e) => {
    const rect = navbar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (e.clientY < 300) {
      navbar.style.setProperty('--mouse-x', `${x}px`);
      navbar.style.setProperty('--mouse-y', `${y}px`);
    }
  });

  // Hover states via JS
  navbar.addEventListener("mouseenter", () => {
    navbar.style.transition = "all 0.3s ease";
    navbar.style.background = `
      radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.15) 0%, transparent 80%),
      linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(100, 181, 246, 0.1))
    `;
  });

  navbar.addEventListener("mouseleave", updateHeaderStyle);

  // Scroll listener
  window.addEventListener("scroll", throttle(updateHeaderStyle, 10));

  // Initial run
  updateHeaderStyle();
}

// Ensure it loads
document.addEventListener("DOMContentLoaded", initGlassHeader);

// Enhanced Scroll Reveal Animation System with Intersection Observer
function initScrollReveal() {
  // Create Intersection Observer for better performance
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px' // Start animation 50px before element enters viewport
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve after animation to save performance
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all reveal elements
  const revealElements = document.querySelectorAll('[class*="reveal-"]');
  revealElements.forEach(element => {
    observer.observe(element);
  });
}

// Call on page load
document.addEventListener('DOMContentLoaded', initScrollReveal);

// Fallback for older browsers without Intersection Observer
function revealOnScroll() {
  const reveals = document.querySelectorAll('[class*="reveal-"]:not(.active)');
  const windowHeight = window.innerHeight;
  const elementVisible = 100;

  reveals.forEach((reveal) => {
    const elementTop = reveal.getBoundingClientRect().top;
    if (elementTop < windowHeight - elementVisible) {
      reveal.classList.add("active");
    }
  });
}

// Add scroll event listener as fallback
window.addEventListener('scroll', () => {
  if (!window.IntersectionObserver) {
    revealOnScroll();
  }
});

// Sequential reveal for project cards using Intersection Observer
function initProjectCardsSequentialReveal() {
  const projectCards = document.querySelectorAll(".project-card");

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const index = Array.from(projectCards).indexOf(card);

        // Add delay based on card index for sequential reveal
        setTimeout(() => {
          card.classList.add("reveal-sequential");
        }, index * 150); // 150ms delay between each card

        projectObserver.unobserve(card);
      }
    });
  }, observerOptions);

  projectCards.forEach((card) => {
    card.classList.add("project-card-hidden");
    projectObserver.observe(card);
  });
}

// Initialize scroll reveal animations
function initializeScrollReveal() {
  // Section headers - fade up
  const sectionHeaders = document.querySelectorAll(".section-header");
  sectionHeaders.forEach((header) => {
    header.classList.add("reveal-fade-up");
  });

  // About section content - alternating left/right
  const aboutImage = document.querySelector(".about-image");
  const aboutText = document.querySelector(".about-text");
  if (aboutImage) aboutImage.classList.add("reveal-fade-left");
  if (aboutText) aboutText.classList.add("reveal-fade-right");

  // Stats cards - scale with stagger
  const stats = document.querySelectorAll(".stat");
  stats.forEach((stat, index) => {
    stat.classList.add("reveal-scale", `reveal-delay-${index + 1}`);
  });

  // Skills categories - fade up with stagger
  const skillCategories = document.querySelectorAll(".skill-category");
  skillCategories.forEach((category, index) => {
    const delay = (index % 3) + 1; // Distribute delays 1-3
    category.classList.add("reveal-fade-up", `reveal-delay-${delay}`);
  });

  // Project cards - alternating fade directions with stagger
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card, index) => {
    const isEven = index % 2 === 0;
    const animationClass = isEven ? "reveal-fade-left" : "reveal-fade-right";
    const delayClass = `reveal-delay-${(index % 3) + 1}`;
    card.classList.add(animationClass, delayClass);
  });

  // Contact section content - fade from sides
  const contactInfo = document.querySelector(".contact-info");
  const contactForm = document.querySelector(".contact-form");
  if (contactInfo) contactInfo.classList.add("reveal-fade-left");
  if (contactForm) contactForm.classList.add("reveal-fade-right");

  // Social links - scale with stagger
  const socialLinks = document.querySelectorAll(".social-link");
  socialLinks.forEach((link, index) => {
    link.classList.add("reveal-scale", `reveal-delay-${index + 1}`);
  });

  // Contact methods - fade up with stagger
  const contactMethods = document.querySelectorAll(".contact-method");
  contactMethods.forEach((method, index) => {
    method.classList.add("reveal-fade-up", `reveal-delay-${index + 1}`);
  });

  // Hero content elements (enhance existing animations)
  const heroTitle = document.querySelector(".hero-title");
  const heroSubtitle = document.querySelector(".hero-subtitle");
  const heroDescription = document.querySelector(".hero-description");
  const heroButtons = document.querySelector(".hero-buttons");
  const heroImage = document.querySelector(".hero-image");

  // Hero elements already have CSS animations, but add backup reveal classes
  // These will only trigger if user scrolls back up to hero section
  if (heroTitle) heroTitle.classList.add("reveal-fade-up");
  if (heroSubtitle)
    heroSubtitle.classList.add("reveal-fade-up", "reveal-delay-1");
  if (heroDescription)
    heroDescription.classList.add("reveal-fade-up", "reveal-delay-2");
  if (heroButtons)
    heroButtons.classList.add("reveal-fade-up", "reveal-delay-3");
  if (heroImage) heroImage.classList.add("reveal-scale", "reveal-delay-4");
}

// Add reveal class to elements
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all scroll reveal animations
  initializeScrollReveal();

  // Initial check for elements already in viewport
  setTimeout(revealOnScroll, 100);
});

// Throttled scroll event for better performance
window.addEventListener("scroll", throttle(revealOnScroll, 16));

// Navigation Highlighting with Intersection Observer
function initNavigationHighlighting() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const observerOptions = {
    threshold: [0.1, 0.3, 0.5, 0.7],
    rootMargin: "-80px 0px -50% 0px",
  };

  let currentActiveSection = null;

  const sectionObserver = new IntersectionObserver((entries) => {
    let visibleSections = [];

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        visibleSections.push({
          element: entry.target,
          ratio: entry.intersectionRatio,
          top: entry.boundingClientRect.top,
        });
      }
    });

    if (visibleSections.length > 0) {
      // Sort by intersection ratio first, then by position
      visibleSections.sort((a, b) => {
        if (Math.abs(a.ratio - b.ratio) < 0.1) {
          return Math.abs(a.top) - Math.abs(b.top);
        }
        return b.ratio - a.ratio;
      });

      const targetId = visibleSections[0].element.getAttribute("id");

      // Only update if the active section has changed
      if (currentActiveSection !== targetId) {
        currentActiveSection = targetId;

        // Remove active class from all nav links
        navLinks.forEach((link) => {
          link.classList.remove("nav-active");
        });

        // Add active class to current section's nav link
        const activeLink = document.querySelector(
          `.nav-link[href="#${targetId}"]`
        );
        if (activeLink) {
          activeLink.classList.add("nav-active");
        }
      }
    }
  }, observerOptions);

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });

  // Handle scroll to top case (show home as active)
  window.addEventListener('scroll', function () {
    if (window.scrollY < 100) {
      navLinks.forEach((link) => {
        link.classList.remove("nav-active");
      });
      const homeLink = document.querySelector('.nav-link[href="#home"]');
      if (homeLink) {
        homeLink.classList.add("nav-active");
        currentActiveSection = 'home';
      }
    }
  });
}

// Navbar Shrinking on Scroll
function initNavbarShrinking() {
  const navbar = document.querySelector(".navbar");
  let isScrolled = false;

  function updateNavbar() {
    const scrolled = window.scrollY > 50;

    if (scrolled !== isScrolled) {
      isScrolled = scrolled;

      if (scrolled) {
        navbar.classList.add("navbar-shrunk");
      } else {
        navbar.classList.remove("navbar-shrunk");
      }
    }
  }

  window.addEventListener("scroll", throttle(updateNavbar, 16));
}

// Typing Effect for Hero Section (Optional Enhancement)
function typeWriter() {
  const text =
    "Transforming complex data into actionable insights that drive business growth and strategic decision-making";
  const speed = 50;
  const element = document.querySelector(".hero-description");

  if (element && element.textContent === text) {
    element.textContent = "";
    let i = 0;

    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }

    // Start typing effect after page load
    setTimeout(type, 1000);
  }
}

// Initialize typing effect
document.addEventListener("DOMContentLoaded", function () {
  // Uncomment the line below to enable typing effect
  // typeWriter();
});

// Apply Dark Mode Permanently
function initDarkMode() {
  // Always apply dark mode
  document.body.classList.add("dark-mode");
  document.documentElement.classList.add("dark-mode");
}

// Enhanced Back to Top Button
function createScrollToTopButton() {
  const scrollBtn = document.createElement("button");
  scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollBtn.className = "scroll-to-top";
  scrollBtn.setAttribute("aria-label", "Scroll to top");
  scrollBtn.setAttribute("title", "Back to top");

  document.body.appendChild(scrollBtn);

  let isVisible = false;

  // Show/hide button based on scroll position
  function updateScrollButton() {
    const shouldShow = window.scrollY > 300;

    if (shouldShow !== isVisible) {
      isVisible = shouldShow;
      scrollBtn.classList.toggle("visible", shouldShow);
    }
  }

  window.addEventListener("scroll", throttle(updateScrollButton, 16));

  // Scroll to top on click
  scrollBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Initialize scroll to top button
document.addEventListener("DOMContentLoaded", createScrollToTopButton);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Apply throttling to scroll events
window.addEventListener(
  "scroll",
  throttle(function () {
    // Scroll-dependent functions are already called individually
    // This is just for any additional scroll optimizations
  }, 16)
); // ~60fps



// Simple Tilt Effect for Skill Cards
function initSkillTilt() {
  const skillCards = document.querySelectorAll(".skill-category");

  skillCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate gentle tilt based on cursor position (max 5 degrees)
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    });
  });
}

// Mobile Footer Layout Management
function handleMobileFooterLayout() {
  const footerContent = document.querySelector('.footer-content');
  const footerLeft = document.querySelector('.footer-left');
  const footerRight = document.querySelector('.footer-right');

  if (!footerContent || !footerLeft || !footerRight) return;

  function updateFooterLayout() {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      // On mobile: center footer-left and hide footer-right
      footerContent.style.flexDirection = 'column';
      footerContent.style.alignItems = 'center';
      footerContent.style.textAlign = 'center';

      footerLeft.style.display = 'block';
      footerLeft.style.width = '100%';
      footerLeft.style.textAlign = 'center';
      footerLeft.style.marginBottom = '0';

      footerRight.style.display = 'none';
    } else {
      // On desktop: restore original layout
      footerContent.style.flexDirection = 'row';
      footerContent.style.alignItems = 'center';
      footerContent.style.textAlign = 'left';

      footerLeft.style.display = 'block';
      footerLeft.style.width = 'auto';
      footerLeft.style.textAlign = 'left';
      footerLeft.style.marginBottom = '0';

      footerRight.style.display = 'flex';
    }
  }

  // Initial call
  updateFooterLayout();

  // Update on window resize
  window.addEventListener('resize', updateFooterLayout);
}


// Window resize handler for mobile responsiveness
window.addEventListener('resize', function () {
  fixMobileViewport();

  // Close mobile menu on resize to larger screen
  if (window.innerWidth > 768) {
    const mobileMenu = document.getElementById("mobile-menu");
    const navMenu = document.querySelector(".nav-menu");
    if (mobileMenu && navMenu) {
      mobileMenu.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = '';
    }
  }
});

// Magnetic cursor effect for interactive elements
function initMagneticCursor() {
  const cursor = document.createElement('div');
  cursor.className = 'magnetic-cursor';
  document.body.appendChild(cursor);

  const cursorDot = document.createElement('div');
  cursorDot.className = 'cursor-dot';
  document.body.appendChild(cursorDot);

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Add hover effects for interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-category, .social-link');

  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-grow');
      cursorDot.classList.add('cursor-dot-hidden');
    });

    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-grow');
      cursorDot.classList.remove('cursor-dot-hidden');
    });
  });
}

// Advanced typewriter effect for hero title
function initTypewriterEffect() {
  const heroTitle = document.querySelector('.hero-title');
  if (!heroTitle) return;

  const text = heroTitle.textContent;
  heroTitle.textContent = '';
  heroTitle.classList.add('typewriter');

  let i = 0;
  function typeChar() {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeChar, 100);
    } else {
      heroTitle.classList.remove('typewriter');
    }
  }

  setTimeout(typeChar, 1000);
}

// Parallax scrolling effect
function initParallaxEffect() {
  const parallaxElements = document.querySelectorAll('.hero-avatar, .profile-photo');

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    parallaxElements.forEach(el => {
      el.style.transform = `translateY(${rate}px)`;
    });
  });
}

// Project card hover effects
function initProjectCardInteractions() {
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.02)';
      card.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
      card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    });
  });
}

// Smooth page transitions
function initSmoothTransitions() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Text animation on scroll
function initTextAnimations() {
  const textElements = document.querySelectorAll('.section-title, .section-subtitle');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'slideInFromLeft 0.8s ease-out';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  textElements.forEach(el => observer.observe(el));
}

// Initialize all functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("Portfolio website loaded successfully!");

  // Apply mobile fixes first
  fixMobileViewport();

  // Initialize new modern effects
  if (window.innerWidth > 768) {
    initMagneticCursor();
    initParallaxEffect();
  }

  initTypewriterEffect();
  initProjectCardInteractions();
  initSmoothTransitions();
  initTextAnimations();
  handleMobileFooterLayout();

  initSkillTilt();

  // Initialize all new features
  initProjectCardsSequentialReveal();
  initNavigationHighlighting();
  initNavbarShrinking();
  initDarkMode();
  createScrollToTopButton();

  // Initialize existing scroll reveal animations
  initializeScrollReveal();

  // Initial check for elements already in viewport
  setTimeout(revealOnScroll, 100);

  // Force a layout recalculation for mobile
  setTimeout(() => {
    if (window.innerWidth <= 768) {
      window.dispatchEvent(new Event('resize'));
    }
  }, 200);
});


// Disable right-click, keyboard shortcuts, and browser inspection
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  alert('Right-click is disabled to protect the content.');
});

// Disable keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
  if (
    e.key === 'F12' ||
    (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j')) ||
    (e.ctrlKey && (e.key === 'U' || e.key === 'u'))
  ) {
    e.preventDefault();
    alert('This action is disabled to protect the content.');
  }
});

// Prevent opening developer tools
(function () {
  // Prevent opening developer tools
  const devtools = /./;
  devtools.toString = function () {
    this.opened = true;
  }
  console.log('%c', devtools);
  devtools.opened = false;

  setInterval(function () {
    if (devtools.opened) {
      alert('Developer tools are disabled to protect the content.');
      window.location.reload();
    }
  }, 1000);
})();

// Prevent taking screenshots
document.addEventListener('keyup', (e) => {
  if (e.key === 'PrintScreen') {
    navigator.clipboard.writeText('');
    alert('Screenshots are disabled to protect the content.');
  }
});

// Prevent drag and drop
document.addEventListener('dragstart', (e) => {
  e.preventDefault();
});

// Prevent text selection
document.addEventListener('selectstart', (e) => {
  e.preventDefault();
});

// Prevent image dragging
document.querySelectorAll('img').forEach(img => {
  img.setAttribute('draggable', 'false');
});