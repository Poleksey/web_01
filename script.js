const products = [
    { id: 1, name: "Стиральный порошок 5кг", price: 450, image: "images/порошок1.jpg" },
    { id: 2, name: "Стиральный порошок 1 кг", price: 100, image: "images/порошок2.jpg" },
    { id: 3, name: "Кондиционер", price: 150, image: "images/гель1.jpg" },
    { id: 4, name: "Отбеливатель", price: 49.99, image: "images/отбеливатель1.jpg" }
];

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

function addToCart(id) {
    console.log('ЗАГЛУШКА \ нажание на добавление товара в коризну', id);
}

renderCatalog();


const cartButton = document.getElementById('cart_button');
const cartSection = document.getElementById('cart_section');

if (cartButton && cartSection) {
    cartButton.addEventListener('click', () => {
        cartSection.classList.toggle('hidden');
    });
}