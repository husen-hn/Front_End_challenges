import Router from './router.js'

const router = new Router()

document.addEventListener('popstate', router.router)

document.addEventListener('DOMContentLoaded', () => router.init())
