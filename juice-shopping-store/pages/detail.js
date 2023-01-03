import Product from './../scripts/product.js'
import Router from './../scripts/router.js'
import Storage from './../scripts/storage.js'
import View from './../scripts/view.js'
import Cart from './../scripts/cart.js'

export default class Detail {
    async view() {
        const product = new Product()
        const router = new Router()
        const storage = new Storage()
        const view = new View()
        const cart = new Cart()

        const params = new URLSearchParams(window.location.search)
        const id = params.get('id')

        product.initDetailProducts(id, product, view, cart, storage, router)
    }
}
