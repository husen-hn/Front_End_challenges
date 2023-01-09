export default class Cart {
    constructor() {
        this.cartBtn = document.querySelector('.cart-btn')
        this.deleteBtn = document.querySelector('.overlay-cart__delete')
        this.deleteEmptyBtn = document.querySelector(
            '.overlay-empty-cart__delete'
        )
        this.checkoutBtn = document.querySelector('.overlay-cart__button')
    }

    // initial process to control cart
    cartInitProcess(product, storage) {
        const cartAmount = product.getCartAmount(storage)
        // Hide Cart and modal on start up
        this.overlayCartOff()
        this.overplayEmptyCartOff()

        // Display Cart on Cart Icon
        this.cartBtn.addEventListener('click', () =>
            cartAmount > 0
                ? this.overlayCartOn(product, storage)
                : this.overplayEmptyCartOn()
        )
        // Hide Cart on Delete, Checkout
        this.deleteBtn.addEventListener('click', () => this.overlayCartOff())
        this.deleteEmptyBtn.addEventListener('click', () =>
            this.overplayEmptyCartOff()
        )
        this.checkoutBtn.addEventListener('click', () => this.overlayCartOff())
    }

    // this function have to run after display products
    openCartOnProductCartViews(elClassName, product, storage) {
        const productCartBtn = document.querySelectorAll(elClassName)

        // Display Cart on products "view in cart"
        productCartBtn.forEach((juiceEl) => {
            juiceEl.addEventListener('click', () =>
                this.overlayCartOn(product, storage)
            )
        })
    }

    // Display Cart
    overlayCartOn(product, storage) {
        const cartAmount = product.getCartAmount(storage)
        if (cartAmount > 0) {
            document.getElementsByClassName('overlay-cart')[0].style.display =
                'block'
            this.overplayEmptyCartOff()
        } else {
            this.overplayEmptyCartOn()
        }
    }

    // Hide Cart
    overlayCartOff() {
        document.getElementsByClassName('overlay-cart')[0].style.display =
            'none'
    }

    // Display Empty Cart Modal
    overplayEmptyCartOn() {
        document.getElementsByClassName('overlay-empty-cart')[0].style.display =
            'block'
    }

    // Hide Empty Cart Modal
    overplayEmptyCartOff() {
        document.getElementsByClassName('overlay-empty-cart')[0].style.display =
            'none'
    }
}
