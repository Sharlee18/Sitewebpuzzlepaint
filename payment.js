document.addEventListener('DOMContentLoaded', () => {
    const totalPaymentElement = document.getElementById('total-payment'); // Assurez-vous que cet élément existe

    // Récupérer le total depuis localStorage
    let total = localStorage.getItem('totalPayment');

    if (total) {
        totalPaymentElement.textContent = `Total à payer : ${total}€`;
    } else {
        totalPaymentElement.textContent = "Total à payer : 0€"; // Valeur par défaut si le total est introuvable
    }
});
