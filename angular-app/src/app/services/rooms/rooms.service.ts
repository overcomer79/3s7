import { Injectable } from "@angular/core";
import { RoomUi } from "../../models/room";
//import { GameType } from "../../../../../shared/helpers/global";
import { games } from "../../../../../shared/config/games";

@Injectable()
export class RoomsService {

    constructor() {
        this.rooms = [];
        this.rooms.push(new RoomUi(games.briscola, "gamer.png", "bg-c-A5A4C3"));
        this.rooms.push(new RoomUi(games.tressette, "knight.png", "bg-c-A5A4C3"));
        this.rooms.push(new RoomUi(games.tris, "rocket.png", "bg-c-A5A4C3"));
    }

    private rooms: Array<RoomUi> = [];

    getRooms() {
        return this.rooms;
    }

    getRoomByNameType(gt: any) {
       return this.rooms.find((r) => r.gameType.name === gt );
    }
}
