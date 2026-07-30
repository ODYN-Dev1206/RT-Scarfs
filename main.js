console.log('JS loaded');

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// 1. Toggle menu open/close on hamburger click
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('is-active');
    navMenu.classList.toggle('is-open');
    document.body.classList.toggle('no-scroll');
});

// 2. Close menu when a nav link is clicked
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('is-active');
        navMenu.classList.remove('is-open');
        document.body.classList.remove('no-scroll');
    });
});

// 3. Close menu when clicking outside it
document.addEventListener('click', (event) => {
    const isClickInsideNav = navMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);

    if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('is-open')) {
        hamburger.classList.remove('is-active');
        navMenu.classList.remove('is-open');
        document.body.classList.remove('no-scroll');
    }
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        document.querySelector('header').classList.add('scrolled');
    } else {
        document.querySelector('header').classList.remove('scrolled');
    }
});

//Below is for when different a links section are on one page
/*const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-menu a');
window.addEventListener('scroll', () => {
    let currentSectionId = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 60; // Adjust for header height
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSectionId = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.toggle('active', item.getAttribute('href').substring(1) === currentSectionId);
    });
});*/

//const navLinks = document.querySelectorAll('.nav-menu a');
const currentPage = window.location.pathname;

navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

const backToTopButton = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 150) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth', color: 'white', backgroundColor: 'black' });
});
