export default class Cart {
    constructor() {
        this.cartBtn = document.querySelector('.cart-btn')
        this.deleteBtn = document.querySelector('.overlay-cart__delete')
        this.checkoutBtn = document.querySelector('.overlay-cart__button')
    }

    // initial process to control cart
    cartInitProcess(product, storage) {
        const cartAmount = product.getCartAmount(storage)
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

    // this function have to run after display products
    openCartOnProductCartViews() {
        const productCartBtn = document.querySelectorAll(
            '.view-in-cart__container--subtitle'
        )

        // Display Cart on products "view in cart"
        productCartBtn.forEach((juiceEl) => {
            juiceEl.addEventListener('click', () => this.overlayCartOn())
        })
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
