
export default {
    name: 'notes-display',
    props: ['note'],
    template: `
        <section>
            <button @click="removeNote(note.id)">X</button>
            <!-- <button @click="editNote(note.id)">✎</button> -->
            <div v-if="note.type === 'note-txt'" @click="updateTxt(note)">
                {{note.info.txt}}
                <textarea cols="10" rows="7" class="txt-input" @input></textarea>
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
        }
    },
    methods: {
        removeNote(noteId){
            this.$emit('remove', noteId)
        },
        updateNote(noteObj){
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
        updateTxt(note) {
            console.log(note);
            console.log('note.info.txt:', note.info.txt)

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