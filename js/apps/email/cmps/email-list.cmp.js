import emailPreview from './email-preview.cmp.js'

export default {
    name: 'email-list',
    props: ['emails'],
    template: `
        <ul class="email-list">
            <li v-for="email in emails" :key="email.id" class="email-preview-container">
                <router-link :to="'/email/'+email.id">
                    <email-preview :email="email"/>
                </router-link>
            </li>
        </ul>
    `,
    methods: {
        remove(emailId) {
            console.log('second remove');
            console.log(this.email.id);
            this.$emit('remove', emailId);
        }
    },
    components: {
        emailPreview
    }
}