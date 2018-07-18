import * as _ from "lodash";
import chai = require("chai");
var should = chai.should();

import * as math from "../../../shared/helpers/math";

import { Table } from "../../../src/abstracts/table";
import { User } from "../../../src/models/user";
import { TableState } from "../../../src/interfaces/ITable";
import { randomIntFromInterval } from "../../../shared/helpers/math";
import { Visitor } from "../../../shared/models/visitor";

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
  it("A abstract class Table should be extended", () => {
    _.isObject(this.table).should.be.true;
  });

  it("The table state should be waiting", () => {
    this.table.state.should.equals(TableState.Waiting);
  });

  it("The opener index should be a random index", () => {
    (
      Number.isInteger(this.table.opener) &&
      this.table.opener >= 0 &&
      this.table.opener < this.table.numberOfPlayer
    ).should.be.true;
  });

  it("The table should contain one player", () => {
    this.table.players.length.should.equals(1);
  });
});


describe("#Base Table Methods", () => {
  describe("@OpenerSetNext Method", () => {
    it("If the opener index is not the last element of the array, it should increment by one", () => {
      do {
        this.table.opener = randomIntFromInterval(
          0,
          this.table.numberOfPlayer - 1
        );
      } while (this.table.opener === this.table.numberOfPlayer - 1);
      const indexBefore = this.table.opener;
      this.table.openerSetNext();
      this.table.opener.should.be.equals(indexBefore + 1);
    });

    it("If the opener index is the last element of the array, it should be zero", () => {
      do {
        this.table.opener = randomIntFromInterval(
          0,
          this.table.numberOfPlayer - 1
        );
      } while (this.table.opener !== this.table.numberOfPlayer - 1);
      this.table.openerSetNext();
      this.table.opener.should.be.equals(0);
    });
  });


  describe("@JoinAsPlayer Method", () => {
    it("A player can join a table (if is is not private)", () => {
      const playersNumber = this.table.players.length;
      const user = new User();
      this.table.joinAsPlayer(user);
      this.table.players.length.should.equals(playersNumber + 1);
    });

    it("A table if all player are joined should be in ready state", () => {
      const capacity = this.table.numberOfPlayer;
      for (let index = 1; index < capacity; index++) {
        const user = new User();
        this.table.joinAsPlayer(user);
      }
      this.table.state.should.equals(TableState.Ready);
    });

    it("If a table is ready a player can't join the table", () => {
      while (this.table.state === TableState.Waiting) {
        const user = new User();
        this.table.joinAsPlayer(user);
      }
      const numberOfPlayer = this.table.players.length;
      const user = new User();
      this.table.joinAsPlayer(user);
      numberOfPlayer.should.equals(this.table.players.length);
    });

    it("If a table is private a player can't join the table (whitout invitation)", () => {
      this.table.settings.isPrivate = true;
      const numberOfPlayer = this.table.players.length;
      const user = new User();
      this.table.joinAsPlayer(user);
      numberOfPlayer.should.equals(this.table.players.length);
    });
  });


  describe("@JoinAsObserver Method", () => {

    it("if a table is not observable a visitor/player can't observe a player", () => {
      this.table.settings.isObservable = false;
      const indexPlayerToObserve = randomIntFromInterval(
        0,
        this.table.numberOfPlayer - 1
      );
      const numberOfObeserver = this.table.observers[indexPlayerToObserve]
        .length;
      const visitor = new Visitor("mockString");
      const user = new User();
      this.table.joinAsObserver(user, indexPlayerToObserve);
      this.table.joinAsObserver(visitor, indexPlayerToObserve);
      this.table.observers[indexPlayerToObserve].length.should.equals(
        numberOfObeserver
      );
    });

    it("if a table is observable(default setting) a visitor/player can observe a player", () => {
        const indexPlayerToObserve = randomIntFromInterval(
          0,
          this.table.numberOfPlayer - 1
        );
        const numberOfObeserver = this.table.observers[indexPlayerToObserve]
          .length;
        const visitor = new Visitor("mockString");
        const user = new User();
        this.table.joinAsObserver(user, indexPlayerToObserve);
        this.table.joinAsObserver(visitor, indexPlayerToObserve);
        this.table.observers[indexPlayerToObserve].length.should.equals(
          numberOfObeserver + 2
        );
      });

  });
});
