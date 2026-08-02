window.document
window.console.log('window')


const readArticle = document.querySelectorAll('.article-button');
const readBlog = document.querySelectorAll('.read');

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



const searchIcon = document.querySelector('.search-icon');
const searchBar = document.querySelector('.search-bar');

searchIcon.addEventListener('click', () => {
  searchBar.classList.toggle('visible');
});

document.addEventListener('click', (event) => {
  if (!searchBar.contains(event.target) && !searchIcon.contains(event.target)) {
    searchBar.classList.add('invisible');
  }
});