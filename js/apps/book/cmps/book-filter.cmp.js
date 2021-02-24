'use strict';

export default {
    name: 'book-filter',
    template: `
        <section class="book-filter flex wrap">
            <label>by Name: </label>
            <input type="text" @input="setFilter" placeholder="Search by Book Name" v-model="filterBy.byName">
            <label>by Price range: </label>
            <input type="number" @input="setFilter" placeholder="From Price" v-model.number="filterBy.fromPrice">
            <input type="number" @input="setFilter" placeholder="To Price" v-model.number="filterBy.toPrice">
        </section>    
    `,
    data(){
        return {
            filterBy: {
                byName: '',
                fromPrice: null,
                toPrice: null
            }
        }
    },
    methods:{
        setFilter(){
            this.$emit('filtered', this.filterBy)
        }
    }
}