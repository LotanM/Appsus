'use strict';

export default {
    name: 'book-preview',
    props: ['book'],
    template: `
        <section class="book-preview">
            <img v-bind:src="book.thumbnail" alt="" srcset="">
            <p>Title: {{book.title}}</p>
            <p>Price: {{book.listPrice.amount}} {{book.listPrice.currencyCode}}</p> 
        </section>
        `,
    data() {
        return {
            price: null
        }
    },
}

