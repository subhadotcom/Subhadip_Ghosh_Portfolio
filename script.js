// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background Change on Scroll (Dark Mode)
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 26, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.4)';
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    }
});

// Enhanced Scroll Reveal Animation System with Sequential Project Cards
function revealOnScroll() {
    const reveals = document.querySelectorAll('[class*="reveal-"]:not(.active)');
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    reveals.forEach(reveal => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
}

// Sequential reveal for project cards using Intersection Observer
function initProjectCardsSequentialReveal() {
    const projectCards = document.querySelectorAll('.project-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const index = Array.from(projectCards).indexOf(card);
                
                // Add delay based on card index for sequential reveal
                setTimeout(() => {
                    card.classList.add('reveal-sequential');
                }, index * 150); // 150ms delay between each card
                
                projectObserver.unobserve(card);
            }
        });
    }, observerOptions);

    projectCards.forEach(card => {
        card.classList.add('project-card-hidden');
        projectObserver.observe(card);
    });
}

// Initialize scroll reveal animations
function initializeScrollReveal() {
    // Section headers - fade up
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.classList.add('reveal-fade-up');
    });

    // About section content - alternating left/right
    const aboutImage = document.querySelector('.about-image');
    const aboutText = document.querySelector('.about-text');
    if (aboutImage) aboutImage.classList.add('reveal-fade-left');
    if (aboutText) aboutText.classList.add('reveal-fade-right');

    // Stats cards - scale with stagger
    const stats = document.querySelectorAll('.stat');
    stats.forEach((stat, index) => {
        stat.classList.add('reveal-scale', `reveal-delay-${index + 1}`);
    });

    // Skills categories - fade up with stagger
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        const delay = (index % 3) + 1; // Distribute delays 1-3
        category.classList.add('reveal-fade-up', `reveal-delay-${delay}`);
    });

    // Project cards - alternating fade directions with stagger
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        const isEven = index % 2 === 0;
        const animationClass = isEven ? 'reveal-fade-left' : 'reveal-fade-right';
        const delayClass = `reveal-delay-${(index % 3) + 1}`;
        card.classList.add(animationClass, delayClass);
    });

    // Contact section content - fade from sides
    const contactInfo = document.querySelector('.contact-info');
    const contactForm = document.querySelector('.contact-form');
    if (contactInfo) contactInfo.classList.add('reveal-fade-left');
    if (contactForm) contactForm.classList.add('reveal-fade-right');

    // Social links - scale with stagger
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach((link, index) => {
        link.classList.add('reveal-scale', `reveal-delay-${index + 1}`);
    });

    // Contact methods - fade up with stagger
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach((method, index) => {
        method.classList.add('reveal-fade-up', `reveal-delay-${index + 1}`);
    });

    // Hero content elements (enhance existing animations)
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');
    const heroImage = document.querySelector('.hero-image');

    // Hero elements already have CSS animations, but add backup reveal classes
    // These will only trigger if user scrolls back up to hero section
    if (heroTitle) heroTitle.classList.add('reveal-fade-up');
    if (heroSubtitle) heroSubtitle.classList.add('reveal-fade-up', 'reveal-delay-1');
    if (heroDescription) heroDescription.classList.add('reveal-fade-up', 'reveal-delay-2');
    if (heroButtons) heroButtons.classList.add('reveal-fade-up', 'reveal-delay-3');
    if (heroImage) heroImage.classList.add('reveal-scale', 'reveal-delay-4');
}

// Add reveal class to elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all scroll reveal animations
    initializeScrollReveal();
    
    // Initial check for elements already in viewport
    setTimeout(revealOnScroll, 100);
});

// Throttled scroll event for better performance
window.addEventListener('scroll', throttle(revealOnScroll, 16));

// Navigation Highlighting with Intersection Observer
function initNavigationHighlighting() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '-100px 0px -60% 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        let visibleSections = [];
        
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                visibleSections.push({
                    element: entry.target,
                    ratio: entry.intersectionRatio
                });
            }
        });
        
        // Sort by intersection ratio to get the most visible section
        visibleSections.sort((a, b) => b.ratio - a.ratio);
        
        if (visibleSections.length > 0) {
            const targetId = visibleSections[0].element.getAttribute('id');
            
            // Remove active class from all nav links
            navLinks.forEach(link => {
                link.classList.remove('nav-active');
            });
            
            // Add active class to current section's nav link
            const activeLink = document.querySelector(`.nav-link[href="#${targetId}"]`);
            if (activeLink) {
                activeLink.classList.add('nav-active');
            }
        }
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Navbar Shrinking on Scroll
function initNavbarShrinking() {
    const navbar = document.querySelector('.navbar');
    let isScrolled = false;
    
    function updateNavbar() {
        const scrolled = window.scrollY > 50;
        
        if (scrolled !== isScrolled) {
            isScrolled = scrolled;
            
            if (scrolled) {
                navbar.classList.add('navbar-shrunk');
            } else {
                navbar.classList.remove('navbar-shrunk');
            }
        }
    }
    
    window.addEventListener('scroll', throttle(updateNavbar, 16));
}

