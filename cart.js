// Sélection des éléments du DOM pour le panier
const cartCountElement = document.getElementById('cart-count');

// Fonction pour charger le panier depuis localStorage
function loadCartCount() {
    try {
        // Récupérer les données du panier depuis localStorage
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];

        // Calculer le nombre total d'articles
        const totalItems = savedCart.reduce((sum, item) => sum + item.quantity, 0);

        // Afficher le nombre d'articles dans l'élément du panier
        if (cartCountElement) {
            cartCountElement.textContent = totalItems;
        }
    } catch (error) {
        console.error('Erreur lors du chargement du panier depuis localStorage:', error);
    }
}

// Charger le nombre d'articles au chargement de la page
document.addEventListener('DOMContentLoaded', loadCartCount);

// Sélection des éléments du DOM pour le panier
const cartIcon = document.getElementById('cart-icon');
const cartCount = document.getElementById('cart-count');

// Charger le panier depuis localStorage ou initialiser un panier vide
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Fonction pour mettre à jour le compteur du panier
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}

// Fonction pour afficher le résumé du panier (dans un pop-up)
function displayCartSummary() {
    const cartSummary = document.createElement('div');
    cartSummary.id = 'cart-summary';
    cartSummary.innerHTML = `
        <div class="cart-overlay">
            <div class="cart-content">
                <h2>Votre Panier</h2>
                <ul>
                    ${cart.map(item => `
                        <li>${item.name} - ${item.price.toFixed(2)}€ (Quantité: ${item.quantity})</li>
                    `).join('')}
                </ul>
                <p>Total : ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}€</p>
                <div class="popup-buttons">
                    <button id="close-cart">Continuer mon achat</button>
                    <button id="validate-cart">Valider mon panier</button>
                    <button id="clear-cart">Vider mon panier</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(cartSummary);

    // Écouteurs pour les boutons du pop-up
    document.getElementById('close-cart').addEventListener('click', () => {
        cartSummary.remove();
    });

    document.getElementById('validate-cart').addEventListener('click', () => {
        window.location.href = 'checkout.html';
    });

    document.getElementById('clear-cart').addEventListener('click', () => {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        cartSummary.remove();
        alert('Votre panier a été vidé.');
    });
}

// Ouvrir le pop-up du panier
if (cartIcon) {
    cartIcon.addEventListener('click', () => {
        if (cart.length > 0) {
            displayCartSummary();
        } else {
            alert('Votre panier est vide.');
        }
    });
}

// Charger le compteur du panier au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    try {
        cart = JSON.parse(localStorage.getItem('cart')) || [];
        updateCartCount();
    } catch (error) {
        console.error('Erreur lors du chargement du panier depuis localStorage:', error);
    }
});

