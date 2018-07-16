import * as io from "socket.io";
import { Server } from "https";
import { ConnectedVisitor } from "./models/connectedVisitors";
import { MessagePack } from "../shared/models/socket_messages/messagePack";

const DEBUG: boolean = true;
const mainRoom: string = "app";

const pack: MessagePack = new MessagePack();

let listen: any = (server: Server) => {
  const socketIO: SocketIO.Server = io.listen(server);

  socketIO.on("connection", (socket: SocketIO.Socket) => {
    socket.join(mainRoom);
    const room: any = socketIO.nsps["/"].adapter.rooms[mainRoom];
    ConnectedVisitor.onConnect(socket, mainRoom, room, pack);

    socket.on("message", data => {
      ConnectedVisitor.connectedVisitorsList[socket.id].sendChatMessage(
        socketIO,
        data.room,
        data.message
      );
    });

    socket.on("evalServer", (data: string) => {
      console.log("----- FROM CLIENT: TEXT TO EVAL -------");
      if (!DEBUG) {
        return;
      }
      try {
        var res: any = eval(data);
      } catch (err) {
        res = { message: "nothing to eval", error: err };
      }
      socket.emit("evalAnswer", res);
    });

    socket.on("disconnect", () => {
      socket.leave(mainRoom);
      ConnectedVisitor.onDisconnect(socket, mainRoom, room, pack);
    });
  });

  setInterval(() => {
    Object.keys(socketIO.sockets.adapter.rooms).forEach(element => {
      socketIO.in(element).emit("ServerMsg", pack);
    });
  }, 100);

  return socketIO;
};

export { listen };
