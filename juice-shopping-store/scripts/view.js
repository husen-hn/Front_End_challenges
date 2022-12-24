import Storage from './storage.js'

export default class View {
    constructor() {
        this.products = document.querySelector('.products')
        this.storage = new Storage()
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
                    <h5 class="subtitle">${juice.volume}ML</h5>
                    <div class="amount">${juice.price}</div>
                    <div class="addToCart" data-id=${juice.id}>
                        <button class="button">Add to Cart</button>
                    </div>
                </div>
            </div>
            `
        })

        this.products.innerHTML = juicesHTML
    }

    setClickListenerAddToCartBtn(juices, btnElement) {
        btnElement.forEach((item) => {
            let id = item.dataset.id
            let juice = juices.find((item) => item.id == id)
            item.addEventListener('click', () => {
                this.storage.saveOnCart(juice)

                // Reload cart items amount
                let cartAmount = this.storage.getCartAmount()
                this.setCartAmount(cartAmount)
            })
        })
    }

    setCartAmount(cartAmount) {
        const cartAmountElement = document.querySelector('.cart-items')
        cartAmountElement.innerText = cartAmount
    }
}
