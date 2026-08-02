window.document
window.console.log('window')

const hamBurger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const heroBtn = document.querySelector('.shop-button');
const shopNow = document.querySelectorAll('.buy-prod');
const navLinks = document.querySelectorAll('.nav-menu a');
const currentPage = window.location.pathname;


hamBurger.addEventListener('click', () => {
  hamBurger.classList.toggle('active');
  navMenu.classList.toggle('open');
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    document.querySelector('header').classList.add('scrolled');
  }
  else{
    document.querySelector('header').classList.remove('scrolled');    
  }
});
console.log(hamBurger);
console.log(navMenu);


navLinks.forEach(link => {
  link.classList.remove('active');


  const linkPath = link.getAttribute('href');
  const linkPaTh = link.getAttribute('href').replace(/^\//, '');
  const current = currentPage.replace(/^\//, ''); 


    if (linkPaTh === current){
        link.classList.add('active-page');
    }
    
  console.log(linkPaTh);
  console.log(current);
});
console.log(navLinks);
console.log('current:', currentPage);

heroBtn.addEventListener('click', () => {
  heroBtn.classList.toggle('active');
});
console.log(heroBtn);

shopNow.forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.toggle('active');
  });
});
console.log(shopNow);

