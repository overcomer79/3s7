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
        //console.log(socket);
        this.userList[socket.id] = new BaseUser(socket.id).username;
        console.log(this.userList);
    }

    static onDisconnect(socket) 
    {       
        delete this.userList[socket.id];
        console.log(this.userList);
    }
}
BaseUser.userList = {}

module.exports = BaseUser;