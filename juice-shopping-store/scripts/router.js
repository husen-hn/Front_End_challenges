import Home from './../pages/home.js'
import Detail from './../pages/detail.js'

export default class Router {
    constructor() {
        this.home = new Home()
        this.detail = new Detail()
    }

    init() {
        // open juices list on init
        this.router()
    }

    navTo(url) {
        history.pushState(null, null, url)
        this.router()
    }

    router() {
        const routes = [
            {
                path: '/juice-shopping-store/',
                view: this.home.view
            },
            {
                path: '/juice-shopping-store/juice-detail',
                view: this.detail.view
            }
        ]

        const matchRoutes = routes.map((route) => {
            return {
                route: route,
                isMatch: location.pathname === route.path
            }
        })

        let match = matchRoutes.find((item) => {
            return item.isMatch
        })

        if (!match) {
            match = {
                route: routes[0],
                match: true
            }
        }

        match.route.view()
    }

    routes(page) {
        if (page === 'detail') {
            return location.pathname + 'juice-detail'
        } else if (page === 'home') {
            return location.pathname
        } else {
            return location.pathname
        }
    }

    getPathName() {
        return location.pathname
    }
}
