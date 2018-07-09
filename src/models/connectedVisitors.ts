import { Visitor } from "../../shared/models/visitor";
import { MessagePack } from "../../shared/models/socket_messages/messagePack";
import { LogMessage } from "../../shared/models/socket_messages/logMessage";
import * as Global from "../../shared/helpers/global";

class ConnectedVisitor extends Visitor {
  static connectedVisitorsList: Array<ConnectedVisitor> = [];

  constructor(socketId: string) {
    super(socketId);
    return this;
  }

  static onConnect(
    socket: SocketIO.Socket,
    roomName: string,
    room,
    pack: MessagePack
  ) {
    const visitor: ConnectedVisitor = new ConnectedVisitor(socket.id);
    ConnectedVisitor.connectedVisitorsList[socket.id] = visitor;
    console.log("utente", visitor.username, "si è connesso...");
    pack.usersInfo.numberOfUser = room.length;
    socket.emit("connected user", { user: visitor });
    socket.broadcast
      .to(roomName)
      .emit(
        "new user joined",
        new LogMessage(visitor, Global.costants.LogMessages.ROOM_JOINED)
      );
  }

  static onDisconnect(
    socket: SocketIO.Socket,
    roomName: string,
    room,
    pack: MessagePack
  ) {
    console.log(
      "utente",
      ConnectedVisitor.connectedVisitorsList[socket.id].username,
      "ha abbandonato la pagina..."
    );
    socket.broadcast
      .to(roomName)
      .emit(
        "left room",
        new LogMessage(
          ConnectedVisitor.connectedVisitorsList[socket.id],
          Global.costants.LogMessages.ROOM_LEFT
        )
      );
    delete ConnectedVisitor.connectedVisitorsList[socket.id];
    pack.usersInfo.numberOfUser = room.length;
  }

  sendChatMessage(io: SocketIO.Server, room, data) {
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
