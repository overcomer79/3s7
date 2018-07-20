import * as _ from "lodash";
import chai = require("chai");
var should = chai.should();

import { Room } from "./../../shared/models/room";
import { GameType } from "./../../shared/helpers/global";
import { User } from "../../src/models/user";
import { Visitor } from "../../shared/models/visitor";
import { TrisTable } from "../../shared/models/tables/trisTable";

describe("@@ ROOM CLASS", () => {
  beforeEach("Create a random room", () => {
    const numberOfDifferentGames = Object.keys(GameType).length / 2;
    this.room = new Room(<GameType>numberOfDifferentGames);
  });

  describe("#Room Initial Conditions", () => {
    it("A room should be an object", () => {
      _.isObject(this.room).should.be.true;
    });

    it("A room should be empty (No users / No tables/ No visitors", () => {
      (
        this.room.visitors.length === 0 &&
        this.room.users.length === 0 &&
        this.room.tables.length === 0
      ).should.be.true;
    });

    it("A room should be enalbed (Default)", () => {
      this.room.isEnabled.should.be.true;
    });
  });

  describe("#Room Methods", () => {
    beforeEach("Create a user / visitor", () => {
      this.user = new User();
      this.visitor = new Visitor("TEST");
    });
    it("A user can join the room", () => {
      const usersBeforeJoin = this.room.users.length;
      this.room.userJoin(this.user);
      this.room.users.length.should.equals(usersBeforeJoin + 1);
    });

    it("A user can left the room", () => {
      this.room.userJoin(this.user);
      const usersBeforeLeft = this.room.users.length;
      this.room.userLeft(this.user);
      this.room.users.length.should.equals(usersBeforeLeft - 1);
    });

    it("A visitor can join the room", () => {
      const visitorsBeforeJoin = this.room.visitors.length;
      this.room.visitorJoin(this.visitor);
      this.room.visitors.length.should.equals(visitorsBeforeJoin + 1);
    });

    it("A visitor can left the room", () => {
      this.room.visitorJoin(this.visitor);
      const visitorsBeforeLeft = this.room.visitors.length;
      this.room.visitorLeft(this.visitor);
      this.room.visitors.length.should.equals(visitorsBeforeLeft - 1);
    });

    before("Create a Array of different Table", () => {
        this.differentTypeOfTables = [];
        this.differentTypeOfTables.push(new TrisTable(this.user, null));
    })

    it("Should be possible to add a table", () => {
        this.differentTypeOfTables.forEach(e => {
            this.room.addTable(e);
        });
        this.room.tables.length.should.equals(this.differentTypeOfTables.length);
    });

  });
});
