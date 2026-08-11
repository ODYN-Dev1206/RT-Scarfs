import { activeNavLink } from "./main";
import { hamburgerAction } from "./main";
import { addToCart, cartUpdate } from "./cart";
import { PRODUCTS } from "./product-data";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const product = PRODUCTS.find((productItem) => productItem.id === id);

const aboutProduct = document.querySelector('.about-product');
if (!product) {
  if (aboutProduct) {
    aboutProduct.innerHTML = "<p>Sorry, we couldn't find that product.</p>";
  }
} else {
  const image = document.getElementById('product-img');
  const name = document.getElementById('product-name');
  const detail = document.getElementById('product-detail');
  const price = document.getElementById('product-price');
  const rating = document.getElementById('product-rating');
  const buyButton = document.querySelector('.buy-prod');

  if (image) {
    image.src = product.image;
    image.alt = product.alt || product.name;
  }

  if (name) name.textContent = product.name;
  if (detail) detail.textContent = product.description;
  if (price) price.textContent = product.price;
  if (rating) rating.innerHTML = '★'.repeat(product.rating || 0);

  if (buyButton) {
    buyButton.dataset.id = id;
    buyButton.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      addToCart(id);
      cartUpdate();
      window.location.href = 'cart.html';
    });
  }

  document.title = `${product.name} | RT Scarfs`;
}
