import { ITable } from './ITable';
import * as global from "../helpers/global";
import { IUser } from "../../src/models/user";
import { Visitor } from '../models/visitor';

/**
 * The interface that defines the Room
 * ***
 *  - A room can be used only if it is enabled (default)
 *  - A room is a collection of Tables, user and visitors
 *  - All the tables begins to the same class (gameType)
 * *** 
 * 
 * 
 *      users       -> "the users that joined/left the room"
 *      visitors    -> "the visitors that joined/left the room"
 *      tables      -> "the created tables list"
 *      gameType    -> "The type of game"
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
    visitors: Array<Visitor>;
    users: Array<IUser>;

    userJoin(user: IUser): void;
    userLeft(user: IUser): void;
    visitorJoin(visitor: Visitor): void;
    visitorLeft(visitor: Visitor): void;
    addTable(table: ITable);
}