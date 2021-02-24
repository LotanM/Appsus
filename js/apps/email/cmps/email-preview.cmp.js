export default {
    name: 'email-preview',
    props: ['email'],
    template: `
        <section class="email-preview">
            <p>{{email.subject}}</p>
            <p>{{email.body.substring(0, 100)}}...</p> 
        </section>
        `,
}