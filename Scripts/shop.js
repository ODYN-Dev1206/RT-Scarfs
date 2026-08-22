import { activeNavLink } from "./main";
import { hamburgerAction } from "./main";
import { PRODUCTS } from "./product-data";

const urlParams = new URLSearchParams(window.location.search);
const filterFromURL = urlParams.get('filter');
const filterIcon = document.querySelector('.filter-icon');
const filterRow = document.querySelector('.filter-btn-row');
const filterBtns = document.querySelectorAll('.filter-button');
const searchIcon = document.querySelector('.search-icon');
const searchBar = document.querySelector('.search-bar');
const prodCard = document.querySelectorAll('.product-card');
const shopGrid = document.querySelector('.shop-grid');
let activeFilter = 'all';
let searchTerm = '';

const filterSearchTerms = {
  fashion: ['fashion'],
  'best-sell': ['best sell', 'best seller', 'best sellers'],
  collection: ['collection'],
  accessories: ['accessories', 'accessory'],
  'new-arrival': ['new arrival', 'new arrivals'],
  'top-choice': ['top choice', 'top choices'],
  'new-season': ['new season', 'new seasons']
};

function normalizeSearchValue(value) {
  return value.toLowerCase().trim().replace(/[-_]+/g, ' ').replace(/\s+/g, ' ');
}

function renderProductDetails() {
  document.querySelectorAll('.product-card').forEach((card) => {
    const button = card.querySelector('.buy-prod, .add-to-cart-btn');
    const product = PRODUCTS.find((item) => item.id === button?.dataset.id);
    if (!product) return;

    const link = card.querySelector('a');
    const image = card.querySelector('img');
    const name = card.querySelector('.product-card__name');
    const price = card.querySelector('.product-card__price');

    card.dataset.category = product.categories.join(' ');
    card.dataset.searchText = normalizeSearchValue(`${product.name} ${product.description} ${product.categories.join(' ')}`);
    if (link) link.href = `product.html?id=${product.id}`;
    if (image) image.alt = product.alt || product.name;
    if (name) name.textContent = product.name;
    if (price) price.innerHTML = `Price: &nbsp;$${product.price}`;
  });
}

renderProductDetails();

function removeCardsWithMissingImages() {
  prodCard.forEach((card) => {
    const img = card.querySelector('img');

    if (!img) {
      card.remove();
      return;
    }

    const removeCard = () => {
      card.remove();
    };

    img.addEventListener('error', removeCard);

    const checkImage = () => {
      const hasSrc = !!img.getAttribute('src');
      if (!hasSrc || !img.complete || img.naturalWidth === 0) {
        removeCard();
      }
    };

    if (img.complete) {
      checkImage();
    } else {
      img.addEventListener('load', checkImage);
    }
  });
}

if (filterIcon && filterRow) {
  filterIcon.addEventListener('click', () => {
    const shouldOpen = !filterRow.classList.contains('visible');
    filterRow.classList.toggle('visible', shouldOpen);
    searchBar?.classList.remove('visible');
    filterIcon.setAttribute('aria-expanded', String(shouldOpen));
    searchIcon?.setAttribute('aria-expanded', 'false');
  });
}

filterBtns.forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.toggle('active');
  });
});

if (searchIcon && searchBar) {
  searchIcon.addEventListener('click', () => {
    const shouldOpen = !searchBar.classList.contains('visible');
    searchBar.classList.toggle('visible', shouldOpen);
    filterRow?.classList.remove('visible');
    searchIcon.setAttribute('aria-expanded', String(shouldOpen));
    filterIcon?.setAttribute('aria-expanded', 'false');

    if (shouldOpen) searchBar.focus();
  });
}

function categoryMatchesSearch(card, query) {
  if (query.length < 3) return false;

  return (card.dataset.category || '').split(' ').some((category) => {
    const terms = filterSearchTerms[category] || [category];
    return terms.some((term) => normalizeSearchValue(term).includes(query) || query.includes(normalizeSearchValue(term)));
  });
}

function applyShopFilters() {
  let matchCount = 0;
  const normalizedQuery = normalizeSearchValue(searchTerm);

  prodCard.forEach((card) => {
    const categories = (card.dataset.category || '').split(' ');
    const matchesFilter = activeFilter === 'all' || categories.includes(activeFilter);
    const matchesSearch = !normalizedQuery
      || (card.dataset.searchText || '').includes(normalizedQuery)
      || categoryMatchesSearch(card, normalizedQuery);
    const matches = matchesFilter && matchesSearch;

    card.classList.toggle('hide', !matches);
    if (matches) matchCount++;
  });

  if (!shopGrid) return;

  shopGrid.querySelector('.no-result')?.remove();
  if (matchCount === 0) {
    shopGrid.insertAdjacentHTML('beforeend', `<p class="no-result">No pieces match${normalizedQuery ? ` “${searchTerm.trim()}”` : ''}. Try another search.</p>`);
  }
}

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((button) => button.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter || 'all';
    applyShopFilters();
  });
});

searchBar?.addEventListener('input', (event) => {
  searchTerm = event.target.value;
  applyShopFilters();
});

if (filterFromURL) {
  const matchingBtn = document.querySelector(`.filter-button[data-filter="${filterFromURL}"]`);
  if (matchingBtn) {
    matchingBtn.click();
  }
}

if (!filterFromURL) {
  document.querySelector('.filter-button[data-filter="all"]')?.classList.add('active');
  applyShopFilters();
}

prodCard.forEach((article) => {
  article.addEventListener('click', (event) => {
    if (event.target.closest('a, button, input')) return;
    article.classList.toggle('active');
  });
});
