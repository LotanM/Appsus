import { emailService } from '../services/email.service.js'
import { eventBus } from '../../../services/event-bus.service.js'

export default {
    name: 'email-compose',
    template: `
    <section v-if="email" class="email-compose">
        <h4>{{title}}</h4>
        <form @submit.prevent.stop="save(email.id)" class="email-compose-form">
            <div>
                <label for="email-address">Email Address: </label>
                <input id="email-address" placeholder="Email Address" type="email" v-model="email.to">
            </div>
            <div>
                <label for="subject">Subject: </label>
                <input id="subject" placeholder="Subject" type="text" v-model="email.subject">
            </div>
            <div>
                <label for="body">Body: </label><br>
                <textarea rows="10" id="body" placeholder="Type in your words" type="text" v-model="email.body"></textarea>
            </div>
            <div class="compose-button-container">
                <button type="submit" class="save">Save</button>
                <router-link to="/email">Back to inbox</router-link>
            </div>
        </form>
    </section>
    `,
    data() {
        return {
            email: null
        }
    },
    methods: {
        save(emailId) {
            this.email.sentAt = Date.now()
            emailService.addEmail(this.email)
                .then(email => {
                    console.log('Saved Email:', email);
                    const msg = {
                        txt: 'Email saved succesfully',
                        type: 'success'
                    }
                    eventBus.$emit('show-msg', msg)
                    this.$router.push('/email')
                    this.$emit('save', emailId);
                })
                .catch(err => {
                    console.log(err);
                    const msg = {
                        txt: 'Error, please try again later',
                        type: 'error'
                    }
                    eventBus.$emit('show-msg', msg)
                })
        }
    },
    computed: {
        title() {
            return this.emailId ? 'Reply' : 'Compose a new email'
        },
        emailId() {
            return this.$route.params.emailId
        }
    },
    created() {
        this.email = emailService.getEmptyEmail()
    },
}
