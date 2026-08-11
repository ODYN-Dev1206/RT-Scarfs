import { addToCart, cartUpdate } from "./cart";

export function hamburgerAction() {
  const hamBurger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (!hamBurger || !navMenu) return;
  
  hamBurger.addEventListener('click', () => {
    hamBurger.classList.toggle('active');
    navMenu.classList.toggle('open');
  });
}

export function buyButton() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.buy-prod, .add-to-cart-btn');
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();

    btn.classList.toggle('clicked');
    const productId = btn.dataset.id || btn.id;

    if (!productId) return;

    addToCart(productId);
    cartUpdate();

    if (!window.location.pathname.includes('cart.html')) {
      window.location.href = 'cart.html';
    }
  });
}

export function activeNavLink() {
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');

  if (!navMenu || navLinks.length === 0) return;

  const currentPage = window.location.pathname.replace(/^\//, '');

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute('href')?.replace(/^\//, '') || '';
    link.classList.remove('active');

    if (linkPath === currentPage) {
      link.classList.add('active-page');
    }
  });
}

window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (!header) return;

  header.classList.toggle('scrolled', window.scrollY > 50);
});

const heroBtn = document.querySelector('.shop-button');
if (heroBtn) {
  heroBtn.addEventListener('click', () => {
    heroBtn.classList.toggle('active');
  });
}

hamburgerAction();
buyButton();
activeNavLink();
cartUpdate();

  console.trace('main.js running');


  if (import.meta.hot) {
  import.meta.hot.accept();
}