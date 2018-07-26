import { IVisitorConnectionInfo } from "../../../shared/interfaces/IVisitor";
import { sockets } from "../../../shared/config/sockets"
import { core } from "../../models/core";

export const ChatSocketController = (socket: SocketIO.Socket) => {

  const connectionInfo: IVisitorConnectionInfo = {
    socket: socket
  };

  socket.on(sockets.messages.joinSocketRoom, data => {
    console.log("joined room", data);
    socket.join(data);
    connectionInfo.roomName = data;
  });

  socket.on(sockets.messages.leaveSocketRoom, data => {
    console.log("left room", data);
    socket.leave(data);
  });

  socket.on(sockets.messages.chat, data => {
    const user = core.getVisitorBySocketId(socket.id);
    if (user) {
      user.sendChatMessage(connectionInfo, data);
    }
  });

  /**
   * this function can be usefull
   * for now not implemented
   * problem of eval global scope
   */
  /*
  socket.on(
    "evalServer",
    (data: string): void => {
      console.log("----- FROM CLIENT: TEXT TO EVAL -------");
      if (!DEBUG) {
        return;
      }
      try {
        // Eval can't scope global variables
        var res: any = eval(data);
      } catch (err) {
        res = { message: "nothing to eval", error: err };
      }
      socket.emit("evalAnswer", res);
    }
  );
  */
};
