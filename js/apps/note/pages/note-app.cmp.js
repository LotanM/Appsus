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
                <component :is="currCmp.type" :info="currCmp.info" @setVal="setAns($event, currCmp.type)"></component>
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
            <pre>{{answers}}</pre>
        </div>
    </section>
    `,
    data() {
        return {
            txt: '',
            label: '',
            notes: null,
            answers: [],
            currCmp: null
        }
    },
    created() {
        noteService.getById()
            .then(notes => {
                this.notes = notes
                this.answers = new Array(this.notes.cmps.length)
                this.currCmp = notes.cmps[0]
            })
    },
    methods: {
        changeCmp(cmpType) {
            this.currCmp = this.notes.cmps.find(cmp => cmp.type === cmpType)
        },
        setAns(ans, cmpType) {
            const idx = this.notes.cmps.findIndex(cmp => cmp.type === cmpType)
            console.log('idx', idx)
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