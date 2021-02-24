// import { emailService } from '../services/email.service.js'
// import emailFilter from '../cmps/email-filter.cmp'
import emailList from '../cmps/email-list.cmp.js'
// import emailCompose from '../cmps/email-compose.cmp.js'

export default {
    name: 'email-app',
    template: `
    <section class="email-app">
        <h1>Email App</h1>
        <email-list/>
    </section>
    `,
    components: {
        emailList
    }
}