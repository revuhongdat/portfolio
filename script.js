document.addEventListener('DOMContentLoaded', () => {
    // Current year for footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // 1. Navbar Scroll Effect (Hide on scroll down, show on scroll up)
    let lastScroll = 0;
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add subtle background when scrolling
        if (currentScroll > 50) {
            navbar.style.background = 'rgba(9, 10, 15, 0.85)';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
        } else {
            navbar.style.background = 'rgba(18, 20, 28, 0.6)';
            navbar.style.boxShadow = 'none';
        }

        // Hide/Show navbar based on scroll direction
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            navbar.classList.add('nav-hidden');
        } else {
            // Scrolling up
            navbar.classList.remove('nav-hidden');
        }
        lastScroll = currentScroll;
    });

    // 2. Intersection Observer for trigger fade-in animations on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll('.fade-in, .fade-up-1, .fade-up-2, .fade-up-3, .fade-up-4, .reveal-text');
    
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // 3. Trigger initial hero animations instantly
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero .fade-up-1, .hero .fade-up-2, .hero .fade-up-3, .hero .fade-up-4');
        heroElements.forEach(el => {
            el.classList.add('visible');
        });
    }, 100);

    // 4. Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                // Adjust for navbar height
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});
