import * as _ from "lodash";
import chai = require("chai");
import { Core } from "../../src/models/core";
var should = chai.should();

describe("@@ CORE CLASS", () => {
    it.only("A core should be an object", () => {
        _.isObject(new Core());
    }); 
});