const outCount = document.querySelector('.basket-count')
outCount.innerText = localStorage.getItem('countProducts') || 0
let count = localStorage.getItem('countProducts') || 0

document.querySelector('.products').addEventListener('click' , (event) => {
    if(event.target.innerText === 'В корзину!') {
        const card = document.querySelector('.card')
        const cardClone = card.cloneNode(true)
        modalBody.appendChild(cardClone)
        count++;
        outCount.innerText = count
        localStorage.setItem('countProducts', count)
    }
})

console.log('github loh')