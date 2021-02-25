import noteTxt from '../cmps/note-txt.cmp.js'
import noteTodo from '../cmps/note-todo.cmp.js'
// import noteImg from '../cmps/note-img.cmp.js'
// import noteVideo from '../cmps/note-video.cmp.js'
import { noteService } from '../services/note.service.js'

export default {
    name: 'note-app',
    template: `
        <section v-if="currCmp" class="note-app">
            <form @submit.prevent="save" class="note-compose-container">
                <component :is="currCmp.type" :info="currCmp.info" @setVal="setAns($event)"></component>
                <div class="cmp-type-controller"> 
                    <img type="button" src="../../../../icons/txt.png" @click="changeCmp('noteTxt')">
                    <img type="button" src="../../../../icons/img.png" @click="changeCmp('noteImg')">
                    <img type="button" src="../../../../icons/todo.png" @click="changeCmp('noteTodo')">
                    <img type="button" src="../../../../icons/video.png" @click="changeCmp('noteVideo')">
                </div>
            </div>
            <button>Save</button>
        </form>
        <div class="curr-note">
            <pre>{{answer}}</pre>
        </div>
        <div class="notes-display-container">
            <div class="txt-type" v-for="note in notes.cmps">
                <p>{{note.info.txt}}</p>
            </div>
        </div>
    </section>
    `,
    data() {
        return {
            txt: '',
            label: '',
            notes: null,
            answer: '',
            currCmp: null
        }
    },
    created() {
        noteService.query()
            .then(notes => {
                this.notes = notes
                this.currCmp = notes.cmps[0]
            })
    },
    methods: {
        changeCmp(cmpType) {
            this.currCmp = this.notes.cmps.find(cmp => cmp.type === cmpType)
        },
        setAns(ans) {
            this.answer = ans

        },
        save() {
            noteService.save(this.answer, this.currCmp.type)
            noteService.query()
                .then(notes => this.notes = notes)
        }
    },
    components: {
        noteTodo,
        noteTxt,
        // noteImg,
        // noteVideo
    }
}