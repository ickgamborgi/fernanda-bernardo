import { initHeader } from "./modules/header.js";
import { initGallery } from "./modules/gallery.js";

console.log("javascript file is linked");

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initGallery();
});
