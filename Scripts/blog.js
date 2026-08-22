import { activeNavLink, hamburgerAction } from "./main";

const urlParams = new URLSearchParams(window.location.search);
const filterFromURL = urlParams.get('filter');
const filterIcon = document.querySelector('.filter-icon');
const filterRow = document.querySelector('.filter-btn-row');
import "./button-feedback.js";

const filterBtns = document.querySelectorAll('.filter-button');
const searchIcon = document.querySelector('.search-icon');
const searchBar = document.querySelector('.search-bar');
const blogCards = document.querySelectorAll('.blog-article');
const blogGrid = document.querySelector('.blog-detail');
const readButtons = document.querySelectorAll('.read, .article-button');
const subscribeButton = document.querySelector('.subscribe-button');
const newsletterForm = document.querySelector('.newsletter-subscribe');

let activeFilter = 'all';
let searchTerm = '';

const blogImages = [
  'pexels-ali-rezaei-83910116-15617511.jpg',
  'pexels-peg1997-20002323.jpg',
  'pexels-sahar-photography-914616632-19980514.jpg',
  'pexels-momo-183274690-37609721.jpg',
  'pexels-vitalyagorbachev-13234233.jpg',
  'pexels-spaceprince-8891490.jpg',
  'pexels-luizmartins-4185810.jpg',
  'pexels-sepehr-ghadrdan-409202650-19552829.jpg',
  'pexels-carmel-nsenga-735492-11214241.jpg',
  'pexels-aminnaderloei-31977000.jpg',
  'pexels-rodrigo-ortega-2044210904-30213222.jpg',
  'pexels-nelson-ribeiro-973316-5607318.jpg',
  'pexels-mohammad-saaraan-3679231-5567211.jpg',
  'pexels-rasul-lotfi-16110887-14416487.jpg',
  'pexels-pavelpolyakov-9552153.jpg',
  'pexels-nishantdas-33372359.jpg',
  'pexels-rachel-claire-5864273.jpg',
  'pexels-amirali-parsa-150087344-12744309.jpg',
  'pexels-donald-dondada-matsoga-2557845-4625992.jpg',
  'pexels-tarek-shahin-153182669-12369786.jpg',
  'pexels-sam2piccs-14455241.jpg',
  'pexels-danikprihodko-19510922.jpg',
  'pexels-peg1997-20002323.jpg'
];

const blogStories = [
  ['The Art of the Everyday Drape', 'fashion', 'A considered drape can change the entire rhythm of an outfit. Start with proportion, then let the fabric move.', 'June 02, 2026'],
  ['A Softer Approach to Summer Layers', 'styling-tips', 'Lightweight texture and a relaxed fold make warm-weather layering feel effortless.', 'May 28, 2026'],
  ['How to Build a Scarf Colour Story', 'styling-tips', 'Use one grounded neutral, one tonal shade, and one unexpected accent to make colour feel intentional.', 'May 22, 2026'],
  ['Care Notes for Silk and Satin', 'care-guide', 'A few quiet habits keep delicate fibres luminous: gentle washing, cool storage, and room to breathe.', 'May 18, 2026'],
  ['The New Season, Woven Slowly', 'new-collection', 'Discover pieces with richer texture, generous proportions, and a palette made for the changing light.', 'May 14, 2026'],
  ['Why Texture Changes a Look', 'fashion', 'Tactile contrast gives a simple outfit depth, especially when the rest of the silhouette stays clean.', 'May 10, 2026'],
  ['Three Ways to Tie a Headscarf', 'styling-tips', 'Try a low knot, a soft wrap, or a loose shoulder drape for three distinct moods from one piece.', 'May 06, 2026'],
  ['The Quiet Luxury of a Good Wrap', 'fashion', 'The best wrap is generous without feeling heavy and expressive without asking for attention.', 'April 30, 2026'],
  ['A Practical Guide to Fringe', 'care-guide', 'Keep fringe neat by storing it flat and detangling it gently with your fingers after each wear.', 'April 25, 2026'],
  ['Inside the Righteous Point of View', 'brand-story', 'Our edit begins with feeling: useful beauty, honest materials, and pieces that earn repeat wear.', 'April 20, 2026'],
  ['Prints That Travel Well', 'new-collection', 'A strong print can move between workdays and evenings when its colours have a calm foundation.', 'April 15, 2026'],
  ['The Five-Minute Finishing Touch', 'styling-tips', 'When an outfit feels unfinished, add one deliberate fold and let the accessory do the editing.', 'April 10, 2026']
];

