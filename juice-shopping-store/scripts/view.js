export default class View {
    constructor() {
        this.juices = document.querySelector('.products')
        this.cartJuices = document.querySelector('.overlay-cart__cart-items')
        this.cartItemsAmount = document.querySelector('.overlay-cart__items')
        this.cartTotalPrice = document.querySelector(
            '.overlay-cart__total-amount'
        )
    }

    displayJuices(storage, juices) {
        const cartItems = storage.getCartItems()
        let cartItemsId = []
        cartItems.map((item) => {
            cartItemsId.push(item.id)
        })
        let juicesHTML = ''
        juices.map((juice) => {
            juicesHTML += `
            <div class="products__juice">
                <a href="/juice-detail" data-link >
                    <div class="image-box">
                        <img src=${juice.image} style="height: 120px" />
                    </div>
                <a href="/juice-detail" data-link >
                <div class="about">
                    <a href="/juice-detail" data-link >
                        <h4 class="title">${juice.title}</h4>
                    </a>
                    <a href="/juice-detail" data-link >
                        <h5 class="subtitle">${juice.volume}ml</h5>
                    </a>
                    <a href="/juice-detail" data-link >
                        <div class="amount">${juice.price}</div>
                    </a>
                    `

            const indexOfCartJuice = cartItems.findIndex(
                (item) => item.id === juice.id
            )
            if (indexOfCartJuice >= 0) {
                juicesHTML += `
                        <div class="view-in-cart__container">
                            <div class="view-in-cart__container--subtitle">view in cart</div>
                            <div class="overlay-cart__btn-plus" data-id=${cartItems[indexOfCartJuice].id}>+</div>
                            <div class="view-in-cart__count">${cartItems[indexOfCartJuice].amount}</div>
                            <div class="overlay-cart__btn-minus" data-id=${cartItems[indexOfCartJuice].id}>-</div>
                        </div>
                        `
            } else {
                juicesHTML += `
                        <div class="addToCart" data-id=${juice.id}>
                            <button class="button">
                                Add to Cart
                            </button>
                        </div>
                        `
            }

            juicesHTML += `
                </div>
            </div>
            `
        })

        this.juices.innerHTML = juicesHTML
    }

    prepareCartJuices(cart, storage, product, juices) {
        // Hide Cart if juices array is empty
        if (juices.length == 0) {
            cart.overlayCartOff()
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
        this.setClickListenerToCartJuicesPlus(product, storage, cart, juices, [
            ...document.querySelectorAll('.overlay-cart__btn-plus')
        ])
        this.setClickListenerToCartJuicesMinus(product, cart, storage, juices, [
            ...document.querySelectorAll('.overlay-cart__btn-minus')
        ])
        this.setClickListenerToCartJuicesRemove(
            cart,
            storage,
            product,
            juices,
            [...document.querySelectorAll('.overlay-cart__remove')]
        )

        this.setClickListenerToJuicesRemoveAll(
            storage,
            cart,
            product,
            document.querySelector('.overlay-cart__remove-all')
        )
        // Set Cart Botton informations
        // Set cart total amount
        this.setCartTotalAmount(storage, product)
        // Set cart total Price
        this.setCartTotalPrice(storage, product)
    }

    setClickListenerAddToCartBtn(storage, cart, product, juices, btnElements) {
        btnElements.forEach((item) => {
            let id = item.dataset.id
            let juice = juices.find((item) => item.id == id)
            item.addEventListener('click', () => {
                storage.saveOnCart(juice)

                // Reload cart items amount
                let cartAmount = product.getCartAmount(storage)
                this.setCartAmount(cartAmount)

                // Update cart items
                const cartJuices = storage.getCartItems()
                this.prepareCartJuices(cart, storage, product, cartJuices)

                // Prepare Cart again to disable cant openned until item == 0
                cart.cartInitProcess(product, storage)

                // Reaload Products list page
                product.initProducts(product, this, cart, storage)
            })
        })
    }

    setClickListenerToCartJuicesPlus(
        product,
        storage,
        cart,
        juices,
        btnElements
    ) {
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

                storage.setCartNewJuices(juices)

                // Prepare new cart items to display
                const cartJuices = storage.getCartItems()
                this.prepareCartJuices(cart, storage, product, cartJuices)
                // Add cart items amount on home page
                const cartAmount = product.getCartAmount(storage)
                this.setCartAmount(cartAmount)
                // Reaload Products list page
                product.initProducts(product, this, cart, storage)
            })
        })
    }

    setClickListenerToCartJuicesMinus(
        product,
        cart,
        storage,
        juices,
        btnElements
    ) {
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
                    if (juices === []) cart.cartInitProcess(product, storage)
                }

                storage.setCartNewJuices(juices)

                // Prepare new cart items to display
                const cartJuices = storage.getCartItems()
                this.prepareCartJuices(cart, storage, product, cartJuices)
                // Add cart items amount on home page
                const cartAmount = product.getCartAmount(storage)
                this.setCartAmount(cartAmount)
                // Reaload Products list page
                product.initProducts(product, this, cart, storage)
            })
        })
    }

    setClickListenerToJuicesRemoveAll(storage, cart, product, btnElement) {
        btnElement.addEventListener('click', () => {
            storage.clearJuicesCart()

            // Prepare new cart items to display
            const cartJuices = storage.getCartItems()
            this.prepareCartJuices(cart, storage, product, cartJuices)
            // Add cart items amount on home page
            const cartAmount = product.getCartAmount(storage)
            this.setCartAmount(cartAmount)

            cart.cartInitProcess(product, storage)
        })
    }

    setClickListenerToCartJuicesRemove(
        cart,
        storage,
        product,
        juices,
        btnElement
    ) {
        btnElement.forEach((item) => {
            const id = item.dataset.id
            const index = juices.findIndex((item) => item.id === id)

            item.addEventListener('click', () => {
                juices.splice(index, 1)
                storage.setCartNewJuices(juices)

                // Prepare new cart items to display
                const cartJuices = storage.getCartItems()
                this.prepareCartJuices(cart, storage, product, cartJuices)
                // Add cart items amount on home page
                const cartAmount = product.getCartAmount(storage)
                this.setCartAmount(cartAmount)
            })
        })
    }

    setCartAmount(cartAmount) {
        const cartAmountElement = document.querySelector('.cart-items')
        cartAmountElement.innerText = cartAmount
    }

    setCartTotalAmount(storage, product) {
        let cartAmount = product.getCartAmount(storage)
        this.cartItemsAmount.innerText = cartAmount + ' items'
    }

    setCartTotalPrice(storage, product) {
        let cartPrice = product.getCartTotalPrice(storage)
        this.cartTotalPrice.innerText = '$ ' + cartPrice
    }
}
