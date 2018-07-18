import { ITable, TableState, TableSettings } from "../interfaces/ITable";
import { IUser } from "../models/user";
import { randomIntFromInterval } from "../../shared/helpers/math";
import { ConnectedVisitor } from "../models/connectedVisitors";

export abstract class Table implements ITable {
  state: TableState;
  players: Array<IUser> = new Array<IUser>();
  observers: Array<Array<ConnectedVisitor>>;
  opener: number;
  numberOfPlayer: number;
  settings: TableSettings = {
    IsObservable: true,
    IsPrivate: false
  };

  constructor(owner: IUser, numberOfPlayer: number, settings: TableSettings) {
    this.state = TableState.Waiting;
    this.numberOfPlayer = numberOfPlayer;
    this.players.push(owner);
    this.observers = new Array<any>(numberOfPlayer);
    this.opener = randomIntFromInterval(0, numberOfPlayer - 1);
    if (settings) {
      this.settings = {
        IsPrivate: settings.IsPrivate,
        IsObservable: settings.IsObservable
      };
    }
  }

  OpenerSetNext(): void {
    if (this.opener < this.numberOfPlayer - 1) {
      this.opener++;
    }
    else this.opener = 0;
  }

  JoinAsPlayer(player: IUser): void {
    if (this.settings.IsPrivate) { return; }
    if (this.state !== TableState.Waiting) { return; }

    this.players.push(player);

    if (this.players.length === this.numberOfPlayer) {
      this.state = TableState.Ready;
    }
  }

  JoinAsObserver(observer: ConnectedVisitor, indexPlayer: number): void {
    if (!this.settings.IsObservable) { return; }
    if (indexPlayer < 0) {
      return;
    }
    if (indexPlayer >= this.observers.length) {
      return;
    }
    this.observers[indexPlayer].push(observer);
  }
}

export default Table;