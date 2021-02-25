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
                    <img type="button" src="../../../../icons/txt.png" @click="changeCmp('note-txt')">
                    <img type="button" src="../../../../icons/img.png" @click="changeCmp('note-img')">
                    <img type="button" src="../../../../icons/todo.png" @click="changeCmp('note-todo')">
                    <img type="button" src="../../../../icons/video.png" @click="changeCmp('note-video')">
                </div>
            </div>
            <button>Save</button>
        </form>
        <div class="curr-note">
            <pre>{{answer}}</pre>
        </div>
        <div class="notes-display-container">
            <div v-for="(note, idx) in notes.cmps">
                <!-- <notes-display></notes-display> -->
                <div :class="note.type">
                    {{note.type}}
                    <p>{{note.info}}</p>
                </div>
            </div>
        </div>
    </section>
    `,
    data() {
        return {
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
            console.log('cmpType', cmpType)
            this.currCmp = this.notes.cmps.find(cmp => cmp.type === cmpType)
            console.log('this.currCmp', this.currCmp)
        },
        setAns(ans) {
            this.answer = ans

        },
        save() {
            console.log('this.currCmp.type', this.currCmp.type)
            noteService.save(this.answer, this.currCmp.type)
            noteService.query()
                .then(notes => this.notes = notes)
        }
    },
    computed:{
        changeClass(note){
            return note.type
        }
    },
    components: {
        noteTodo,
        noteTxt,
        // noteImg,
        // noteVideo
    }
}