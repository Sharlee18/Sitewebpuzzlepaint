// Charger le panier depuis localStorage ou initialiser un panier vide
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Sélection des éléments du DOM pour le panier
const cartCount = document.getElementById('cart-count');

// Fonction pour mettre à jour le compteur du panier
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
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

// Ouvrir le pop-up du panier (cette fonction peut être réutilisée sur toutes les pages)
function displayCartSummary() {
    const cartSummary = document.createElement('div');
    cartSummary.id = 'cart-summary';
    cartSummary.innerHTML = `
        <div class="cart-overlay">
            <div class="cart-content">
                <button class="close-cart" id="close-cart">✖</button>
                <h2>Votre Panier</h2>
                <ul>
                    ${cart.map(item => `
                        <li>${item.name} - ${item.price.toFixed(2)}€ (Quantité: ${item.quantity})</li>
                    `).join('')}
                </ul>
                <p>Total : ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}€</p>
                <div class="popup-buttons">
                    <button id="clear-cart">Vider mon panier</button>
                    <button id="validate-cart">Valider mon panier</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(cartSummary);

    // Écouteur pour fermer le pop-up via la croix
    document.getElementById('close-cart').addEventListener('click', () => {
        const popup = document.getElementById('cart-summary');
        if (popup) popup.remove();
    });

    // Écouteur pour "Valider mon panier" (rediriger vers la page checkout.html)
    document.getElementById('validate-cart').addEventListener('click', () => {
        window.location.href = 'checkout.html';
    });

    // Écouteur pour "Vider mon panier"
    document.getElementById('clear-cart').addEventListener('click', () => {
        // Vider le panier dans localStorage
        localStorage.removeItem('cart');

        // Réinitialiser le tableau `cart`
        cart = [];

        // Mettre à jour le compteur du panier
        updateCartCount();

        // Afficher un message confirmant que le panier a été vidé
        alert("Votre panier a été vidé.");

        // Fermer le pop-up
        const popup = document.getElementById('cart-summary');
        if (popup) popup.remove();
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