function populateBlogArticles() {
  const shuffledImages = [...blogImages].sort(() => Math.random() - 0.5);

  blogCards.forEach((card, index) => {
    const [title, category, description, date] = blogStories[index % blogStories.length];
    const image = card.querySelector('img');
    const titleElement = card.querySelector('h3');
    const descriptionElement = card.querySelector(':scope > p:not(.blog-info p)');
    const categoryElement = card.querySelector('.title');
    const dateElement = card.querySelector('.date');

    card.dataset.category = category;
    if (image) {
      image.src = `Blog Scarfs/${shuffledImages[index % shuffledImages.length]}`;
      image.alt = `${title} editorial image`;
      image.width = 1289;
      image.height = 1612;
      image.decoding = 'async';
    }
    if (titleElement) titleElement.textContent = title;
    if (descriptionElement) descriptionElement.textContent = description;
    if (categoryElement) categoryElement.textContent = category.replaceAll('-', ' ').toUpperCase();
    if (dateElement) dateElement.textContent = date;
  });
}

populateBlogArticles();

function normalizeSearchValue(value) {
  return value.toLowerCase().trim().replace(/[-_]+/g, ' ').replace(/\s+/g, ' ');
}

function renderBlogFilterState() {
  let matchCount = 0;
  const query = normalizeSearchValue(searchTerm);

  blogCards.forEach((card) => {
    const categories = (card.dataset.category || '').split(' ');
    const searchableText = normalizeSearchValue([
      card.querySelector('h3')?.textContent,
      card.querySelector('.blog-info .title')?.textContent,
      card.querySelector('.blog-info .date')?.textContent,
      card.querySelector(':scope > p:not(.blog-info p)')?.textContent
    ].filter(Boolean).join(' '));

    const matchesFilter = activeFilter === 'all' || categories.includes(activeFilter);
    const matchesSearch = !query || searchableText.includes(query);
    const matches = matchesFilter && matchesSearch;

    card.classList.toggle('hide', !matches);
    if (matches) matchCount++;
  });

  blogGrid?.querySelector('.no-result')?.remove();
  if (matchCount === 0 && blogGrid) {
    blogGrid.insertAdjacentHTML('beforeend', `<p class="no-result">No stories match${query ? ` “${searchTerm.trim()}”` : ''}. Try another search.</p>`);
  }
}

filterIcon?.addEventListener('click', () => {
  const shouldOpen = !filterRow?.classList.contains('visible');
  filterRow?.classList.toggle('visible', shouldOpen);
  filterIcon.setAttribute('aria-expanded', String(shouldOpen));
  searchBar?.classList.remove('visible');
  searchIcon?.setAttribute('aria-expanded', 'false');
});

searchIcon?.addEventListener('click', () => {
  const shouldOpen = !searchBar?.classList.contains('visible');
  searchBar?.classList.toggle('visible', shouldOpen);
  searchIcon.setAttribute('aria-expanded', String(shouldOpen));
  filterRow?.classList.remove('visible');
  filterIcon?.setAttribute('aria-expanded', 'false');
  if (shouldOpen) searchBar?.focus();
});

filterBtns.forEach((button) => {
  button.addEventListener('click', () => {
    filterBtns.forEach((filterButton) => filterButton.classList.remove('active'));
    button.classList.add('active');
    activeFilter = button.dataset.filter || 'all';
    renderBlogFilterState();
  });
});

searchBar?.addEventListener('input', (event) => {
  searchTerm = event.target.value;
  renderBlogFilterState();
});

readButtons.forEach((button) => {
  button.addEventListener('click', () => button.classList.toggle('active'));
});

subscribeButton?.addEventListener('click', () => {
  newsletterForm?.classList.add('subscribe');
});

if (filterFromURL) {
  const matchingButton = document.querySelector(`.filter-button[data-filter="${filterFromURL}"]`);
  matchingButton?.click();
} else {
  document.querySelector('.filter-button[data-filter="all"]')?.classList.add('active');
  renderBlogFilterState();
}

activeNavLink();
hamburgerAction();
