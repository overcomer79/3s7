import { IUser } from "../models/user";

export enum TableState {
  Waiting,
  Ready,
  Playing
}

export interface ITable {
  state: TableState;
  players: Array<IUser>;
  observers: Array<Array<IUser>>;
  opener: number;
}
