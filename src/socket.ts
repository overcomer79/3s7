import * as io from "socket.io";
import { Server } from "https";
import BaseUser from "../shared/models/baseUser";

const DEBUG = true;
const mainRoom = "app";

const pack = {
  connectedUsersInfo: {
    numberOfUser: 0
  }
};

let listen = (server: Server) => {
  const socketIO = io.listen(server);

  socketIO.on("connection", socket => {
    socket.join(mainRoom);
    const room = socketIO.nsps["/"].adapter.rooms[mainRoom];
    BaseUser.onConnect(socket, mainRoom, room, pack);

    socket.on("message", function(data) {
      BaseUser.userList[socket.id].sendChatMessage(
        socketIO,
        data.room,
        data.message
      );
    });

    socket.on("evalServer", data => {
      console.log("----- FROM CLIENT: TEXT TO EVAL -------");
      if (!DEBUG) return;
      try {
        var res = eval(data);
      } catch (err) {
        res = { message: "nothing to eval", error: err };
      }
      socket.emit("evalAnswer", res);
    });

    socket.on("disconnect", () => {
      socket.leave(mainRoom);
      BaseUser.onDisconnect(socket, mainRoom, room, pack);
    });
  });

  setInterval(() => {
    Object.keys(socketIO.sockets.adapter.rooms).forEach(element => {
      socketIO.in(element).emit("ServerMsg", pack);
    });
  });

  return socketIO;
};

export { listen };
