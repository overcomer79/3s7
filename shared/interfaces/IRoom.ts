import { ITable } from './../../src/interfaces/ITable';
import * as global from "./../helpers/global";
import { IUser } from "./../../src/models/user";
import { ConnectedVisitor } from "./../../src/models/connectedVisitors";

/**
 * The interface tha define the Room
 * ***
 *  - A room can be used only if it is enabled (default)
 *  - A room is a collection of Tables, user and visitors
 *  - All the tables begins to the same class (gameType)
 * *** 
 * 
 * 
 *      visitors/user   -> "the visitors/user that joined/left the room"
 *      tables          -> "the created tables list"
 *      gameType        -> "The type of game"
 * 
 * methods:
 * 
 *      userJoin()      -> "a user join the main room"
 *      userLeft()      -> "a user left the main room"
 *      visitorJoin()   -> "a visitor joined the main room"
 *      visitorLeft()   -> "a visitor left the main room"
 *      addTable()      -> "add a specific table to the room"
 * 
 */
export interface IRoom {

    tables: Array<ITable>;
    isEnabled: boolean;
    gameType: global.GameType;
    visitors: Array<ConnectedVisitor>;
    users: Array<IUser>;

    userJoin(user: IUser): void;
    userLeft(user: IUser): void;
    visitorJoin(visitor: ConnectedVisitor): void;
    visitorLeft(visitor: ConnectedVisitor): void;
    addTable(table: ITable);
}