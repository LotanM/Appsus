import { emailService } from '../services/email.service.js'
import { eventBus } from '../../../services/event-bus.service.js'

export default {
    name: 'email-compose',
    template: `
    <section v-if="email" class="email-compose">
        <h3>Compose a new email</h3>
<<<<<<< HEAD
        <form @submit.prevent="save(email.id)">
=======
        <form @submit.prevent.stop="save(email.id)">
>>>>>>> e29f9d239a7450b06927ff7a7685dcaa24ea704e
            <label for="email-address">Email Address: </label>
            <input id="email-address" placeholder="Email Address" type="email" >
            <label for="subject">Subject: </label>
            <input id="subject" placeholder="Subject" type="text" v-model="email.subject">
            <label for="body">Body: </label>
            <textarea rows="10" id="body" placeholder="Type in your words" type="text" v-model="email.body"></textarea>
            <button type="submit">Save</button>
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
            console.log('this.email', this.email)
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
    created() {
        this.email = emailService.getEmptyEmail()
    },
}
