export default class Product {
    initProducts(product, view, cart, storage) {
        this.getProducts()
            .then((data) => {
                view.displayJuices(storage, data)
                view.setClickListenerAddToCartBtn(
                    storage,
                    cart,
                    product,
                    data,
                    [...document.querySelectorAll('.addToCart')]
                )

                document
                    .querySelector('.site-header__search')
                    .addEventListener('input', (e) => {
                        let searchedJuices = this.searchJuice(
                            data,
                            e.target.value
                        )
                        this.view.displayJuices(displayJuices, searchedJuices)
                    })
            })
            .then(() => {
                // Prepare cart items to display
                const cartJuices = storage.getCartItems()
                view.prepareCartJuices(cart, storage, product, cartJuices)
                // Display Cart on products "view in cart"
                cart.openCartOnProductCartViews()
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
