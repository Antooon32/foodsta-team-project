//! Burger
const openBurgerBtn = document.querySelector('[data-burger-open]');
const closeBurgerBtn = document.querySelector('[data-burger-close]');
const burger = document.querySelector('[data-burger]');
const burgerLinks = document.querySelectorAll('.bnav-list__link');

// toggle
function toggleBurger() {
  burger.classList.toggle('displaynone');
  document.body.classList.toggle('no-scroll');
}

// open / close buttons
openBurgerBtn.addEventListener('click', toggleBurger);
closeBurgerBtn.addEventListener('click', toggleBurger);

// 1️⃣ close on menu link click
burgerLinks.forEach(link => {
  link.addEventListener('click', () => {
    closeBurger();
  });
});

// 2️⃣ close on click outside burger
document.addEventListener('click', (event) => {
  const isClickInsideBurger = burger.contains(event.target);
  const isClickOnOpenBtn = openBurgerBtn.contains(event.target);

  if (!isClickInsideBurger && !isClickOnOpenBtn && !burger.classList.contains('displaynone')) {
    closeBurger();
  }
});

function closeBurger() {
  burger.classList.add('displaynone');
  document.body.classList.remove('no-scroll');
}
