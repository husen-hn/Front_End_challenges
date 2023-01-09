import Home from './../pages/home.js'
import Detail from './../pages/detail.js'

export default class Router {
    constructor() {
        this.home = new Home()
        this.detail = new Detail()
        this.pages = {
            home: '',
            detail: 'juice-detail'
        }
        this.root = () => {
            //FIX: if root url contain or equal one of the our pages name -> error
            const pages = [
                'index.html',
                location.host,

                ...Object.values(this.pages)
            ]
            let urlBySlash = location.href.split('/')

            //delete protocol
            urlBySlash.shift() // delete http or https ...
            urlBySlash.shift() // delete empty between two slashes http://

            pages.forEach((page) => {
                urlBySlash.forEach((url, urlIndex) => {
                    if (
                        url.trim() !== '' &&
                        page.trim() !== '' &&
                        url.trim().includes(page.trim())
                    ) {
                        urlBySlash.splice(urlIndex, 1)
                    }
                })
            })

            let rootPath = '/'
            urlBySlash.forEach((e) => {
                if (e.trim() !== '') rootPath += e + '/'
            })

            return rootPath
        }
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
                path: this.root(),
                view: this.home.view
            },
            {
                path: this.root() + 'juice-detail',
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
            return this.root() + this.pages.detail
        } else if (page === 'home') {
            return this.root() + this.pages.home
        } else {
            return this.root() + this.pages.home
        }
    }

    getPathName() {
        const pathNameBySlash = location.pathname.split('/')
        if (pathNameBySlash[pathNameBySlash.length - 1] === 'index.html')
            return location.pathname.slice(0, -10)
        else return location.pathname
    }

    getNameOfPath(path) {
        if (path === this.root) return 'home'
        else if (path === this.root() + this.pages.detail) return 'detail'
        else return 'home'
    }
}
