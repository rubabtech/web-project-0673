// Reveal each section once as it enters the screen.
// Without JavaScript, or when reduced motion is requested, everything stays visible.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const revealTargets = document.querySelectorAll(
    '.hero-copy, .hero-photo, .intro, .highlights article, .next-stop, ' +
    '.how-it-works, .step-card, .reviews, .page-banner, .story, ' +
    '.info-columns article, .price-section, .media-section, .booking-heading, ' +
    '#booking-form, .catalog-heading, .cake-card, .gallery-heading, ' +
    '.gallery-grid figure, .gallery-cta, .contact-heading, .contact-details, ' +
    '.contact-form-panel, .faq'
);

if (!reduceMotion.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });

    revealTargets.forEach(function (element) {
        element.classList.add('scroll-reveal');
        observer.observe(element);
    });

    // Keyboard focus must also reveal a card or form that is below the viewport.
    document.addEventListener('focusin', function (event) {
        let element = event.target.closest('.scroll-reveal');
        while (element) {
            element.classList.add('is-visible');
            observer.unobserve(element);
            element = element.parentElement.closest('.scroll-reveal');
        }
    });

    reduceMotion.addEventListener('change', function (event) {
        if (event.matches) {
            observer.disconnect();
            revealTargets.forEach(function (element) {
                element.classList.add('is-visible');
            });
        }
    });
}
