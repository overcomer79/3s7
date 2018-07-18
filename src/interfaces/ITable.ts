import { IUser } from "../models/user";
import { ConnectedVisitor } from "../models/connectedVisitors";

/**
 * Various basic states of the table
 *  Waiting: when the table is created, waiting for the players to join it.
 *  Ready: All the players joined the table
 *  Playing: The players are playing the game
 */
export enum TableState {
  Waiting,
  Ready,
  Playing
}

/**
 * Base setting of the table by the user
 *  isPrivate: A private table can be joined only if the user
 *              has been invited
 *  IsOservable: Observators are permitted to join the table
 */
export interface ITableSettings {
  isPrivate: boolean;
  isObservable: boolean;
  secondsToPlay: number;
}

/**
 * The interface that defines the Table
 *  ...
 *  Opener: the index of the player in the players array that begin to play (open the game)
 *  ...
 *
 *  OpenreSetNext(): Set the turn to the next player in the players array
 *  JoinAsPlayer(): A player join the table
 *  JoinAsObserve(): A visitor can obeserve a player playing
 *  ...
 *
 */
export interface ITable {
  state: TableState;
  players: Array<IUser>;
  observers: Array<Array<ConnectedVisitor>>;
  opener: number;
  settings: ITableSettings;

  OpenerSetNext(): void;
  JoinAsPlayer(player: IUser): void;
  JoinAsObserver(observer: ConnectedVisitor, indexPlayer: number): void

}
