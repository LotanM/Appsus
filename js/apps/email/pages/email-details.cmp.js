import { emailService } from '../services/email.service.js'
export default {
    name: 'email-details',
    template: `
    <section class="email-details" v-if="email">
        <router-link to="/email">Back to inbox</router-link>
        <button @click="remove(email.id)">Delete</button>
        <div class="">
            <h1 class="subject">Subject: {{email.subject}}</h1>
            <p class="body">{{email.body}}</p>
            <p>{{email.sentAt}}</p>
            <button><--Reply</button>
            <button>Forward--></button>
        </div>
    </section>
    `,
    data() {
        return {
            email: null
        }
    },
    methods: {
        remove(emailId) {
            console.log('first remove');
            console.log(this.email.id);
            this.$emit('remove', emailId);
        }
    },
    created() {
        const id = this.$route.params.emailId
        emailService.getById(id)
            .then(email => this.email = email)
    }
}