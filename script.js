function initializeCarousel(carousel) {
    const track = carousel.querySelector('.carousel-track'); // La bande contenant toutes les images
    const slides = Array.from(track.children); // Toutes les slides
    const prevButton = carousel.querySelector('.prev-btn'); // Bouton précédent
    const nextButton = carousel.querySelector('.next-btn'); // Bouton suivant
    const slideWidth = slides[0].getBoundingClientRect().width; // Largeur d'une slide

    // Positionner toutes les slides côte à côte
    slides.forEach((slide, index) => {
        slide.style.left = `${slideWidth * index}px`;
    });

    // Fonction pour bouger vers une slide spécifique
    const moveToSlide = (track, currentSlide, targetSlide) => {
        const targetLeft = parseFloat(targetSlide.style.left); // On récupère juste le nombre sans "px"
        track.style.transform = `translateX(-${targetLeft}px)`; // Déplacer la bande
        currentSlide.classList.remove('current-slide'); // Retire la classe active de l'ancienne slide
        targetSlide.classList.add('current-slide'); // Ajoute la classe active à la nouvelle slide
    };

    // Clic sur "Suivant"
    nextButton.addEventListener('click', () => {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling;
        if (nextSlide) {
            moveToSlide(track, currentSlide, nextSlide);
        }
    });

    // Clic sur "Précédent"
    prevButton.addEventListener('click', () => {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling;
        if (prevSlide) {
            moveToSlide(track, currentSlide, prevSlide);
        }
    });
}

// Initialiser tous les carrousels de la page
document.querySelectorAll('.carousel').forEach(carousel => {
    initializeCarousel(carousel);
});

const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const closeMenu = document.getElementById('close-menu');

// Ouvrir le menu
menuToggle.addEventListener('click', () => {
    sidebar.classList.add('active');
    overlay.classList.add('active');
});

// Fermer le menu
closeMenu.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
});

// Cliquer sur l'overlay ferme aussi
overlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
});
