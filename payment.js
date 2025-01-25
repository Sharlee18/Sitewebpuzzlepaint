document.addEventListener("DOMContentLoaded", function () {
    const totalPriceElement = document.getElementById("total-price");
    const savedTotal = localStorage.getItem("totalPrice") || "0";

    // Afficher le montant total du panier
    totalPriceElement.textContent = savedTotal;

    // Initialiser le bouton PayPal
    paypal.Buttons({
        createOrder: function (data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: savedTotal // Utilisation du montant enregistré
                    }
                }]
            });
        },
        onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
                alert("Paiement réussi ! Merci " + details.payer.name.given_name);
                localStorage.removeItem("cart"); // Vider le panier après paiement
                window.location.href = "confirmation.html"; // Redirection vers une page de confirmation
            });
        }
    }).render("#paypal-button-container");

    // Gestion du paiement par carte bancaire (simulation)
    document.getElementById("pay-card").addEventListener("click", function () {
        alert("Redirection vers le paiement par carte bancaire...");
        window.location.href = "https://www.paypal.com/webapps/hermes?token=VOTRE_TOKEN"; // Simulation de lien de paiement
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const totalPriceElement = document.getElementById('total-price');
    const payByCardButton = document.getElementById('pay-by-card');

    // Récupérer le montant total du panier depuis localStorage
    const totalAmount = localStorage.getItem("paymentAmount");

    // Vérifier si le montant est bien récupéré
    if (totalPriceElement && totalAmount) {
        totalPriceElement.textContent = `Total à payer : ${totalAmount} €`;
    } else {
        totalPriceElement.textContent = "Erreur : Montant non disponible.";
    }

    // Vérifier si le bouton de paiement est présent
    if (payByCardButton) {
        payByCardButton.addEventListener('click', () => {
            alert(`Redirection vers le paiement pour un montant de ${totalAmount} €`);
            
            // Simuler la redirection vers un système de paiement (ex : PayPal ou Stripe)
            window.location.href = "https://www.paypal.com/webapps/hermes?token=example";
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const totalPriceElement = document.getElementById('total-price');
    const payByCardButton = document.getElementById('pay-by-card');

    // Récupérer le montant total du panier depuis localStorage
    const totalAmount = localStorage.getItem("paymentAmount");

    // Vérifier si le montant est bien récupéré
    if (totalPriceElement && totalAmount) {
        totalPriceElement.textContent = `Total à payer : ${totalAmount} €`;
    } else {
        totalPriceElement.textContent = "Erreur : Montant non disponible.";
    }

    // Vérifier si le bouton de paiement est présent
    if (payByCardButton) {
        payByCardButton.addEventListener('click', () => {
            alert(`Redirection vers le paiement pour un montant de ${totalAmount} €`);
            
            // Simuler la redirection vers un système de paiement (ex : PayPal ou Stripe)
            window.location.href = "https://www.paypal.com/webapps/hermes?token=example";
        });
    }
});


