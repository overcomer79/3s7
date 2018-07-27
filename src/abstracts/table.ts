import { ITable, TableState, ITableSettings } from "../interfaces/ITable";
import { IUser } from "../models/user";
import { randomIntFromInterval } from "../../shared/helpers/math";
import { Visitor } from "../models/visitor";

export abstract class Table implements ITable {
  state: TableState;
  players: IUser[];
  observers: Visitor[][];
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

  openerSetNext(): void {
    if (this.opener < this.numberOfPlayer - 1) {
      this.opener++;
    } else this.opener = 0;
  }

  joinAsPlayer(player: IUser): void {
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

  joinAsObserver(observer: Visitor, indexPlayer: number): void {
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
