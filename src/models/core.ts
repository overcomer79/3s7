import { IRoom } from "../../shared/interfaces/IRoom";
import { GameType } from "../../shared/helpers/global";
import { Room } from "../../shared/models/room";
import {
  HomeResponse,
  IRoomsHomeReponse
} from "../../shared/models/responses/home";

export class Core {
  rooms: Array<IRoom>;

  constructor() {
    this.rooms = [];
    const keys = Object.keys(GameType).filter(key =>
      isNaN(Number(GameType[key]))
    );
    keys.forEach(el => {
      this.rooms.push(new Room(<GameType>Number(el)));
    });
  }

  getHomeResponse(): HomeResponse {
    const response = new HomeResponse();

    this.rooms.forEach(e => {
      let roomName: string;
      if (e.gameType === GameType.TRESSETTE) {
        roomName = "Tressette";
      }
      if (e.gameType === GameType.BRISCOLA) {
        roomName = "Briscola";
      }
      if (e.gameType === GameType.TRIS) {
        roomName = "Tris";
      }
      const room: IRoomsHomeReponse = {
        name: roomName,
        connectedUser: e.users.length,
        connectedVisitor: e.visitors.length,
        tables: e.tables.length
      };
      response.rooms.push(room);
    });

    return response;
  }
}
