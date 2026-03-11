document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            // Toggle Icon between Bars and Times
            const icon = hamburger.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-active');
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // 2. Floating Action Button (FAB) Logic - FIXED
    const fabTrigger = document.getElementById('fabTrigger');
    const fabContainer = document.getElementById('fabContainer');

    if (fabTrigger && fabContainer) {
        // Toggle FAB menu on trigger click
        fabTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            fabContainer.classList.toggle('active');
        });

        // Close FAB when clicking outside
        document.addEventListener('click', (e) => {
            if (!fabContainer.contains(e.target)) {
                fabContainer.classList.remove('active');
            }
        });

        // Prevent clicks on FAB options from closing the menu
        const fabOptions = document.querySelectorAll('.fab-option');
        fabOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                // Let the link work normally, menu will close when they come back
            });
        });
    }

    // 3. Scroll Animation (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // 4. Dynamic Year in Footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // 5. Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // 6. Carousel Slider
    const carouselState = {};

    function initCarousels() {
        document.querySelectorAll('.carousel').forEach(carousel => {
            const id = carousel.id;
            const imgs = carousel.querySelectorAll('.carousel-track img');
            const dotsContainer = carousel.querySelector('.carousel-dots');
            carouselState[id] = { current: 0, total: imgs.length };

            imgs.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.className = 'dot-btn' + (i === 0 ? ' active' : '');
                dot.setAttribute('aria-label', 'Slide ' + (i + 1));
                dot.onclick = () => goToSlide(id, i);
                dotsContainer.appendChild(dot);
            });

            setInterval(() => slideCarousel(id, 1), 3500 + Math.random() * 1000);
        });
    }

    function goToSlide(id, index) {
        const carousel = document.getElementById(id);
        const state = carouselState[id];
        state.current = (index + state.total) % state.total;
        carousel.querySelector('.carousel-track').style.transform = `translateX(-${state.current * 100}%)`;
        carousel.querySelectorAll('.dot-btn').forEach((d, i) => d.classList.toggle('active', i === state.current));
    }

    function slideCarousel(id, dir) {
        goToSlide(id, carouselState[id].current + dir);
    }

    window.slideCarousel = slideCarousel;

    initCarousels();

});


