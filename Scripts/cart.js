import "./button-feedback.js";

import { PRODUCTS } from "./product-data";
import { activeNavLink, hamburgerAction } from "./main";
import { db } from "./firebase-config.js";
import { auth } from "./firebase-config.js";
import { doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

let currentUserId = null;
let cartUnsubscribe = null;

function readCart() {
  try {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  } catch {
    return [];
  }
}

// --- Save cart to Firestore ---
export async function saveCartToFirebase(uid) {
  if (!uid) return;
  
  try {
    const cart = readCart();
    await setDoc(doc(db, 'users', uid, 'cartData', 'items'), { items: cart, timestamp: new Date() }, { merge: true });
  } catch (err) {
    console.error('Error saving cart to Firebase:', err);
  }
}

// --- Load cart from Firestore ---
export async function loadCartFromFirebase(uid) {
  if (!uid) return [];
  
  try {
    const snap = await getDoc(doc(db, 'users', uid, 'cartData', 'items'));
    if (snap.exists()) {
      return snap.data().items || [];
    }
  } catch (err) {
    console.error('Error loading cart from Firebase:', err);
  }
  
  return [];
}

// --- Merge guest cart with user's cart ---
export async function mergeGuestCart(uid) {
  if (!uid) return;
  
  try {
    const guestCart = readCart();
    if (guestCart.length === 0) return;
    
    const userCart = await loadCartFromFirebase(uid);
    
    // Merge carts: for items in both, add quantities; otherwise just add the item
    const mergedCart = [...userCart];
    
    guestCart.forEach((guestItem) => {
      const existingIndex = mergedCart.findIndex((item) => item.id === guestItem.id);
      
      if (existingIndex !== -1) {
        mergedCart[existingIndex].qty += guestItem.qty;
      } else {
        mergedCart.push(guestItem);
      }
    });
    
    // Save merged cart to Firebase and localStorage
    await setDoc(doc(db, 'users', uid, 'cartData', 'items'), { items: mergedCart, timestamp: new Date() }, { merge: true });
    localStorage.setItem('cart', JSON.stringify(mergedCart));
    
    renderCart();
    cartUpdate();
  } catch (err) {
    console.error('Error merging guest cart:', err);
  }
}

// --- Clear local cart ---
export function clearCart() {
  localStorage.removeItem('cart');
  renderCart();
  cartUpdate();
}

// --- Listen to cart changes from Firestore for this user ---
export function listenToCartChanges(uid) {
  if (!uid) return;
  
  // Unsubscribe from previous listener if exists
  if (cartUnsubscribe) {
    cartUnsubscribe();
  }
  
  try {
    currentUserId = uid;
    cartUnsubscribe = onSnapshot(doc(db, 'users', uid, 'cartData', 'items'), (snap) => {
      if (snap.exists()) {
        const firestoreCart = snap.data().items || [];
        localStorage.setItem('cart', JSON.stringify(firestoreCart));
        renderCart();
        cartUpdate();
      }
    }, (err) => {
      console.error('Error listening to cart changes:', err);
    });
  } catch (err) {
    console.error('Error setting up cart listener:', err);
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
  
  // Save to Firebase if user is logged in
  if (currentUserId) {
    saveCartToFirebase(currentUserId);
  }
  
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
  
  // Save to Firebase if user is logged in
  if (currentUserId) {
    saveCartToFirebase(currentUserId);
  }
  
  renderCart();
  cartUpdate();
}

function qtyChange(productId, qty = 1) {
  const incBtn = document.querySelectorAll('.qty-inc');
  const dcrBtn = document.querySelectorAll('.qty-dcr');
  const removeBtn = document.querySelectorAll('.remove-button');
  const qtyInputs = document.querySelectorAll('.qty-input');

  if (incBtn.length === 0 && dcrBtn.length === 0 && removeBtn.length === 0 && qtyInputs.length === 0) return;

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
    
    // Save to Firebase if user is logged in
    if (currentUserId) {
      saveCartToFirebase(currentUserId);
    }
    
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

  qtyInputs.forEach((input) => {
    const saveQuantity = () => {
      const targetId = input.dataset.id || input.closest('.cart-product')?.dataset.id;
      if (!targetId) return;

      const nextQty = Number.parseInt(input.value, 10);
      const cart = readCart();
      const itemIndex = cart.findIndex((item) => item.id === targetId);

      if (itemIndex === -1) return;

      cart[itemIndex].qty = Number.isFinite(nextQty) && nextQty > 0 ? nextQty : 1;
      localStorage.setItem('cart', JSON.stringify(cart));
      
      // Save to Firebase if user is logged in
      if (currentUserId) {
        saveCartToFirebase(currentUserId);
      }
      
      renderCart();
      cartUpdate();
    };

    input.onchange = saveQuantity;
    input.onkeydown = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        saveQuantity();
      }
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

// --- Checkout authentication check ---
const checkoutBtn = document.querySelector('.checkout-btn');
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', (e) => {
    if (!auth.currentUser) {
      e.preventDefault();
      
      // Create and show login modal
      const modalContainer = document.createElement('div');
      modalContainer.className = 'checkout-auth-modal-overlay';
      modalContainer.setAttribute('role', 'dialog');
      modalContainer.setAttribute('aria-labelledby', 'checkout-modal-title');
      modalContainer.setAttribute('aria-modal', 'true');
      
      const modalContent = document.createElement('div');
      modalContent.className = 'checkout-auth-modal';
      
      const closeButton = document.createElement('button');
      closeButton.className = 'modal-close';
      closeButton.setAttribute('aria-label', 'Close modal');
      closeButton.textContent = '×';
      closeButton.onclick = () => modalContainer.remove();
      
      const title = document.createElement('h2');
      title.id = 'checkout-modal-title';
      title.textContent = 'Sign In Required';
      
      const message = document.createElement('p');
      message.textContent = 'Please sign in to your account before proceeding to checkout.';
      
      const signInBtn = document.createElement('button');
      signInBtn.className = 'modal-signin-btn';
      signInBtn.textContent = 'Sign In';
      signInBtn.onclick = () => {
        const userSignIn = document.querySelector('.user-sign-in');
        if (!userSignIn) return;

        const completeCheckoutSignIn = () => {
          modalContainer.remove();
          if (!window.location.pathname.endsWith('/checkout.html')) {
            window.location.assign('checkout.html');
          }
        };

        if (auth.currentUser) {
          completeCheckoutSignIn();
          return;
        }

        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (!user) return;
          unsubscribe();
          completeCheckoutSignIn();
        });

        userSignIn.click();
      };
      
      const cancelBtn = document.createElement('button');
      cancelBtn.className = 'modal-cancel-btn';
      cancelBtn.textContent = 'Continue Shopping';
      cancelBtn.onclick = () => modalContainer.remove();
      
      modalContent.appendChild(closeButton);
      modalContent.appendChild(title);
      modalContent.appendChild(message);
      modalContent.appendChild(signInBtn);
      modalContent.appendChild(cancelBtn);
      
      modalContainer.appendChild(modalContent);
      document.body.appendChild(modalContainer);
      
      // Close modal on overlay click
      modalContainer.addEventListener('click', (e) => {
        if (e.target === modalContainer) {
          modalContainer.remove();
        }
      });
    }
  });
}


  //console.trace('cart.js running');
