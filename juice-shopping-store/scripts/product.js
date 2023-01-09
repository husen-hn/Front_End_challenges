export default class Product {
    initProducts(product, view, cart, storage, router) {
        this.getProducts()
            .then((data) => {
                view.displayJuices(storage, data, router)
                view.setClickListenerAddToCartBtn(
                    storage,
                    cart,
                    product,
                    data,
                    [...document.querySelectorAll('.addToCart')],
                    router
                )

                document
                    .querySelector('.site-header__search')
                    .addEventListener('input', (e) => {
                        let searchedJuices = this.searchJuice(
                            data,
                            e.target.value
                        )
                        view.displayJuices(
                            displayJuices,
                            searchedJuices,
                            router
                        )
                    })

                // set click listener to route pages
                view.setClickListenerRoute(
                    [...document.querySelectorAll('.site-header__logo')],
                    router,
                    router.routes('home')
                )
                view.setClickListenerRoute(
                    [...document.querySelectorAll('.site-header__home')],
                    router,
                    router.routes('home')
                )
                view.setClickListenerRoute(
                    document.querySelectorAll('.image-box'),
                    router,
                    router.routes('detail')
                )

                // scroll up
                view.setupScrollListener()
                view.setupScrollEvent()
            })
            .then(() => {
                // Prepare cart items to display
                const cartJuices = storage.getCartItems()
                view.prepareCartJuices(
                    cart,
                    storage,
                    product,
                    cartJuices,
                    router
                )
                // Display Cart on products "view in cart"
                cart.openCartOnProductCartViews(
                    '.view-in-cart__container--subtitle',
                    this,
                    storage
                )
            })
    }

    async initDetailProducts(id, product, view, cart, storage, router) {
        await this.getProducts()
            .then((data) => {
                const juice = data.find((item) => item.id === id)
                view.displayJuiceDetail(juice, storage, router)

                const cartItems = storage.getCartItems()
                const indexOfJuiceInCart = cartItems.findIndex(
                    (item) => item.id === juice.id
                )

                if (indexOfJuiceInCart < 0) {
                    view.setClickListenerAddToCartBtn(
                        storage,
                        cart,
                        product,
                        [juice],
                        [document.querySelector('.detail__prices-addToCart')],
                        router
                    )
                } else {
                    view.setClickListenerToCartJuicesPlus(
                        product,
                        storage,
                        cart,
                        [cartItems[indexOfJuiceInCart]],
                        [
                            ...document.querySelectorAll(
                                '.detail__viewInCart__btn-plus'
                            )
                        ],
                        router
                    )
                    view.setClickListenerToCartJuicesMinus(
                        product,
                        storage,
                        cart,
                        [cartItems[indexOfJuiceInCart]],
                        [
                            ...document.querySelectorAll(
                                '.detail__viewInCart__btn-minus'
                            )
                        ],

                        router
                    )
                }

                document
                    .querySelector('.site-header__search')
                    .addEventListener('click', (_) => {
                        router.navTo(router.routes('home'))
                    })
            })
            .then(() => {
                // Display Cart on products "view in cart"
                cart.openCartOnProductCartViews(
                    '.detail__viewInCart__container--subtitle',
                    this,
                    storage
                )
            })
    }

    // get products from json
    async getProducts() {
        try {
            const res = await fetch('juices.json')
            const data = await res.json()

            let juices = data.items

            juices = juices.map((item) => {
                const { title, price, volume } = item.fields
                const { id } = item.sys
                const image = item.fields.image.fields.file.url
                return { id, title, price, volume, image }
            })

            return juices
        } catch (error) {
            console.log(error)
        }
    }

    searchJuice(juices, keyword) {
        return juices.filter((item) => {
            const title = item.title.toLowerCase()
            const key = keyword.trim().toLowerCase()
            return title.includes(key)
        })
    }

    getCartAmount(storage) {
        let amount = 0
        storage.getCartItems().map((itme) => {
            amount += itme.amount
        })

        return amount
    }

    getCartTotalPrice(storage) {
        let totalPrice = 0
        storage.getCartItems().map((itme) => {
            totalPrice += itme.price
        })

        return totalPrice
    }
}
