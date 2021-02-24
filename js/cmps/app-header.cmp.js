export default {
    name: 'app-header',
    template: `
    <header class="app-header">
        <div class="logo">
            <h1>Books</h1>
        </div>
        <nav>
            <router-link active-class="active-link" to="/" exact>Home</router-link> |
            <router-link to="/book">Books</router-link>
            <router-link to="/keep">Keep</router-link>
            <router-link to="/email">eMail</router-link>
            <router-link to="/about">About</router-link>
        </nav>
    </header>
    `,
}
