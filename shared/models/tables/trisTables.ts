import { Table } from '../../../src/abstracts/table';
import { IUser } from '../../../src/models/user';

export class TrisTable extends Table {

    constructor(owner: IUser) {
        super(owner, 2, null);
    }

}