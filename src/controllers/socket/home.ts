import { IVisitorConnectionInfo } from "./../../../shared/interfaces/IVisitor";
import { Visitor } from "./../../../shared/models/visitor";
import { core } from "../../models/core";
import { MessageType } from "../../../shared/helpers/global";
import { MessageInfo } from "../../../shared/helpers/global";

const DEBUG: boolean = true;
const mainRoom: string = "/";

export let HomeSocketController = (socket: SocketIO.Socket) => {
  socket.join(mainRoom);

  const connectionInfo: IVisitorConnectionInfo = {
    socket: socket,
    roomName: mainRoom
  };

  Visitor.onConnect(connectionInfo);

  socket.on(MessageInfo.get(MessageType.CHAT_MESSAGE), data => {
    core.visitors[socket.id].sendChatMessage(connectionInfo, data.message);
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

  socket.on("disconnect", () => {
    connectionInfo.socket.leave(mainRoom);
    Visitor.onDisconnect(connectionInfo);
  });
};
