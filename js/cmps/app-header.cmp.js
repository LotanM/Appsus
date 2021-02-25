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
            <img class="menu-icon" src="../../icons/menu.svg" @click="toggleClass" >
            <div class="dropdown-container" :class="dropDownClass">
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
            dropDownClass: 'close-dropdown'
        }
    },
    methods: {
        toggleClass() {
            if (this.dropDownClass === 'close-dropdown') this.dropDownClass = 'open-dropdown'
            else this.dropDownClass = 'close-dropdown'
        }
    }
}
