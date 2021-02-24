'use strict';

import { bookService } from '../services/book.service.js';

export default {
    name: 'book-details',
    template: `
    <section v-if="book" class="book-details">
        <router-link to="/book">X</router-link>
        <img v-bind:src="book.thumbnail" alt="" srcset="">
        <div class="p-container">
            <h3>Details</h3>
            <p>Id: {{book.id}}</p>
            <p>Title: {{book.title}}</p>
            <p>Subtitle: {{book.subtitle}}</p>
            <p>Authors: {{book.authors}}</p>
            <p>PublishedDate: {{book.publishedDate}}</p>
            <p>Description: {{book.description}}</p>
            <p>PageCount: {{book.pageCount}}</p>
            <p>Categories: {{book.categories}}</p>
            <p>Language: {{book.language}}</p>
            <p>Reviews: {{book.reviews}}</p>
            <p>Price: {{book.listPrice.amount}} {{book.listPrice.currencyCode}}</p>
            </div>
            <router-link :to="'/book/review/'+book.id">add Review</router-link>
    </section>
    `,
    data() {
        return {
            book: null
        }
    },
    created() {
        const id = this.$route.params.bookId
        bookService.getById(id)
            .then(book => this.book = book)
    }

}

