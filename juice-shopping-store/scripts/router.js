import Home from './../pages/home.js'
import Detail from './../pages/detail.js'

export default class Router {
    constructor() {
        this.home = new Home()
        this.detail = new Detail()
    }

    init() {
        document.body.addEventListener('click', (event) => {
            if (event.target.matches('[data-link]')) {
                event.preventDefault()
                const url =
                    'http://' +
                    event.target.href.split('/')[
                        event.target.href.split('/').length - 2
                    ] +
                    '/juice-shopping-store/' +
                    event.target.href.split('/')[
                        event.target.href.split('/').length - 1
                    ]

                // open url on click
                this.navTo(url)
            }
        })

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

        document.querySelector('.products').innerHTML = match.route.view()
    }

    routes(page) {
        if (page === 'detail') {
            return '/juice-shopping-store/juice-detail'
        } else if (page === 'home') {
            return '/juice-shopping-store/'
        } else {
            return '/juice-shopping-store/'
        }
    }
}
