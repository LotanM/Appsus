export default {
    name: 'home-page',
    template: `
    <section class="home-page">
    <div class="hero">
        <!-- <div class="images-container">
            <div class="profile-img"><img src="https://ca.slack-edge.com/T01FLU17LTC-U01HHR0MNPR-98663c8ba16b-512" alt=""></div> 
            <div class="profile-img"><img src="https://ca.slack-edge.com/T01FLU17LTC-U01FJ1LQY6R-6e45df534775-512" alt=""></div> 
        </div> -->
        <div class="hero-txt">
            <h3>Set meetings using<span> Email</span></h3>
            <h3><span>Take a note</span> using notes</h3>
            <h3>Manage your own<span> Book Shop</span></h3>
            <h3>Do all that using Appsus!</h3>
            <router-link to="/about">
                 <button>About Us</button>
            </router-link>
        </div>
    </div>

    </section>
    `
}