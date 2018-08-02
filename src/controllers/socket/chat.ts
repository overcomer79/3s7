import { IVisitorConnectionInfo } from "./../../interfaces/IVisitor";
import { sockets } from "../../../shared/config/sockets"
import { core } from "../../models/core";
import { Visitor } from "../../models/visitor";

export const ChatSocketController = (socket: SocketIO.Socket) => {

  const connectionInfo: IVisitorConnectionInfo = {
    socket: socket
  };
  const user = core.getVisitorBySocketId(socket.id);
  console.log("USER", user);

  socket.on(sockets.messages.joinSocketRoom, data => {
    console.log("joined room", data);
    socket.join(data);
    connectionInfo.roomName = data;
    console.log("CONNECTION INFO", connectionInfo);
    user.sendJoinRoomInfo(connectionInfo);
  });

  socket.on(sockets.messages.leaveSocketRoom, data => {
    console.log("left room", data);
    socket.leave(data);
  });

  socket.on(sockets.messages.chat, data => { 
    if (user) {
      user.sendChatMessage(connectionInfo, data);
    }
  });

  /**
   * this function can be usefull
   * for now not implemented
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
