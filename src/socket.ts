import * as io from "socket.io";
import { Server } from "https";
import { MessagePack } from "../shared/models/socket_messages/messagePack";
import { HomeSocketController } from "./controllers/socket/home";

/*
const DEBUG: boolean = true;
const mainRoom: string = "app";
*/

const pack: MessagePack = new MessagePack();

let listen: any = (server: Server) => {
  const socketIO: SocketIO.Server = io.listen(server);
  
  socketIO.of('/').on("connection", HomeSocketController);
  //socketIO.of('/tris').on("connection", () => {console.log("SONO QUI"); })
  
  setInterval(() => {
    Object.keys(socketIO.sockets.adapter.rooms).forEach(element => {
      pack.update();
      socketIO.in(element).emit("ServerMsg", pack);
    });
  }, 100);

  return socketIO;
};

export { listen };
