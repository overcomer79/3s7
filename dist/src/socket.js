"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const io = require("socket.io");
const baseUser_1 = require("../shared/models/baseUser");
const DEBUG = true;
const mainRoom = "app";
const pack = {
    connectedUsersInfo: {
        numberOfUser: 0
    }
};
let listen = (server) => {
    const socketIO = io.listen(server);
    socketIO.on("connection", socket => {
        socket.join(mainRoom);
        const room = socketIO.nsps["/"].adapter.rooms[mainRoom];
        baseUser_1.default.onConnect(socket, mainRoom, room, pack);
        socket.on("message", function (data) {
            baseUser_1.default.userList[socket.id].sendChatMessage(socketIO, data.room, data.message);
        });
        socket.on("evalServer", data => {
            console.log("----- FROM CLIENT: TEXT TO EVAL -------");
            if (!DEBUG)
                return;
            try {
                var res = eval(data);
            }
            catch (err) {
                res = { message: "nothing to eval", error: err };
            }
            socket.emit("evalAnswer", res);
        });
        socket.on("disconnect", () => {
            socket.leave(mainRoom);
            baseUser_1.default.onDisconnect(socket, mainRoom, room, pack);
        });
    });
    setInterval(() => {
        Object.keys(socketIO.sockets.adapter.rooms).forEach(element => {
            socketIO.in(element).emit("ServerMsg", pack);
        });
    });
    return socketIO;
};
exports.listen = listen;
//# sourceMappingURL=socket.js.map