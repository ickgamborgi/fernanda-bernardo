export function initHeader() {
  const burgerButton = document.querySelector("#burger-button");
  const navbarLinks = document.querySelector(".links-header");
  burgerButton.addEventListener("click", () => {
    navbarLinks.classList.toggle("active");
    burgerButton.classList.toggle("active");
  });
}
