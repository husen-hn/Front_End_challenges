import Storage from './storage.js'
import Product from './product.js'
import Cart from './cart.js'

export default class View {
    constructor() {
        this.juices = document.querySelector('.products')
        this.cartJuices = document.querySelector('.overlay-cart__cart-items')
        this.storage = new Storage()
        this.cart = new Cart()
        this.cartItemsAmount = document.querySelector('.overlay-cart__items')
        this.cartTotalPrice = document.querySelector(
            '.overlay-cart__total-amount'
        )
        this.product = new Product()
    }

    displayJuices(juices) {
        let juicesHTML = ''
        juices.map((juice) => {
            juicesHTML += `
            <div class="products__juice">
                <div class="image-box">
                    <img src=${juice.image} style="height: 120px" />
                </div>
                <div class="about">
                    <h4 class="title">${juice.title}</h4>
                    <h5 class="subtitle">${juice.volume}ml</h5>
                    <div class="amount">${juice.price}</div>
                    <div class="addToCart" data-id=${juice.id}>
                        <button class="button">Add to Cart</button>
                    </div>
                </div>
            </div>
            `
        })

        this.juices.innerHTML = juicesHTML
    }

    prepareCartJuices(juices) {
        // Hide Cart if juices array is empty
        if (juices.length == 0) {
            this.cart.overlayCartOff()
        }

        let cartJuicesHTML = ''
        juices.map((juice) => {
            cartJuicesHTML += `
            <div class="overlay-cart__cart-item">
                <div class="overlay-cart__image-box">
                    <img src=${juice.image} style="height: 120px" />
                    </div>
                    <div class="overlay-cart__about">
                    <h1 class="overlay-cart__title">${juice.title}</h1>
                    <h3 class="overlay-cart__subtitle">${juice.volume}ml</h3>
                    <img src="images/veg.png" style="height: 30px"/>
                    </div>
                    <div class="overlay-cart__counter">
                    <div class="overlay-cart__btn-plus" data-id=${juice.id}>+</div>
                    <div class="overlay-cart__count">${juice.amount}</div>
                    <div class="overlay-cart__btn-minus" data-id=${juice.id}>-</div>
                    </div>
                    <div class="overlay-cart__prices">
                    <div class="overlay-cart__amount">${juice.price}</div>
                    <div class="overlay-cart__remove" data-id=${juice.id}><u>Remove</u></div>
                </div>
            </div>
            `
        })

        this.cartJuices.innerHTML = cartJuicesHTML

        // Set Cart
        this.setClickListenerToCartJuicesPlus(juices, [
            ...document.querySelectorAll('.overlay-cart__btn-plus')
        ])
        this.setClickListenerToCartJuicesMinus(juices, [
            ...document.querySelectorAll('.overlay-cart__btn-minus')
        ])
        this.setClickListenerToCartJuicesRemove(juices, [
            ...document.querySelectorAll('.overlay-cart__remove')
        ])

        this.setClickListenerToJuicesRemoveAll(
            document.querySelector('.overlay-cart__remove-all')
        )
        // Set Cart Botton informations
        // Set cart total amount
        this.setCartTotalAmount()
        // Set cart total Price
        this.setCartTotalPrice()
    }

    setClickListenerAddToCartBtn(juices, btnElements) {
        btnElements.forEach((item) => {
            let id = item.dataset.id
            let juice = juices.find((item) => item.id == id)
            item.addEventListener('click', () => {
                this.storage.saveOnCart(juice)

                // Reload cart items amount
                let cartAmount = this.product.getCartAmount()
                this.setCartAmount(cartAmount)

                // Update cart items
                const cartJuices = this.storage.getCartItems()
                this.prepareCartJuices(cartJuices)

                // Prepare Cart again to disable cant openned until item == 0
                this.cart.cartInitProcess()
            })
        })
    }

    setClickListenerToCartJuicesPlus(juices, btnElements) {
        btnElements.forEach((item) => {
            const id = item.dataset.id
            const index = juices.findIndex((item) => item.id === id)
            const juice = juices[index]

            item.addEventListener('click', () => {
                juices.splice(index, 1, {
                    id: juice.id,
                    title: juice.title,
                    price: juice.price,
                    volume: juice.volume,
                    image: juice.image,
                    amount: juice.amount + 1
                })

                this.storage.setCartNewJuices(juices)

                // Prepare new cart items to display
                const cartJuices = this.storage.getCartItems()
                this.prepareCartJuices(cartJuices)
                // Add cart items amount on home page
                const cartAmount = this.product.getCartAmount()
                this.setCartAmount(cartAmount)
            })
        })
    }

    setClickListenerToCartJuicesMinus(juices, btnElements) {
        btnElements.forEach((item) => {
            const id = item.dataset.id
            const index = juices.findIndex((item) => item.id === id)
            const juice = juices[index]

            item.addEventListener('click', () => {
                juices.splice(index, 1, {
                    id: juice.id,
                    title: juice.title,
                    price: juice.price,
                    volume: juice.volume,
                    image: juice.image,
                    amount: juice.amount - 1
                })

                // Remove if amount of item increase to < 1
                if (juice.amount - 1 < 1) {
                    juices.splice(index, 1)
                    if (juices === []) this.cart.cartInitProcess()
                }

                this.storage.setCartNewJuices(juices)

                // Prepare new cart items to display
                const cartJuices = this.storage.getCartItems()
                this.prepareCartJuices(cartJuices)
                // Add cart items amount on home page
                const cartAmount = this.product.getCartAmount()
                this.setCartAmount(cartAmount)
            })
        })
    }

    setClickListenerToJuicesRemoveAll(btnElement) {
        btnElement.addEventListener('click', () => {
            this.storage.clearJuicesCart()

            // Prepare new cart items to display
            const cartJuices = this.storage.getCartItems()
            this.prepareCartJuices(cartJuices)
            // Add cart items amount on home page
            const cartAmount = this.product.getCartAmount()
            this.setCartAmount(cartAmount)

            this.cart.cartInitProcess()
        })
    }

    setClickListenerToCartJuicesRemove(juices, btnElement) {
        btnElement.forEach((item) => {
            const id = item.dataset.id
            const index = juices.findIndex((item) => item.id === id)

            item.addEventListener('click', () => {
                juices.splice(index, 1)
                this.storage.setCartNewJuices(juices)

                // Prepare new cart items to display
                const cartJuices = this.storage.getCartItems()
                this.prepareCartJuices(cartJuices)
                // Add cart items amount on home page
                const cartAmount = this.product.getCartAmount()
                this.setCartAmount(cartAmount)
            })
        })
    }

    setCartAmount(cartAmount) {
        const cartAmountElement = document.querySelector('.cart-items')
        cartAmountElement.innerText = cartAmount
    }

    setCartTotalAmount() {
        let cartAmount = this.product.getCartAmount()
        this.cartItemsAmount.innerText = cartAmount + ' items'
    }

    setCartTotalPrice() {
        let cartPrice = this.product.getCartTotalPrice()
        this.cartTotalPrice.innerText = '$ ' + cartPrice
    }
}
