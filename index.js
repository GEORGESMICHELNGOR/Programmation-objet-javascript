// app.js

class Product {
    constructor(id, name, price, imageUrl) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
    }
}

class ShoppingCartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    getTotalPrice() {
        return this.product.price * this.quantity;
    }
}

class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(product, quantity) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            const newItem = new ShoppingCartItem(product, quantity);
            this.items.push(newItem);
        }
        this.renderCart();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.renderCart();
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }

    displayItems() {
        return this.items.map(item => {
            return `
                <tr class="fade-in">
                    <td class="border px-4 py-2">${item.product.name}</td>
                    <td class="border px-4 py-2">${item.quantity}</td>
                    <td class="border px-4 py-2">$${item.getTotalPrice().toFixed(2)}</td>
                    <td class="border px-4 py-2">
                        <button class="bg-red-500 text-white px-2 py-1" onclick="removeFromCart(${item.product.id})">Remove</button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    renderCart() {
        document.getElementById('cart-items').innerHTML = this.displayItems();
        document.getElementById('total-items').innerText = this.getTotalItems();
        document.getElementById('total-price').innerText = `$${this.getTotalPrice().toFixed(2)}`;
    }
}

const cart = new ShoppingCart();

const products = [
    new Product(1, 'Laptop', 999.99, 'https://www.microsoft.com/fr-fr/d/surface-laptop-5/8xn49v61s1bn?activetab=pivot:aper%C3%A7utab'),
    new Product(2, 'Mouse', 19.99, 'https://www.microsoft.com/fr-fr/d/surface-laptop-5/8xn49v61s1bn?activetab=pivot:aper%C3%A7utab'),
    new Product(3, 'Keyboard', 49.99, 'https://www.microsoft.com/fr-fr/d/surface-laptop-5/8xn49v61s1bn?activetab=pivot:aper%C3%A7utab')
];

function addToCart(product, quantity) {
    cart.addItem(product, quantity);
}

function removeFromCart(productId) {
    cart.removeItem(productId);
}

function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = products.map(product => {
        return `
            <div class="bg-white p-4 rounded-lg shadow-md fade-in">
                <img src="${product.imageUrl}" alt="${product.name}" class="w-full h-32 object-cover mb-2">
                <h2 class="text-lg font-bold mb-2">${product.name}</h2>
                <p class="text-gray-700 mb-2">$${product.price.toFixed(2)}</p>
                <button class="bg-blue-500 text-white px-4 py-2" onclick="addToCart(products[${product.id - 1}], 1)">Add to Cart</button>
            </div>
        `;
    }).join('');
}

window.onload = function() {
    displayProducts();
};
