const mathHelper = require('../helpers/math');

class BaseUser {

    constructor(socket) {
        // This will generate a alphanumeric string for the username of not login user player
        
        this.username = 'DEMON_'
            + mathHelper.alphanumeric_unique().toUpperCase()
            + new Date().toLocaleDateString().replace(/-/g, '');
                    
        return this;
    }
    /*

    login() {
        console.log(this.username, 'just logged in');
    }
    signUp() {
        console.log(this.username, 'just sign up');
    }
    HostLogin() {
        console.log(this.username, 'just host-logged in');
    }
    */

    static onConnect(socket) {
        BaseUser.userList[socket.id] = new BaseUser(socket.id);
        console.log(this);
    }

    static onDisconnect(socket) 
    {
        console.log(this);
        delete BaseUser.userList[socket.id];
    }
}
BaseUser.userList = {}

module.exports = BaseUser;