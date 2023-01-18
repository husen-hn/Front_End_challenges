// import Router from './router.js'

// const router = new Router()

// document.addEventListener('popstate', router.router)

// document.addEventListener('DOMContentLoaded', () => router.init())

let routes = {
    '/': homepage,
    '/index.html': homepage,
    '/portfolio': portfolio,
    '/work': work,
    '/contact': contact
}

window.onpopstate = () => {
    console.log('onpopstate')
    contentDiv.innerHTML = routes[window.location.pathname]
}
