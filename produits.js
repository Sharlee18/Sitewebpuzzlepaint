// produits.js : Gestion des popups et carrousels pour produits.html

// Données des carrousels (images et textes)
document.addEventListener("DOMContentLoaded", () => {
const carousels = {
    "kit-auto": [
      { src: "kitauto1.png", text: "Le Kit Auto - Vue de dessus" },
      { src: "kitauto2.png", text: "Assemblage du Kit Auto" },
      { src: "kitauto3.png", text: "Kit Auto en action" }
    ],
    "kit-manuel": [
      { src: "kitmanuel1.png", text: "Le Kit Manuel - Pièces détachées" },
      { src: "kitmanuel2.png", text: "Montage du Kit Manuel" },
      { src: "kitmanuel3.png", text: "Kit Manuel terminé" }
    ],
    // Tu peux ajouter ici tes futurs kits !
  };
  
  // Stocke l'index courant pour chaque carrousel
  const currentIndex = {
    "kit-auto": 0,
    "kit-manuel": 0
  };
  
  // Ouvre le popup spécifique au produit
  function openPopup(productId) {
    document.getElementById(`popup-${productId}`).style.display = 'block';
    showImage(productId);
  }
  
  // Ferme le popup
  function closePopup(productId) {
    document.getElementById(`popup-${productId}`).style.display = 'none';
  }
  
  // Affiche l'image et texte courant dans le carrousel
  function showImage(productId) {
    const imageElement = document.getElementById(`carousel-image-${productId}`);
    const textElement = document.getElementById(`carousel-text-${productId}`);
    const index = currentIndex[productId];
    imageElement.src = carousels[productId][index].src;
    textElement.innerText = carousels[productId][index].text;
  }
  
  // Passe à l'image suivante
  function nextImage(productId) {
    currentIndex[productId] = (currentIndex[productId] + 1) % carousels[productId].length;
    showImage(productId);
  }
  
  // Revient à l'image précédente
  function prevImage(productId) {
    currentIndex[productId] = (currentIndex[productId] - 1 + carousels[productId].length) % carousels[productId].length;
    showImage(productId);
  }
  