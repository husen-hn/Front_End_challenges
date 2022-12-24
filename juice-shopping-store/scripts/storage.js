export default class Storage {
    getCartItems() {
        return localStorage.getItem('cart_juices')
            ? JSON.parse(localStorage.getItem('cart_juices'))
            : []
    }

    getCartAmount() {
        let amount = 0
        this.getCartItems().map((itme) => {
            amount += itme.amount
        })

        return amount
    }

    saveOnCart(juice) {
        let cartJuices = this.getCartItems()
        localStorage.setItem(
            'cart_juices',
            JSON.stringify([...cartJuices, { ...juice, amount: 1 }])
        )
    }
}
