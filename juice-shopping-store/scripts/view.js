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
                <div class="image-box" data-juice-detail-id=${juice.id}>
                    <img src=${juice.image} style="height: 120px" />
                </div>
                <div class="about">
                    <h4 class="title">${juice.title}</h4>
                    <h5 class="subtitle">${juice.volume}ml</h5>
                    <div class="amount">$${juice.price}</div>
                    `

            const indexOfCartJuice = cartItems.findIndex(
                (item) => item.id === juice.id
            )
            if (indexOfCartJuice >= 0) {
                juicesHTML += `
                        <div class="view-in-cart__container">
                            <div class="view-in-cart__container--subtitle">view in cart</div>
                            <div class="overlay-cart__btn-plus" data-juice-detail-id=${cartItems[indexOfCartJuice].id}>+</div>
                            <div class="view-in-cart__count">${cartItems[indexOfCartJuice].amount}</div>
                            <div class="overlay-cart__btn-minus" data-juice-detail-id=${cartItems[indexOfCartJuice].id}>-</div>
                        </div>
                        `
            } else {
                juicesHTML += `
                        <div class="addToCart" data-juice-detail-id=${juice.id}>
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

    prepareCartJuices(cart, storage, product, juices, router) {
        // Hide Cart if juices array is empty
        if (juices.length == 0) {
            cart.overlayCartOff()
            cart.overplayEmptyCartOff()
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
                    <div class="overlay-cart__btn-plus" data-juice-detail-id=${juice.id}>+</div>
                    <div class="overlay-cart__count">${juice.amount}</div>
                    <div class="overlay-cart__btn-minus" data-juice-detail-id=${juice.id}>-</div>
                </div>
                <div class="overlay-cart__prices">
                    <div class="overlay-cart__amount">$${juice.price}</div>
                    <div class="overlay-cart__remove" data-juice-detail-id=${juice.id}><u>Remove</u></div>
                </div>
            </div>
            `
        })

        this.cartJuices.innerHTML = cartJuicesHTML

        // Set Cart
        this.setClickListenerToCartJuicesPlus(
            product,
            storage,
            cart,
            juices,
            [...document.querySelectorAll('.overlay-cart__btn-plus')],
            router
        )
        this.setClickListenerToCartJuicesMinus(
            product,
            storage,
            cart,
            juices,
            [...document.querySelectorAll('.overlay-cart__btn-minus')],
            router
        )

        this.setClickListenerToCartJuicesRemove(
            cart,
            storage,
            product,
            juices,
            [...document.querySelectorAll('.overlay-cart__remove')],
            router
        )

        this.setClickListenerToJuicesRemoveAll(
            storage,
            cart,
            product,
            document.querySelector('.overlay-cart__remove-all'),
            router
        )
        // Set Cart Botton informations
        // Set cart total amount
        this.setCartTotalAmount(storage, product)
        // Set cart total Price
        this.setCartTotalPrice(storage, product)
    }

    displayJuiceDetail(juice, storage, router) {
        let juiceHTML = '<p>Loading...</p>'

        if (juice) {
            juiceHTML = `
                <div class="detail__container">
                    <div class="detail__image-box">
                        <img src=${juice.image} style="height: 120px" />
                    </div>
                    <div class="detail__about">
                        <h1 class="detail__title">${juice.title}</h1>
                        <h3 class="detail__subtitle">${juice.volume}ml</h3>
                        <img src="images/veg.png" style="height: 30px"/>
                    </div>
                    <div class="detail__prices">
                        <div class="detail__prices-amount">$${juice.price}</div>
                        `
            const cartItems = storage.getCartItems()

            const indexOfJuiceInCart = cartItems.findIndex(
                (item) => item.id === juice.id
            )

            if (indexOfJuiceInCart >= 0) {
                juiceHTML += `
                            <div class="detail__viewInCart__container">
                                <div class="detail__viewInCart__container--subtitle">view in cart</div>
                                <div class="detail__viewInCart__btn-plus" data-juice-detail-id=${cartItems[indexOfJuiceInCart].id}>+</div>
                                <div class="detail__viewInCart__count">${cartItems[indexOfJuiceInCart].amount}</div>
                                <div class="detail__viewInCart__btn-minus" data-juice-detail-id=${cartItems[indexOfJuiceInCart].id}>-</div>
                            </div>
                            `
            } else {
                juiceHTML += `
                            <div class="detail__prices-addToCart" data-juice-detail-id=${juice.id}>
                                <button class="button">
                                    Add to Cart
                                </button>
                            </div>
                            `
            }
            juiceHTML += `
                    </div>
                </div>`

            document.querySelector('.products').innerHTML = juiceHTML
        } else {
            router.navToHome()
        }
    }

    setClickListenerAddToCartBtn(
        storage,
        cart,
        product,
        juices,
        btnElements,
        router
    ) {
        btnElements.forEach((item) => {
            let id = item.dataset.juiceDetailId
            let juice = juices.find((item) => item.id == id)
            item.addEventListener('click', () => {
                storage.saveOnCart(juice)

                // Reload cart items amount
                let cartAmount = product.getCartAmount(storage)
                this.setCartAmount(cartAmount)

                // Update cart items
                const cartJuices = storage.getCartItems()
                this.prepareCartJuices(
                    cart,
                    storage,
                    product,
                    cartJuices,
                    router
                )

                // Prepare Cart again to disable cant openned until item == 0
                cart.cartInitProcess(product, storage)

                if (router.getNameOfPath() === 'home') {
                    // Reaload Products list page
                    product.initProducts(product, this, cart, storage, router)
                } else if (router.getNameOfPath() === 'detail') {
                    // Reaload Products Detail page
                    product.initDetailProducts(
                        juice.id,
                        product,
                        this,
                        cart,
                        storage,
                        router
                    )
                }
            })
        })
    }

    setClickListenerRoute(elements, router, path) {
        elements.forEach((element) => {
            element.addEventListener('click', (event) => {
                event.preventDefault()

                if (path === 'detail') {
                    router.navToJuiceDetail(
                        event.target.parentNode.dataset.juiceDetailId
                    )
                } else router.navToHome()
            })
        })
    }

    setClickListenerToCartJuicesPlus(
        product,
        storage,
        cart,
        juices,
        btnElements,
        router
    ) {
        btnElements.forEach((btnElement) => {
            const id = btnElement.dataset.juiceDetailId
            const index = juices.findIndex((item) => item.id === id)
            const juice = juices[index]

            btnElement.addEventListener('click', () => {
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
                this.prepareCartJuices(
                    cart,
                    storage,
                    product,
                    cartJuices,
                    router
                )
                // Add cart items amount on home page
                const cartAmount = product.getCartAmount(storage)
                this.setCartAmount(cartAmount)

                if (router.getNameOfPath(location.pathname) === 'home') {
                    // Reaload Products list page
                    product.initProducts(product, this, cart, storage, router)
                } else if (
                    router.getNameOfPath(location.pathname) === 'detail'
                ) {
                    // Reaload Products Detail page
                    product.initDetailProducts(
                        juice.id,
                        product,
                        this,
                        cart,
                        storage,
                        router
                    )
                }
            })
        })
    }

    setClickListenerToCartJuicesMinus(
        product,
        storage,
        cart,
        juices,
        btnElements,
        router
    ) {
        btnElements.forEach((item) => {
            const id = item.dataset.juiceDetailId
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
                    if (juices.length === 0) cart.cartInitProcess(product, storage)
                }

                storage.setCartNewJuices(juices)

                // Prepare new cart items to display
                const cartJuices = storage.getCartItems()
                this.prepareCartJuices(
                    cart,
                    storage,
                    product,
                    cartJuices,
                    router
                )
                // Add cart items amount on home page
                const cartAmount = product.getCartAmount(storage)
                this.setCartAmount(cartAmount)

                if (router.getNameOfPath(location.pathname) === 'home')
                    // Reaload Products list page
                    product.initProducts(product, this, cart, storage, router)
                else if (router.getNameOfPath(location.pathname) === 'detail') {
                    // Reaload Products Detail page
                    product.initDetailProducts(
                        juice.id,
                        product,
                        this,
                        cart,
                        storage,
                        router
                    )
                }
            })
        })
    }

    setClickListenerToJuicesRemoveAll(
        storage,
        cart,
        product,
        btnElement,
        router
    ) {
        btnElement.addEventListener('click', () => {
            storage.clearJuicesCart()

            // Prepare new cart items to display
            const cartJuices = storage.getCartItems()
            this.prepareCartJuices(cart, storage, product, cartJuices, router)
            // Add cart items amount on home page
            const cartAmount = product.getCartAmount(storage)
            this.setCartAmount(cartAmount)

            cart.cartInitProcess(product, storage)

            if (router.getNameOfPath() === 'home') {
                // Reaload Products list page
                product.initProducts(product, this, cart, storage, router)
            } else if (router.getNameOfPath() === 'detail') {
                const params = new URLSearchParams(window.location.search)
                const id = params.get('juice-detail-id')
                // Reaload Products Detail page
                product.initDetailProducts(
                    id,
                    product,
                    this,
                    cart,
                    storage,
                    router
                )
            }
        })
    }

    setClickListenerToCartJuicesRemove(
        cart,
        storage,
        product,
        juices,
        btnElement,
        router
    ) {
        btnElement.forEach((item) => {
            const id = item.dataset.juiceDetailId
            const index = juices.findIndex((item) => item.id === id)

            item.addEventListener('click', () => {
                juices.splice(index, 1)
                storage.setCartNewJuices(juices)

                // Prepare new cart items to display
                const cartJuices = storage.getCartItems()
                this.prepareCartJuices(
                    cart,
                    storage,
                    product,
                    cartJuices,
                    router
                )
                // Add cart items amount on home page
                const cartAmount = product.getCartAmount(storage)
                this.setCartAmount(cartAmount)

                if (router.getNameOfPath() === 'home') {
                    // Reaload Products list page
                    product.initProducts(product, this, cart, storage, router)
                } else if (router.getNameOfPath() === 'detail') {
                    const params = new URLSearchParams(window.location.search)
                    const id = params.get('juice-detail-id')
                    // Reaload Products Detail page
                    product.initDetailProducts(
                        id,
                        product,
                        this,
                        cart,
                        storage,
                        router
                    )
                }
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

    // scrolls window to top
    setupScrollEvent() {
        const scrollButton = document.querySelector('.scroll-top')

        scrollButton.addEventListener('click', (_) => {
            this.smoothVerticalScrolling(scrollButton.parentElement, 250, 'top')
        })
    }

    // prepares the window for a scroll event to show the scroll button
    setupScrollListener() {
        window.addEventListener('scroll', (_) => {
            const scrollButton = document.querySelector('.scroll-top')

            const scrollOffset = window.scrollY
            const scrollBreakpoint = window.innerHeight * 0.9

            if (scrollOffset >= scrollBreakpoint) {
                scrollButton.classList.add('visible')
            } else if (scrollOffset <= 0) {
                scrollButton.classList.remove('visible')
            }
        })
    }

    smoothVerticalScrolling(e, time, where) {
        // gets the element's top position relative to the viewport
        const eTop = e.getBoundingClientRect().top

        // divides the top offset into 100 steps to be ellapsed
        const eAmt = eTop / 100

        // starting time
        let curTime = 0

        // not to exceed the desired duration
        while (curTime <= time) {
            // call a function to execute at one hundreth of the desired scroll time
            window.setTimeout(this.SVS_B, curTime, eAmt, where)
            // increase by one hundreth of the desired time to execute exactly 100 times
            curTime += time / 100
        }
    }

    SVS_B(eAmt, where) {
        // scroll by half the hundredth of the top offset if destination is not top (since to center only involves scrolling either in the top or bottom half of the window)
        if (where == 'center' || where == '') {
            window.scrollBy(0, eAmt / 2)
        }
        // otherwise scroll the full amount
        if (where == 'top') {
            window.scrollBy(0, eAmt)
        }
    }
}
