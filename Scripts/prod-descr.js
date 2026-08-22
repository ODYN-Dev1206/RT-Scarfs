import { activeNavLink } from "./main";
import { hamburgerAction } from "./main";
import { addToCart, cartUpdate } from "./cart";
import "./button-feedback.js";

import { PRODUCTS } from "./product-data";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const product = PRODUCTS.find((productItem) => productItem.id === id);

const aboutProduct = document.querySelector('.about-product');
const productCrumb = document.getElementById('product-crumb');

function renderRecommendations(currentId) {
  const cards = document.querySelectorAll('[data-rec-card]');
  const recommendations = PRODUCTS.filter((productItem) => productItem.id !== currentId).slice(0, cards.length);

  cards.forEach((card, index) => {
    const recommendation = recommendations[index];
    if (!recommendation) {
      card.hidden = true;
      return;
    }

    card.href = `product.html?id=${recommendation.id}`;
    card.setAttribute('aria-label', `View ${recommendation.name}`);
    card.querySelector('[data-rec-image]').src = recommendation.image;
    card.querySelector('[data-rec-image]').alt = recommendation.alt || recommendation.name;
    card.querySelector('[data-rec-name]').textContent = recommendation.name;
    card.querySelector('[data-rec-price]').textContent = `$${recommendation.price}`;
  });
}

if (!product) {
  if (aboutProduct) {
    aboutProduct.innerHTML = "<p>Sorry, we couldn't find that product.</p>";
  }
} else {
  const image = document.getElementById('product-img');
  const name = document.getElementById('product-name');
  const detail = document.getElementById('product-detail');
  const price = document.getElementById('product-price');
  const rating = document.getElementById('product-rating');
  const buyButton = document.querySelector('.buy-prod');

  if (image) {
    image.src = product.image;
    image.alt = product.alt || product.name;
  }

  if (name) name.textContent = product.name;
  if (productCrumb) productCrumb.textContent = product.name;
  if (detail) detail.textContent = product.description;
  if (price) price.textContent = product.price;
  if (rating) rating.innerHTML = '★'.repeat(product.rating || 0);
  renderRecommendations(id);

  if (buyButton) {
    buyButton.dataset.id = id;
    buyButton.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      addToCart(id);
      cartUpdate();
      window.location.href = 'cart.html';
    });
  }

  document.title = `${product.name} | RT Scarfs`;
}
