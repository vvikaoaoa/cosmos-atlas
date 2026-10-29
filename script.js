// Практическая работа № 3. Простая корзина и фильтр.

// В массиве хранятся выбранные товары и их цены.
let cart = [];

const buttons = document.querySelectorAll(".add-button");
const products = document.querySelectorAll(".product");
const filter = document.querySelector("#category-filter");
const cartList = document.querySelector("#cart-list");
const totalElement = document.querySelector("#total");
const clearButton = document.querySelector("#clear-button");
const payButton = document.querySelector("#pay-button");

// Подсчёт общей стоимости товаров.
const calculateTotal = () => {
    let total = 0;
    cart.forEach((item) => {
        total += item.price;
    });
    return total;
};

// Обновление списка товаров и итоговой суммы.
const renderCart = () => {
    cartList.innerHTML = "";

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = item.name + " — " + item.price + " руб. ";

        const removeButton = document.createElement("button");
        removeButton.textContent = "Удалить";
        removeButton.addEventListener("click", () => {
            cart.splice(index, 1);
            renderCart();
        });

        li.appendChild(removeButton);
        cartList.appendChild(li);
    });

    totalElement.textContent = "Итого: " + calculateTotal() + " руб.";
};

// Добавление товара в корзину.
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const product = {
            name: button.dataset.name,
            price: Number(button.dataset.price)
        };
        cart.push(product);
        renderCart();
    });
});

// Фильтр каталога по типу планеты.
filter.addEventListener("change", () => {
    products.forEach((product) => {
        if (filter.value === "all" || product.dataset.category === filter.value) {
            product.style.display = "inline-block";
        } else {
            product.style.display = "none";
        }
    });
});

// Очистка всей корзины.
clearButton.addEventListener("click", () => {
    cart = [];
    renderCart();
});

// Демонстрационная оплата.
payButton.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Корзина пуста");
    } else {
        alert("Покупка прошла успешно!");
        cart = [];
        renderCart();
    }
});

renderCart();
