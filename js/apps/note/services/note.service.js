import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

export const noteService = {
    getById,
    getCmpIdByType,
    save
}

const NOTES_KEY = 'notes'
const notesDB = _createNotes();
function getById() {
    return Promise.resolve(notesDB);
}

function save(answer, idx) {
    console.log('idx', idx)
    getById()
        .then(notes => {
            const currNote = notes.cmps[idx];
            if (currNote.type === 'noteVideo' || currNote.type === 'noteImg') currNote.info.url = answer
            else if (currNote.type === 'noteTxt') currNote.info.txt = answer
            else currNote.info.todos = answer
            utilService.saveToStorage(NOTES_KEY, notes)
        })
}
function getCmpIdByType(cmpType) {
    for (let i = 0; i < notesDB.cmps.length; i++) {
        if (notesDB.cmps[i].type === cmpType) {
            console.log('i at 34', i)
            return i;
        }
    }
}

// function getCmpIdByType(cmpType) {
//     getById()
//         .then(notes => {
//             const cmps = notes.cmps
//             for (let i = 0; i < cmps.length; i++) {
//                 if (cmps[i].type === cmpType) {
//                     console.log('i at 34', i)
//                     var idx = i
//                 }
//             }
//             console.log('idx', idx)
//             return idx;
//         })
// }

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTES_KEY)
    if (!notes || !notes.length) {
        notes =
        {
            title: 'Awesome Notes',
            cmps: [
                {
                    type: "noteTxt",
                    info: {
                        txt: "Fullstack Me Baby!"
                    },
                    style: {
                        backgroundColor: "#00d"
                    },
                    isPinned: true
                },
                {
                    type: "noteTodo",
                    info: {
                        todos: [
                            { txt: "Do that", doneAt: null, isChecked: false },
                            { txt: "Do this", doneAt: 187111111, isChecked: false }
                        ]
                    },
                    style: {
                        backgroundColor: "#00d"
                    },
                    isPinned: true
                },
                {
                    type: "noteImg",
                    info: {
                        url: "http://some-img/me",
                        title: "my image"
                    },
                    style: {
                        backgroundColor: "#00d"
                    },
                    isPinned: true
                },
                {
                    type: "noteVideo",
                    info: {
                        url: "http://some-video/me",
                        title: "my video"
                    },
                    style: {
                        backgroundColor: "#00d"
                    },
                    isPinned: true
                }
            ]
        }
        utilService.saveToStorage(NOTES_KEY, notes)
    }
    return notes;
}