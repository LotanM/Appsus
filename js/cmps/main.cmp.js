import { myRouter } from './routes.js'
import appHeader from './cmps/app-header.cmp.js'

const options = {
    el: '#app',
    router: myRouter,
    template: `
            <section>
                <app-header />
                <router-view />
                <footer><p>&copy; Coffeerights 2021</p></footer>
            </section>
    `,
    components: {
        appHeader
    }
}

const app = new Vue(options)