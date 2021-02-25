export default {
    name: 'note-todo',
    template: `
        <section class="note-todo">
            <label>
        <h1>{{notes.info}}</h1>
                <input type="text" v-model="val" @change="reportVal" :list="listId" />
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
