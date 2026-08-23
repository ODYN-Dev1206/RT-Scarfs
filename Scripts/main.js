import { addToCart, cartUpdate } from "./cart";
import { PRODUCTS } from "./product-data";
import "./button-feedback.js";

import "./auth.js";

const BRAND_EMAIL = 'odyndev06@gmail.com';
const BRAND_X_ACCOUNT = 'websbyodyn';

function addBrandTouchpoints() {
  const favicon = document.querySelector('link[rel="icon"]') || document.createElement('link');
  favicon.rel = 'icon';
  favicon.type = 'image/svg+xml';
  favicon.href = '/Icons/righteous-crest.svg';
  if (!favicon.parentElement) document.head.append(favicon);

  document.querySelectorAll('.footer-brand').forEach((footerBrand) => {
    if (footerBrand.querySelector('.footer-crest')) return;
    const crest = document.createElement('img');
    crest.className = 'footer-crest';
    crest.src = '/Icons/righteous-crest.svg';
    crest.alt = 'Righteous crest';
    footerBrand.prepend(crest);
  });

  document.querySelectorAll('.user-account').forEach((account) => {
    account.setAttribute('aria-label', `Righteous account, sign in with ${BRAND_EMAIL}`);
  });
}

addBrandTouchpoints();

function setupLoadingExperience() {
  const loader = document.querySelector('.site-loader') || document.createElement('div');
  if (!loader.parentElement) {
    loader.className = 'site-loader';
    loader.setAttribute('role', 'status');
    loader.setAttribute('aria-label', 'Loading Righteous Scarves and Accessories');
    loader.innerHTML = `
      <div class="site-loader__content">
        <img class="site-loader__logo" src="/Icons/righteous-crest.svg" alt="Righteous R crest">
      </div>`;
    document.body.prepend(loader);
  }

  let loadCompleted = false;
  const hideLoader = () => {
    if (loadCompleted) return;
    loadCompleted = true;
    window.setTimeout(() => loader.classList.add('is-ready'), 450);
  };

  if (document.readyState !== 'loading') {
    hideLoader();
  } else {
    document.addEventListener('DOMContentLoaded', hideLoader, { once: true });
    window.addEventListener('load', hideLoader, { once: true });
    document.addEventListener('readystatechange', () => {
      if (document.readyState === 'complete') hideLoader();
    }, { once: true });
  }

  window.setTimeout(hideLoader, 10000);

  window.addEventListener('pointerup', (event) => {
    const link = event.target.closest('a');
    if (!link || link.target === '_blank' || link.hasAttribute('download')) return;

    const destination = new URL(link.href, window.location.href);
    const isInternalPage = destination.origin === window.location.origin
      && destination.pathname.endsWith('.html')
      && destination.pathname !== window.location.pathname;

    if (isInternalPage) {
      loader.classList.remove('is-ready');
    }
  });
}

setupLoadingExperience();

function applyContactLinks() {
  document.querySelectorAll('a[href*="rtscarfs.com"], a[href*="odunayo2305@gmail.com"]').forEach((link) => {
    link.href = `mailto:${BRAND_EMAIL}`;
    if (link.textContent.includes('hello@rtscarfs.com') || link.textContent.includes('odunayo2305@gmail.com')) {
      link.textContent = BRAND_EMAIL;
    }
  });

  document.querySelectorAll('a[href*="x.com"]').forEach((link) => {
    link.href = `https://x.com/${BRAND_X_ACCOUNT}`;
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
  if (window.__hamburgerActionInitialized) return;
  window.__hamburgerActionInitialized = true;

  document.querySelectorAll('.hamburger').forEach((hamBurger) => {
    hamBurger.setAttribute('aria-expanded', 'false');
  });

  window.addEventListener('pointerup', (event) => {
    const hamBurger = event.target.closest('.hamburger');
    if (!hamBurger) return;

    const navMenu = hamBurger.closest('header')?.querySelector('.nav-menu')
      || document.querySelector('.nav-menu');
    if (!navMenu) return;

    const isOpen = !navMenu.classList.contains('open');
    hamBurger.classList.toggle('active', isOpen);
    navMenu.classList.toggle('open', isOpen);
    hamBurger.setAttribute('aria-expanded', String(isOpen));
  }, true);
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