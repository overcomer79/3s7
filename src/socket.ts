import * as io from "socket.io";
import { Server } from "https";
import { MessagePack } from "../shared/models/socket_messages/messagePack";
import { GeneralSocketController } from "./controllers/socket/general";
import { ChatSocketController } from "./controllers/socket/chat";
import { HomeSocketController } from "./controllers/socket/home";
import { sockets } from "../shared/config/sockets";

const pack: MessagePack = new MessagePack();

export let socketIO: SocketIO.Server;

export const listen: any = (server: Server) => {
  socketIO = io.listen(server);

  socketIO
    .of(sockets.namespaces.general)
    .on(sockets.messages.socketConnection, GeneralSocketController);

  socketIO
    .of(sockets.namespaces.chat)
    .on(sockets.messages.socketConnection, ChatSocketController);

  socketIO
    .of(sockets.namespaces.home)
    .on(sockets.messages.socketConnection, HomeSocketController);

  /*
  setInterval(() => {
    Object.keys(socketIO.sockets.adapter.rooms).forEach(element => {
      pack.update();
      console.log(pack.usersInfo.numberOfUser);
      socketIO.in(element).emit("ServerMsg", pack);
    });
  }, 100);*/

  setInterval(() => {
    pack.update();
    socketIO
      .of(sockets.namespaces.general)
      .emit(sockets.messages.pulse, pack);
  }, 100);

  return socketIO;
};
