import * as io from "socket.io";
import { Server } from "https";
import { MessagePack } from "../shared/models/socket_messages/messagePack";
import { GeneralSocketController } from "./controllers/socket/general";
import { ChatSocketController } from "./controllers/socket/chat";

/*
// sending to sender-client only
socket.emit('message', "this is a test");

// sending to all clients, include sender
io.emit('message', "this is a test");

// sending to all clients except sender
socket.broadcast.emit('message', "this is a test");

// sending to all clients in 'game' room(channel) except sender
socket.broadcast.to('game').emit('message', 'nice game');

// sending to all clients in 'game' room(channel), include sender
io.in('game').emit('message', 'cool game');

// sending to sender client, only if they are in 'game' room(channel)
socket.to('game').emit('message', 'enjoy the game');

// sending to all clients in namespace 'myNamespace', include sender
io.of('myNamespace').emit('message', 'gg');

// sending to individual socketid
socket.broadcast.to(socketid).emit('message', 'for your eyes only');
*/

const pack: MessagePack = new MessagePack();

export let socketIO: SocketIO.Server;

export const listen: any = (server: Server) => {
  socketIO = io.listen(server);

  Object.keys(socketIO.sockets.adapter.nsp.name).forEach(element => {
    console.log(element);
  });

  socketIO.of("/general").on("connection", GeneralSocketController);
  socketIO.of("/chat").on("connection", ChatSocketController);

  //socketIO.of("/").on("connection", HomeSocketController);
  /*
  socketIO.of('/rooms/2').on("connection", () => {console.log("SONO QUI"); })
  */

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
    socketIO.of("/general").emit("ServerMsg", pack);
  }, 100);

  return socketIO;
};
