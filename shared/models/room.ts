import * as global from "../helpers/global";
import { IRoom } from "../interfaces/IRoom";
import { ITable } from "../interfaces/ITable";
import { IUser } from "../../src/models/user";
import { Visitor } from "./visitor";

export class Room implements IRoom {
  tables: ITable[];
  isEnabled: boolean;
  gameType: global.GameType;
  visitors: Visitor[];
  users: IUser[];

  constructor(type: global.GameType) {
    this.gameType = type;
    this.isEnabled = true;
    this.tables = [];
    this.visitors = [];
    this.users = [];
  }

  userJoin(user: IUser): void {
    if (!this.isEnabled) {
      return;
    }
    this.users.push(user);
  }

  userLeft(user: IUser): void {
    const index = this.users.indexOf(user, 0);
    if (index > -1) {
      this.users.splice(index, 1);
    }
  }

  visitorJoin(visitor: Visitor): void {
    if (!this.isEnabled) {
      return;
    }
    this.visitors.push(visitor);
  }

  visitorLeft(visitor: Visitor): void {
    const index = this.visitors.indexOf(visitor, 0);
    if (index > -1) {
      this.visitors.splice(index, 1);
    }
  }

  addTable(table: ITable): void {
    if (!this.isEnabled) {
      return;
    }
    this.tables.push(table);
  }
}
