document.addEventListener('DOMContentLoaded', () => {
    createProducts()
})

setTimeout(function () {
    document.body.classList.add('body_visible');
}, 50)

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
    if (storageProductInBasket !== null && storageProductInBasket.length > 0) {
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
const createProducts = async () => {

    const result = await fetch('http://localhost:3000/cross')
        .then(response => response.json())
        .then(data => data)

    result.forEach((product, idx) => {
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
                        <button 
                            type="button" 
                            class="btn btn-outline-primary buy-button ml-2 button-in-basket__not-bootstrap">В корзину!</button>
                    </div>
                </div>
            `
        productsWrapper.appendChild(cardProduct)
    })

    addBasket()
}

const getProduct = async (id) => {
    const result = await fetch(`http://localhost:3000/cross/${id}`)
        .then(response => response.json())
        .then(data => data)
    return result
}

const getProductsInBasket = async () => {
    const result = await fetch(`http://localhost:3000/basket`)
        .then(response => response.json())
        .then(data => data)
    return result
}

const deleteProductInBasket = async (id) => {
     const result = await fetch(`http://localhost:3000/basket/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },

    })

    return result
}

const addBasket = () => {
    const cardsWrapper = document.querySelectorAll('.card-wrapper')

    cardsWrapper.forEach((item) => {
        item.addEventListener('click', (event) => {
            if (event.target.innerText === 'В корзину!') {

                const id = Number(this.event.path[2].getAttribute('id'))

                getProduct(id)
                    .then(product => {
                        addBasketServer(product)
                    })
            }
        })
    })
}


const showBasketProducts = () => {
    let total_cost = 0
    getProductsInBasket()
        .then((products) => {
            if (products.length) {
                products.forEach((product) => {
                    const cardProductBasket = document.createElement('div')
                    cardProductBasket.setAttribute('id', product.id)
                    cardProductBasket.classList.add('cardProductBasket')
                    cardProductBasket.innerHTML = `
                        <h5 class = "product-title-in-basket">
                            ${product.name}
                        </h5>
                        <img src="${product.image}" class="basket-image" alt="">
                        <p class = "product-description-in-basket">
                            ${product.description}
                        </p>
                        <button class="btn btn-sm btn-danger deleteProduct delete-product-on-basket__not-bootstrap">Удалить</button>
                        <hr>
                    `
                    user_products.append(cardProductBasket)
                    total_cost += product.price
                    total_price.innerHTML = total_cost
                })
                deleteProduct()
            }
        })

}

const deleteProduct = () => {
    const cardProductBasket = document.querySelectorAll('.cardProductBasket')

    cardProductBasket.forEach((item) => {

        item.addEventListener('click', (event) => {

            if(event.target.innerText === 'Удалить') {

                const id = Number(this.event.path[1].getAttribute('id'))

                deleteProductInBasket(id).then(response => {
                    if(response.status === 200) {
                        item.remove()
                    }else {
                        alert('SERVER ERROR')
                        return
                    }
                })

            }
        })
    })

}


const closeBasketWrapper = () => {
    const wrapperModalBasket = document.querySelector('.modal-basket-not-bootstrap')
    wrapperModalBasket.addEventListener('click', (event) => {
        if (event.target.className === 'modal-basket-not-bootstrap') {
            closeModal()
        }
    })
}

const addBasketServer = async (product) => {
    let data = {
        description: product.description,
        image: product.image,
        name: product.name,
        price: product.price
    }

    let jsonData = JSON.stringify(data)

    const result = await fetch('http://localhost:3000/basket', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: jsonData
    }).then(response => {
        if (response.statusText === 'Created') {
            alert('Товар был добавлен в корзину')
        }
    })
}

init()
closeBasketWrapper()