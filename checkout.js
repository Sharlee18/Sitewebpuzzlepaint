document.addEventListener('DOMContentLoaded', () => {
    const cartItemsElement = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const payButton = document.getElementById('pay-button');
    const form = document.getElementById('checkout-form');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartDisplay() {
        cartItemsElement.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.classList.add("cart-item");
            listItem.innerHTML = `
                <img src="${item.image || 'boxkit.png'}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <span class="product-name">${item.name} - ${item.price.toFixed(2)} €</span>
                    <div class="quantity-controls">
                        <button class="minus-btn" data-index="${index}">-</button>
                        <span>${item.quantity}</span>
                        <button class="plus-btn" data-index="${index}">+</button>
                    </div>
                </div>
            `;
            cartItemsElement.appendChild(listItem);
            total += item.price * item.quantity;
        });

        totalPriceElement.textContent = `Total : ${total.toFixed(2)} €`;
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    cartItemsElement.addEventListener('click', (event) => {
        if (event.target.classList.contains('plus-btn')) {
            const index = event.target.getAttribute('data-index');
            cart[index].quantity += 1;
            updateCartDisplay();
        } else if (event.target.classList.contains('minus-btn')) {
            const index = event.target.getAttribute('data-index');
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                cart.splice(index, 1); // Supprime le produit si quantité = 0
            }
            updateCartDisplay();
        }
    });

    if (payButton) {
        payButton.addEventListener('click', (event) => {
            event.preventDefault();

            if (!form.checkValidity()) {
                alert("Veuillez remplir tous les champs.");
                return;
            }

            localStorage.setItem("totalPrice", totalPriceElement.textContent);
            window.location.href = "payment.html";
        });
    }

    updateCartDisplay();
});
