'use strict';

import { bookService } from '../services/book.service.js';

export default {
    name: 'book-details',
    template: `
    <section v-if="book" class="book-details">
        <img v-bind:src="book.thumbnail" alt="" srcset="">
        <div class="book-details-container">
            <router-link to="/book"><button class=back-btn>↵</button></router-link>
            <h1>{{book.title}}</h1>
            <p>{{book.authors[0]}} (Author)</p>
            <p>Price: {{getCurrencyIcon}}</p>
            <p>Pages: {{book.pageCount}}</p>
            <h2>Description:</h2>
            <p>{{book.description}}</p>
            <p>Subtitle: {{book.subtitle}}</p>
            <h4>Product Details:</h4>
            <p>Publish Date: {{book.publishedDate}}</p>
            <p>{{readingTime}}</p>
            <p>{{bookPublishTime}}</p>
            <p>Language: {{book.language}}</p>
            <p >Categories: {{book.categories}}</p>
            <router-link :to="'/book/review/'+book.id">add Review</router-link>
        </div>
    </section>
    `,
    data() {
        return {
            book: null
        }
    },
    computed: {
        readingTime() {
            if (this.book.pageCount < 100) return 'Light Reading!'
            else if (this.book.pageCount > 200) return 'Decent Reading!'
            else if (this.book.pageCount > 500) return 'Long Reading!'
        },
        bookPublishTime() {
            if (this.book.publishedDate > (new Date().getFullYear() - 10)) return 'Veteran Book'
            else if (this.book.pageCount < (new Date().getFullYear() - 1)) return 'New!'
        },
        getCurrencyIcon() {
            return (this.book.listPrice.amount.toLocaleString('de-DE', {
                style: 'currency',
                currency: this.book.listPrice.currencyCode
            }))
        }
    },
    created() {
        const id = this.$route.params.bookId
        bookService.getById(id)
            .then(book => this.book = book)
    }

}

