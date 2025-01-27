(() => {
    console.log("cart.js chargé");

    // Sélection des éléments du DOM
    const cartIcon = document.getElementById('cart-icon');
    const cartCount = document.getElementById('cart-count');

    // Charger le panier depuis localStorage avec une clé unique
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    console.log("Cart chargé depuis localStorage :", cart);

    // Fonction pour mettre à jour le compteur du panier
    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCount) {
            cartCount.textContent = totalItems;
        }
    }

    // Fonction pour sauvegarder le panier dans localStorage
    function saveCartToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log("Cart mis à jour :", cart);
    }

    // Fonction pour afficher le résumé du panier dans un pop-up
    function displayCartSummary() {
        if (document.getElementById('cart-summary')) return;

        const cartSummary = document.createElement('div');
        cartSummary.id = 'cart-summary';
        cartSummary.innerHTML = `
            <div class="cart-overlay">
                <div class="cart-content">
                    <button class="close-cart" id="close-cart">✖</button>
                    <h2>Votre Panier</h2>
                    <ul class="cart-items-list"></ul>
                    <p class="cart-total"></p>
                    <div class="popup-buttons">
                        <button id="clear-cart">Vider mon panier</button>
                        <button id="validate-cart">Valider mon panier</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(cartSummary);
        updateCartPopup();

        document.getElementById('close-cart').addEventListener('click', () => {
            document.getElementById('cart-summary')?.remove();
        });

        document.getElementById('validate-cart').addEventListener('click', () => {
            window.location.href = 'checkout.html';
        });

        document.getElementById('clear-cart').addEventListener('click', () => {
            localStorage.removeItem('cart');
            cart = [];
            updateCartCount();
            document.getElementById('cart-summary')?.remove();
        });
    }

    // Mise à jour du pop-up sans le recréer
    function updateCartPopup() {
        const cartItemsList = document.querySelector('.cart-items-list');
        const totalPriceElement = document.querySelector('.cart-total');

        if (!cartItemsList || !totalPriceElement) return;

        cartItemsList.innerHTML = "";

        let total = 0;

        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.classList.add('cart-item');

            const imageUrl = item.image ? item.image : "images/default.png";

            listItem.innerHTML = `
                <img src="${imageUrl}" alt="${item.name}" class="cart-item-img"
                    onerror="this.src='images/default.png'; this.onerror=null;">
                <div class="cart-item-details">
                    <span class="cart-item-name">${item.name}</span>
                    <span class="cart-item-price">${item.price.toFixed(2)} €</span>
                    <div class="cart-item-quantity">
                        <button class="decrease-quantity" data-id="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="increase-quantity" data-id="${item.id}">+</button>
                    </div>
                </div>
            `;
            cartItemsList.appendChild(listItem);
            total += item.price * item.quantity;
        });

        totalPriceElement.textContent = `Total : ${total.toFixed(2)} €`;

        // Ajout des écouteurs d'événements sur les boutons + et -
        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.dataset.id;
                const product = cart.find(item => item.id === productId);
                if (product) {
                    product.quantity += 1;
                    saveCartToLocalStorage();
                    updateCartPopup();
                    updateCartCount();
                }
            });
        });

        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.dataset.id;
                const product = cart.find(item => item.id === productId);
                if (product && product.quantity > 1) {
                    product.quantity -= 1;
                } else {
                    cart = cart.filter(item => item.id !== productId);
                }
                saveCartToLocalStorage();
                updateCartPopup();
                updateCartCount();
            });
        });
    }

    // Ajout d'un produit au panier
    function addToCart(product) {
        const existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        saveCartToLocalStorage();
        updateCartCount();
        alert(`Produit "${product.name}" ajouté au panier.`);
    }

    // Correction de la récupération des images
    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', () => {
                const productElement = button.closest('.product');
                const productImage = productElement.querySelector('img')?.getAttribute('src') || "images/default.png";

                const product = {
                    id: productElement.getAttribute('data-id'),
                    name: productElement.getAttribute('data-name'),
                    price: parseFloat(productElement.getAttribute('data-price')),
                    image: productImage
                };

                addToCart(product);
            });
        });

        if (cartIcon) {
            cartIcon.addEventListener('click', () => {
                if (cart.length > 0) {
                    displayCartSummary();
                } else {
                    alert('Votre panier est vide.');
                }
            });
        }

        try {
            cart = JSON.parse(localStorage.getItem('cart')) || [];
            console.log("Panier chargé :", cart);
            updateCartCount();
        } catch (error) {
            console.error('Erreur lors du chargement du panier depuis localStorage:', error);
        }
    });

})();
