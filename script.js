function bootstrap() {
    console.log('bootstrapping done!');

    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const checkRatesBtn = document.getElementById('checkRatesBtn');
    const ratesSection = document.getElementById('rates');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isOpen.toString());
        });
    }

    if (checkRatesBtn && ratesSection) {
        checkRatesBtn.addEventListener('click', () => {
            ratesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
}

document.addEventListener('DOMContentLoaded', bootstrap);