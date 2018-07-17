import { Injectable } from "@angular/core";
import { RoomUi } from "../../models/room";
import { GameType } from "../../../../../shared/helpers/global";

@Injectable()
export class RoomsService {

    constructor() {
        this.rooms = [];
        this.rooms.push(new RoomUi(GameType.BRISCOLA, "gamer.png", "bg-c-A5A4C3"));
        this.rooms.push(new RoomUi(GameType.TRESSETTE, "knight.png", "bg-c-A5A4C3"));
        this.rooms.push(new RoomUi(GameType.TRIS, "rocket.png", "bg-c-A5A4C3"));
    }

    private rooms: Array<RoomUi> = [];

    getRooms() {
        return this.rooms;
    }

    getRoomByType(gt: GameType) {
       return this.rooms.find((r) => r.gameType === gt );
    }
}
