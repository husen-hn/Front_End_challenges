export default class Storage {
    getCartItems() {
        return localStorage.getItem('cart_juices')
            ? JSON.parse(localStorage.getItem('cart_juices'))
            : []
    }

    saveOnCart(juice) {
        let cartJuices = this.getCartItems()
        localStorage.setItem(
            'cart_juices',
            JSON.stringify([...cartJuices, { ...juice, amount: 1 }])
        )
    }

    setCartNewJuices(juices) {
        localStorage.removeItem('cart_juices')
        localStorage.setItem('cart_juices', JSON.stringify(juices))
    }

    clearJuicesCart() {
        localStorage.removeItem('cart_juices')
    }
}
