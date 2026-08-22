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
  const emptyState = document.querySelector('.cart-empty-state');
  const checkoutAction = document.querySelector('.checkout-action');

  if (!grid || !template) return;

  const templateClone = template.cloneNode(true);
  grid.innerHTML = '';
  const cart = readCart();

  if (emptyState) emptyState.hidden = cart.length > 0;
  if (checkoutAction) checkoutAction.hidden = cart.length === 0;

  cart.forEach((item) => {
    const product = PRODUCTS.find((productItem) => productItem.id === item.id);
    if (!product) return;

    const article = templateClone.cloneNode(true);
    article.classList.remove('cart-product-template');
    article.removeAttribute('hidden');
    article.dataset.id = product.id;

    const image = article.querySelector('.product-img');
    const name = article.querySelector('.product-name');
    const detail = article.querySelector('.product-detail');
    const price = article.querySelector('.product-price');
    const qtyInput = article.querySelector('.cart-quantity');
    const incrementButton = article.querySelector('.qty-inc');
    const decrementButton = article.querySelector('.qty-dcr');
    const removeButton = article.querySelector('.remove-button');

    if (image) {
      image.src = product.image;
      image.alt = product.alt || product.name;
    }

    if (name) name.textContent = product.name;
    if (detail) detail.textContent = product.description;
    if (price) price.textContent = product.price;
    if (qtyInput) {
      qtyInput.value = item.qty;
      qtyInput.dataset.id = product.id;
    }
    if (incrementButton) incrementButton.dataset.id = product.id;
    if (decrementButton) decrementButton.dataset.id = product.id;
    if (removeButton) removeButton.dataset.id = product.id;

    grid.appendChild(article);
  });

  qtyChange();
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


function removeCartItem(button) {
  const targetId = button?.dataset.id || button?.closest('.cart-product')?.dataset.id;
  if (!targetId) return;

  const cart = readCart();
  const updatedCart = cart.filter((item) => item.id !== targetId);

  localStorage.setItem('cart', JSON.stringify(updatedCart));
  renderCart();
  cartUpdate();
}

function qtyChange(productId, qty = 1) {
  const incBtn = document.querySelectorAll('.qty-inc');
  const dcrBtn = document.querySelectorAll('.qty-dcr');
  const removeBtn = document.querySelectorAll('.remove-button');

  if (incBtn.length === 0 && dcrBtn.length === 0 && removeBtn.length === 0) return;

  const updateQuantity = (button, changeAmount) => {
    const targetId = button?.dataset.id || button?.closest('.cart-product')?.dataset.id;
    if (!targetId) return;

    const cart = readCart();
    const itemIndex = cart.findIndex((item) => item.id === targetId);

    if (itemIndex === -1) return;

    const nextQty = (Number(cart[itemIndex].qty) || 0) + changeAmount;

    if (nextQty <= 0) {
      cart.splice(itemIndex, 1);
    } else {
      cart[itemIndex].qty = nextQty;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    cartUpdate();
  };

  incBtn.forEach((btn) => {
    btn.onclick = (e) => {
      e.preventDefault();
      updateQuantity(e.currentTarget, Number(qty) || 1);
    };
  });

  dcrBtn.forEach((btn) => {
    btn.onclick = (e) => {
      e.preventDefault();
      updateQuantity(e.currentTarget, -(Number(qty) || 1));
    };
  });

  removeBtn.forEach((btn) => {
    btn.onclick = (e) => {
      e.preventDefault();
      removeCartItem(e.currentTarget);
    };
  });
}

renderCart();
cartUpdate();
qtyChange();


  //console.trace('cart.js running');
