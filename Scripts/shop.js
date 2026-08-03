window.document
window.console.log('window')

const urlParams = new URLSearchParams(window.location.ancestorOrigins.search);
const filterFromURL = urlParams.get('filter');
const filterIcon = document.querySelector('.filter-icon');
const filterRow = document.querySelector('.filter-btn-row');
const filterBtn = document.querySelectorAll('.filter-button');
const searchIcon = document.querySelector('.search-icon');
const searchBar = document.querySelector('.search-bar');
const prodCard = document.querySelectorAll('.product-card');


filterIcon.addEventListener('click', () => {
  filterRow.classList.toggle('visible');
});
console.log(filterRow);


filterBtn.forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.toggle('active');
  });
});
console.log(filterBtn);


searchIcon.addEventListener('click', () => {
  searchBar.classList.toggle('visible');
});

/*document.addEventListener('click', (event) => {
  if (!searchBar.contains(event.target) && !searchIcon.contains(event.target) && !filterIcon.contains(event.target)) {
    searchBar.classList.add('invisible');
  }
});
console.log(searchIcon)
console.log(searchBar)*/

filterBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtn.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filterVal = btn.dataset.filter;

    prodCard.forEach((card) => {
      const cardCategory = (card.dataset.category || '').split(' ');
      console.log(filterVal, '|', cardCategory);
      if (filterVal === 'all' || cardCategory.includes(filterVal)) {
        card.classList.remove('hide');
      } else {
        card.classList.add('hide')
      }
    });
  });
});


if (filterFromURL) {
  const matchingBtn = document.querySelector(`.filter-btn[data-filter="${filterFromURL}"]`);
  if (matchingBtn) {
    matchingBtn.click();
  }
}

prodCard.forEach((article) => {
  article.addEventListener('click', () => {
    article.classList.toggle('active');
  });
});
console.log(prodCard)