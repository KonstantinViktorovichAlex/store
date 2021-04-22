console.log('gaga')

const products = [
    {
        id: 0,
        name: 'Ньюбики',
        price: 2500,
        description: 'Чёткие кроссы, долго служат, дизайн чёткий.',
        image: './img/card-1.jpg'
    },
    {
        id: 1,
        name: 'Асиксы',
        price: 3500,
        description: 'Чёткие кроссы, учитель физкультуры одобряет.',
        image: './img/card-2.jpg'
    },
    {
        id: 2,
        name: 'Кактус джек',
        price: 7500,
        description: 'Изобретение тревис скотта. Кроссы чёткие.',
        image: './img/card-3.png'
    },
    {
        id: 3,
        name: 'Найки',
        price: 1500,
        description: 'Кислотный цвет. Дизайн не очень, но для бега топчик.',
        image: './img/card-4.jpg'
    },
    {
        id: 4,
        name: 'Фила',
        price: 2500,
        description: 'Старый бренд, уже не в моде.',
        image: './img/card-5.png'
    },
    {
        id: 5,
        name: 'Адидас',
        price: 2400,
        description: 'Чёткие кроссы, дизайн не очень, но чёткие.',
        image: './img/card-6.jpg'
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
        image: './img/card-8.jpg'
    },
]
const productsInBasket = []
const general_price = []

const productsWrapper = document.querySelector('.products-wrapper')

const basketCount = document.querySelector('.basket-count')
const modal_basket = document.querySelector('.modal-basket')
const btn_open_modal = document.querySelector('.modal-open')
const btn_close_modal = document.querySelector('.btn-close')
const buy_products = document.querySelector('.buy-products')
const user_products = document.querySelector('.user-products')
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
    modal_basket.style.display = "block"
} // Функция призыва модалки.

function closeModal() {
    modal_basket.style.display = "none"

} // Функция отзыва модалки.

const createProducts = () => {
    products.forEach((product, idx) => {
        const cardProduct = document.createElement('div')
        cardProduct.classList.add('col')
        cardProduct.innerHTML = `
                <div class="card card-wrapper" id="${idx}" style="width: 18rem;">
                    <img src="${product.image}" class="card-img-top custom-image" alt="...">
                    <div class="card-body">
                        <h5 class="card-title text-danger">${product.name}</h5>
                        <p class="card-text"><strong>${product.description}</strong></p>
                        <p class="card-text"><strong>Стоимость: ${product.price}</strong></p>
                    </div>
                    <div class="button-wrapper">
                        <button type="button" class="btn btn-outline-primary ml-2">В корзину!</button>
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

                console.log(productsInBasket)
            }
        })
    })
}

const sum_price = () => {
    let total_cost = 0
    productsInBasket.forEach((product) => {
        total_cost += product.price
    })
    console.log(total_cost)
    total_price.innerHTML = total_cost
}

const showBasketProducts = () => {
    let storageProductInBasket = JSON.parse(localStorage.getItem('productsInBasket'))
    if (storageProductInBasket.length) {
        storageProductInBasket.forEach((product, idx) => {
                // const general_price_into_basket = general_price.map(i =>x +=i, x ).reverse()
                // console.log(general_price_into_basket)

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
init()
createProducts()
addBasket()