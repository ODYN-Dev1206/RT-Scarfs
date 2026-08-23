const feedbackTimers = new WeakMap();

document.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button || button.classList.contains('hamburger')) return;

  button.classList.remove('clicked-feedback');
  window.requestAnimationFrame(() => button.classList.add('clicked-feedback'));

  const previousTimer = feedbackTimers.get(button);
  if (previousTimer) window.clearTimeout(previousTimer);

  feedbackTimers.set(button, window.setTimeout(() => {
    button.classList.remove('clicked-feedback');
    feedbackTimers.delete(button);
  }, 500));
}, true);