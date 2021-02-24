export default {
    name: 'email-filter',
    template: `
        <section class="email-filter">
            <label>by Name: </label>
            <input type="text" @input="setFilter" placeholder="Search by Email Name" v-model="filterBy.byName">
        </section>    
    `,
    data(){
        return {
            filterBy: {
                byName: '',
            }
        }
    },
    methods:{
        setFilter(){
            this.$emit('filtered', this.filterBy)
        }
    }
}