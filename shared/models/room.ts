import * as global from "../helpers/global";
import { IRoomDynamicData } from "../interfaces/IRoomDynamicData";

export class room {
  private gameType: global.GameType;
  private dynamicData: IRoomDynamicData;

  constructor(type: global.GameType) {
    this.gameType = type;
    this.dynamicData.userNumber = 1;
    this.dynamicData.tableNumber = 1;
    this.dynamicData.isEnabled = true;
  }

  disable(): void {
    this.dynamicData.isEnabled = false;
  }

  enable(): void {
    this.dynamicData.isEnabled = true;
  }

  joinUser(): void {
    this.dynamicData.userNumber++;
  }

  createTable(): void {
    this.dynamicData.tableNumber++;
  }

  getGameType(): global.GameType {
    return this.gameType;
  }

  getDynamicData(): IRoomDynamicData {
    return this.dynamicData;
  }
}
