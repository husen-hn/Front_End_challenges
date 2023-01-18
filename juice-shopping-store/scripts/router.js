import Home from './../pages/home.js'
import Detail from './../pages/detail.js'

export default class Router {
    constructor() {
        this.home = new Home()
        this.detail = new Detail()
        this.root = () => {
            const pages = ['index.html', location.host]
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

            return rootPath.split('?')[0]
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
                name: 'home',
                view: this.home.view
            },
            {
                name: 'detail',
                view: this.detail.view
            }
        ]

        const params = new URLSearchParams(window.location.search)
        const id = params.get('juice-detail-id')
        if (id)
            routes.map((e) => {
                if (e.name === 'detail') e.view()
            })
        else
            routes.map((e) => {
                if (e.name === 'home') e.view()
            })
    }

    navToHome() {
        history.pushState(null, null, this.root())
        this.home.view()
    }

    navToJuiceDetail(id) {
        const params = new URLSearchParams()
        params.append('juice-detail-id', id)

        history.pushState(null, null, this.root() + '?' + params.toString())

        this.detail.view()
    }

    getNameOfPath() {
        const params = new URLSearchParams(window.location.search)
        const id = params.get('juice-detail-id')
        if (id) return 'detail'
        else if (location.pathname === this.root) return 'home'
        else return 'home'
    }
}
