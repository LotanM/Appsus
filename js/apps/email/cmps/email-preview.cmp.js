export default {
    name: 'email-preview',
    props: ['email'],
    template: `
        <section class="email-preview">
            <img v-bind:src="email.thumbnail" alt="" srcset="">
            <p>{{email.subject}}</p>
            <p>{{email.body}}</p> 
        </section>
        `,
}