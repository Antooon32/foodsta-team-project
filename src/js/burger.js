//! Burger
const openBurgerBtn = document.querySelector("[data-burger-open]");
const burger = document.querySelector("[data-burger]");
const closeBurgerBtn = document.querySelector("[data-burger-close]");


openBurgerBtn.addEventListener("click", toggleburger);
closeBurgerBtn.addEventListener("click", toggleburger);

function toggleburger() {
    burger.classList.toggle("displaynone");
    document.body.classList.toggle("no-scroll");
};