// Практическая работа № 4. Корзина, фильтр и LocalStorage.

// Массив корзины. При открытии каталога читаем сохранённые данные.
let cart = [];
const savedCart = localStorage.getItem("cart");
if (savedCart) {
    try {
        const data = JSON.parse(savedCart);
        if (Array.isArray(data)) {
            cart = data;
        }
    } catch (error) {
        cart = [];
    }
}

// Сохраняем корзину в браузере в виде строки JSON.
const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

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
            saveCart();
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
        saveCart();
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
    saveCart();
    renderCart();
});

// Демонстрационная оплата.
payButton.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Корзина пуста");
    } else {
        alert("Покупка прошла успешно!");
        cart = [];
        saveCart();
        renderCart();
    }
});

renderCart();
