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
                path: this.getPathName(),
                view: this.home.view
            },
            {
                path: this.getPathName() + 'juice-detail',
                view: this.detail.view
            }
        ]

        const matchRoutes = routes.map((route) => {
            return {
                route: route,
                isMatch: this.getPathName() === route.path
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
            return this.getPathName() + 'juice-detail'
        } else if (page === 'home') {
            return this.getPathName()
        } else {
            return this.getPathName()
        }
    }

    getPathName() {
        const pathNameBySlash = location.pathname.split('/')
        if (pathNameBySlash[pathNameBySlash.length - 1] === 'index.html')
            return location.pathname.slice(0, -10)
        else return location.pathname.trim()
    }
}
