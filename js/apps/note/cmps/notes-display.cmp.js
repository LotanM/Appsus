
export default {
    name: 'notes-display',
    props: ['note'],
    template: `
        <section>
            <button @click="removeNote(note.id)">X</button>
            <div v-if="note.type === 'note-txt'" >
                <button @click="openTxtEditor">✎</button>
                {{note.info.txt}}
                <form @submit="saveNewTxt(note)" v-if="toShow" class="txt-editor">
                    <textarea cols="15" rows="5" v-model="note.info.txt"></textarea>
                    <button type="submit">save</button>
                </form>
                <!-- <form @submit="saveNewTxt(note)" v-if="toShow">
                    <p>{{message}}</p>
                    <textarea cols="15" rows="4" v-model="message" placeholder="write here"></textarea>
                    <button type="submit" @click="toShow = !toShow">save</button>
                </form>
                <button @click="openTxtEditor">✎</button> -->
            </div>
            
            <div v-if="note.type === 'note-todo'">
                <ul>
                    <h4>To do:</h4>
                    <li v-for="(todo, idx) in note.info.todos" :class="{done: todo.isChecked}" @click="updateCurrTodo(idx, note)">
                        - {{note.info.todos[idx].txt}}
                    </li> 
                </ul>
            </div>
            
            <div v-if="note.type === 'note-img'">
                <img :src="this.note.info.src" alt="">
            </div>
            
            <div>
                <iframe v-if="note.type === 'note-video'" :src="convertToEmbeded">
                </iframe>
            </div> 
            </section>
    `,
    data() {
        return {
            currTodo: null,
            message: null,
            toShow: false
        }
    },
    methods: {
        removeNote(noteId) {
            this.$emit('remove', noteId)
        },
        updateNote(noteObj) {
            this.$emit('update', noteObj)
        },
        updateCurrTodo(idx, currNote) {
            this.currTodo = this.note.info.todos[idx];
            if (!this.currTodo.isChecked) {
                this.currTodo.doneAt = Date.now()
                this.currTodo.isChecked = true;
                this.updateNote(currNote)
            } else {
                this.currTodo.doneAt = null
                this.currTodo.isChecked = false;
                this.updateNote(currNote)
            }
        },
        openTxtEditor() {
            this.toShow = true
            
        },
        saveNewTxt(currNote) {
            this.toShow = false
            this.message =currNote.info.txt
            this.updateNote(currNote)
        }
    },
    computed: {
        convertToEmbeded() {
            var str = this.note.info.src;
            var res = str.split("=");
            var embeddedUrl = "https://www.youtube.com/embed/" + res[1]
            return embeddedUrl
        }
    }
}