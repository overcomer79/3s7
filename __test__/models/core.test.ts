import * as _ from "lodash";
import chai = require("chai");
import { Core } from "../../src/models/core";
var should = chai.should();

describe("@@ CORE CLASS", () => {
    describe("#Core Class Initial Conditions", () => {
        it("A core should be an object", () => {
            _.isObject(new Core());
        }); 
    });

    describe("#Methods", () => {
        it.only("A Home response should be an object", () => {
            const core = new Core();
            console.log(core.getHomeResponse());
        });
    });
    
});