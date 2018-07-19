import * as io from "socket.io";
import { Server } from "https";
import { MessagePack } from "../shared/models/socket_messages/messagePack";
import { Visitor, IVisitorConnectionInfo } from "../shared/models/visitor";

const DEBUG: boolean = true;
const mainRoom: string = "app";

const pack: MessagePack = new MessagePack();

let listen: any = (server: Server) => {
  const socketIO: SocketIO.Server = io.listen(server);

  socketIO.on("connection", (socket: SocketIO.Socket) => {

    socket.join(mainRoom);
    
    const connectionInfo: IVisitorConnectionInfo = {
      socket: socket,
      roomName: mainRoom,
      rooms: socketIO.nsps["/"].adapter.rooms[mainRoom],
      pack: pack
    }
    
    Visitor.onConnect(connectionInfo);

    socket.on("message", data => {
      Visitor.visitors[socket.id].sendChatMessage(
        connectionInfo,
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
      connectionInfo.socket.leave(mainRoom);
      Visitor.onDisconnect(connectionInfo);
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
