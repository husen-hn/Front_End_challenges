function navTo(url) {
    history.pushState(null, null, url)
    router()
}

function router() {
    const routes = [
        {
            path: '/spa-project/',
            view: () => console.log('/spa-project/')
        },
        {
            path: '/spa-project/last-videos',
            view: () => console.log('/spa-project/last-videos')
        },
        {
            path: '/spa-project/last-posts',
            view: () => console.log('/spa-project/last-posts')
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

    console.log(match.route.view())
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

    router()
})
