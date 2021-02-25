export default {
    name: 'note-todo',
    template: `
        <section class="note-todo">
            <label>
            <h1>label:{{info.label}}</h1>
            <ul>
            <li v-for='(todos, idx) in info.todos'> 
              {{info.todos[idx].txt}}
            </li>
            </ul>
                <input type="text" v-model="val" @change="reportVal" :list="listId"/>
            </label>
        </section>
        `,
    props: ["info"],
    data() {
        return {
            val: ""
        };
    },
    methods: {
        reportVal() {
            this.$emit("setVal", this.val);
        }
    },
    computed: {
        listId() {
            return "list" + this._uid;
        }
    }
};
