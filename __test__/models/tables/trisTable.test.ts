import * as _ from "lodash";
import chai = require("chai");
var should = chai.should();

import { User } from "./../../../src/models/user";
import { TrisTable } from "./../../../src/models/tables/trisTable";

describe("@@ TRIS TABLE CLASS", () => {
  describe("#TrisTable Initial conditions", () => {
    it("Tris Table should be an object", () => {
      // Arrange
      const user = new User();

      // Act - using standard settings
      const table = new TrisTable(user, null);

      // Assert
      _.isObject(table).should.be.true;
    });
  });
});
