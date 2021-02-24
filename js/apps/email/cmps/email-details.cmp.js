import { emailService } from '../services/email.service.js'


// SMART COMPONENT!

export default {
    name: 'email-details',
    template: `
    <section class="email-details" v-if="email">
        <router-link to="/email">Back to inbox</router-link>
        <button @click="removeEmail(email.id)">Delete</button>
        <h1 class="subject">Subject: {{email.subject}}</h1>
        <p class="body">{{email.body}}</p>
        <p>{{email.sentAt}}</p>
        <button><--Reply</button>
        <button>Forward--></button>
    </section>
    `,
    data() {
        return {
            email: null
        }
    },
    methods: {
        loadEmails() {
            emailService.query()
                .then(emails => this.emails = emails)
        },
        removeEmail(emailId){
            this.$emit('remove', emailId);
        }
    },
    created() {
        const id = this.$route.params.emailId
        emailService.getById(id)
            .then(email => this.email = email)
    }
}