// Typing Effect for Hero Section (Optional Enhancement)
function typeWriter() {
    const text = "Transforming complex data into actionable insights that drive business growth and strategic decision-making";
    const speed = 50;
    const element = document.querySelector('.hero-description');
    
    if (element && element.textContent === text) {
        element.textContent = '';
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
document.addEventListener('DOMContentLoaded', function() {
    // Uncomment the line below to enable typing effect
    // typeWriter();
});

// Apply Dark Mode Permanently
function initDarkMode() {
    // Always apply dark mode
    document.body.classList.add('dark-mode');
    document.documentElement.classList.add('dark-mode');
}

// Enhanced Back to Top Button
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    scrollBtn.setAttribute('title', 'Back to top');
    
    document.body.appendChild(scrollBtn);
    
    let isVisible = false;
    
    // Show/hide button based on scroll position
    function updateScrollButton() {
        const shouldShow = window.scrollY > 300;
        
        if (shouldShow !== isVisible) {
            isVisible = shouldShow;
            scrollBtn.classList.toggle('visible', shouldShow);
        }
    }
    
    window.addEventListener('scroll', throttle(updateScrollButton, 16));
    
    // Scroll to top on click
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Scroll-dependent functions are already called individually
    // This is just for any additional scroll optimizations
}, 16)); // ~60fps

// Skill Card Tilt Effect
function initializeSkillTiltEffect() {
    const skillCards = document.querySelectorAll('.skill-category');
    
    skillCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation based on cursor position
            const rotateX = (y - centerY) / centerY * -12; // Max 12 degrees
            const rotateY = (x - centerX) / centerX * 12;  // Max 12 degrees
            
            card.style.setProperty('--rotate-x', `${rotateX}deg`);
            card.style.setProperty('--rotate-y', `${rotateY}deg`);
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset rotation when mouse leaves
            card.style.setProperty('--rotate-x', '0deg');
            card.style.setProperty('--rotate-y', '0deg');
        });
    });
}

// 3D Tilt Effect for Skill Cards
function initSkillTilt() {
    const skillCards = document.querySelectorAll('.skill-category');
    
    skillCards.forEach(card => {
        const height = card.clientHeight;
        const width = card.clientWidth;
        
        card.addEventListener('mousemove', (e) => {
            const xVal = e.pageX - card.offsetLeft;
            const yVal = e.pageY - card.offsetTop;
            
            const yRotation = 20 * ((xVal - width / 2) / width);
            const xRotation = -20 * ((yVal - height / 2) / height);
            
            const transformString = `perspective(500px) scale(1.05) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
            const boxShadow = `${-yRotation / 2}px ${xRotation}px 15px rgba(0, 0, 0, 0.4)`;
            
            card.style.transform = transformString;
            card.style.boxShadow = boxShadow;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        });
    });
}

// Handle contact form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            
            try {
                // Disable the submit button and show loading state
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                
                // Get form data
                const formData = new FormData(this);
                
                // Send form data to FormSubmit
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Show success message near the button
                    const successMessage = document.createElement('div');
                    successMessage.className = 'form-success-message';
                    successMessage.textContent = 'Thanks for your message! I will get back to you soon.';
                    
                    // Insert after the submit button
                    const submitButton = this.querySelector('button[type="submit"]');
                    submitButton.parentNode.insertBefore(successMessage, submitButton.nextSibling);
                    
                    // Reset form
                    this.reset();
                    
                    // Remove message after 5 seconds
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Oops! Something went wrong. Please try again later or contact me directly at connect@subhadipghosh.co.in');
            } finally {
                // Re-enable the submit button and restore original text
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            }
        });
    }
});

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio website loaded successfully!');
    initSkillTilt();
    
    // Initialize all new features
    initProjectCardsSequentialReveal();
    initNavigationHighlighting();
    initNavbarShrinking();
    initDarkMode();
    createScrollToTopButton();
    initializeSkillTiltEffect();
    
    // Initialize existing scroll reveal animations
    initializeScrollReveal();
    
    // Initial check for elements already in viewport
    setTimeout(revealOnScroll, 100);
});
