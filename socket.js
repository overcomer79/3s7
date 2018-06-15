const io = require("socket.io");
const BaseUser = require("./models/baseUser");

const DEBUG = true;

const pack = {};
const mainRoom = "app";

module.exports.listen = http => {
  socketIO = io.listen(http);

  socketIO.on("connection", socket => {
      
    socket.join(mainRoom);
    const room = socketIO.nsps["/"].adapter.rooms[mainRoom];
    BaseUser.onConnect(socket, room, pack);

    socket.on("sendMsgToServer", data => {
      BaseUser.userList[socket.id].sendChatMessage(socketIO, mainRoom, data);
    });

    socket.on("evalServer", data => {
      console.log("----- FROM CLIENT: TEXT TO EVAL -------");
      if (!DEBUG) return;
      var res = eval(data);
      socket.emit("evalAnswer", res);
    });

    socket.on("disconnect", () => {
      socket.leave(mainRoom);
      BaseUser.onDisconnect(socket, room, pack);
    });
  });

  setInterval(() => {
    Object.keys(socketIO.sockets.adapter.rooms).forEach(element => {
      socketIO.in(element).emit("ServerMsg", pack);
    });
  });

  return socketIO;
};
