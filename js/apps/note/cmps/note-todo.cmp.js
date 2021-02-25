export default {
    name: 'note-todo',
    template: `
        <section class="note-todo">
            <label>
            <h1>label:{{info.label}}</h1>
            <ul>
            <li v-for='(todos, idx) in info.todos' :class="{done: todos.isChecked}" @click="updateDone(idx)"> 
                <p>{{info.todos[idx].txt}}</p>
            </ul>
                <input type="text" v-model="val" @change="reportVal" :list="listId" placeholder="Enter comma seperated list"/>
            </label>
        </section>
        `,
    props: ["info"],
    data() {
        return {
            val: "",
            currTodo: null,
        }
    },
    methods: {
        reportVal() {
            this.$emit("setVal", this.val);
        },
        updateDone(idx) {
            this.currTodo = this.info.todos[idx];
            if (this.currTodo.isChecked === false) {
                this.currTodo.doneAt = Date.now()
                this.currTodo.isChecked = true;
                console.log('this.currTodo.isChecked:', this.currTodo.isChecked)

            } else {
                this.currTodo.doneAt = null
                this.currTodo.isChecked = false;
                console.log('this.currTodo.isChecked:', this.currTodo.isChecked)
            }
        }
    },
    computed: {
        listId() {
            return "list" + this._uid;
        }
    }
};
