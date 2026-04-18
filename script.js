// ========================================
// SALOON BEAUTY STUDIO - INTERACTIONS
// ========================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Preloader ---
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => preloader.classList.add('hidden'), 600);
        });
        setTimeout(() => preloader.classList.add('hidden'), 2200);
    }

    // --- Navbar ---
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 60);
        });
    }

    // --- Mobile Nav ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open') ? 'true' : 'false');
            document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    // --- Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (!href || href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = 80;
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.scrollY - offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Scroll Reveal ---
    const revealEls = document.querySelectorAll(
        '.about-visual, .about-text, .section-center, .service-card, .gallery-item, .team-card, .events-header, .events-list, .contact-left, .contact-right, .stat, .promo-content, .insta-content'
    );
    revealEls.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), i * 60);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));

    // --- Counter Animation ---
    const statNums = document.querySelectorAll('.stat-num[data-target]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target);
                animateCounter(el, target);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNums.forEach(n => counterObserver.observe(n));

    function animateCounter(el, target) {
        const duration = 2000;
        const steps = 50;
        const stepTime = duration / steps;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            const progress = 1 - Math.pow(1 - step / steps, 3);
            el.textContent = Math.floor(target * progress);
            if (step >= steps) {
                el.textContent = target;
                clearInterval(timer);
            }
        }, stepTime);
    }

    // --- Review Slider ---
    const reviews = document.querySelectorAll('.review');
    const dotsBox = document.getElementById('reviewDots');
    const prevBtn = document.getElementById('revPrev');
    const nextBtn = document.getElementById('revNext');
    let current = 0;
    let autoTimer;

    if (reviews.length && dotsBox && prevBtn && nextBtn) {
        reviews.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('review-dot');
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Review ${i + 1}`);
            dot.addEventListener('click', () => goTo(i));
            dotsBox.appendChild(dot);
        });

        function goTo(idx) {
            reviews[current].classList.remove('active');
            dotsBox.children[current].classList.remove('active');
            current = (idx + reviews.length) % reviews.length;
            reviews[current].classList.add('active');
            dotsBox.children[current].classList.add('active');
            resetAuto();
        }

        function resetAuto() {
            clearInterval(autoTimer);
            autoTimer = setInterval(() => goTo(current + 1), 5000);
        }

        prevBtn.addEventListener('click', () => goTo(current - 1));
        nextBtn.addEventListener('click', () => goTo(current + 1));
        resetAuto();
    }

    // --- Booking Form ---
    const form = document.getElementById('bookingForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            if (!btn) return;
            const orig = btn.textContent;

            btn.textContent = 'Booking Confirmed!';
            btn.style.background = 'var(--sage)';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = orig;
                btn.style.background = '';
                btn.disabled = false;
                form.reset();
            }, 3000);
        });
    }

    // --- Active Nav on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    if (navLinks && sections.length) {
        window.addEventListener('scroll', () => {
            const pos = window.scrollY + 120;
            sections.forEach(sec => {
                const top = sec.offsetTop;
                const h = sec.offsetHeight;
                const id = sec.getAttribute('id');
                if (pos >= top && pos < top + h) {
                    navLinks.querySelectorAll('a').forEach(a => {
                        a.classList.remove('active');
                        if (a.getAttribute('href') === `#${id}`) a.classList.add('active');
                    });
                }
            });
        });
    }

    // --- Hero Parallax ---
    const heroContent = document.querySelector('.hero-content');
    window.addEventListener('scroll', () => {
        if (heroContent && window.scrollY < window.innerHeight) {
            heroContent.style.transform = `translateY(${window.scrollY * 0.2}px)`;
            heroContent.style.opacity = 1 - (window.scrollY / (window.innerHeight * 0.75));
        }
    });
});
