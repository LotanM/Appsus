import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

export const noteService = {
    query,
    addNote,
    remove,
    save,
    getEmptyNoteTxt,
    getEmptyNoteTodo,
    getEmptyNoteVideo,
    getEmptyNoteImg,
}

const NOTES_KEY = 'notes'
const notesDB = _createNotes();


function save(answer, cmpType) {
    var note = null;
    if (cmpType === 'note-video') {
        note = getEmptyNoteVideo();
        note.info.url = answer
    }
    else if (cmpType === 'note-img') {
        note = getEmptyNoteImg();
        note.info.url = answer
    }
    else if (cmpType === 'note-txt') {
        note = getEmptyNoteTxt();
        note.info.txt = answer
    }
    else {
        note = getEmptyNoteTodo();
        note.info.todos = answer
    }
    notesDB.cmps.push(note)
    utilService.saveToStorage(NOTES_KEY, notesDB)
}

function addNote(noteToAdd) { // save, returns Promise
    return storageService.post(NOTES_KEY, noteToAdd)
}

function query() { //get all notes, returns Promise
    return storageService.query(NOTES_KEY)
}

function remove(noteId) { //delete note, returns Promise
    return storageService.remove(NOTES_KEY, noteId)
}
// function getById(id) { //get note by id, returns Promise
//     return storageService.get(NOTES_KEY, id)
// }


// Empty notes:

function getEmptyNoteTxt() {
    return {
        id: utilService.makeId(),
        type: "note-txt",
        info: {
            txt: ''
        },
        style: {
            backgroundColor: "#00d"
        },
        isPinned: true
    }
}

function getEmptyNoteTodo() {
    return {
        id: utilService.makeId(),
        type: "note-todo",
        info: {
            todos: [
                { txt: "", doneAt: null, isChecked: false },
            ]
        },
        style: {
            backgroundColor: "#00d"
        },
        isPinned: true
    }
}

function getEmptyNoteVideo() {
    return {
        id: utilService.makeId(),
        type: "note-video",
        info: {
            url: "",
            title: "my video"
        },
        style: {
            backgroundColor: "#00d"
        },
        isPinned: true
    }
}

function getEmptyNoteImg() {
    return {
        type: "note-img",
        info: {
            src: "",
            title: "my image"
        },
        style: {
            backgroundColor: "#00d"
        },
        isPinned: true
    }
}


function _createNotes() {
    let notes = utilService.loadFromStorage(NOTES_KEY)
    console.log(notes, '=== undefined');
    if (!notes) {
        notes = {
            title: 'Awesome Notes',
            cmps: [
                {
                    id: utilService.makeId(),
                    type: "note-txt",
                    info: {
                        txt: "Fullstack Me Baby!"
                    },
                    style: {
                        backgroundColor: "#00d"
                    },
                    isPinned: true
                },
                {
                    id: utilService.makeId(),
                    type: "note-todo",
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
                    id: utilService.makeId(),
                    type: "note-img",
                    info: {
                        url: "https://variety.com/wp-content/uploads/2019/06/spongebob-battle-remaster.png?w=681&h=383&crop=1",
                        title: "my image"
                    },
                    style: {
                        backgroundColor: "#00d"
                    },
                    isPinned: true
                },
                {
                    id: utilService.makeId(),
                    type: "note-video",
                    info: {
                        src: "https://www.youtube.com/embed/watch?v=M-mRdZjfSHI",
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