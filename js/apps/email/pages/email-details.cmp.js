import { emailService } from '../services/email.service.js'


// SMART COMPONENT!

export default {
    name: 'email-details',
    template: `
    <section class="email-details" v-if="email">
        <router-link to="/email">Back to inbox</router-link>
        <button @click="removeEmail(email.id)">Delete</button>
        <!-- <div class=""> -->
            <h1 class="subject">Subject: {{email.subject}}</h1>
            <pre class="body">{{email.body}}</pre>
            <p>{{email.sentAt}}</p>
            <button><--Reply</button>
            <button>Forward--></button>
        <!-- </div> -->
    </section>
    `,
    data() {
        return {
            email: null
        }
    },
    methods: {
        removeEmail(emailId) {
            emailService.remove(emailId)
                .then(this.$router.push('/email'))
        }
    },
    created() {
        const id = this.$route.params.emailId
        emailService.getById(id)
            .then(email => this.email = email)
    }
}