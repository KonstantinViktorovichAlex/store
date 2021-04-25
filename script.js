setTimeout(function(){
    document.body.classList.add('body_visible');
}, 50);

const products = [
    {
        id: 0,
        name: 'Ньюбики',
        price: 2500,
        description: 'Чёткие кроссы, долго служат, дизайн чёткий',
        image: './img/card-1.jpg',
    },
    {
        id: 1,
        name: 'Асиксы',
        price: 3500,
        description: 'Чёткие кроссы, учитель физкультуры одобряет',
        image: './img/card-2.jpg',
    },
    {
        id: 2,
        name: 'Кактус джек',
        price: 7500,
        description: 'Изобретение тревис скотта, кроссы чёткие',
        image: './img/card-3.jpg',
    },
    {
        id: 3,
        name: 'Найки',
        price: 1500,
        description: 'Кислотный цвет, дизайн не очень, но для бега топчик',
        image: './img/card-4.jpg',
    },
    {
        id: 4,
        name: 'Фила',
        price: 2500,
        description: 'Старый бренд, уже не в моде',
        image: './img/card-5.jpg',
    },
    {
        id: 5,
        name: 'Адидас',
        price: 2400,
        description: 'Чёткие кроссы, дизайн не очень, но чёткие',
        image: './img/card-6.jpg',
    },
    {
        id: 6,
        name: 'Асиксы',
        price: 2100,
        description: 'Отличный вариант для бега и спорта.',
        image: './img/card-7.jpg'
    },
    {
        id: 7,
        name: 'Асиксы',
        price: 9999,
        description: 'Кислотный цвет. Дизайн топчик, для бега топчик.',
        image: './img/card-8.jpg',
    },
]
const productsInBasket = []

const productsWrapper = document.querySelector('.products-wrapper')

const basketCount = document.querySelector('.basket-count')
const modal_basket = document.querySelector('.modal-basket-not-bootstrap')
const btn_open_modal = document.querySelector('.modal-open')
const btn_close_modal = document.querySelector('.btn-close__not-bootstrap')
const user_products = document.querySelector('.user-products__not-bootstrap')
const total_price = document.querySelector('.modal-price')

const init = () => {
    let storageProductInBasket = JSON.parse(localStorage.getItem('productsInBasket'))
    if(storageProductInBasket !== null && storageProductInBasket.length > 0) {
        basketCount.innerHTML = storageProductInBasket.length
        storageProductInBasket.forEach((item) => {
            productsInBasket.push(item)
        })
    }
}

btn_open_modal.addEventListener('click', (event) => {
    if (event.target.innerText === "Корзина") {
        openModal()
        showBasketProducts()
    }
}) // Открываем модалку.

btn_close_modal.addEventListener('click', (event) => {
    closeModal()
    user_products.innerHTML = ''
}) // Закрываем модалку.

function openModal() {
    modal_basket.style.display = "flex"
} // Функция призыва модалки.

function closeModal() {
    modal_basket.style.display = "none"

} // Функция отзыва модалки.
const createProducts = () => {
    products.forEach((product, idx) => {
        const cardProduct = document.createElement('div')
        cardProduct.innerHTML = `
                <div class="card-wrapper" id="${idx}">
                    <div class="card-wrapper__image">
                        <img src="${product.image}" class="custom-image" alt="...">
                    </div>
                    <div class="card-wrapper__body">
                        <h5 class="card-body__title"><strong>${product.name}</strong></h5>
                        <p class="card-body__description"><strong>${product.description}</strong></p>
                        <p class="card-body__price"><strong>Стоимость: ${product.price}</strong></p>
                    </div>
                    <div class="button-wrapper">
                        <button type="button" class="btn btn-outline-primary buy-button ml-2">В корзину!</button>
                    </div>
                </div>
            `
        productsWrapper.appendChild(cardProduct)
    })
}

const addBasket = () => {
    const cardsWrapper = document.querySelectorAll('.card-wrapper')
    cardsWrapper.forEach((item) => {
        item.addEventListener('click', (event) => {
            if (event.target.innerText === 'В корзину!') {

                const id = Number(this.event.path[2].getAttribute('id'))

                const productToBasket = products.find(product => product.id === id)

                productsInBasket.push(productToBasket)

                localStorage.setItem('productsInBasket', JSON.stringify(productsInBasket))

                let storageProductInBasket = JSON.parse(localStorage.getItem('productsInBasket'))

                sum_price()

                basketCount.innerHTML = `${storageProductInBasket.length}`


                alert('Товар добавлен в корзину!')

            }
        })
    })
}

const sum_price = () => {
    let total_cost = 0
    productsInBasket.forEach((product) => {
        total_cost += product.price
    })
    total_price.innerHTML = total_cost
}

const showBasketProducts = () => {
    let storageProductInBasket = JSON.parse(localStorage.getItem('productsInBasket'))
    if (storageProductInBasket.length) {
        storageProductInBasket.forEach((product, idx) => {

            const cardProductBasket = document.createElement('div')
            cardProductBasket.setAttribute('id', idx)
            cardProductBasket.classList.add('cardProductBasket')
            cardProductBasket.innerHTML = `
                <h5>
                    ${product.name}
                </h5>
                <img src="${product.image}" class="basket-image" alt="">
                <p>
                    ${product.description}
                </p>
                <button class="btn btn-sm btn-danger deleteProduct">Удалить</button>
                <hr>
            `
            user_products.append(cardProductBasket)
        })
        deleteProduct()
    }
}

const deleteProduct = () => {
    let storageProductInBasket = JSON.parse(localStorage.getItem('productsInBasket'))
    const cardProductBasket = document.querySelectorAll('.cardProductBasket')
    cardProductBasket.forEach((item) => {
        item.addEventListener('click', (event) => {
            if(event.target.innerText === 'Удалить') {

                let idProduct = Number(item.getAttribute('id'))
                let findElem = productsInBasket.find((item) => item.id === idProduct)
                let findElemLocal = storageProductInBasket.find((item) => item.id === idProduct)

                productsInBasket.splice(findElem, 1)
                storageProductInBasket.splice(findElemLocal, 1)

                localStorage.setItem('productsInBasket', JSON.stringify(storageProductInBasket))

                sum_price()

                item.remove()
                basketCount.innerHTML = `${storageProductInBasket.length}`
            }
        })
    })
}
const closeBasketWrapper = () => {
    const wrapperModalBasket = document.querySelector('.modal-basket-not-bootstrap')
    wrapperModalBasket.addEventListener('click', (event) => {
        if(event.target.className === 'modal-basket-not-bootstrap') {
            closeModal()
        }
    })
}

init()
createProducts()
addBasket()
closeBasketWrapper()