import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

export const noteService = {
    // getById,
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


function save(answer, idx) {
    console.log('idx', idx)
    query()
    .then(notes => {
        const currNote = notes.cmps[idx];
            if (currNote.type === 'noteVideo' || currNote.type === 'noteImg') currNote.info.url = answer
            else if (currNote.type === 'noteTxt') currNote.info.txt = answer
            else currNote.info.todos = answer
            utilService.saveToStorage(NOTES_KEY, notes)
        })
}

function save(answer, cmpType) {
    var note = null;
    if (cmpType === 'noteVideo') {
        note = getEmptyNoteVideo();
        note.info.url = answer
    }
    else if (cmpType === 'noteImg') {
        note = getEmptyNoteImg();
        note.info.url = answer
    }
    else if (cmpType === 'noteTxt') {
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
        type: "noteTxt",
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
        type: "noteTodo",
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
        type: "noteVideo",
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
        type: "noteImg",
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
    console.log('notes', notes)
    if (!notes.cmps || !notes.cmps.length) {
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