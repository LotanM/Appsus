import emailPreview from './email-preview.cmp.js'
import emailFilter from './email-filter.cmp.js'

export default {
    name: 'email-list',
    props: ['emails'],
<<<<<<< HEAD
    template: `
=======
    template: ` 
    <section>
        <email-filter @filtered="setFilter"/>
>>>>>>> e29f9d239a7450b06927ff7a7685dcaa24ea704e
        <ul class="email-list">
            <li v-for="email in emails" :key="email.id" class="email-preview-container">
                <router-link :to="'/email/'+email.id">
                    <email-preview :email="email"/>
                </router-link>
            </li>
        </ul>
    </section>
    `,
    methods: {
        setFilter(filterBy) {
            this.$emit('filtered', filterBy)
        }
    },
    components: {
        emailPreview,
        emailFilter
    }
}