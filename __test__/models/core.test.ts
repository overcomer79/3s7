import * as _ from "lodash";
import chai = require("chai");
import { core } from "./../../src/models/core";
import { games } from "./../../shared/config/games";

var should = chai.should();

describe("@@ CORE CLASS", () => {

    describe("#Core Class Initial Conditions", () => {
        it("A core should be an object", () => {
            _.isObject(core);
        });
        it("A Core should contains the same number of rooms defined in the config files", () => {
            core.rooms.length.should.equals(Object.keys(games).length);
        });
        it("A Core should not contains any users or visitos", () => {
            core.users.should.be.empty;
            core.visitors.should.be.empty;
        });
    });

    describe("#Methods", () => {
        it("Home response should be an object", () => {
            _.isObject(core.getHomeResponse()).should.be.true;
        });

    });
});