import noteTxt from '../cmps/note-txt.cmp.js'
import noteTodo from '../cmps/note-todo.cmp.js'
// import noteImg from '../cmps/note-img.cmp.js'
// import noteVideo from '../cmps/note-video.cmp.js'
import { noteService } from '../services/note.service.js'


export default {
    name: 'note-app',
    template: `
        <section v-if="notes" class="note-app">
            <h2>{{notes.title}}</h2>
            <form @submit.prevent="save">
                <div v-for="(cmp, idx) in notes.cmps">
                    <component :is="cmp.type"  :info="cmp.info" @setVal="setAns($event, idx)"></component>
                </div>
                <button>Save</button>
            </form>
            <pre>{{answers}}</pre>
        </section>
    `,
    data() {
        return {
            txt: '',
            label: '',
            notes: null,
            answers: []
        }
    },
    created() {
        noteService.getById()
            .then(notes => {
                this.notes = notes
                this.answers = new Array(this.notes.cmps.length)
            })

    },
    methods: {
        setAns(ans, idx) {
            console.log('Setting the answer: ', ans, 'idx:', idx);
            this.answers.splice(idx, 1, ans)
            console.log('this.answers', this.answers)

        },
        save() {
            console.log('Saving..', this.answers);
        }
    },
    components: {
        noteTodo,
        noteTxt,
        // noteImg,
        // noteVideo
    }
};