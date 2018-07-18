import { ITable, TableState, ITableSettings } from "../interfaces/ITable";
import { IUser } from "../models/user";
import { randomIntFromInterval } from "../../shared/helpers/math";
import { ConnectedVisitor } from "../models/connectedVisitors";

export abstract class Table implements ITable {
  state: TableState;
  players: IUser[];
  observers: ConnectedVisitor[][];
  opener: number;
  numberOfPlayer: number;
  settings: ITableSettings = {
    isObservable: true,
    isPrivate: false,
    secondsToPlay: 0
  };

  constructor(owner: IUser, numberOfPlayer: number, settings: ITableSettings) {
    this.state = TableState.Waiting;
    this.numberOfPlayer = numberOfPlayer;

    this.players = [];
    this.players.push(owner);

    this.observers = [];
    for (let index = 0; index < numberOfPlayer; index++) {
      this.observers[index] = [];
    }

    this.opener = randomIntFromInterval(0, numberOfPlayer - 1);

    if (settings) {
      this.settings = {
        isPrivate: settings.isPrivate,
        isObservable: settings.isObservable,
        secondsToPlay: settings.secondsToPlay
      };
    }
  }

  OpenerSetNext(): void {
    if (this.opener < this.numberOfPlayer - 1) {
      this.opener++;
    } else this.opener = 0;
  }

  JoinAsPlayer(player: IUser): void {
    if (this.settings.isPrivate) {
      return;
    }
    if (this.state !== TableState.Waiting) {
      return;
    }

    this.players.push(player);

    if (this.players.length === this.numberOfPlayer) {
      this.state = TableState.Ready;
    }
  }

  JoinAsObserver(observer: ConnectedVisitor, indexPlayer: number): void {
    if (!this.settings.isObservable) {
      return;
    }
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
