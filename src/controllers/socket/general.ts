import { IVisitorConnectionInfo } from "../../../shared/interfaces/IVisitor";
import { Visitor } from "../../../shared/models/visitor";
import { sockets } from "../../../shared/config/sockets";

const mainRoom: string = "app";
export const GeneralSocketController = (socket: SocketIO.Socket) => {
  socket.join(mainRoom);

  const connectionInfo: IVisitorConnectionInfo = {
    socket: socket,
    roomName: mainRoom
  };

  Visitor.onConnect(connectionInfo);

  socket.on(sockets.messages.socketDisconnect, () => {
    socket.leave(mainRoom);
    Visitor.onDisconnect(connectionInfo);
  });
};
