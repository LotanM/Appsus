export default {
    name: 'email-preview',
    props: ['email'],
    template: `
        <section class="email-preview">
    <h4>{{email.subject}} <span class="email-desc">{{email.body.substring(0, 50)}}...</span></h4> 
        </section>
        `,
}