import bookApp from './apps/book/pages/book-app.cmp.js'
import homePage from './pages/home-page.cmp.js'
import keepApp from './apps/keep/pages/keep-app.cmp.js'
import emailApp from './apps/mail/pages/email-app.cmp.js'
import aboutPage from './pages/about-page.cmp.js'
// import bookDetails from './pages/book-details.cmp.js'
// import about from './pages/about.cmp.js'

const routes = [
    {
        path: '/',
        component: homePage,
    },
    {
        path: '/book',
        component: bookApp
    },
    {
        path: '/about',
        component: aboutPage
    },
    {
        path: '/keep',
        component: keepApp
    },
    {
        path: '/email',
        component: emailApp
    }
]

export const myRouter = new VueRouter({ routes })