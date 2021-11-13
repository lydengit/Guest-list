import { GuestList } from "./GuestList.js";
const gl = new GuestList()

window.onload = loaded

//: load document˝
function loaded() {
    const form = document.getElementById('form')
    const removeAll = document.getElementById('remove-all')
    const guestList = document.getElementById('guest-list')
    const searchGuest = document.getElementById('search-guest')

    form.onsubmit = submitHandler
    removeAll.onclick = removeAllGuests
    guestList.onclick = guestHandler //: check guest and remove guest
    searchGuest.onkeyup = searchHandler

    outputGuest(gl.outputGuest())
    countGuestHandler()
}
//: FUNCTIONS

//: add guest to list
function submitHandler(e) {
    e.preventDefault()
    const fd = new FormData(e.target)

    fd.firstName = e.target['first-name'].value
    fd.lastName = e.target['last-name'].value
    fd.phoneNum = e.target['phone-number'].value
    fd.email = e.target['email'].value

    gl.addGuest(fd.firstName, fd.lastName, fd.phoneNum, fd.email)
    e.target.reset()

    outputGuest(gl.outputGuest())
    countGuestHandler()
}

//: remove all guests from list
function removeAllGuests() {
    gl.removeAllGuests()
    outputGuest(gl.outputGuest())
    countGuestHandler()
}

//: check guest and remove guest
function guestHandler(e) {
    if (e.target.className === 'check-guest') {
        gl.checkGuest(e.target.dataset.id)

    } else if (e.target.className === 'remove-guest') {
        gl.removeGuest(e.target.dataset.id)
    }
    outputGuest(gl.outputGuest())
    countGuestHandler()
}

//: count guests
function countGuestHandler() {
    const allGuests = document.getElementById('all-guests')
    const checked = document.getElementById('checked')
    const unchecked = document.getElementById('unchecked')
    allGuests.innerHTML = gl.countAllGuests()
    unchecked.innerHTML = gl.countUnchecked()
    checked.innerHTML = gl.countChecked()
}

//: output guest list
function outputGuest(arr) {
    const guestList = document.getElementById('guest-list')
    let html = '<ul>'
    let check = false
    let addClassGuest = ''
    guestList.innerHTML = ''

    for (let i = 0; i < arr.length; i++) {
        check = arr[i].checked ? 'checked' : ''
        addClassGuest = arr[i].checked ? 'guest' : ''
        html += `<li>
            ${i + 1} - <span class="${addClassGuest}">${arr[i].firstName} ${arr[i].lastName} - ${arr[i].phoneNumber}</span>
            <input type="checkbox" class="check-guest" data-id="${arr[i].id}" ${check}>
            <input type="button" class="remove-guest" data-id="${arr[i].id}" value="x">
            </li>
        `
    }
    guestList.innerHTML = html
}
//: search guest on list
function searchHandler(e) {
    let val = e.target.value
    let found = gl.searchGuest(val)
    found.length !== 0 ? outputGuest(found) : outputGuest(gl.outputGuest())
}

