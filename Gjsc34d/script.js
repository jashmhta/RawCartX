/**
 * Main Application Module
 * Handles core functionality: theme toggle, animations, navigation, and utilities
 */

document.addEventListener('DOMContentLoaded', () => {
    // ==================== Initialization ====================
    initializeIcons();
    initializeGSAP();
    initializePreloader();
    initializeTheme();
    initializeNavigation();
    initializeScrollAnimations();
    initializeStatCounters();
    initializeTestimonials();
    initializeTimeline();
    initializeMobileMenu();
});

// ==================== Icons Initialization ====================
/**
 * Initializes Lucide icons
 */
const initializeIcons = () => {
    try {
        if (typeof lucide !== 'undefined' && lucide.createIcons) {
            lucide.createIcons();
        }
    } catch (error) {
        console.warn("Lucide icons initialization failed:", error);
    }
};

// ==================== GSAP Initialization ====================
/**
 * Initializes GSAP and registers plugins
 */
const initializeGSAP = () => {
    if (typeof gsap === 'undefined') {
        console.warn("GSAP library not loaded");
        return false;
    }

    try {
        if (gsap.registerPlugin) {
            gsap.registerPlugin(ScrollTrigger);
        }
        return true;
    } catch (error) {
        console.warn("GSAP plugin registration failed:", error);
        return false;
    }
};

// ==================== Preloader Initialization ====================
/**
 * Initializes page preloader with fade-out animation
 */
const initializePreloader = () => {
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');

    if (!preloader || !mainContent) {
        if (mainContent) mainContent.style.opacity = '1';
        return;
    }

    // Hide scrollbar while preloader is visible
    document.body.style.overflow = 'hidden';

    window.addEventListener('load', () => {
        if (typeof gsap === 'undefined') {
            // Fallback without GSAP
            preloader.style.display = 'none';
            mainContent.style.opacity = '1';
            document.body.style.overflow = '';
            return;
        }

        gsap.to(preloader, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete: () => {
                preloader.style.display = 'none';
                document.body.style.overflow = '';

                gsap.to(mainContent, {
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power2.inOut'
                });
            }
        });
    });
};

// ==================== Theme Management ====================
/**
 * Manages dark/light theme toggle
 */
const initializeTheme = () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;

    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const lightIcon = document.getElementById('theme-toggle-light-icon');

    /**
     * Applies theme to document
     * @param {string} theme - 'dark' or 'light'
     */
    const applyTheme = (theme) => {
        const isDark = theme === 'dark';

        if (isDark) {
            document.documentElement.classList.add('dark');
            if (lightIcon) lightIcon.classList.remove('hidden');
            if (darkIcon) darkIcon.classList.add('hidden');
        } else {
            document.documentElement.classList.remove('dark');
            if (darkIcon) darkIcon.classList.remove('hidden');
            if (lightIcon) lightIcon.classList.add('hidden');
        }
    };

    // Load saved theme or use system preference
    const savedTheme = localStorage.getItem('color-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    applyTheme(initialTheme);

    // Theme toggle click handler
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        localStorage.setItem('color-theme', newTheme);
        applyTheme(newTheme);
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('color-theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
};

// ==================== Navigation ====================
/**
 * Sets active navigation links based on current page
 */
const initializeNavigation = () => {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a.nav-link, nav a.nav-link-mobile');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop() || 'index.html';

        if (linkPath === currentPath) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });

    // Close mobile menu when link is clicked
    const mobileLinks = document.querySelectorAll('nav a.nav-link-mobile');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        });
    });
};

// ==================== Mobile Menu ====================
/**
 * Initializes mobile menu toggle
 */
const initializeMobileMenu = () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!mobileMenuButton || !mobileMenu) return;

    mobileMenuButton.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.toggle('hidden');
        mobileMenuButton.setAttribute('aria-expanded', !isHidden);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
        }
    });
};

// ==================== Scroll Animations ====================
/**
 * Initializes scroll-triggered reveal animations using Intersection Observer
 */
