document.addEventListener('DOMContentLoaded', () => {
    // ===== MENU BURGER =====
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const closeMenu = document.getElementById('close-menu');

    if (menuToggle && sidebar && overlay && closeMenu) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.add('active');
            overlay.classList.add('active');
        });

        closeMenu.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });

        overlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    function toggleSubMenu(event) {
        event.preventDefault();
        const parent = event.target.closest('.has-submenu');
        parent.classList.toggle('open');
      }
      

 // ===== CAROUSEL avec swipe =====
document.querySelectorAll('.carousel').forEach(carousel => {
    const images = Array.from(carousel.querySelectorAll('img'));
    const textBox = carousel.querySelector('.carousel-text');
    let currentIndex = 0;

    const showImage = index => {
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
        if (textBox) {
            textBox.textContent = images[index].dataset.text || '';
        }
    };

    showImage(currentIndex);

    carousel.querySelector('.prev-btn').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    });

    carousel.querySelector('.next-btn').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    });

    // Swipe tactile (mobile)
    let startX = 0;

    carousel.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
    });

    carousel.addEventListener('touchend', e => {
        const endX = e.changedTouches[0].clientX;
        const diffX = endX - startX;

        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
            } else {
                currentIndex = (currentIndex + 1) % images.length;
            }
            showImage(currentIndex);
        }
    });
});


        // Initialisation
        images.forEach((img, index) => {
            img.style.display = index === 0 ? 'block' : 'none';
        });
        if (textBox) {
            textBox.textContent = images[0].dataset.text || '';
        }

        carousel.querySelector('.prev-btn').addEventListener('click', () => {
            images[currentIndex].style.display = 'none';
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            images[currentIndex].style.display = 'block';
            if (textBox) textBox.textContent = images[currentIndex].dataset.text || '';
        });

        carousel.querySelector('.next-btn').addEventListener('click', () => {
            images[currentIndex].style.display = 'none';
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].style.display = 'block';
            if (textBox) textBox.textContent = images[currentIndex].dataset.text || '';
        });
    });

    // ===== POPUPS PRODUITS =====
    document.querySelectorAll('.detail-btn').forEach(button => {
        button.addEventListener('click', () => {
            const product = button.closest('.product');
            const productId = product.dataset.id;

            const popupId = `popup-kit-${productId === "1" ? "auto" : productId === "2" ? "manuel" : "elec"}`;
            const popup = document.getElementById(popupId);

            if (popup) {
                popup.style.display = 'block';
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        });
    });

    // ===== FERMETURE DES POPUPS =====
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.popup').style.display = 'none';
        });
    });

