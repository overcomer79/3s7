import { IVisitorConnectionInfo } from "../../interfaces/IVisitor";
import { Visitor } from "../../models/visitor";
import { sockets } from "../../../shared/config/sockets";

const general: string = "app";
export const GeneralSocketController = (socket: SocketIO.Socket) => {
  console.log("new socket connect to general");
  socket.join(general);

  const connectionInfo: IVisitorConnectionInfo = {
    socket: socket,
    roomName: general
  };

  Visitor.onConnect(connectionInfo);

  socket.on(sockets.messages.socketDisconnect, () => {
    socket.leave(general);
    Visitor.onDisconnect(connectionInfo);
  });
};