const initializeScrollAnimations = () => {
    const sectionsToReveal = document.querySelectorAll('.reveal-on-scroll:not(.is-visible)');

    if (sectionsToReveal.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sectionsToReveal.forEach(section => observer.observe(section));
};

// ==================== Stat Counters ====================
/**
 * Initializes animated number counters that trigger on scroll
 */
const initializeStatCounters = () => {
    const statsSection = document.getElementById('stats-counter');
    if (!statsSection || typeof gsap === 'undefined') return;

    const counters = gsap.utils.toArray('.counter');
    if (counters.length === 0) return;

    counters.forEach(counter => {
        const endValue = parseInt(counter.dataset.target, 10);

        if (isNaN(endValue)) {
            console.warn("Invalid counter value:", counter.dataset.target);
            return;
        }

        const proxy = { val: 0 };

        try {
            gsap.to(proxy, {
                val: endValue,
                duration: 2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: counter,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
                onUpdate: () => {
                    counter.textContent = Math.floor(proxy.val).toLocaleString('en-US');
                }
            });
        } catch (error) {
            console.warn("Counter animation failed:", error);
        }
    });
};

// ==================== Testimonials Carousel ====================
/**
 * Initializes Swiper carousel for testimonials
 */
const initializeTestimonials = () => {
    const carouselElement = document.querySelector('.testimonial-carousel');
    if (!carouselElement || typeof Swiper === 'undefined') return;

    try {
        new Swiper('.testimonial-carousel', {
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            slidesPerView: 1,
            spaceBetween: 30,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            a11y: {
                enabled: true,
                prevSlideMessage: 'Previous testimonial',
                nextSlideMessage: 'Next testimonial',
            }
        });
    } catch (error) {
        console.warn("Testimonial carousel initialization failed:", error);
    }
};

// ==================== Timeline Accordion ====================
/**
 * Initializes accordion-style timeline with expandable content
 */
const initializeTimeline = () => {
    const timelineContainer = document.getElementById('company-timeline');
    const timelineEvents = document.querySelectorAll('.timeline-event');

    if (!timelineEvents.length) return;

    // Animate timeline items on scroll
    if (typeof gsap !== 'undefined' && timelineContainer) {
        gsap.set(timelineEvents, { opacity: 0, y: 30 });

        try {
            gsap.to(timelineEvents, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: timelineContainer,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            });
        } catch (error) {
            console.warn("Timeline scroll animation failed:", error);
        }
    }

    // Setup accordion behavior
    timelineEvents.forEach(event => {
        const header = event.querySelector('.timeline-item-header');
        const content = event.querySelector('.timeline-item-content');
        const arrow = event.querySelector('.timeline-arrow');

        if (!header || !content) return;

        // Collapse content by default
        if (typeof gsap !== 'undefined') {
            gsap.set(content, { height: 0, opacity: 0, paddingBottom: 0, marginTop: 0 });
        }

        header.setAttribute('role', 'button');
        header.setAttribute('aria-expanded', 'false');
        header.setAttribute('tabindex', '0');

        /**
         * Toggles timeline event content
         */
        const toggleEvent = () => {
            const isOpen = content.classList.contains('open');

            // Close all other events
            timelineEvents.forEach(otherEvent => {
                if (otherEvent !== event) {
                    const otherContent = otherEvent.querySelector('.timeline-item-content');
                    const otherHeader = otherEvent.querySelector('.timeline-item-header');
                    const otherArrow = otherEvent.querySelector('.timeline-arrow');

                    if (otherContent && otherContent.classList.contains('open')) {
                        if (typeof gsap !== 'undefined') {
                            gsap.to(otherContent, {
                                height: 0,
                                opacity: 0,
                                paddingBottom: 0,
                                marginTop: 0,
                                duration: 0.4,
                                ease: 'power2.inOut'
                            });
                        }
                        otherContent.classList.remove('open');
                        if (otherArrow) otherArrow.classList.remove('open');
                        if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
                    }
                }
            });

            // Toggle current event
            if (isOpen) {
                if (typeof gsap !== 'undefined') {
                    gsap.to(content, {
                        height: 0,
                        opacity: 0,
                        paddingBottom: 0,
                        marginTop: 0,
                        duration: 0.4,
                        ease: 'power2.inOut'
                    });
                }
                content.classList.remove('open');
                if (arrow) arrow.classList.remove('open');
                header.setAttribute('aria-expanded', 'false');
            } else {
                content.classList.add('open');
                if (arrow) arrow.classList.add('open');
                header.setAttribute('aria-expanded', 'true');

                if (typeof gsap !== 'undefined') {
                    gsap.fromTo(content,
                        { height: 0, opacity: 0, paddingBottom: 0, marginTop: 0 },
                        {
                            height: 'auto',
                            opacity: 1,
                            paddingBottom: '1rem',
                            marginTop: '1rem',
                            duration: 0.4,
                            ease: 'power2.out'
                        }
                    );
                }
            }
        };

        // Click handler
        header.addEventListener('click', toggleEvent);

        // Keyboard support (Enter and Space)
        header.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleEvent();
            }
        });
    });
};
