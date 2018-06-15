const mathHelper = require("../helpers/math");
const constants = require("../helpers/global");

class BaseUser {
  constructor(socketId) {
    this._id = socketId;

    // This will generate a alphanumeric string for a rundom username (not registred players)
    this.username =
      constants.BaseUserConfig.usernamePrefix +
      mathHelper.alphanumeric_unique().toUpperCase() +
      new Date().toLocaleDateString().replace(/-/g, "");

    this.color = "hsla(" + Math.random() * 360 + ", 80%, 30%, 1)";

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

  static onConnect(socket, room, pack) {
    console.log("utente connesso...");
    BaseUser.userList[socket.id] = new BaseUser(socket.id);
    pack.numberOfUser = room.length;
  }

  static onDisconnect(socket, room, pack) {
    console.log("utente ha abbandonato la pagina...");
    delete BaseUser.userList[socket.id];
    pack.numberOfUser = room.length;
  }

  sendChatMessage(io, room, data) {
    io.in(room).emit("addToChat", {
      playerName: this.username,
      color: this.color,
      text: data
    });
  }
}
BaseUser.userList = {};

module.exports = BaseUser;
