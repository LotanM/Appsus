import { bookService } from '../services/book.service.js'
import bookFilter from '../cmps/book-filter.cmp.js'
import bookList from '../cmps/book-list.cmp.js'
import bookAdd from './book-add.cmp.js'

export default {
    name: 'book-app',
    template: `
        <section class="book-app">
            <book-add></book-add>
            <book-filter @filtered="setFilter"></book-filter>
            <book-list :books="booksToShow" @remove="removeBook"></book-list>
            <router-link to="/book/edit/">Add a new book</router-link>
        </section>
    `,
    data() {
        return {
            books: [],
            filterBy: null,
            selectedBook: null
        }
    },
    methods: {
        loadBooks() {
            bookService.query()
                .then(books => this.books = books)
        },
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
        removeBook(bookId) {
            bookService.remove(bookId)
                .then(this.loadBooks)
        }
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books
            var booksToShow = this.books;
            if (this.filterBy.byName) {
                const searchStr = this.filterBy.byName.toLowerCase()
                booksToShow = this.books.filter(book => {
                    return book.title.toLowerCase().includes(searchStr)
                })
            }
            if (this.filterBy.fromPrice) {
                booksToShow = this.books.filter(book => {
                    return book.listPrice.amount >= this.filterBy.fromPrice
                })
            }
            if (this.filterBy.toPrice) {
                booksToShow = this.books.filter(book => {
                    return book.listPrice.amount <= this.filterBy.toPrice
                })
            }
            if (this.filterBy.fromPrice && this.filterBy.toPrice) {
                booksToShow = this.books.filter(book => {
                    return book.listPrice.amount >= this.filterBy.fromPrice
                        && book.listPrice.amount <= this.filterBy.toPrice
                })
            }
            if (this.filterBy.fromPrice && this.filterBy.toPrice && this.filterBy.byName) {
                const searchStr = this.filterBy.byName.toLowerCase()
                booksToShow = this.books.filter(book => {
                    return book.listPrice.amount >= this.filterBy.fromPrice
                        && book.listPrice.amount <= this.filterBy.toPrice
                        && book.title.toLowerCase().includes(searchStr)
                })
            }
            return booksToShow;
        }
    },
    created() {
        this.loadBooks()
    },
    components: {
        bookFilter,
        bookList,
        bookAdd
    }
}