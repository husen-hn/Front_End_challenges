export default class Cart {
    constructor() {
        this.cartBtn = document.querySelector('.cart-btn')
        this.deleteBtn = document.querySelector('.overlay-cart__delete')
        this.checkoutBtn = document.querySelector('.overlay-cart__button')
    }

    // initial process to control cart
    cartInitProcess() {
        // Hide Cart on start up
        this.overlayCartOff()

        // Display Cart on Cart Icon
        this.cartBtn.addEventListener('click', () => this.overlayCartOn())
        // Hide Cart on Delete, Checkout
        this.deleteBtn.addEventListener('click', () => this.overlayCartOff())
        this.checkoutBtn.addEventListener('click', () => this.overlayCartOff())
    }

    // Display Cart
    overlayCartOn() {
        document.getElementsByClassName('overlay-cart')[0].style.display =
            'block'
    }

    // Hide Cart
    overlayCartOff() {
        document.getElementsByClassName('overlay-cart')[0].style.display =
            'none'
    }
}
