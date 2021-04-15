const products = [
    {
        id: 0,
        name: 'Ньюбики',
        description: 'Чёткие кроссы, долго служат, дизайн чёткий.',
        image: './img/card-1.jpg'
    },
    {
        id: 1,
        name: 'Асиксы',
        description: 'Чёткие кроссы, учитель физкультуры одобряет.',
        image: './img/card-2.jpg'
    },
    {
        id: 2,
        name: 'Кактус джек',
        description: 'Изобретение тревис скотта. Кроссы чёткие.',
        image: './img/card-3.png'
    },
    {
        id: 3,
        name: 'Найки',
        description: 'Кислотный цвет. Дизайн не очень, но для бега топчик.',
        image: './img/card-4.jpg'
    },
    {
        id: 4,
        name: 'Фила',
        description: 'Старый бренд, уже не в моде.',
        image: './img/card-5.png'
    },
    {
        id: 5,
        name: 'Адидас',
        description: 'Чёткие кроссы, дизайн не очень, но чёткие.',
        image: './img/card-6.jpg'
    },
    {
        id: 6,
        name: 'Асиксы',
        description: 'Отличный вариант для бега и спорта.',
        image: './img/card-7.jpg'
    },
    {
        id: 7,
        name: 'Асиксы',
        description: 'Кислотный цвет. Дизайн топчик, для бега топчик.',
        image: './img/card-8.jpg'
    },
]
const productsInBasket = []

const productsWrapper = document.querySelector('.products-wrapper')

const basketCount = document.querySelector('.basket-count')
const modal_basket = document.querySelector('.modal-basket')
const btn_open_modal = document.querySelector('.modal-open')
const btn_close_modal = document.querySelector('.btn-close')
const buy_products = document.querySelector('.buy-products')
const user_products = document.querySelector('.user-products')

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

buy_products.addEventListener('click', (event) => {
    buyProducts()
}) // Покупаем товар.

function openModal() {
    modal_basket.style.display = "block"
} // Функция призыва модалки.

function closeModal() {
    modal_basket.style.display = "none"

} // Функция отзыва модалки.

function buyProducts() {
    modal_basket.style.display = "none"
    alert('Теперь ваши деньги у нас!')
} // Покупаем товар.

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

                basketCount.innerHTML = `${storageProductInBasket.length}`
            }
        })
    })
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
                item.remove()
                basketCount.innerHTML = `${storageProductInBasket.length}`
            }
        })
    })
}
init()
createProducts()
addBasket()


