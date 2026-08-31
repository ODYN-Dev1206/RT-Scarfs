import { auth, db, googleProvider } from './firebase-config.js';
import {
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { mergeGuestCart, loadCartFromFirebase, listenToCartChanges, clearCart } from './cart.js';

const signInBtn = document.querySelector('.user-sign-in');
const accountIcon = document.querySelector('.user-account .icon');
const defaultAccountIcon = accountIcon?.getAttribute('src') || '/Icons/user.svg';

function getProfilePhotoUrl(user) {
  const googleProfile = user.providerData?.find(({ providerId }) => providerId === 'google.com');
  const photoUrl = user.photoURL || googleProfile?.photoURL;
  if (!photoUrl) return '';

  return photoUrl.replace(/=s\d+(-c)?$/, '=s96-c');
}

function getAccountMenu() {
  const account = document.querySelector('.user-account');
  if (!account) return null;

  let menu = account.querySelector('.user-account-menu');
  if (!menu) {
    menu = document.createElement('div');
    menu.className = 'user-account-menu';
    menu.setAttribute('role', 'menu');
    menu.innerHTML = `
      <a href="checkout.html" class="user-account-menu-item" role="menuitem">Checkout</a>
      <button type="button" class="user-account-menu-item user-account-signout" role="menuitem">Sign out</button>
    `;

    menu.querySelector('.user-account-signout').addEventListener('click', async (event) => {
      event.preventDefault();
      try {
        await signOut(auth);
      } catch (err) {
        console.error('Sign-out failed:', err);
      }
      closeAccountMenu();
    });

    account.appendChild(menu);
  }

  return menu;
}

function setAccountMenuOpen(isOpen) {
  const menu = getAccountMenu();
  const accountButton = document.querySelector('.user-sign-in');
  if (!menu || !accountButton) return;

  menu.classList.toggle('is-open', isOpen);
  accountButton.setAttribute('aria-expanded', String(isOpen));
}

function closeAccountMenu() {
  setAccountMenuOpen(false);
}

function toggleAccountMenu(event) {
  if (event) event.preventDefault();
  const menu = getAccountMenu();
  const accountButton = document.querySelector('.user-sign-in');
  if (!menu || !accountButton || !auth.currentUser) return;

  const isOpen = menu.classList.contains('is-open');
  setAccountMenuOpen(!isOpen);
}

// --- Sign in with Google ---
async function handleSignIn(e) {
  e.preventDefault();
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (err) {
    console.error('Sign-in failed:', err.code, err.message);
    if (err.code === 'auth/popup-blocked') {
      showAuthMessage('Opening Google sign-in...');
      await signInWithRedirect(auth, googleProvider);
      return;
    }
    showAuthMessage(`Google sign-in failed (${err.code || 'unknown error'}). Check Firebase Authorized Domains.`);
  }
}

function showAuthMessage(message) {
  document.querySelector('.auth-message')?.remove();
  const messageBox = document.createElement('div');
  messageBox.className = 'auth-message';
  messageBox.setAttribute('role', 'alert');
  messageBox.textContent = message;
  document.body.append(messageBox);
  window.setTimeout(() => messageBox.remove(), 7000);
}

// --- Sign out ---
async function handleSignOut(e) {
  e.preventDefault();
  try {
    clearCart();
    await signOut(auth);
  } catch (err) {
    console.error('Sign-out failed:', err);
  }
}

function ensureSignedInCaret() {
  if (!signInBtn) return;

  let caret = signInBtn.querySelector('.user-menu-caret');
  if (!caret) {
    caret = document.createElement('span');
    caret.className = 'user-menu-caret';
    caret.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M6 9.5l6 6 6-6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
      </svg>
    `;
    signInBtn.appendChild(caret);
  }
  signInBtn.classList.add('is-signed-in');
}

function clearSignedInCaret() {
  if (!signInBtn) return;

  const caret = signInBtn.querySelector('.user-menu-caret');
  if (caret) caret.remove();
  signInBtn.classList.remove('is-signed-in');
  signInBtn.removeAttribute('aria-expanded');
}

function attachOutsideClickHandler() {
  document.addEventListener('click', (event) => {
    const account = document.querySelector('.user-account');
    if (!account) return;
    if (!account.contains(event.target)) {
      closeAccountMenu();
    }
  });
}

attachOutsideClickHandler();

// --- Save checkout form data to Firestore, tied to uid ---
export async function saveUserDetails(uid) {
  const formData = {
    firstName: document.getElementById('first-name')?.value || '',
    lastName: document.getElementById('last-name')?.value || '',
    email: document.getElementById('email')?.value || '',
    phone: document.getElementById('phone')?.value || '',
    address: document.getElementById('address')?.value || '',
    apartment: document.getElementById('apartment')?.value || '',
    city: document.getElementById('city')?.value || '',
    state: document.getElementById('state')?.value || '',
    instructions: document.getElementById('instructions')?.value || '',
  };

  await setDoc(doc(db, 'users', uid), formData, { merge: true });
}

// --- Prefill checkout form from saved Firestore data ---
async function prefillForm(uid) {
  const snap = await getDoc(doc(db, 'users', uid));
  if (!snap.exists()) return;

  const data = snap.data();
  const fields = {
    'first-name': data.firstName,
    'last-name': data.lastName,
    'email': data.email,
    'phone': data.phone,
    'address': data.address,
    'apartment': data.apartment,
    'city': data.city,
    'state': data.state,
    'instructions': data.instructions,
  };

  Object.entries(fields).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el && value) el.value = value;
  });
}

// --- Update header UI based on sign-in state ---
function updateSignInUI(user) {
  if (!signInBtn) return;

  if (user) {
    signInBtn.querySelector('p').textContent = user.displayName?.split(' ')[0] || 'Account';
    if (accountIcon) {
      const profilePhotoUrl = getProfilePhotoUrl(user);
      accountIcon.referrerPolicy = 'no-referrer';
      accountIcon.src = profilePhotoUrl || defaultAccountIcon;
      accountIcon.alt = `${user.displayName || 'User'} profile picture`;
      accountIcon.classList.toggle('profile-picture', Boolean(profilePhotoUrl));
      accountIcon.onerror = () => {
        accountIcon.onerror = null;
        accountIcon.src = defaultAccountIcon;
        accountIcon.classList.remove('profile-picture');
      };
    }

    ensureSignedInCaret();
    signInBtn.onclick = (event) => toggleAccountMenu(event);
    accountIcon.onclick = (event) => toggleAccountMenu(event);
    closeAccountMenu();
  } else {
    signInBtn.querySelector('p').textContent = 'Sign In';
    if (accountIcon) {
      accountIcon.src = defaultAccountIcon;
      accountIcon.alt = 'User account icon';
      accountIcon.classList.remove('profile-picture');
    }

    clearSignedInCaret();
    signInBtn.onclick = handleSignIn;
    accountIcon.onclick = handleSignIn;
    closeAccountMenu();
  }
}

// --- Watches auth state on every page load ---
onAuthStateChanged(auth, async (user) => {
  updateSignInUI(user);

  if (user) {
    // User logged in: merge guest cart with user's cart and load from Firebase
    await mergeGuestCart(user.uid);
    listenToCartChanges(user.uid);
    
    if (document.querySelector('.check-main')) {
      prefillForm(user.uid);
    }
  } else {
    clearCart();
  }
});

