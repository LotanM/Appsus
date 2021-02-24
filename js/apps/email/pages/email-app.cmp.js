import { emailService } from '../services/email.service.js'
import emailFilter from '../cmps/email-filter.cmp.js'
import emailList from '../cmps/email-list.cmp.js'


export default {
    name: 'email-app',
    template: `
    <section class="email-app">
    <email-filter @filtered="setFilter"/>
    <div class="main">
        <ul class="side-menu">
            <li class="compose">
                <router-link to="/email/compose">Compose</router-link>
            </li> 
            <li class="inbox" @click="isInbox = true"> inbox </li> 
            <li class="sent" @click="isInbox = false"> sent </li> 
        </ul>
        <router-view :emails="emailsToShow" @remove="removeEmail"/>
    </div>
    </section>
    `,
    data() {
        return {
            emails: [],
            filterBy: null,
            isInbox: true
        }
    },
    methods: {
        loadEmails() {
            emailService.query()
                .then(emails => this.emails = emails)
        },
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
        removeEmail(emailId) {
            console.log('last remove');
            emailService.remove(emailId)
                .then(this.loadEmails)
        }
    },
    computed: {
        emailsToShow() {
            if (this.isInbox) {
                var emailsToShow = this.emails.filter(email => {
                    return email.to === 'appsus@ca.com'
                })
            }
            else {
                var emailsToShow = this.emails.filter(email => {
                    return email.to !== 'appsus@ca.com'
                })
            }
            if (this.filterBy && this.filterBy.byName) {
                const searchStr = this.filterBy.byName.toLowerCase()
                emailsToShow = this.emails.filter(email => {
                    return email.subject.toLowerCase().includes(searchStr)
                })
            }
            return emailsToShow;
        }
    },
    created() {
        this.loadEmails()
    },
    components: {
        emailList,
        emailFilter,
    },
}