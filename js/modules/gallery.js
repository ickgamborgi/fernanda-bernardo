export function initGallery() {
  // Seleciona todos os itens da galeria
  const galleryPics = document.querySelectorAll(".gallery-pic");

  // forEach para adicionar event listener a cada imagem
  galleryPics.forEach((pic) => {
    pic.addEventListener("click", (e) => {
      e.preventDefault();
      
      // Obtém a imagem dentro do anchor
      const img = pic.querySelector("img");
      const imgSrc = img.src;
      const imgAlt = img.alt;

      // Cria o modal fullscreen
      createGalleryModal(imgSrc, imgAlt);
    });
  });
}

function createGalleryModal(imgSrc, imgAlt) {
  // Cria o overlay
  const galleryOverlay = document.createElement("div");
  galleryOverlay.classList.add("gallery-overlay");

  // Cria o container da imagem
  const galleryModal = document.createElement("div");
  galleryModal.classList.add("gallery-modal");

  // Cria a imagem fullscreen
  const img = document.createElement("img");
  img.src = imgSrc;
  img.alt = imgAlt;
  img.classList.add("gallery-fullscreen-img");

  // Cria o botão de fechar
  const closeBtn = document.createElement("button");
  closeBtn.classList.add("gallery-close-btn");
  closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  closeBtn.type = "button";

  // Adiciona a imagem ao modal
  galleryModal.appendChild(img);

  // Adiciona modal ao overlay e o botão de fechar como irmão do modal (posicionado fixo)
  galleryOverlay.appendChild(galleryModal);
  galleryOverlay.appendChild(closeBtn);

  // Adiciona ao body
  document.body.appendChild(galleryOverlay);

  // Adiciona a classe de ativação (com delay para trigger animation)
  setTimeout(() => {
    galleryOverlay.classList.add("gallery-selected");
  }, 10);

  // Função para fechar a galeria
  function closeGallery() {
    galleryOverlay.classList.remove("gallery-selected");
    
    // Remove do DOM após a animação
    setTimeout(() => {
      galleryOverlay.remove();
    }, 300);
  }

  // Event listener para clicar no X
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeGallery();
  });

  // Event listener para clicar fora da imagem (no overlay)
  // Usar currentTarget garante que é o overlay mesmo se o clique vier de um filho
  galleryOverlay.addEventListener("click", (e) => {
    // Se o clique foi diretamente no overlay (não em filhos), fecha
    if (e.target.classList.contains("gallery-overlay")) {
      closeGallery();
    }
  });

  // Event listener para tecla ESC
  const handleEscKey = (e) => {
    if (e.key === "Escape") {
      closeGallery();
      document.removeEventListener("keydown", handleEscKey);
    }
  };
  document.addEventListener("keydown", handleEscKey);
}
