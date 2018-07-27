import { Table } from "./../../abstracts/table";
import { IUser } from "./../user";
import { ITableSettings } from "../../interfaces/ITable";

const NumberOfPlayer = 2;

export enum TableSpeed {
  Slow = 20,
  Normal = 10,
  Fast = 5
}

/**
 * Standard Table settings
 */
export class TableSetting implements ITableSettings {
  isPrivate = false;
  isObservable = false;
  secondsToPlay = TableSpeed.Normal;
}

export class TrisTable extends Table {
  constructor(owner: IUser, settings: TableSetting) {
    if (settings === null) {
        settings = new TableSetting();
    }
    super(owner, NumberOfPlayer, settings);
  }
}
