
// import { MessagePack } from "../models/socket_messages/messagePack";

// /**
//  * It Defines the basic connection info to exchange with server
//  * ***
//  * properties
//  * 
//  *      Socket      -> "Socket user for exchange message"
//  *      roomName    -> "The socket room where to exchange message"
//  *      rooms       -> "All the rooms of the Server socket"
//  *      pack        -> "The effective info of the message"
//  */
// export interface IVisitorConnectionInfo {
//     socket/*: SocketIO.Socket*/;
//     roomName: string;
//     rooms,
//     pack: MessagePack;
// }


// /**
//  * The interface that defines the Visitor
//  * ***
//  *  - A visitor is the base user 
//  *  - A visitor can connent o disconnect the variuos socket's rooms
//  * ***
//  * properties
//  *      
//  * 
//  *      socketID -> "Socket Id connected to the user"
//  *      
//  * ***
//  * static methods
//  *      
//  *      onConnect()    -> "Send info to the server" 
//  *                        "that a new user connected"
//  * 
//  *      onDisconnect() -> "Send info to the server"
//  *                        "that the user disconnected"
//  */
// export interface IVisitor {
//     socketId: string;

//     static onConnect(connInfo: IVisitorConnectionInfo);
// }