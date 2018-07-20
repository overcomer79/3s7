import { IRoom } from "../../shared/interfaces/IRoom";
import { GameType } from "../../shared/helpers/global";
import { Room } from "../../shared/models/room";

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
}
