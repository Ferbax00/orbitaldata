document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

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
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (window.innerWidth <= 768) setNavOpen(false);
        });
    });
});
