// Fonction pour ouvrir le pop-up avec le carrousel
function openProductDetails(productId) {
    // Définition des images en fonction de l'ID du produit
    const productImages = {
        1: ["PLA PARTS.png", "peintureacry.png", "pinceaux.png", "kitelectrique.png"], // Images du Kit Auto
        2: ["PLA PARTS.png", "peintureacry.png", "pinceaux.png", "kitelectriquenon.png"] // Images du Kit Manuel
    };

    // Vérifie si l'ID du produit a des images associées
    if (!productImages[productId]) {
        console.error("Aucune image trouvée pour le produit ID:", productId);
        return;
    }

    // Création du pop-up avec le carrousel
    const popup = document.createElement('div');
    popup.classList.add('product-popup');
    popup.innerHTML = `
        <div class="popup-content">
            <button class="close-popup">✖</button>
            <div class="carousel">
                <div class="carousel-track">
                    ${productImages[productId].map(img => `<img src="${img}" alt="Image produit ${productId}">`).join('')}
                </div>
                <div class="carousel-nav">
                    <button class="carousel-btn prev-btn">◀</button>
                    <button class="carousel-btn next-btn">▶</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(popup);

    // Gestion de la fermeture du pop-up
    const closeBtn = popup.querySelector('.close-popup');
    closeBtn.addEventListener('click', () => {
        popup.remove();
    });

    // Carrousel navigation
    const prevBtn = popup.querySelector('.prev-btn');
    const nextBtn = popup.querySelector('.next-btn');
    const track = popup.querySelector('.carousel-track');
    let currentSlide = 0;

    const slides = track.querySelectorAll('img');
    const totalSlides = slides.length;

    // Fonction pour aller au slide suivant
    function goToNextSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
        } else {
            currentSlide = 0;
        }
        updateCarousel();
    }

    // Fonction pour aller au slide précédent
    function goToPrevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
        } else {
            currentSlide = totalSlides - 1;
        }
        updateCarousel();
    }

    // Fonction pour mettre à jour le carrousel
    function updateCarousel() {
        const slideWidth = slides[0].clientWidth;
        track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }

    prevBtn.addEventListener('click', goToPrevSlide);
    nextBtn.addEventListener('click', goToNextSlide);

    // Initialisation du carrousel
    updateCarousel();
}

// Attacher un événement au bouton "Détail produit"
document.querySelectorAll('.detail-btn').forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.getAttribute('data-id');
        openProductDetails(productId);
    });
});
