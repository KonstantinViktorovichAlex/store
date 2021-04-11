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

const modal_basket = document.querySelector('.modal-basket')
const btn_open_modal = document.querySelector('.modal-open')
const btn_close_modal = document.querySelector('.btn-close-modal')
console.log(btn_open_modal)

btn_open_modal.addEventListener('click', (event) => {
    if (event.target.innerText === "Корзина") {
        console.log(event)
        openModal()
    }
})

function openModal() {
    modal_basket.style.display = "block"
}

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
                showBasketProducts()
            }
        })
    })
}
const showBasketProducts = () => {
    const testBasket = document.querySelector('.test-basket')
    if (productsInBasket.length) {
        productsInBasket.forEach((product, ind) => {
            const productInTestBasket = document.createElement('div')
            productInTestBasket.innerHTML = `
            <h3>
                ${product.name}
            </h3>
            <p>
            ${product.description}
            </p>
            `
            testBasket.append(productInTestBasket)
        })
    }
}
createProducts()
addBasket()