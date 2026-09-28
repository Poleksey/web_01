const products = [
    { id: 1, name: "Стиральный порошок 5кг", price: 450, image: "images/порошок1.png" },
    { id: 2, name: "Стиральный порошок 1 кг", price: 100, image: "images/порошок2.png" },
    { id: 3, name: "Кондиционер", price: 150, image: "images/гель1.png" },
    { id: 4, name: "Отбеливатель", price: 49.99, image: "images/отбеливатель1.png" }
];


// сетка товаров
function renderCatalog() {
    const catalog = document.getElementById('catalog_container');
    if (!catalog) return;
    
    catalog.innerHTML = products.map(p => `
        <div class="product_card">
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p class="product_price">${p.price} руб.</p>
            <button class="add_to_cart_button" onclick="addToCart(${p.id})">Добавить в корзину</button>
        </div>
    `).join('');
}

// корзина
let cart = [];
const savedCart = localStorage.getItem('cart');
if (savedCart !== null) {
    cart = JSON.parse(savedCart);
}


function renderCart() {
    const container = document.getElementById('cart_items_container');
    const button = document.getElementById('cart_button');
    const total = document.getElementById('cart_total');

    if (!container || !button || !total) return;

    if (cart.length === 0) {
        container.innerHTML = '<p>Корзина пуста</p>';
        button.textContent = 'Корзина (0)';
        total.textContent = '0';
        return;
    }

    let totalCount = 0;
    let totalPrice = 0;
    let itemsHtml = '';

    for (const item of cart) {
        totalCount += item.quantity;
        totalPrice += item.price * item.quantity;
        itemsHtml += `
            <div class="cart_item">
                <span>${item.name}</span> — 
                <button onclick="removeFromCart(${item.id})">-</button>
                <span>${item.quantity} шт.</span>
                <button onclick="addToCart(${item.id})">+</button> — 
                <strong>${(item.price * item.quantity).toFixed(2)} руб.</strong>
            </div>
        `;
    }
    container.innerHTML = itemsHtml;
    button.textContent = `Корзина (${totalCount})`;
    total.textContent = totalPrice.toFixed(2);
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function removeFromCart(id) {
    const index = cart.findIndex(item => item.id === id);
    if (index !== -1) {
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
}


const cartButton = document.getElementById('cart_button');
const cartSection = document.getElementById('cart_section');

if (cartButton && cartSection) {
    cartButton.addEventListener('click', () => {
        cartSection.classList.toggle('hidden');
    });
}

// Обработка формы заказа
const orderForm = document.getElementById('order_form');

if (orderForm) {
    orderForm.addEventListener('submit', function(event) {
        event.preventDefault();

        if (cart.length === 0) {
            alert('ВАША КОРЗИНА ПУСТА.');
            return;
        }

        alert('Заказ создан!');

        cart = [];
        localStorage.removeItem('cart');
        orderForm.reset();
        renderCart();
    });
}

renderCatalog();
renderCart();