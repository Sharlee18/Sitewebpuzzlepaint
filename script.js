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

    function openPanel(htmlContent) {
        document.getElementById('info-content').innerHTML = htmlContent;
        document.getElementById('info-panel').classList.add('active');
      }
      
      function closePanel() {
        document.getElementById('info-panel').classList.remove('active');
      }     

      function showAtelier1Details() {
        openPanel(`
          <img src='famille3.png' alt='Atelier' style='width:100%; border-radius:10px; margin-bottom:10px;'>
                <p>
            <span style="color:green;"><b>1-Contrôle la vitesse du moteur </span></b>et observe bouger ses composants(Pistons, bielles...)<br><br>
            <span style="color:green;"><b>2-Contrôle le passage des rapports de vitesses </span></b>et observe les changements d'engrenages <br> <br>
            <span style="color:green;"><b>3-Contrôle les obstacles </span></b> à l'avant de la voiture à l'aide du capteur à ultrason <br> <br>
            <span style="color:green;"><b>4-Déclenche des alertes automatiques</span></b> (Ex: Bip progressif du buzzer quand un obstacle s'approche ) <br><br> 
            <span style="color:green;"><b>5-Gère l'affichage d'information</span></b> sur l'écran (vitesse en Km/h, rapport de vitesse, distance obstacles...) <br> <br>
          </p>
        `);
      }
      

      function showAtelier2Details() {
        openPanel(`
          <img src='formuleAtelier2.png' alt='Atelier' style='width:100%; border-radius:10px; margin-bottom:10px;'>
          <p><span style="color:green;"><b>Un parcours complet, ludique et éducatif pour créer sa voiture intelligente !</b><br></span><br>
          L'atelier Puzzle-Paint se déroule en  <span style="color:green;"><b>5 grandes étapes progressives</b></span>, pensées pour stimuler à la fois la créativité, la logique, la coordination manuelle et la curiosité technologique :<br><br>
          
          <span style="color:green;"><b><u>1. Conception 3D (CAO)</u></b></span><br>
          Les participants conçoivent leurs propres pièces personnalisées à l'aide d'un logiciel simple et intuitif (Tinkercad).<br><br>
          
          <span style="color:green;"><b><u>2. Impression 3D</u></b></span><br>
          Ils découvrent une imprimante 3D en fonctionnement et impriment leurs modèles, pièce par pièce.<br><br>
           
          <span style="color:green;"><b><u>3. Montage et personnalisation de la maquette MECA</u></b></span><br>
          Ils assemblent leur voiture mécanique à partir des pièces imprimées, testent les mouvements, puis la décorent à leur goût.<br><br>
          
           <span style="color:green;"><b><u>4. Intégration du boîtier électronique (ELEC)</u></b></span><br>
          Ils ajoutent les composants électroniques (capteurs, microcontrôleur, écran OLED...) pour rendre leur maquette interactive.<br><br>
          
           <span style="color:green;"><b><u>5. Programmation (Arduino)</u></b></span><br>
          Enfin, ils programment leur voiture avec des consignes simples, guidés par l'IA ou l'animateur, et testent les réactions en direct.<br><br>
          <b>
          <p><span style="color:green;"> Une aventure technologique et artistique accessible à tous, de la modélisation à l'objet connecté.<br>
          Chaque étape est accompagnée, personnalisée et adaptée au niveau des participants.</span></b>
          </p>
        `);
      }

      
      function showAtelier3Details() {
        openPanel(`
          <img src='all mecanisme2.png' alt='Atelier' style='width:100%; border-radius:10px; margin-bottom:10px;'>
                <p>
            <span style="color:green;"><b>1-Manipuler plus de 50 pièces en mouvement issues de vrai mécanismes</span></b> présents dans nos voitures (moteur, boîte de vitesses, volant, essuie-glaces...)<br><br>
            <span style="color:green;"><b>2-Apprenez l’électronique de base</span></b> en connectant des capteurs, servomoteurs, écrans, etc.<br> <br>
            <span style="color:green;"><b>3-Initiez-vous à la programmation C++ (Arduino) </span></b>  de manière simple et ludique. <br> <br>
            <span style="color:green;"><b>4-Contrôlez votre voiture intelligente</span></b> par joystick ou smartphone.<br><br> 
          </p>
        `);
      }

      // ===== CAROUSEL =====
document.querySelectorAll('.carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const prevBtn = carousel.querySelector('.prev-btn');
    const nextBtn = carousel.querySelector('.next-btn');

    let currentIndex = 0;

    function updateSlidePosition() {
        const slideWidth = slides[0].offsetWidth;
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    nextBtn.addEventListener('click', () => {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
            updateSlidePosition();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlidePosition();
        }
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
            if (diffX > 0 && currentIndex > 0) {
                currentIndex--;
            } else if (diffX < 0 && currentIndex < slides.length - 1) {
                currentIndex++;
            }
            updateSlidePosition();
        }
    });

    window.addEventListener('resize', updateSlidePosition);
    updateSlidePosition();
});
