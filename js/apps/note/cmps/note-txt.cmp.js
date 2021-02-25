export default {
    name:"note-txt",
    template: `
        <section class="note-txt">
            <!-- <datalist :id="listId">
                <option v-for="opt in info.opts" :value="opt" />
            </datalist> -->
            <label>
                <!-- {{info.label}} -->
                <input type="text" v-model="val" @change="reportVal" :list="listId" placeholder="type in some text" />
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
