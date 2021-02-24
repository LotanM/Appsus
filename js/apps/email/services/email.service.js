import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

export const emailService = {
    query,
    remove,
    getEmptyEmail,
    getById,
    addEmail
}


const EMAILS_KEY = 'emails';
const emailsDB =  _createEmails();


function query() {
    return storageService.query(EMAILS_KEY)
}

function remove(emailId) {
    return storageService.remove(EMAILS_KEY, emailId)
}
function getById(id) {
    return storageService.get(EMAILS_KEY, id)
}

function addEmail(emailId, emailsObj) {
    console.log('emailObj', emailsObj)
    console.log('email id', emailId)
    storageService.get(EMAILS_KEY, emailId)
        .then(email => {
            email.emails = emailsObj
            return email
        })
        .then(email => {
            console.log('email at the end', email)
            storageService.put(EMAILS_KEY, email)
        })
}

function getEmptyEmail() {
    return {
        id: utilService.makeId(),
        subject: 'test subject', 
        body: 'test body', 
        isRead: false,
        sentAt: 1551133930594
    }
}

function _createEmails() {
    let emails = utilService.loadFromStorage(EMAILS_KEY)
    if (!emails || !emails.length) {
        const emails=[
            {id: utilService.makeId(), subject: 'puki?', body: 'Pick up!', isRead: false, sentAt: 1151139930694 },
            {id: utilService.makeId(), subject: 'muki?', body: 'Pick down!', isRead: true, sentAt: 1451133635584 },
            {id: utilService.makeId(), subject: 'looli?', body: 'Pick left!', isRead: true, sentAt: 1651139330594 },
            {id: utilService.makeId(), subject: 'shoopi?', body: 'Pick right!', isRead: false, sentAt: 17551133930594 },
            {id: utilService.makeId(), subject: 'shuni?', body: 'Pick more!', isRead: false, sentAt: 1551193930594 }
        ]
        utilService.saveToStorage(EMAILS_KEY, emails)
    }
    return emails;
}