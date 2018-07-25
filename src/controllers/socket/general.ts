import { IVisitorConnectionInfo } from "./../../../shared/interfaces/IVisitor";
import { Visitor } from "./../../../shared/models/visitor";

const mainRoom: string = "app";
export const GeneralSocketController = (socket: SocketIO.Socket) => {
  socket.join(mainRoom);
  const connectionInfo: IVisitorConnectionInfo = {
    socket: socket,
    roomName: mainRoom
  };

  Visitor.onConnect(connectionInfo);

  socket.on("disconnect", () => {
    connectionInfo.socket.leave(mainRoom);
    Visitor.onDisconnect(connectionInfo);
  });
};
