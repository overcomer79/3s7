import { IVisitorConnectionInfo } from "./../../../shared/interfaces/IVisitor";
import { MessageInfo, MessageType } from "../../../shared/helpers/global";
import { core } from "../../models/core";

//const mainRoom: string = "app";
export const ChatSocketController = (socket: SocketIO.Socket) => {
  socket.on("join", data => {
    console.log("join room", data);
    socket.join(data);
    connectionInfo.roomName = data;
  });

  socket.on("leave", data => {
    console.log("left room", data);
    socket.leave(data);
  });

  const connectionInfo: IVisitorConnectionInfo = {
    socket: socket
  };

  socket.on("chat message", data => {
    console.log("CHAT DATA", data);
    const user = core.getVisitorBySocketId(socket.id);
    if (user) {
      user.sendChatMessage(connectionInfo, data);
    }
  });
};
