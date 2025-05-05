import homePage from './pages/HomePage.js'
import lastVideos from './pages/LastVideos.js'
import lastPosts from './pages/LastPosts.js'

function navTo(url) {
    history.pushState(null, null, url)
    router()
}

function router() {
    const routes = [
        {
            path: '/spa-project/',
            view: homePage
        },
        {
            path: '/spa-project/last-videos',
            view: lastVideos
        },
        {
            path: '/spa-project/last-posts',
            view: lastPosts
        }
    ]

    const matchRoutes = routes.map((item) => {
        return {
            route: item,
            isMatch: location.pathname === item.path
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

    document.querySelector('#app').innerHTML = match.route.view()
}

document.addEventListener('popstate', router)

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (event) => {
        if (event.target.matches('[data-link]')) {
            event.preventDefault()
            const url =
                'http://' +
                event.target.href.split('/')[
                    event.target.href.split('/').length - 2
                ] +
                '/spa-project/' +
                event.target.href.split('/')[
                    event.target.href.split('/').length - 1
                ]

            navTo(url)
        }
    })

    // router()
})
