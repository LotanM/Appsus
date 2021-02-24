export default {
    name: 'app-header',
    template: `
    <header class="app-header">
        <div class="logo">
            <h1>Appsus</h1>
        </div>
        <nav>
            <router-link active-class="active-link" to="/" exact>Home</router-link> |
        </nav>

        <img class="menu-icon" src="../../icons/menu.svg" :class="toggleClass" @click="isMenuOpen=!isMenuOpen">
        <div class="dropdown-container">
            <router-link to="/book">Books</router-link>
            <router-link to="/note">note</router-link>
            <router-link to="/email">eMail</router-link>
            <router-link to="/about">About</router-link>
        </div>
    </header>
    `,
    data(){
        return {
            isMenuOpen: false
        }
    },
    methods: {
        toggleClass() {
            return this.isMenuOpen ? 'open-dropdown' : 'close-dropdown'
        }
    }
}
