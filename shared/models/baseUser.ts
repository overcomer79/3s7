class BaseUser {
  private _id: string;
  private username: string;
  private color: string;

  public static userList = {};

  constructor(socketId: string) {
    this._id = socketId;

    this.username = "DEMON";

    this.color = "hsla(" + Math.random() * 360 + ", 80%, 30%, 1)";

    return this;
  }

  static onConnect(socket, roomName, room, pack) {
    const newUser = new BaseUser(socket.id);
    BaseUser.userList[socket.id] = newUser;
    console.log("utente ", newUser.username, " si è connesso...");
    pack.connectedUsersInfo.numberOfUser = room.length;
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
    pack.connectedUsersInfo.numberOfUser = room.length;
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

export {BaseUser}