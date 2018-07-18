import * as global from "../helpers/global";
import { IRoom } from "../interfaces/IRoom";
import { ITable } from "../../src/interfaces/ITable";
import { ConnectedVisitor } from "../../src/models/connectedVisitors";
import { IUser } from "../../src/models/user";
import * as tris from "../models/tables/trisTable" 

export class Room implements IRoom {
  tables: ITable[];
  isEnabled: boolean;
  gameType: global.GameType;
  visitors: ConnectedVisitor[];
  users: IUser[];

  constructor(type: global.GameType) {
    this.gameType = type;
    this.isEnabled = true;
    this.tables = [];
    this.visitors = [];
    this.users = [];
  }

  userJoin(user: IUser): void {
    if (!this.isEnabled) { return; }
    this.users.push(user);
  }

  userLeft(user: IUser): void {
    const index = this.users.indexOf(user, 0);
    if (index > -1) {
      this.users.splice(index, 1);
    }
  }

  visitorJoin(visitor: ConnectedVisitor): void {
    if (!this.isEnabled) { return; }
    this.visitors.push(visitor);
  }

  visitorLeft(visitor: ConnectedVisitor): void {
    const index = this.visitors.indexOf(visitor, 0);
    if (index > -1) {
      this.visitors.splice(index, 1);
    }
  }

  addTable(table: ITable): void {
    if (!this.isEnabled) { return; }

    if (this.gameType === global.GameType.TRIS) {
      this.tables.push(table);
    }
    //Here all others gameType
  }
}
