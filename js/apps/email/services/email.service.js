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
const emailsDB = _createEmails();


function query() {
    return storageService.query(EMAILS_KEY)
}

function remove(emailId) {
    return storageService.remove(EMAILS_KEY, emailId)
}
function getById(id) {
    return storageService.get(EMAILS_KEY, id)
}

function addEmail(emailToAdd) {
    return storageService.post(EMAILS_KEY, emailToAdd)
}

function getEmptyEmail() {
    return {
        id: utilService.makeId(),
        subject: 'test subject',
        body: 'test body',
        isRead: false,
        sentAt: 1551133930594,
        from: '',
        to: ''
    }
}

function _createEmails() {
    let emails = utilService.loadFromStorage(EMAILS_KEY)
    if (!emails || !emails.length) {
        const emails = [
            {
                id: utilService.makeId(),
                subject: `Tip 3: Move faster with collaboration`,
                body: `Shared workspaces can help your entire team stay on top of their projects.
                        How to collaborate in Workona
                        Open a workspace and click the “Share” button in the top-right. This is where youll invite collaborators and manage sharing permissions for the workspace.
                        Remember, your tabs are private and will never be shared.`, 
                isRead: false,
                sentAt: 1151139930694,
                from: 'welcome@workona.com',
                to: 'appsus@ca.com'
            },
            {
                id: utilService.makeId(),
                subject: 'Appsus, please add me to your LinkedIn network',
                body: `© 2021 LinkedIn Ireland Unlimited Company, Wilton Plaza, Wilton Place, Dublin 2.
                        LinkedIn is a registered business name of LinkedIn Ireland Unlimited Company. LinkedIn
                        and the LinkedIn logo are registered trademarks of LinkedIn.`,
                isRead: true,
                sentAt: 1451133635584,
                from: 'invitations@linkedin.com',
                to: 'appsus@ca.com'
            },
            {
                id: utilService.makeId(),
                subject: 'looli?',
                body: 'Pick left!',
                isRead: true,
                sentAt: 1651139330594,
                from: 'welcome@workona.com',
                to: 'appsus@ca.com'
            },
            {
                id: utilService.makeId(),
                subject: 'shoopi?',
                body: 'Pick right!',
                isRead: false,
                sentAt: 17551133930594,
                from: 'welcome@workona.com',
                to: 'appsus@ca.com'
            },
            {
                id: utilService.makeId(),
                subject: 'shuni?',
                body: 'Pick more!',
                isRead: false,
                sentAt: 1551193930594,
                from: 'welcome@workona.com',
                to: 'appsus@ca.com'
            }
        ]
        utilService.saveToStorage(EMAILS_KEY, emails)
    }
    return emails;
}