import * as Global from "../helpers/global";
import { alphanumericUnique } from "../helpers/math";
import { IVisitor, IVisitorConnectionInfo } from "./../interfaces/IVisitor";
import { LogMessage } from "./chat_messages/logMessage";
import { UserMessage } from "../models/chat_messages/userMessage";
import { core } from "../../src/models/core";
import { socketIO } from "../../src/socket";

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
    const visitor = new Visitor(connInfo.socket.id);
    core.visitors[connInfo.socket.id] = visitor;
    console.log("user", visitor.username, "join", connInfo.roomName);
    connInfo.socket.emit("connected user", { user: visitor });
   /*
    Object.keys(socketIO.of("/chat").adapter.rooms).forEach(element => {
      console.log(element);
    });
    
    socketIO
      .of("/general").to(connInfo.roomName)
      .emit(
        "new user joined",
        new LogMessage(visitor, Global.costants.LogMessages.ROOM_JOINED)
      );
    */
    connInfo.socket.broadcast
      .to(connInfo.roomName)
      .emit(
        "new user joined",
        new LogMessage(visitor, Global.costants.LogMessages.ROOM_JOINED)
      );

  }

  static onDisconnect(connInfo: IVisitorConnectionInfo) {
    console.log(
      "user",
      core.visitors[connInfo.socket.id].username,
      "left",
      connInfo.roomName
    );
    connInfo.socket.broadcast
      .to(connInfo.roomName)
      .emit(
        "left room",
        new LogMessage(
          core.visitors[connInfo.socket.id],
          Global.costants.LogMessages.ROOM_LEFT
        )
      );
    delete core.visitors[connInfo.socket.id];
  }

  sendChatMessage(connInfo: IVisitorConnectionInfo, data: string) {
    if (this.canSendMessage) {
      if (!data || data.trim() === "") return;
      socketIO.of('/chat').in(connInfo.roomName).emit(
        "addToChat",
        new UserMessage({
          user: this.username,
          color: this.color,
          message: data,
          date: new Date()
        })
      );
    } else {
      connInfo.socket.emit(
        "left room",
        new LogMessage(
          core.visitors[connInfo.socket.id],
          " Non hai il permesso di scrivere in chat"
        )
      );
    }
  }
}
