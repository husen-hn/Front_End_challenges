import Cart from './../scripts/cart.js'
import Product from './../scripts/product.js'
import View from './../scripts/view.js'
import Storage from './../scripts/storage.js'
import Router from './../scripts/router.js'

export default class Home {
    view() {
        const cart = new Cart()
        const product = new Product()
        const view = new View()
        const storage = new Storage()
        const router = new Router()

        // initial process to display/hide ... of cart
        cart.cartInitProcess(product, storage)

        // Add cart items amount
        let cartAmount = product.getCartAmount(storage)
        view.setCartAmount(cartAmount)

        // Display Juices list and preload process
        product.initProducts(product, view, cart, storage, router)
    }
}
