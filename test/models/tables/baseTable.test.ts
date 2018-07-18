import * as _ from 'lodash';
import chai = require('chai');
var should = chai.should();

import * as math from '../../../shared/helpers/math';

import { Table } from '../../../src/abstracts/table';
import { User } from '../../../src/models/user';
import { TableState } from '../../../src/interfaces/ITable';

class MockTable extends Table {
    constructor(user, n) {
        super(user, n, null);
    }
}

beforeEach("create a mock table istance", () => {
    const user = new User();
    const number = math.randomIntFromInterval(2, 10);

    this.table = new MockTable(user, number);
});

describe("#Base Table Initial conditions", () => {

    it("A table should be extended", () => {
        _.isObject(this.table).should.be.true;
    });

    it("The table state sould be waiting", () => {
        this.table.state.should.equals(TableState.Waiting);
    });

    it("The table should contain one player", () => {
        this.table.players.length.should.equals(1);
    });

});

describe("#Base Table Methods", () => {

    it("A player can join a table (if is is not private)", () => {
        const playersNumber = this.table.players.length;
        const user = new User();
        this.table.JoinAsPlayer(user);
        this.table.players.length.should.equals(playersNumber + 1);
    });

});