// import Router from './router.js'

// const router = new Router()

// document.addEventListener('popstate', router.router)

// document.addEventListener('DOMContentLoaded', () => router.init())

let contentDiv = document.getElementsByClassName('products')

let routes = {
    '/': homepage,
    '/index.html': homepage,
    '/contact': contact
}

window.onpopstate = () => {
    console.log(`onpopstate ${window.location.pathname}`)
    contentDiv.innerHTML = routes[window.location.pathname]
}

let onNavItemClick = (pathName) => {
    window.history.pushState(
        {},
        pathName,
        window.location.origin +
            // '/Front_End_challenges/juice-shopping-store' +
            '/juice-shopping-store' +
            pathName
    )
    contentDiv.innerHTML = routes[pathName]
}

contentDiv.innerHTML = routes[window.location.pathname]
