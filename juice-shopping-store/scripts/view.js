export default class View {
    constructor() {
        this.products = document.querySelector('.products')
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
                    <div class="addToCart">
                        <button class="button">Add to Cart</button>
                    </div>
                </div>
            </div>
            `
        })

        this.products.innerHTML = juicesHTML
    }
}
