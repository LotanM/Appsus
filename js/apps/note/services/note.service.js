export const noteService = {
    getById
}

function getById() {
    return Promise.resolve(notes);
}

var notes =
{
    title: 'Awesome Notes',
    cmps: [
        {
            type: "noteTxt",
            isPinned: true,
            info: {
                txt: "Fullstack Me Baby!"
            }
        },
        // {
        //     type: "noteImg",
        //     info: {
        //         url: "http://some-img/me",
        //         title: "Me playing Mi"
        //     },
        //     style: {
        //         backgroundColor: "#00d"
        //     }
        // },
        // {
        //     type: "noteTodos",
        //     info: {
        //         label: "How was it:",
        //         todos: [
        //             { txt: "Do that", doneAt: null },
        //             { txt: "Do this", doneAt: 187111111 }
        //         ]
        //     }
        // },
        // {
        //     type: "noteVideo",
        //     info: {
        //         url: "http://some-video/me",
        //         title: "Me playing Mi"
        //     }
        // }
    ]
}