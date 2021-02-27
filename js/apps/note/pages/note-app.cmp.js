import noteTxt from '../cmps/note-txt.cmp.js'
import noteTodo from '../cmps/note-todo.cmp.js'
import noteImg from '../cmps/note-img.cmp.js'
import noteVideo from '../cmps/note-video.cmp.js'
import notesDisplay from '../cmps/notes-display.cmp.js'
import { noteService } from '../services/note.service.js'

export default {
    name: 'note-app',
    template: `
        <section v-if="currCmp" class="note-app">
            <form @submit.prevent="save" class="note-compose-container">
                <component :is="currCmp.type" :info="currCmp.info" @setVal="setAns($event)"></component>
                <div class="cmp-type-container"> 
                    <i class="fa fa-font" aria-hidden="true" @click="changeCmp('note-txt')"></i>
                    <i class="fa fa-picture-o" aria-hidden="true" @click="changeCmp('note-img')"></i>
                    <i class="fa fa-youtube-play" aria-hidden="true" @click="changeCmp('note-video')"></i>
                    <i class="fa fa-list-ul" aria-hidden="true" @click="changeCmp('note-todo')"></i>
                </div>
            </div>
        </form>
        <div class="curr-note">
            {{answer}}
        </div>
        <div class="notes-display-container">
            <div :class="note.type" class="note-card" v-for="(note, idx) in notes">
            <notes-display :note="note" @remove="removeNote"/>
            </div>
        </div>
    </section>
    `,
    data() {
        return {
            notes: null,
            answer: '',
            currCmp: null,
            // selected: 'selected'
        }
    },
    created() {
        noteService.query()
            .then(notes => {
                this.notes = notes
                this.currCmp = notes[0]
            })
    },
    methods: {
        removeNote(noteId) {
            noteService.remove(noteId)
                .then(()=>noteService.query())
                .then(notes => {
                    this.notes = notes
                })
        },
        changeCmp(cmpType) {
            console.log(cmpType)
            this.currCmp = this.notes.find(cmp => cmp.type === cmpType)
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
    computed: {
        changeClass(note) {
            return note.type
        }
    },
    components: {
        noteTodo,
        noteTxt,
        noteImg,
        noteVideo,
        notesDisplay
    }
}