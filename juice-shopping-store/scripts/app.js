const cartBtn = document.querySelector('.cart-btn')
const deleteBtn = document.querySelector('.overlay-cart__delete')
const checkoutBtn = document.querySelector('.overlay-cart__button')

overlayCartOff()

cartBtn.addEventListener('click', () => {
    overlayCartOn()
})

deleteBtn.addEventListener('click', () => {
    overlayCartOff()
})

checkoutBtn.addEventListener('click', () => {
    overlayCartOff()
})

function overlayCartOn() {
    document.getElementsByClassName('overlay-cart')[0].style.display = 'block'
}

function overlayCartOff() {
    document.getElementsByClassName('overlay-cart')[0].style.display = 'none'
}
