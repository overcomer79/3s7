import { ConnectedUsersInfo } from "../connectedUsersInfo"

// Message sended from the socket server with setInterval
export class MessagePack {
  usersInfo: ConnectedUsersInfo = new ConnectedUsersInfo();
}
