import { Room } from "../../../../src/models/room";

export class RoomUi extends Room {

    icon: string;
    bgIconColor: string;
    title: string;

    constructor(gt: any, icon: string, bgIconColor: string) {
        super(gt);
        this.icon = icon;
        this.bgIconColor = bgIconColor;
        this.title = this.gameType.name;
    }
}
