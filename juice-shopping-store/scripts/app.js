import Cart from './cart.js'
import Product from './product.js'
import View from './view.js'
import Storage from './storage.js'

const searchInput = document.querySelector('.site-header__search')

window.addEventListener('DOMContentLoaded', () => {
    const cart = new Cart()
    const product = new Product()
    const view = new View()
    const storage = new Storage()

    // initial process to display/hide ... of cart
    cart.cartInitProcess()

    // Add cart items amount
    let cartAmount = product.getCartAmount()
    view.setCartAmount(cartAmount)

    product
        .getProducts()
        .then((data) => {
            view.displayJuices(data)
            view.setClickListenerAddToCartBtn(data, [
                ...document.querySelectorAll('.addToCart')
            ])

            searchInput.addEventListener('input', (e) => {
                let searchedProducts = product.searchProduct(
                    data,
                    e.target.value
                )
                view.displayJuices(searchedProducts)
            })
        })
        .then(() => {
            // Prepare cart items to display
            const cartJuices = storage.getCartItems()
            view.prepareCartJuices(cartJuices)
        })
})
