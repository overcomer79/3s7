import { IVisitorConnectionInfo } from "./../../../shared/interfaces/IVisitor";
import { MessageInfo, MessageType } from "../../../shared/helpers/global";
import { core } from "../../models/core";

const mainRoom: string = "app";
export const ChatSocketController = (socket: SocketIO.Socket) => {
  socket.join(mainRoom);
  const connectionInfo: IVisitorConnectionInfo = {
    socket: socket,
    roomName: mainRoom
  };

  socket.on("chat message", data => {
    const user = core.getVisitorBySocketId(socket.id);
    if (user) {
      user.sendChatMessage(connectionInfo, data.message);
    }
  });
};
