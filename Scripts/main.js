import { addToCart, cartUpdate } from "./cart";
import { PRODUCTS } from "./product-data";

import "./auth.js";

function applyContactLinks() {
  document.querySelectorAll('a[href^="mailto:hello@rtscarfs.com"]').forEach((link) => {
    link.href = 'mailto:odunayo2305@gmail.com';
    if (link.textContent.includes('hello@rtscarfs.com')) {
      link.textContent = 'odunayo2305@gmail.com';
    }
  });

  document.querySelectorAll('a[href*="x.com"]').forEach((link) => {
    link.href = 'https://x.com/thee__odunayor';
  });
}

applyContactLinks();

function renderHomepageProducts() {
  document.querySelectorAll('.best-sell-card').forEach((card) => {
    const product = PRODUCTS.find((item) => item.id === card.dataset.id);
    if (!product) return;

    const link = card.querySelector('a');
    const image = card.querySelector('.best-sell-img');
    const name = card.querySelector('.new-prod-name');
    const description = card.querySelector('.new-prod-descr');
    const price = card.querySelector('.new-product-price');

    card.dataset.category = product.categories.join(' ');
    if (link) link.href = `product.html?id=${product.id}`;
    if (image) image.alt = product.alt || product.name;
    if (name) name.textContent = product.name;
    if (description) description.textContent = product.description;
    if (price) price.innerHTML = `<span class="currency">$</span>${product.price}`;
  });

  document.querySelectorAll('.new-arrival-main, .new-arrival-sub > div, .new-arrival-bottom').forEach((tile) => {
    const product = PRODUCTS.find((item) => item.id === tile.dataset.id);
    if (!product) return;

    const image = tile.querySelector('img');
    if (image) image.alt = product.alt || product.name;
    tile.dataset.category = product.categories.join(' ');
    tile.addEventListener('click', () => {
      window.location.href = `product.html?id=${product.id}`;
    });
  });
}

renderHomepageProducts();

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


  if (import.meta.hot) {
  import.meta.hot.accept();
}