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

  static onConnect(socket, roomName, room, pack) {
    const newUser = new BaseUser(socket.id);
    BaseUser.userList[socket.id] = newUser;
    console.log("utente ", newUser.username, " si è connesso...");
    pack.numberOfUser = room.length;
    socket.emit("connected user", { user: newUser });
    socket.broadcast.to(roomName).emit("new user joined", {
      user: newUser.username,
      message: "è entrato nella stanza..."
    });
  }

  static onDisconnect(socket, roomName, room, pack) {
    console.log(
      "utente ",
      BaseUser.userList[socket.id].username,
      " ha abbandonato la pagina..."
    );
    socket.broadcast.to(roomName).emit("left room", {
      user: BaseUser.userList[socket.id].username,
      message: "ha abbandonato la stanza..."
    });
    delete BaseUser.userList[socket.id];
    pack.numberOfUser = room.length;
  }

  sendChatMessage(io, room, data) {
    if (!data || data.trim() === "") return;
    io.in(room).emit("addToChat", {
      user: this.username,
      color: this.color,
      message: data,
      date: new Date()
    });
  }
}
BaseUser.userList = {};

module.exports = BaseUser;
