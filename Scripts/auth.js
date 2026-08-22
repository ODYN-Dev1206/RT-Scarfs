import { auth, db, googleProvider } from './firebase-config.js';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const signInBtn = document.querySelector('.user-sign-in');
const accountIcon = document.querySelector('.user-account .icon');
const defaultAccountIcon = accountIcon?.getAttribute('src') || '/Icons/user.svg';

function getProfilePhotoUrl(user) {
  const googleProfile = user.providerData?.find(({ providerId }) => providerId === 'google.com');
  const photoUrl = user.photoURL || googleProfile?.photoURL;
  if (!photoUrl) return '';

  return photoUrl.replace(/=s\d+(-c)?$/, '=s96-c');
}

// --- Sign in with Google ---
async function handleSignIn(e) {
  e.preventDefault();
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (err) {
    console.error('Sign-in failed:', err);
  }
}

// --- Sign out ---
async function handleSignOut(e) {
  e.preventDefault();
  try {
    await signOut(auth);
  } catch (err) {
    console.error('Sign-out failed:', err);
  }
}

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
    signInBtn.removeEventListener('click', handleSignIn);
    accountIcon?.removeEventListener('click', handleSignIn);
    signInBtn.addEventListener('click', handleSignOut);
    accountIcon?.addEventListener('click', handleSignOut);
  } else {
    signInBtn.querySelector('p').textContent = 'Sign In';
    if (accountIcon) {
      accountIcon.src = defaultAccountIcon;
      accountIcon.alt = 'User account icon';
      accountIcon.classList.remove('profile-picture');
    }
    signInBtn.removeEventListener('click', handleSignOut);
    accountIcon?.removeEventListener('click', handleSignOut);
    signInBtn.addEventListener('click', handleSignIn);
    accountIcon?.addEventListener('click', handleSignIn);
  }
}

// --- Watches auth state on every page load ---
onAuthStateChanged(auth, (user) => {
  updateSignInUI(user);

  if (user && document.querySelector('.check-main')) {
    prefillForm(user.uid);
  }
});

if (signInBtn) {
  signInBtn.addEventListener('click', handleSignIn);
}
if (accountIcon) {
  accountIcon.addEventListener('click', handleSignIn);
}