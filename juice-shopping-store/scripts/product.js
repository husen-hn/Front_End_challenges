import Storage from './storage.js'

export default class Product {
    constructor() {
        this.storage = new Storage()
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

    searchProduct(products, keyword) {
        return products.filter((item) => {
            const title = item.title.toLowerCase()
            const key = keyword.trim().toLowerCase()
            return title.includes(key)
        })
    }

    getCartAmount() {
        let amount = 0
        this.storage.getCartItems().map((itme) => {
            amount += itme.amount
        })

        return amount
    }

    getCartTotalPrice() {
        let totalPrice = 0
        this.storage.getCartItems().map((itme) => {
            totalPrice += itme.price
        })

        return totalPrice
    }
}
