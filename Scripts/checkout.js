import { PRODUCTS } from './product-data.js';
import { auth, db } from './firebase-config.js';
import { onAuthStateChanged } from 'firebase/auth';
import { saveUserDetails } from './auth.js';
import { listenToCartChanges } from './cart.js';
import { setDoc, doc } from 'firebase/firestore';
import "./main";

const DELIVERY_FEE = 10;

function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function renderOrderSummary() {
  const cart = getCart();
  console.log('cart:', cart);
  console.log('PRODUCTS:', PRODUCTS);
  const orderProducts = document.querySelector('.order-products');
  const subtotalEl = document.querySelector('.sub-total_price');
  const deliveryEl = document.querySelector('.delivery-fee');
  const totalEl = document.querySelector('.total-price');

  if (!orderProducts) return; // guard — page might not have this markup yet

  // grab your existing markup as the template, then wipe the placeholders
  const template = orderProducts.querySelector('.p_order-detail');
  orderProducts.innerHTML = '';

  let subtotal = 0;

  if (cart.length === 0) {
    orderProducts.innerHTML = `<p class="order-empty">Your cart is empty.</p>`;
  }

  cart.forEach(item => {
    const product = PRODUCTS.find(p => p.id === item.id);
    if (!product) return; // skip stale/bad ids sitting in localStorage

    const lineTotal = product.price * item.qty;
    subtotal += lineTotal;

    const node = template.cloneNode(true);
    node.querySelector('img').src = product.image;
    node.querySelector('img').alt = product.name;
    node.querySelector('h3').textContent = product.name;
    node.querySelector('.pcs-qty').textContent = item.qty;
    node.querySelector('.price').textContent = lineTotal.toFixed(2);

    orderProducts.appendChild(node);
  });

  const total = subtotal + (cart.length ? DELIVERY_FEE : 0);

subtotalEl.innerHTML = `<span>$</span> ${subtotal.toFixed(2)}`;
deliveryEl.innerHTML = `<span>$</span> ${cart.length ? DELIVERY_FEE.toFixed(2) : '0.00'}`;
  totalEl.querySelector('span').nextSibling
    ? (totalEl.textContent = '') 
    : null;
  totalEl.innerHTML = `<span>$</span> ${total.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', renderOrderSummary);

// --- Listen to cart changes in real-time (multi-device sync) ---
if (auth.currentUser) {
  listenToCartChanges(auth.currentUser.uid);
} else {
  // For non-logged in users, check if they log in during checkout
  onAuthStateChanged(auth, (user) => {
    if (user) {
      listenToCartChanges(user.uid);
    }
  });
}

// --- Re-render order summary when cart changes ---
window.addEventListener('storage', (e) => {
  if (e.key === 'cart') {
    renderOrderSummary();
  }
});


function showFieldError(input, message) {
  clearFieldError(input);
  input.classList.add('input-error');

  const errorEl = document.createElement('p');
  errorEl.className = 'field-error';
  errorEl.textContent = message;
  input.insertAdjacentElement('afterend', errorEl);
}

function clearFieldError(input) {
  input.classList.remove('input-error');
  const next = input.nextElementSibling;
  if (next && next.classList.contains('field-error')) {
    next.remove();
  }
}

function validateForm() {
  let isValid = true;

  const requiredFields = [
    { id: 'first-name', label: 'First name' },
    { id: 'last-name', label: 'Last name' },
    { id: 'email', label: 'Email address' },
    { id: 'phone', label: 'Phone number' },
    { id: 'address', label: 'Address' },
    { id: 'city', label: 'City' },
    { id: 'state', label: 'State' },
  ];

  requiredFields.forEach(({ id, label }) => {
    const input = document.getElementById(id);
    if (!input) return; // guard

    if (!input.value.trim()) {
      showFieldError(input, `${label} is required`);
      isValid = false;
    } else {
      clearFieldError(input);
    }
  });

  // Email format check
  const emailInput = document.getElementById('email');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailInput && emailInput.value.trim() && !emailRegex.test(emailInput.value.trim())) {
    showFieldError(emailInput, 'Enter a valid email address');
    isValid = false;
  }

  // Phone format check — basic, allows digits, spaces, +, -, ()
  const phoneInput = document.getElementById('phone');
  const phoneRegex = /^[\d\s()+-]{7,}$/;
  if (phoneInput && phoneInput.value.trim() && !phoneRegex.test(phoneInput.value.trim())) {
    showFieldError(phoneInput, 'Enter a valid phone number');
    isValid = false;
  }

  // Payment method — at least one radio selected
  const paymentSelected = document.querySelector('input[name="payment"]:checked');

  if (!paymentSelected) {
    showPaymentWarning();
    isValid = false;
  }

  return isValid;
}



function submitOrder(cart) {
  console.log('Order submitted (stub):', cart);
  localStorage.removeItem('cart');
  
  // Clear cart from Firebase if user is logged in
  if (auth.currentUser) {
    setDoc(doc(db, 'users', auth.currentUser.uid, 'cartData', 'items'), 
      { items: [], timestamp: new Date() }, 
      { merge: true }
    ).catch(err => console.error('Error clearing Firebase cart:', err));
  }
}

function setOrderStatus(message, type = '') {
  const statusEl = document.querySelector('.order-status');
  if (!statusEl) return;

  statusEl.textContent = message;
  statusEl.className = `order-status${type ? ` ${type}` : ''}`;
}

function showOrderConfirmation() {
  const modal = document.querySelector('.order-modal');
  if (!modal) return;

  modal.hidden = false;
  modal.querySelector('.order-modal__close')?.focus();
}

function closeOrderConfirmation() {
  const modal = document.querySelector('.order-modal');
  if (modal) modal.hidden = true;
}

function showPaymentWarning() {
  const modal = document.querySelector('.payment-modal');
  if (!modal) return;

  modal.hidden = false;
  modal.querySelector('.payment-modal__close')?.focus();
}

function closePaymentWarning() {
  const modal = document.querySelector('.payment-modal');
  if (modal) modal.hidden = true;
}

async function handleCheckoutSubmit(e) {
  e.preventDefault();

  setOrderStatus('');
  if (!validateForm()) {
    setOrderStatus('Please complete the highlighted fields.', 'error');
    return;
  }

  const cart = getCart();
  if (cart.length === 0) {
    setOrderStatus('Your cart is empty.', 'error');
    return;
  }

  try {
    if (auth.currentUser) {
      await saveUserDetails(auth.currentUser.uid);
    }

    submitOrder(cart);
    showOrderConfirmation();
    setOrderStatus('Order placed successfully.');
  } catch (error) {
    console.error('Order submission failed:', error);
    setOrderStatus('We could not place your order. Please try again.', 'error');
  }
}

const checkoutForm = document.querySelector('#checkout-form');
checkoutForm?.addEventListener('submit', handleCheckoutSubmit);

document.querySelector('.order-modal__close')?.addEventListener('click', closeOrderConfirmation);
document.querySelector('.order-modal__continue')?.addEventListener('click', () => {
  window.location.href = 'shop.html';
});

document.querySelector('.payment-modal__close')?.addEventListener('click', closePaymentWarning);
document.querySelector('.payment-modal__action')?.addEventListener('click', () => {
  closePaymentWarning();
  document.querySelector('#card')?.focus();
});
document.querySelector('.payment-modal')?.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) closePaymentWarning();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closePaymentWarning();
});