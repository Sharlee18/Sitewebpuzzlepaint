// Sélection des éléments du DOM
const cartIcon = document.getElementById('cart-icon');
const cartCount = document.getElementById('cart-count');

// Charger le panier depuis localStorage ou initialiser un panier vide
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// ✅ Fonction pour mettre à jour le compteur du panier
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}

// ✅ Fonction pour afficher le résumé du panier (dans un pop-up)
function displayCartSummary() {
    // Vérifier si le pop-up existe déjà pour éviter les doublons
    if (document.getElementById('cart-summary')) return;

    const cartSummary = document.createElement('div');
    cartSummary.id = 'cart-summary';
    cartSummary.innerHTML = `
        <div class="cart-overlay">
            <div class="cart-content">
                <button class="close-cart" id="close-cart">✖</button> <!-- Croix pour fermer -->
                <h2>Votre Panier</h2>
                <ul class="cart-items-list">
                    ${cart.map(item => `
                        <li class="cart-item">
                            <img src="${item.image}" alt="${item.name}" class="cart-item-img" 
                                 onerror="this.onerror=null;this.src='images/default.png';">
                            <div class="cart-item-details">
                                <span>${item.name}</span>
                                <span>${item.price.toFixed(2)} €</span>
                                <span>(Quantité: ${item.quantity})</span>
                                <button class="decrease" data-id="${item.id}">➖</button>
                                <button class="increase" data-id="${item.id}">➕</button>
                            </div>
                        </li>
                    `).join('')}
                </ul>
                <p class="cart-total">Total : ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)} €</p>
                <div class="popup-buttons">
                    <button id="clear-cart">Vider mon panier</button>
                    <button id="validate-cart">Valider mon panier</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(cartSummary);

    // Fermeture du pop-up
    document.getElementById('close-cart').addEventListener('click', () => {
        document.getElementById('cart-summary')?.remove();
    });

    // Validation du panier
    document.getElementById('validate-cart').addEventListener('click', () => {
        window.location.href = 'checkout.html';
    });

    // Suppression du panier
    document.getElementById('clear-cart').addEventListener('click', () => {
        localStorage.removeItem('cart');
        cart = [];
        updateCartCount();
        document.getElementById('cart-summary')?.remove();
    });

    // Mise à jour des quantités
    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', () => updateQuantity(button.dataset.id, 1));
    });

    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', () => updateQuantity(button.dataset.id, -1));
    });
}

// ✅ Fonction pour ajouter un produit au panier
function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1,
            image: product.image || "images/default.png"
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`Produit "${product.name}" ajouté au panier.`);
}

// ✅ Fonction pour modifier la quantité des produits
function updateQuantity(productId, change) {
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity += change;
        if (product.quantity <= 0) {
            cart = cart.filter(item => item.id !== productId);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartSummary();
        updateCartCount();
    }
}

// ✅ Ajout des événements sur les boutons "Ajouter au panier"
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', () => {
        const productElement = button.closest('.product-card');
        const product = {
            id: productElement.getAttribute('data-id'),
            name: productElement.getAttribute('data-name'),
            price: parseFloat(productElement.getAttribute('data-price')),
            image: productElement.getAttribute('data-image') || "images/default.png"
        };
        addToCart(product);
    });
});

// ✅ Ouvrir le pop-up du panier
if (cartIcon) {
    cartIcon.addEventListener('click', () => {
        if (cart.length > 0) {
            displayCartSummary();
        } else {
            alert('Votre panier est vide.');
        }
    });
}

// ✅ Charger le compteur du panier au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();
});
