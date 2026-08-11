window.document
window.console.log('window')
import { activeNavLink } from "./main";
import { addToCart, cartUpdate } from "./cart";
import { hamburgerAction } from "./main";

const readArticle = document.querySelectorAll('.article-button');
const readBlog = document.querySelectorAll('.read');
const urlParams = new URLSearchParams(window.location.ancestorOrigins.search);
const filterFromURL = urlParams.get('filter');
const filterIcon = document.querySelector('.filter-icon');
const filterRow = document.querySelector('.filter-btn-row');
const filterBtn = document.querySelectorAll('.filter-button');
const searchIcon = document.querySelector('.search-icon');
const searchBar = document.querySelector('.search-bar');
const blogCard = document.querySelectorAll('.blog-article');
const subBtn = document.querySelector('.subscribe-button');
const newsLetter = document.querySelector('.newsletter-subscribe');

console.log(subBtn)

readArticle.forEach((article) => {
  article.addEventListener('click', () => {
    article.classList.toggle('active');
  });
});

readBlog.forEach((blog) => {
  blog.addEventListener('click', () => {
    blog.classList.toggle('active');
  });
});

searchIcon.addEventListener('click', () => {
  searchBar.classList.toggle('visible');
});



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

filterBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtn.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filterVal = btn.dataset.filter;

    blogCard.forEach((card) => {
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
console.log(blogCard)


if (filterFromURL) {
  const matchingBtn = document.querySelector(`.filter-btn[data-filter="${filterFromURL}"]`);
  if (matchingBtn) {
    matchingBtn.click();
  }
}

subBtn.addEventListener('click',() => {
  newsLetter.classList.add('subscribe');
});