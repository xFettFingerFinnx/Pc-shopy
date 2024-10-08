let cartCount = 0;
let cart = [];
let totalPrice = 0;

function addToCart(product) {
    const { name, price, image } = product;

    cart.push({ name, price, image });
    cartCount++;
    totalPrice += price;

    localStorage.setItem('cart', JSON.stringify(cart)); 
    document.getElementById('cart-count').innerText = cartCount;
    updateCartTable();

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerText = 'Produkt zum Warenkorb hinzugefügt!';
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 2000);
}

function toggleCart() {
    const cartDetails = document.getElementById('cart-details');
    if (cartDetails.style.display === 'none') {
        cartDetails.style.display = 'block';
    } else {
        cartDetails.style.display = 'none';
    }
}

function updateCartTable() {
    const cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = '';

    if (cart.length === 0) {
        cartItemsElement.innerHTML = '<tr><td colspan="3">Ihr Warenkorb ist leer.</td></tr>';
    } else {
        cart.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;">
                    ${item.name}
                </td>
                <td>${formatPrice(item.price)}</td>
                <td><button class="button" onclick="removeFromCart(${index})">Entfernen</button></td>
            `;
            cartItemsElement.appendChild(row);
        });
    }

    document.getElementById('total-price').innerText = `Gesamt: ${formatPrice(totalPrice)}`;
}

function removeFromCart(index) {
    totalPrice -= cart[index].price;
    cart.splice(index, 1);
    cartCount--;
    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById('cart-count').innerText = cartCount;
    updateCartTable();
}

function clearCart() {
    if (confirm("Möchten Sie den Warenkorb wirklich leeren?")) {
        cart = [];
        cartCount = 0;
        totalPrice = 0;
        localStorage.removeItem('cart');
        document.getElementById('cart-count').innerText = cartCount;
        document.getElementById('cart-items').innerHTML = '';
        document.getElementById('total-price').innerText = 'Gesamt: 0 €';
    }
}

function formatPrice(price) {
    return price.toFixed(2).replace('.', ',') + ' €';
}

function showPCs() {
    document.getElementById("pc-section").style.display = "block"; // PCs anzeigen
    document.getElementById("hardware-section").style.display = "none"; // Hardware ausblenden
}

function showHardware() {
    document.getElementById("pc-section").style.display = "none"; // PCs ausblenden
    document.getElementById("hardware-section").style.display = "block"; // Hardware anzeigen
}