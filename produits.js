// Fonction pour ouvrir le pop-up avec le carrousel
function openProductDetails(productId) {
    // Définition des images en fonction de l'ID du produit
    const productImages = {
        1: ["PLA PARTS.png", "peintureacry.png", "pinceaux.png", "kitelectrique.png"], // Kit Auto
        2: ["PLA PARTS.png", "peintureacry.png", "pinceaux.png", "kitelectriquenon.png"] // Kit Manuel
    };

    // Vérification des images du produit
    if (!productImages[productId]) {
        console.error("Aucune image trouvée pour le produit ID:", productId);
        return;
    }

    // Création du pop-up
    const popup = document.createElement('div');
    popup.classList.add('product-popup');
    popup.innerHTML = `
        <div class="popup-content">
            <button class="close-popup">✖</button>
            <div class="carousel">
                <div class="carousel-track">
                    ${productImages[productId].map(img => `<div class="carousel-slide"><img src="${img}" alt="Produit ${productId}"></div>`).join('')}
                </div>
                <div class="carousel-nav">
                    <button class="carousel-btn prev-btn">◀</button>
                    <button class="carousel-btn next-btn">▶</button>
                </div>
                <div class="carousel-indicators"></div>
            </div>
        </div>
    `;

    document.body.appendChild(popup);

    // Sélection des éléments du carrousel
    const track = popup.querySelector('.carousel-track');
    const slides = track.querySelectorAll('.carousel-slide');
    const prevBtn = popup.querySelector('.prev-btn');
    const nextBtn = popup.querySelector('.next-btn');
    const indicatorsContainer = popup.querySelector('.carousel-indicators');
    const closeBtn = popup.querySelector('.close-popup');

    let currentSlide = 0;
    const totalSlides = slides.length;

    // Création des indicateurs (petites bulles)
    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.dataset.index = index;
        indicatorsContainer.appendChild(indicator);
    });

    const indicators = popup.querySelectorAll('.indicator');

    // Fonction pour mettre à jour le carrousel
    function updateCarousel() {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;

        // Mise à jour des indicateurs
        indicators.forEach(ind => ind.classList.remove('active'));
        indicators[currentSlide].classList.add('active');
    }

    // Fonction pour aller au slide suivant
    function goToNextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }

    // Fonction pour aller au slide précédent
    function goToPrevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    // Ajout des événements aux boutons
    prevBtn.addEventListener('click', goToPrevSlide);
    nextBtn.addEventListener('click', goToNextSlide);

    // Ajout des événements aux indicateurs
    indicators.forEach(indicator => {
        indicator.addEventListener('click', (event) => {
            currentSlide = parseInt(event.target.dataset.index);
            updateCarousel();
        });
    });

    // Gestion de la fermeture du pop-up
    closeBtn.addEventListener('click', () => popup.remove());

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
