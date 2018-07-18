import * as global from "../helpers/global";
import { IRoomDynamicData } from "../interfaces/IRoomDynamicData";

export class Room implements IRoomDynamicData {
  userNumber: number;
  tableNumber: number;
  isEnabled: boolean;
  gameType: global.GameType;

  constructor(type: global.GameType) {
    this.gameType = type;
    /***
     * No user connected or table created yet
     */
    this.userNumber = 0;
    this.tableNumber = 0;
    /***
     * Default Room is Enabled
     */
    this.isEnabled = true;
  }

  disable(): void {
    this.isEnabled = false;
  }

  enable(): void {
    this.isEnabled = true;
  }

  joinUser(): void {
    this.userNumber++;
  }

  createTable(): void {
    this.tableNumber++;
  }
}
