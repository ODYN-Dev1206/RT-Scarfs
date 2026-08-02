window.document
window.console.log('window')


const filterBtn = document.querySelectorAll('.filter-button');
const searchIcon = document.querySelector('.search-icon');
const searchBar = document.querySelector('.search-bar');
const prodCard = document.querySelectorAll('.product-card');

filterBtn.forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.toggle('active');
  });
});
console.log(filterBtn);


searchIcon.addEventListener('click', () => {
  searchBar.classList.toggle('visible');
});

document.addEventListener('click', (event) => {
  if (!searchBar.contains(event.target) && !searchIcon.contains(event.target)) {
    searchBar.classList.add('invisible');
  }
});

prodCard.forEach((article) => {
  article.addEventListener('click', () => {
    article.classList.toggle('active');
  });
});
console.log(prodCard)