import Product from './product.js'

export default class Cart {
    constructor() {
        this.cartBtn = document.querySelector('.cart-btn')
        this.deleteBtn = document.querySelector('.overlay-cart__delete')
        this.checkoutBtn = document.querySelector('.overlay-cart__button')
        this.product = new Product()
    }

    // initial process to control cart
    cartInitProcess() {
        const cartAmount = this.product.getCartAmount()
        // Hide Cart on start up
        this.overlayCartOff()

        // Display Cart on Cart Icon
        this.cartBtn.addEventListener('click', () =>
            cartAmount > 0 ? this.overlayCartOn() : this.overlayCartOff()
        )
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
