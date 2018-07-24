import { ConnectedUsersInfo } from "./connectedUsersInfo";
import { core } from "../../../src/models/core";

/**
 * Message sended from the socket server with setInterval
 */
export class MessagePack {
  usersInfo: ConnectedUsersInfo = new ConnectedUsersInfo();

  update() {  
    this.usersInfo = { numberOfUser : Object.keys(core.visitors).length };
  }
}
