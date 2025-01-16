document.addEventListener('DOMContentLoaded', () => {
    const cartItemsElement = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    // Récupérer les données du panier depuis localStorage
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];

    // Vérifier si le panier est vide
    if (savedCart.length === 0) {
        cartItemsElement.innerHTML = '<p>Votre panier est vide.</p>';
        totalPriceElement.textContent = 'Total : 0 €';
        return;
    }

    // Afficher les articles dans la section "Résumé de votre panier"
    let total = 0;
    savedCart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - ${item.price.toFixed(2).replace('.', ',')} € (Quantité : ${item.quantity})`;
        cartItemsElement.appendChild(listItem);
        total += item.price * item.quantity;
    });

    // Afficher le total
    totalPriceElement.textContent = `Total : ${total.toFixed(2).replace('.', ',')} €`;
});

document.addEventListener('DOMContentLoaded', () => {
    const confirmButton = document.getElementById('confirm-order');
    const form = document.getElementById('checkout-form');

    // Ajouter un écouteur d'événement au bouton "Confirmer la commande"
    confirmButton.addEventListener('click', (e) => {
        // Empêcher le comportement par défaut (soumission du formulaire)
        e.preventDefault();

        // Vérifier si le formulaire est valide
        if (form.checkValidity()) {
            // Si le formulaire est valide, rediriger vers la page de paiement
            window.location.href = 'payment.html';
        } else {
            // Si le formulaire n'est pas valide, afficher les messages d'erreur HTML5 intégrés
            form.reportValidity();
        }
    });
});

