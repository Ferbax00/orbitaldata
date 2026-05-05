document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const reduceMotion =
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const progressRoot = document.querySelector('.scroll-progress');
    const progressBar = document.querySelector('.scroll-progress-bar');
    const backTop = document.querySelector('.back-to-top');

    function updateScrollUi() {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        const pct = max > 0 ? Math.round((doc.scrollTop / max) * 100) : 0;
        if (progressBar) progressBar.style.width = pct + '%';
        if (progressRoot) progressRoot.setAttribute('aria-valuenow', String(pct));
        if (backTop) backTop.classList.toggle('is-visible', doc.scrollTop > 400);
    }

    window.addEventListener('scroll', updateScrollUi, { passive: true });
    updateScrollUi();

    if (backTop) {
        backTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: reduceMotion ? 'auto' : 'smooth',
            });
        });
    }

    function setNavOpen(open) {
        if (!navbar || !hamburger) return;
        navbar.classList.toggle('navbar--open', open);
        document.body.classList.toggle('nav-lock', open);
        hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
        hamburger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    }

    if (hamburger && navLinks && navbar) {
        hamburger.addEventListener('click', () => {
            setNavOpen(!navbar.classList.contains('navbar--open'));
        });
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) setNavOpen(false);
    });

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (!id || id === '#') return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({
                behavior: reduceMotion ? 'auto' : 'smooth',
                block: 'start',
            });
            if (window.innerWidth <= 768) setNavOpen(false);
        });
    });

    if (!reduceMotion && 'IntersectionObserver' in window) {
        const reveals = document.querySelectorAll('.reveal');
        if (reveals.length) {
            const io = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) return;
                        entry.target.classList.add('is-visible');
                        io.unobserve(entry.target);
                    });
                },
                { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
            );
            reveals.forEach((el) => io.observe(el));
        }
    } else {
        document.querySelectorAll('.reveal').forEach((el) => {
            el.classList.add('is-visible');
        });
    }
});
