import * as Global from "../helpers/global";
import { alphanumericUnique } from "../helpers/math";
import { MessagePack } from "./socket_messages/messagePack";
import { LogMessage } from "./chat_messages/logMessage";
import { UserMessage } from "../models/chat_messages/userMessage";

/**
 * It Defines the basic connection visitors info
 * ***
 * properties
 *
 *      socket      -> "Socket user for exchange message"
 *      roomName    -> "The socket room where to exchange message"
 *      rooms       -> "All the rooms of the Server socket"
 *      pack        -> "The effective info of the message"
 */
export interface IVisitorConnectionInfo {
  socket /*: SocketIO.Socket*/;
  roomName: string;
  rooms;
  pack: MessagePack;
}

/**
 * The Class that defines the Visitor
 * ***
 *  - A visitor is the base user
 *  - A visitor can connent o disconnect the variuos socket's rooms
 * ***
 * properties
 *
 *
 *      socketID -> "Socket Id connected to the user"
 *      username -> "Random username for the user"
 *
 * ***
 * static methods
 *
 *      onConnect()    -> "Send info to the server"
 *                        "that a new user connected"
 *
 *      onDisconnect() -> "Send info to the server"
 *                        "that the user disconnected"
 * 
 * methods
 *        
 *      sendChatMessage() -> "send a chat message"
 */
export class Visitor {
  socketId: string;
  username: string;
  color: string;
  canSendMessage: boolean =  true;

  static visitors: Array<Visitor> = [];

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
    Visitor.visitors[connInfo.socket.id] = visitor;
    console.log("utente", visitor.username, "si è connesso...");
    connInfo.pack.usersInfo.numberOfUser = connInfo.rooms.length;
    connInfo.socket.emit("connected user", { user: visitor });
    connInfo.socket.broadcast
      .to(connInfo.roomName)
      .emit(
        "new user joined",
        new LogMessage(visitor, Global.costants.LogMessages.ROOM_JOINED)
      );
  }

  static onDisconnect(connInfo: IVisitorConnectionInfo) {
    console.log(
      "utente",
      Visitor.visitors[connInfo.socket.id].username,
      "ha abbandonato la pagina..."
    );
    connInfo.socket.broadcast
      .to(connInfo.roomName)
      .emit(
        "left room",
        new LogMessage(
          Visitor.visitors[connInfo.socket.id],
          Global.costants.LogMessages.ROOM_LEFT
        )
      );
    delete Visitor.visitors[connInfo.socket.id];
    connInfo.pack.usersInfo.numberOfUser = connInfo.rooms.length;
  }

  sendChatMessage(connInfo: IVisitorConnectionInfo, data: string) {
    if (this.canSendMessage) {
      if (!data || data.trim() === "") return;

      connInfo.socket.emit(
        "addToChat",
        new UserMessage({
          user: this.username,
          color: this.color,
          message: data,
          date: new Date()
        })
      );
    }
    else {
      connInfo.socket.emit(
        "left room",
        new LogMessage(
          Visitor.visitors[connInfo.socket.id],
          " Non hai il permesso di scrivere in chat"
        )
      );
    }
  }

}
