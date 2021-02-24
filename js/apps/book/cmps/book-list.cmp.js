'use strict';

import bookPreview from './book-preview.cmp.js'

export default {
    name: 'book-list',
    props: ['books'],//books to show
    template: `
        <ul class="book-list flex wrap justify-around clean-list justify-center">
            <li v-for="book in books" :key="book.id" class="book-preview-container">
                <book-preview :book="book"></book-preview>
                <div class="btns-container">
                    <router-link :to="'/book/'+book.id">Details</router-link>
                    <button @click="remove(book.id)">X</button>
                    <router-link :to="'/book/edit/'+book.id">Edit</router-link>
                </div>
            </li>
        </ul>
    `,
    methods: {
        remove(bookId){
            this.$emit('remove', bookId);
        }
    },
    components: {
        bookPreview
    }
}