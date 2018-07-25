import { Room } from "../../../../shared/models/room";
import { GameType } from "../../../../shared/helpers/global";

export class RoomUi extends Room {

    icon: string;
    bgIconColor: string;
    title: string;

    constructor(gt: GameType, icon: string, bgIconColor: string) {
        super(gt);
        this.icon = icon;
        this.bgIconColor = bgIconColor;
        if (gt === GameType.TRESSETTE) { this.title = "App1"; }
        if (gt === GameType.BRISCOLA) { this.title = "App2"; }
        if (gt === GameType.TRIS) { this.title = "App3"; }
    }
}
