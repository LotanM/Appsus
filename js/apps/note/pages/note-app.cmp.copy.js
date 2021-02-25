import noteTxt from '../cmps/note-txt.cmp.js'
// import noteTodo from '../cmps/note-todo.cmp.js'
// import noteImg from '../cmps/note-img.cmp.js'
// import noteVideo from '../cmps/note-video.cmp.js'
import { noteService } from '../services/note.service.js'


export default {
    name: 'note-app',
    template: `
        <section v-if="currCmp" class="note-app">
            <h1>Add A note!</h1>
            <form @submit.prevent.stop="save(note.id)" class="note-compose-container">
                <component :is="currCmp.type" :info="currCmp.info" @setVal="setAns($event, currCmp.type)"></component>
                <div class="cmp-type-controller"> 
                    <img type="button" src="../../../../icons/txt.png" @click="changeCmp('noteTxt')">
                    <img type="button" src="../../../../icons/img.png" @click="changeCmp('noteImg')">
                    <img type="button" src="../../../../icons/todo.png" @click="changeCmp('noteTodo')">
                    <img type="button" src="../../../../icons/video.png" @click="changeCmp('noteVideo')">
                </div>
            <button type="submit">Save</button>
        </form>
        <div class="note-card">

        </div> 
    </section>`,
    data() {
        return {
            notes: null,
            setNoteObjType: null,
            currCmp: null
        }
    },
    methods: {
        setAns(inputVal, noteType) {
            
        },
        changeCmp(noteType) {
            // this.setNoteObjType = 
            // console.log(this.notes.cmps.find(cmp => cmp.type === noteType));
            this.currCmp = this.notes.cmps.find(cmp => cmp.type === noteType)
        },
        save(noteId) {
            console.log('this.note', this.note)
            noteService.addNote(this.note)
                .then(note => {
                    console.log('Saved Note:', note);
                    const msg = {
                        txt: 'Note saved succesfully',
                        // type: 'success'
                    }
                    eventBus.$emit('show-msg', msg)
                    this.$emit('save', noteId);
                })
                .catch(err => {
                    const msg = {
                        txt: 'Error, please try again later',
                        type: 'error'
                    }
                    eventBus.$emit('show-msg', msg)
                })
        }
    },
    created() {
        this.setNoteObjType = noteService.getEmptyNoteTxt()
        noteService.query()
            .then(notes => {
                this.notes = notes
                this.currCmp = notes.cmps
                
            })
    },
    components: {
        noteTxt,
        // noteTodo,
        // noteImg,
        // noteVideo
    }
}
