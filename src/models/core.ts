import { IRoom } from "../../shared/interfaces/IRoom";
import { GameInfo } from "../../shared/helpers/global";
import { Room } from "../../shared/models/room";
import { HomeResponse } from "../../shared/models/responses/home";
import { Visitor } from "../../shared/models/visitor";
import { IUser } from "./user";

export class Core {
  static rooms: Array<IRoom> = [];
  static users: Array<IUser> = [];
  static visitors: Array<Visitor> = [];

  constructor() {
    GameInfo.forEach((el, key) => {
      Core.rooms.push(new Room(key));
    });
  }

  static getHomeResponse(): HomeResponse {
    const response = new HomeResponse();

    Core.rooms.forEach(e => {
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
