const mathHelper = require('../helpers/math');

class BaseUser {

    constructor() {
        // This will generate a alphanumeric string for the username of not login user player
        this.username = 'DEMON_'
            + mathHelper.alphanumeric_unique().toUpperCase()
            + new Date().toLocaleDateString().replace(/-/g, '');
    }

    login() {
        console.log(this.username, 'just logged in');
    }
    signUp() {
        console.log(this.username, 'just sign up');
    }
    HostLogin() {
        console.log(this.username, 'just host-logged in');
    }
}

module.exports = BaseUser;