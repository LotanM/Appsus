import { bookService } from '../services/book.service.js'

export default {
    name: 'book-add',
    template: `
    <section class="book-add">
        <h1>Add book from Gogle Books</h1>
        <input type="text" placeholder="search by book name or author" @input="updateData" v-model="searchStr">
        <ul v-if="searchResults" class="results-list">
            <li v-for="(searchResult, idx) in searchResults" :key="idx" class="results-list-container" >
                <h4>{{searchResult}}</h4>
                <button @click="addBook(searchResult)">+</button> 
            </li>
        </ul>
    </section>
    `,
    data() {
        return {
            searchStr: '',
            googleBook: null,
            searchResults: [],
        }
    },
    methods: {
        updateData() {
            fetch(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${this.searchStr}`)
                .then(results => results.json())
                .then(formattedResults => {
                    const { id, volumeInfo, saleInfo } = formattedResults.items[0]
                    const { title, authors, subtitle, publishedDate, description, pageCount, categories, language , imageLinks} = volumeInfo;
                    const thumbnail = imageLinks.thumbnail
                    console.log('thumbnail', thumbnail)
                    this.searchResults.push({ id, title, subtitle, authors, publishedDate, description, pageCount, categories, thumbnail, language });
                })
        },
        addBook(searchResult) {
            console.log('searchResult', searchResult)
            const addedBook = {
                ...searchResult,
                'listPrice': {
                    'amount': 109,
                    'currencyCode': 'EUR',
                    'isOnSale': false
                },
                'reviews': {
                    'full-name': '',
                    'star-rating': null,
                    'read-at': null,
                    'review-text': ''
                }
            }
            bookService.addGoogleBook(addedBook)
        }
    },
    created() {
    },
}