export class GuestList {
    constructor(firstName, lastName, phoneNumber, email) {
        this.firstName = firstName
        this.lastName = lastName
        this.phoneNumber = phoneNumber
        this.email = email
    }

    //: guests are saved to local storage. If no guest set to empty
    static guestArr = JSON.parse(localStorage.getItem('guestlist')) || []

    static saveGuest = () => (localStorage.setItem('guestlist', JSON.stringify(GuestList.guestArr)))

    //: validate user inputs and remove space between
    static validateGuestInput(first, last, phone, email) {
        first = typeof first === 'string' && first.length > 1 && first.trim()
        last = typeof last === 'string' && last.length > 1 && last.trim()
        phone = typeof phone === 'string' && phone.length > 2 && phone.trim()
        email = typeof email === 'string' && email.length > 7 && email.trim()

        return first && last && phone && email && true
    }

    //: check if guest already exists in array
    static validateGuestExist(first, last, phone, email) {
        let validate = GuestList.validateGuestInput(first, last, phone, email)
        if (validate) {
            for (let i = 0; i < GuestList.guestArr.length; i++) {
                if (phone === GuestList.guestArr[i].phoneNumber) {
                    return false
                }
            }
            return true
        } else {
            return false
        }
    }

    //: generate guest id. each guest has a unique id
    static createId(len) {
        let char = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
            id = '', index = ''
        for (let i = 0; i < len; i++) {
            index = Math.floor(Math.random() * char.length)
            id += char[index]
        }
        return id
    }

    //: add guest to array
    addGuest(first, last, phone, email) {
        let validate = GuestList.validateGuestExist(first, last, phone, email)
        //: only add guest if inputs are valid and not already added to array
        if (validate) {
            let newGuest = new GuestList(first, last, phone, email)
            //:add extra properties eg. id and checked to existing object
            newGuest = { ...newGuest, ...{ id: GuestList.createId(5), checked: false } }

            GuestList.guestArr.push(newGuest)
            GuestList.saveGuest()
        }
    }

    //: remove each guest by id
    removeGuest(id) {
        for (let i = 0; i < GuestList.guestArr.length; i++) {
            if (id === GuestList.guestArr[i].id) {
                GuestList.guestArr.splice(i, 1)
                GuestList.saveGuest()
                return
            }
        }
    }

    //: check or unchack guest. Toggle true or false on checking an input
    checkGuest(id) {
        for (let i = 0; i < GuestList.guestArr.length; i++) {
            if (id === GuestList.guestArr[i].id) {
                GuestList.guestArr[i].checked = !GuestList.guestArr[i].checked ? true : false
                GuestList.saveGuest()
                return
            }
        }
    }

    //: count all guests stored in array
    countAllGuests = () => (GuestList.guestArr.length)

    //: count all guests that are checked
    countChecked() {
        let count = GuestList.guestArr.filter(i => (i.checked))
        return count.length
    }

    //: count all guests that are not yet checked
    countUnchecked() {
        let count = GuestList.guestArr.filter(i => (!i.checked))
        return count.length
    }

    //: remove all guests, clear array and local storage
    removeAllGuests() {
        GuestList.guestArr = []
        GuestList.saveGuest()
    }

    //: output all guests to page
    outputGuest = () => (GuestList.guestArr)

    //: search for a guest by first name or last name or fullname or phone
    searchGuest(val) {
        val = val.toString().toLowerCase()
        let found = GuestList.guestArr.filter(i => {
            let first = i.firstName.toLowerCase()
            let last = i.lastName.toLowerCase()
            let fullName = `${first} ${last}`

            if (val === i.phoneNumber.toString()) {
                return i
            } else if (val === first) {
                return i
            } else if (val === last) {
                return i
            } else if (val === fullName) {
                return i
            }
        })
        return found
    }
}