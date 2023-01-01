import Router from './router.js'
const router = new Router()

document.addEventListener('popstate', router.router)

document.addEventListener('DOMContentLoaded', () => {
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

            router.navTo(url)
        }
    })

    router.router()
})
