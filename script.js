// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or use system preference
const savedTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
html.setAttribute('data-theme', savedTheme);

// Update icon based on current theme
const updateThemeIcon = () => {
    const icon = themeToggle.querySelector('i');
    const currentTheme = html.getAttribute('data-theme');
    icon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
};

// Initialize icon
updateThemeIcon();

// Theme toggle click handler
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Add transition class
    html.classList.add('theme-transition');
    
    // Update theme
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    updateThemeIcon();
    
    // Remove transition class after animation
    setTimeout(() => {
        html.classList.remove('theme-transition');
    }, 300);
});

// Typing Animation
const typingText = document.querySelector('.typing-text');
const textToType = 'Full Stack Web Developer';
let charIndex = 0;

function typeText() {
    if (charIndex < textToType.length) {
        typingText.textContent += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 100);
    }
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    setTimeout(typeText, 1000);
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Progress Bars Animation
const progressBars = document.querySelectorAll('.progress-bar');
const animateProgressBars = () => {
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = `${progress}%`;
        }, 100);
    });
};

// Intersection Observer for Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            if (entry.target.classList.contains('skill-progress')) {
                animateProgressBars();
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.section, .skill-card, .timeline-item').forEach(el => {
    observer.observe(el);
});

// Form Validation
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (name && email && message) {
        // Here you would typically send the form data to your backend
        alert('Message sent successfully!');
        contactForm.reset();
    } else {
        alert('Please fill in all fields');
    }
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Close mobile menu when clicking a nav item
navItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Touch interactions for project cards
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    let touchStartY = 0;
    let touchEndY = 0;

    card.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    card.addEventListener('touchmove', (e) => {
        touchEndY = e.touches[0].clientY;
        const diff = touchStartY - touchEndY;
        
        if (diff > 50) { // Swipe up
            card.style.transform = 'translateY(-10px)';
        } else if (diff < -50) { // Swipe down
            card.style.transform = 'translateY(0)';
        }
    }, { passive: true });

    card.addEventListener('touchend', () => {
        setTimeout(() => {
            card.style.transform = 'translateY(0)';
        }, 300);
    }, { passive: true });
});

// Prevent scroll when mobile menu is open
const preventScroll = (e) => {
    if (navLinks.classList.contains('active')) {
        e.preventDefault();
    }
};

document.addEventListener('touchmove', preventScroll, { passive: false });
document.addEventListener('wheel', preventScroll, { passive: false });

// Remove scroll prevention when menu is closed
const enableScroll = () => {
    document.removeEventListener('touchmove', preventScroll);
    document.removeEventListener('wheel', preventScroll);
};

hamburger.addEventListener('click', () => {
    if (!navLinks.classList.contains('active')) {
        enableScroll();
    }
});

// Active Navigation Link
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Project Animations
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            projectObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

projectCards.forEach(card => {
    projectObserver.observe(card);
});

// Hover Animation for Project Cards
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Hero Section Animations
const heroSection = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');
const heroImage = document.querySelector('.hero-image');

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition < window.innerHeight) {
        heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        heroContent.style.transform = `translateX(${scrollPosition * 0.2}px)`;
        heroImage.style.transform = `translateX(${-scrollPosition * 0.2}px)`;
    }
});

// Intersection Observer for hero animations
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            heroSection.classList.add('animate');
            // Trigger typing animation
            startTypingAnimation();
        }
    });
}, {
    threshold: 0.5
});

heroObserver.observe(heroSection);

// Typing Animation
function startTypingAnimation() {
    const subtitle = document.querySelector('.hero-subtitle');
    const text = subtitle.textContent;
    subtitle.textContent = '';
    let index = 0;

    function type() {
        if (index < text.length) {
            subtitle.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        }
    }

    type();
}

// Mouse move effect for hero image
heroSection.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = heroSection.getBoundingClientRect();
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;

    heroImage.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
});

heroSection.addEventListener('mouseleave', () => {
    heroImage.style.transform = 'translate(0, 0)';
}); 