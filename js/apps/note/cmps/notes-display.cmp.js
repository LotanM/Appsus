
export default {
    name: 'notes-display',
    props: ['note', "notes"],
    template: `
        <section>
        <button>X</button>
        <div v-if="note.type==='note-txt'">
            {{note.info.txt}}
        </div>

        <div v-if="note.type==='note-todo'">
            <ul>
                <h4>To do:</h4>
                <li v-for="(todo, idx) in note.info.todos" :class="{done: todo.isChecked}" @click="updateTodo(idx)">
                    - {{note.info.todos[idx].txt}}
                </li> 
            </ul>
        </div>

        <div v-if="note.type==='note-img'">
            <img :src="this.note.info.src" alt="">
            <!-- {{note.info.src}} -->
        </div>

        <div >
            <iframe v-if="note.type==='note-video'" :src="convertToEmbeded">
            </iframe>
        </div>
        
        <div >
            <iframe v-if="note.type==='note-video'" :src="convertToEmbeded">
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
        updateTodo(idx) {
            this.currTodo = this.note.info.todos[idx];
            if (!this.currTodo.isChecked) {
                // Doesnt save changes to localstorage YET
                this.currTodo.doneAt = Date.now()
                console.log('currTodo.doneAt:', this.currTodo.doneAt)
                this.currTodo.isChecked = true;
                console.log('currTodo.isChecked:', this.currTodo.isChecked)
            } else {
                this.currTodo.doneAt = null
                this.currTodo.isChecked = false;
            }
        },
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