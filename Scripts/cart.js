import { PRODUCTS } from "./product-data";
import { activeNavLink, hamburgerAction } from "./main";

function readCart() {
  try {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  } catch {
    return [];
  }
}

export function addToCart(id, qty = 1) {
  if (!id) return;

  const cart = readCart();
  const existingItem = cart.find((item) => item.id === id);

  if (existingItem) {
    existingItem.qty += qty;
  } else {
    cart.push({ id, qty });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  cartUpdate();
}

function renderCart() {
  const grid = document.querySelector('.cart-product__grid');
  const template = document.querySelector('.cart-product');

  if (!grid || !template) return;

  grid.innerHTML = '';
  const cart = readCart();

  cart.forEach((item) => {
    const product = PRODUCTS.find((productItem) => productItem.id === item.id);
    if (!product) return;

    const article = template.cloneNode(true);
    article.classList.remove('cart-product-template');
    article.removeAttribute('hidden');
    article.dataset.id = product.id;

    const image = article.querySelector('.product-img');
    const name = article.querySelector('.product-name');
    const detail = article.querySelector('.product-detail');
    const price = article.querySelector('.product-price');
    const qtyInput = article.querySelector('.cart-quantity');

    if (image) {
      image.src = product.image;
      image.alt = product.alt || product.name;
    }

    if (name) name.textContent = product.name;
    if (detail) detail.textContent = product.description;
    if (price) price.textContent = product.price;
    if (qtyInput) qtyInput.value = item.qty;

    grid.appendChild(article);
  });
}

export function cartUpdate() {
  const cart = readCart();
  let cartQty = 0;

  cart.forEach((item) => {
    cartQty += Number(item.qty) || 0;
  });

  document.querySelectorAll('.cart-quantity').forEach((element) => {
    if (element.closest('.cart-product__grid') || element.classList.contains('qty-input')) return;
    element.textContent = String(cartQty);
  });

  const notification = document.querySelector('.notification.cart-quantity');
  if (notification) {
    notification.textContent = String(cartQty);
  }
}

renderCart();
cartUpdate();
