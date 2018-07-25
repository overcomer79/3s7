import { IRoom } from "../../shared/interfaces/IRoom";
import { GameInfo } from "../../shared/helpers/global";
import { Room } from "../../shared/models/room";
import { HomeResponse } from "../../shared/models/responses/home";
import { Visitor } from "../../shared/models/visitor";
import { IUser } from "./user";

/**
 * Core Singleton of the application
 * ***
 * properties:
 *
 *      users -> "List of users that are using the app"
 *      visitors -> "List of the visitors that are using the app"
 *      rooms -> "list of the rooms implemented for playing"
 * ***
 * methods:
 *
 *      getHomeResponse -> "Object sent to the frontend in order to build the home page"
 */
class Core {
  rooms: Array<IRoom>;
  users: Array<IUser>;
  visitors: Array<Visitor>;

  constructor() {
    this.users = [];
    this.visitors = [];
    this.rooms = [];
    GameInfo.forEach((el, key) => {
      this.rooms.push(new Room(key));
    });
  }

  getVisitorBySocketId(idSocket: string): Visitor {
    const cleanSocketId = idSocket.split("#")[1];
    let result = this.visitors["/general#" + cleanSocketId];
    if (result) return result;

    result = this.users["/general#" + cleanSocketId];
    if (result) return result;
  }

  getHomeResponse(): HomeResponse {
    const response = new HomeResponse();

    this.rooms.forEach(e => {
      response.rooms.push({
        name: GameInfo.get(e.gameType).roomName,
        connectedUser: e.users.length,
        connectedVisitor: e.visitors.length,
        tables: e.tables.length
      });
    });

    return response;
  }
}

/**
 * Create a singleton to be exported
 */
export const core = new Core();
