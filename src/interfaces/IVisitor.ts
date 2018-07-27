/**
 * It Defines the basic connection visitors info
 * ***
 * properties
 *
 *      socket      -> "Socket user for exchange message"
 *      roomName?    -> "The socket room where to exchange message"
 */
export interface IVisitorConnectionInfo {
    socket /*: SocketIO.Socket*/;
    roomName?: string;
  }

  /**
 * Interface that defines the Visitor
 * ***
 *  - A visitor is the base user
 *  - A visitor can send message if is enabled to do it
 * ***
 * properties
 *
 *      socketID -> "Socket Id connected to the user"
 *      username -> "Random username for the user"
 *
 * ***
 * methods
 *        
 *      sendChatMessage() -> "send a chat message"
 */
  export interface IVisitor {
    socketId: string;
    username: string;
    color: string;
    canSendMessage: boolean;
 
    sendChatMessage(connInfo: IVisitorConnectionInfo, data: string): void;
  }