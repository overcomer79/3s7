import * as _ from "lodash";
import chai = require("chai");
var should = chai.should();

import { ConnectedUsersInfo } from "./../../../shared/models/socket_messages/connectedUsersInfo";

describe("@@ CONNECTED USER INFO (SOCKET MESSAGE) CLASS", () => {
  beforeEach("Prepare a ConnectUserInfo object", () => {
    this.user = new ConnectedUsersInfo();
  });

  describe("#ConnectedUserInfo Initial conditions", () => {
    it("A coonected User info should be an object", () => {
      _.isObject(this.user).should.be.true;
    });

    it("The number of user should be zero", () => {
      (this.user.numberOfUser === 0).should.be.true;
    });
  });
});
