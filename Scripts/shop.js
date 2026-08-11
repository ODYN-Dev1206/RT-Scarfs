import { activeNavLink } from "./main";
import { hamburgerAction } from "./main";
import { addToCart, cartUpdate } from "./cart";

const urlParams = new URLSearchParams(window.location.search);
const filterFromURL = urlParams.get('filter');
const filterIcon = document.querySelector('.filter-icon');
const filterRow = document.querySelector('.filter-btn-row');
const filterBtns = document.querySelectorAll('.filter-button');
const searchIcon = document.querySelector('.search-icon');
const searchBar = document.querySelector('.search-bar');
const prodCard = document.querySelectorAll('.product-card');
const shopGrid = document.querySelector('.shop-grid');

if (filterIcon && filterRow) {
  filterIcon.addEventListener('click', () => {
    filterRow.classList.toggle('visible');
  });
}

filterBtns.forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.toggle('active');
  });
});

if (searchIcon && searchBar) {
  searchIcon.addEventListener('click', () => {
    searchBar.classList.toggle('visible');
  });
}

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const filterVal = btn.dataset.filter;
    let matchCount = 0;

    prodCard.forEach((card) => {
      const cardCategory = (card.dataset.category || '').split(' ');
      const matches = filterVal === 'all' || cardCategory.includes(filterVal);

      card.classList.toggle('hide', !matches);
      if (matches) matchCount++;
    });

    if (shopGrid) {
      const existingMessage = shopGrid.querySelector('.no-result');
      if (existingMessage) existingMessage.remove();

      if (matchCount === 0) {
        shopGrid.insertAdjacentHTML('beforeend', '<p class="no-result">Products Coming Soon</p>');
      }
    }
  });
});

if (filterFromURL) {
  const matchingBtn = document.querySelector(`.filter-button[data-filter="${filterFromURL}"]`);
  if (matchingBtn) {
    matchingBtn.click();
  }
}

prodCard.forEach((article) => {
  article.addEventListener('click', (event) => {
    if (event.target.closest('a, button, input')) return;
    article.classList.toggle('active');
  });
});

if (shopGrid) {
  shopGrid.addEventListener('click', (event) => {
    const btn = event.target.closest('.buy-prod, .add-to-cart-btn');
    if (!btn) return;

    const id = btn.dataset.id;
    if (!id) return;

    addToCart(id, 1);
  });
}