import Cart from './cart.js'
import Product from './product.js'
import View from './view.js'
import Storage from './storage.js'

window.addEventListener('DOMContentLoaded', () => {
    const cart = new Cart()
    const product = new Product()
    const view = new View()
    const storage = new Storage()

    // initial process to display/hide ... of cart
    cart.cartInitProcess(product, storage)

    // Add cart items amount
    let cartAmount = product.getCartAmount(storage)
    view.setCartAmount(cartAmount)

    // Display Juices list and preload process
    product.initProducts(product, view, cart, storage)
})
