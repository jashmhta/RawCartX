document.addEventListener('DOMContentLoaded', () => {
    try {
        lucide.createIcons();
    } catch(e) {
        console.error("Lucide icons failed to create.", e);
    }


    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
    if (preloader && mainContent) {
        document.body.style.overflow = 'hidden';
        window.addEventListener('load', () => {
            gsap.to(preloader, {
                opacity: 0,
                duration: 0.8,
                ease: 'power2.inOut',
                onComplete: () => {
                    preloader.style.display = 'none';
                    document.body.style.overflow = '';
                    gsap.to(mainContent, { opacity: 1, duration: 0.8, ease: 'power2.inOut' });
                }
            });
        });
    } else if (mainContent) {
        mainContent.style.opacity = 1;
    }


    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
    

    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    if (themeToggleBtn) {
        const applyTheme = (theme) => {
            if (theme === 'dark') {
                document.documentElement.classList.add('dark');
                if (themeToggleLightIcon) themeToggleLightIcon.classList.remove('hidden');
                if (themeToggleDarkIcon) themeToggleDarkIcon.classList.add('hidden');
            } else {
                document.documentElement.classList.remove('dark');
                if (themeToggleDarkIcon) themeToggleDarkIcon.classList.remove('hidden');
                if (themeToggleLightIcon) themeToggleLightIcon.classList.add('hidden');
            }
        };

        const savedTheme = localStorage.getItem('color-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme) {
            applyTheme(savedTheme);
        } else {
            applyTheme(prefersDark ? 'dark' : 'light');
        }

        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('color-theme', newTheme);
            applyTheme(newTheme);
        });
    }


    const statsSection = document.getElementById('stats-counter');
    if (statsSection && typeof gsap !== 'undefined') {
        const counters = gsap.utils.toArray('.counter');
        
        counters.forEach(counter => {
            const endValue = parseInt(counter.dataset.target, 10);
            const proxy = { val: 0 };

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
        });
    }
    

    if (document.querySelector('.testimonial-carousel')) {
        try {
            if (typeof Swiper !== 'undefined') {
                const testimonialSwiper = new Swiper('.testimonial-carousel', {
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
                });
            } else {
                console.error('Swiper library is not loaded.');
            }
        } catch (e) {
            console.error('Error initializing testimonial swiper:', e);
        }
    }


    function initTimeline() {
        if (typeof gsap === 'undefined') {
            console.error("GSAP is not loaded. Timeline animations disabled.");
            return;
        }
        const timelineEvents = document.querySelectorAll('.timeline-event');
        if (!timelineEvents.length) return;

        gsap.set(timelineEvents, { opacity: 0, y: 30 });
        gsap.to(timelineEvents, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '#company-timeline',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        });

        timelineEvents.forEach(event => {
            const header = event.querySelector('.timeline-item-header');
            const content = event.querySelector('.timeline-item-content');
            const arrow = event.querySelector('.timeline-arrow');

            gsap.set(content, { height: 0, opacity: 0, paddingBottom: 0, marginTop: 0 });

            header.addEventListener('click', () => {
                const isOpen = content.classList.contains('open');


                timelineEvents.forEach(otherEvent => {
                    if (otherEvent !== event) {
                        const otherContent = otherEvent.querySelector('.timeline-item-content');
                        if (otherContent.classList.contains('open')) {
                            gsap.to(otherContent, { height: 0, opacity: 0, paddingBottom: 0, marginTop: 0, duration: 0.4, ease: 'power2.inOut' });
                            otherContent.classList.remove('open');
                            otherEvent.querySelector('.timeline-arrow').classList.remove('open');
                            otherEvent.querySelector('.timeline-item-header').setAttribute('aria-expanded', 'false');
                        }
                    }
                });

                if (isOpen) {
                    gsap.to(content, { height: 0, opacity: 0, paddingBottom: 0, marginTop: 0, duration: 0.4, ease: 'power2.inOut' });
                    content.classList.remove('open');
                    arrow.classList.remove('open');
                    header.setAttribute('aria-expanded', 'false');
                } else {
                    content.classList.add('open');
                    arrow.classList.add('open');
                    header.setAttribute('aria-expanded', 'true');
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
            });
        });
    }
    initTimeline();


    const sectionsToReveal = document.querySelectorAll('.reveal-on-scroll:not(.is-visible)');
    if (sectionsToReveal.length > 0) {
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

        const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);
        sectionsToReveal.forEach(section => {
            intersectionObserver.observe(section);
        });
    }


    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }


    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a.nav-link');
    const mobileNavLinks = document.querySelectorAll('nav a.nav-link-mobile');

    const setActiveLink = (links) => {
        links.forEach(link => {
            const linkPath = link.getAttribute('href').split('/').pop() || 'index.html';
            
            if (linkPath === currentPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    setActiveLink(navLinks);
    setActiveLink(mobileNavLinks);
});
