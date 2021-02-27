import emailPreview from './email-preview.cmp.js'
import emailFilter from './email-filter.cmp.js'

export default {
    name: 'email-list',
    props: ['emails'],
    template: ` 
    <section class="email-list-container">
        <email-filter @filtered="setFilter"/>
        <ul class="email-list">
            <li v-for="email in emails" :key="email.id" class="email-preview-container">
                <div class="star-list">
                    <span class="star star-1 fa fa-star" :class="{starred: email.isStarred}" @click="toggleStarred(email)"></span>
                </div>
                <router-link :to="'/email/'+email.id">
                        <email-preview :email="email" @read="setEmailToRead"/>
                </router-link>
            </li>
        </ul>
    </section>
    `,
    methods: {
        setFilter(filterBy) {
            this.$emit('filtered', filterBy)
        },
        setEmailToRead(readEmail) {
            this.$emit('read', readEmail)
        },
        toggleStarred(email){
            console.log('email.isStarred', email.isStarred)
            email.isStarred = !email.isStarred
            this.$emit('starred', email)
        }
    },
    components: {
        emailPreview,
        emailFilter
    }
}