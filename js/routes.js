//main routes
import homePage from './pages/home-page.cmp.js'
import aboutPage from './pages/about-page.cmp.js'
//book routes
import bookApp from './apps/book/pages/book-app.cmp.js'
import bookDetails from './apps/book/pages/book-details.cmp.js'
import bookReview from './apps/book/pages/book-review.cmp.js'
//email routes
import emailApp from './apps/email/pages/email-app.cmp.js'
import emailDetails from './apps/email/pages/email-details.cmp.js'
//note routs
import noteApp from './apps/note/pages/note-app.cmp.js'

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
        path: '/book/:bookId',
        component: bookDetails
    },
    {
        path: '/book/review/:bookId?',
        component: bookReview
    },
    {
        path: '/about',
        component: aboutPage
    },
    {
        path: '/note',
        component: noteApp
    },
    {
        path: '/email',
        component: emailApp
    },
    {
        path: '/email/:emailId',
        component: emailDetails
    }
]

export const myRouter = new VueRouter({ routes })