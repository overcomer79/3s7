import { Visitor } from "../../shared/models/visitor";

class ConnectedVisitor extends Visitor {
  static connectedVisitorsList: Array<ConnectedVisitor> = [];
  constructor(socketId: string) {
    super(socketId);
    return this;
  }

  static onConnect(socket, roomName, room, pack) {
    const newUser = new ConnectedVisitor(socket.id);
    ConnectedVisitor.connectedVisitorsList[socket.id] = newUser;
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
      ConnectedVisitor.connectedVisitorsList[socket.id].username,
      " ha abbandonato la pagina..."
    );
    socket.broadcast.to(roomName).emit("left room", {
      user: ConnectedVisitor.connectedVisitorsList[socket.id].username,
      message: "ha abbandonato la stanza..."
    });
    delete ConnectedVisitor.connectedVisitorsList[socket.id];
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

export { ConnectedVisitor };
