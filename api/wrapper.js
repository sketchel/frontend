
import config from '../config.json'

export default class Wrapper {
    constructor(session) {
        this.BASE_URL = config.API_BASE
        this.session = session
    }

    async getMe() {
        let res = await fetch(this.BASE_URL + '/users/@me', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': this.session
        }})
        res = await res.json()
        if (!res.success) {
            localStorage.removeItem('loggedIn')
            localStorage.removeItem('session')
            localStorage.removeItem('user')
        } else {
            localStorage.setItem('user', res.user)
        }
        return res.user
    }

    async logout() {
        localStorage.removeItem('loggedIn')
        localStorage.removeItem('session')
        localStorage.removeItem('user')
    }
}