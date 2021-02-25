export default {
    name: 'app-header',
    template: `
    <header class="app-header">
        <div class="logo">
            <router-link to="/">
            <img class="logo-icon" src="../icons/logo-final.svg" alt="">
        </router-link>
        <h1>Appsus</h1>
        </div>
        <div class="menu-container">
            <img class="menu-icon" src="../../icons/menu.svg">
            <div class="dropdown-container">
                <router-link to="/book"><img src="../../icons/book.svg" alt=""></router-link>
                <router-link to="/note"><img src="../../icons/note.svg" alt=""></router-link>
                <router-link to="/email"><img src="../../icons/mail.svg" alt=""></router-link>
                <router-link to="/about"><img src="../../icons/about.svg" alt=""></router-link>
            </div>
        </div>
    </header>
    `,
    data(){
        return {
            isOpen: false
        }
    },
    methods: {
        toggleClass() {
            this.isOpen = !isOpen
            console.log('toggleClass:')
            return this.isOpen ? 'open-dropdown' : 'close-dropdown'
        }
    }
}
