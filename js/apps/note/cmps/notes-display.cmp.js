
export default {
    name: 'notes-display',
    props: ['note'],
    template: `
    <section>
        <div :class="note.type"> 
                     <!-- <iframe :src="note.info.src"> 
                    </iframe>  -->
                    <p>{{note.info.txt}}</p>
                    <p>{{note.info.todos}}</p>
                    <img :src="note.info.url" alt="">
                </div>
    </section>
    `,
    data() {
        return {
            notes: null,
            answer: '',
            currCmp: null
        }
    }
}