import { ITable, TableState } from "../interfaces/ITable";
import { IUser } from "../models/user";
import { randomIntFromInterval } from "../../shared/helpers/math";

export abstract class Table implements ITable {
  state: TableState;
  players: Array<IUser>;
  observers: Array<Array<IUser>>;
  opener: number;
  numberOfPlayer: number;

  constructor(owner: IUser, numberOfPlayer: number) {
    this.state = TableState.Waiting;
    this.numberOfPlayer = numberOfPlayer;
    this.players.push(owner);
    this.observers = new Array<any>(numberOfPlayer);
    this.opener = randomIntFromInterval(0, numberOfPlayer - 1);
  }

  OpenerSetNext(): void {
    if (this.opener < this.numberOfPlayer - 1) {
      this.opener++;
    }
    else this.opener = 0;
  }

  JoinAsPlayer(player: IUser): void {
    if (this.players.length === this.numberOfPlayer) {
      return;
    }
    this.players.push(player);
  }

  JoinAsObserver(observer: IUser, indexPlayer: number): void {
    if (indexPlayer < 0) {
      return;
    }
    if (indexPlayer >= this.observers.length) {
      return;
    }
    this.observers[indexPlayer].push(observer);
  }
}
