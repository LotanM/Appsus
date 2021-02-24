import emailPreview from './email-preview.cmp.js'

export default {
    props: ['emails'],
    template:` 
        <ul class="email-list">
            <li v-for="email in emails" :key="email.id" class="email-preview-container">
                <email-preview :email="email"/>
                <div class="btns-container">
                    <router-link :to="'/email/'+email.id">Details</router-link>
                    <router-link :to="'/email/edit/'+email.id">Edit</router-link>
                </div>
            </li>
        </ul>
    `,
    components: {
        emailPreview
    }
}