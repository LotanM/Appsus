import { emailService } from '../services/email.service.js'
import { eventBus } from '../../../services/event-bus.service.js'

export default {
    template: `
    <section v-if="email" class="email-edit app-main">
        <h3>Compose a new email</h3>
        <form @submit.prevent="save">
            <label for="email-address">Email Address: </label>
            <input id="email-address" placeholder="Email Address" type="email" >
            <label for="subject">Email Address: </label>
            <input id="subject" placeholder="Subject" type="text" v-model="email.subject">
            <label for="body" v-model="email.subject">Body: </label>
            <textarea id="body" placeholder="Type in your words" type="text" v-model="email.body"></textarea>
            <button>Save</button>
        </form>
    </section>
    `,
    data() {
        return {
            email: null
        }
    },
    methods: {
        save() {
            emailService.save(this.email)
                .then(email => {
                    console.log('Saved Email:', email);
                    const msg = {
                        txt: 'Email saved succesfully',
                        type: 'success'
                    }
                    eventBus.$emit('show-msg', msg)
                    this.$router.push('/email')
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
    // computed: {
    //     emailId() {
    //         return this.$route.params.emailId
    //     }
    // },
    created() {
        this.email = emailService.getEmptyEmail()
    },
    // watch: {
    //     email: {
    //         handler(val) {
    //             console.log('Email Modified', val)
    //             // TODO: Call the Validation Service
    //         },
    //         deep: true
    //     }
    // }
}
