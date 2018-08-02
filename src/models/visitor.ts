import * as Global from "./../../shared/helpers/global";
import { alphanumericUnique } from "./../../shared/helpers/math";
import { IVisitor, IVisitorConnectionInfo } from "../interfaces/IVisitor";
import { LogMessage } from "./../../shared/models/chat_messages/logMessage";
import { UserMessage } from "./../../shared/models/chat_messages/userMessage";
import { core } from "./core";
import { socketIO } from "./../../src/socket";
import { sockets } from "./../../shared/config/sockets";

/**
 * The Class for the Visitor
 * ***
 * static properties
 *
 *      visitors -> "Socket Id connected to the user"
 *
 * ***
 * static methods
 *
 *      onConnect()    -> "Send info to the server"
 *                        "that a new user connected"
 *
 *      onDisconnect() -> "Send info to the server"
 *                        "that the user disconnected"
 */
export class Visitor implements IVisitor {
  socketId: string;
  username: string;
  color: string;
  canSendMessage: boolean = true;

  constructor(idSocket: string) {
    this.socketId = idSocket;
    this.username =
      Global.costants.BaseUserConfig.usernamePrefix +
      alphanumericUnique().toUpperCase() +
      new Date().toLocaleDateString().replace(/-/g, "");
    this.color = "hsla(" + Math.random() * 360 + ", 80%, 30%, 1)";
  }

  static onConnect(connInfo: IVisitorConnectionInfo) {

    console.log("VISITOR IS CONNECTING...");
    // create a new visitor
    const visitor = new Visitor(connInfo.socket.id);

    // Update the core
    core.visitors[connInfo.socket.id] = visitor;

    // server log
    // TODO: this should be implemented with a specific library
    //        -  winston?
    console.log("user", visitor.username, "join", connInfo.roomName);

    // Emit to the frontend the info of the connected user
    connInfo.socket.emit(sockets.messages.connectedUserInfo, { user: visitor });

    // visitor.sendJoinRoomInfo(connInfo);
    
  }

  static onDisconnect(connInfo: IVisitorConnectionInfo) {
    // server log
    console.log(
      "user",
      core.visitors[connInfo.socket.id].username,
      "left",
      connInfo.roomName
    );

    // Broadcast to the room the info that a new user has left
    connInfo.socket.broadcast.to(connInfo.roomName).emit(
      // TODO:
      // - this should be log INFO(SAD)
      // the socket message just log and specify the LogMessage Class
      sockets.messages.log.UserLeft,
      new LogMessage(
        core.visitors[connInfo.socket.id],
        Global.costants.LogMessages.ROOM_LEFT
      )
    );

    // Update the core
    delete core.visitors[connInfo.socket.id];
  }

  sendChatMessage(connInfo: IVisitorConnectionInfo, data: string) {
    if (this.canSendMessage) {
      if (!data || data.trim() === "") return;

      // emit the chat message to the room
      socketIO
        .of(sockets.namespaces.chat)
        .in(connInfo.roomName)
        .emit(
          sockets.messages.chat,
          new UserMessage({
            user: this.username,
            color: this.color,
            message: data,
            date: new Date()
          })
        );
    } else {
      connInfo.socket.emit(
        // TODO:
        // - this should be log ERROR
        // the socket message just log and specify the LogMessage Class
        "left room",
        new LogMessage(
          core.visitors[connInfo.socket.id],
          "Non hai il permesso di scrivere in chat"
        )
      );
    }
  }

  sendJoinRoomInfo(connInfo: IVisitorConnectionInfo){
    // Broadcast to the room the info that a new user has joined
    connInfo.socket.broadcast
      .to(connInfo.roomName)
      // TODO:
      // - this should be log INFO(HAPPY)
      // - the socket message just log and specify the LogMessage Class
      .emit(
        sockets.messages.log.UserJoined,
        new LogMessage(this, Global.costants.LogMessages.ROOM_JOINED)
      );
  }
}
