export default {
    name:"note-video",
    template: `
        <section class="note-video">
            <!-- <input type="text" v-model="val" @change="reportVal" :list="listId" placeholder="place video url" />   -->
            <h1>managing video url</h1>
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
