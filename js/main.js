import { initHeader } from "./modules/header.js";
import { initGallery } from "./modules/gallery.js";
import { initGiftModal } from "./modules/giftModal.js";
import { initFaq } from "./modules/faq.js";
import { initCounter } from "./modules/counter.js";
import { initGSAP } from "./modules/gsap.js";

console.log("javascript file is linked");

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initGallery();
  initGiftModal();
  initFaq();
  initCounter();
  initGSAP();
});
