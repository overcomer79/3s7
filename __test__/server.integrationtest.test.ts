const _ = require("lodash");
const chai = require("chai");
const should = chai.should();
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const clients = require("restify-clients");

chai.use(chaiAsPromised);

import { startServer } from "./../src/server";


const get = (client, url) => {
  return new Promise((success, failure) => {
    client.get(url, (err, req, res, obj) => {
      if (err) {
        return failure(err);
      }
      return success(obj);
    });
  });
};

describe("#index integration", () => {
  let server;
  let client;

  before(done => {

    client = clients.createJsonClient({
      url: "https://localhost:3000",
      rejectUnauthorized: false
    });
    const getURL = _.partial(get, client);
    this.allUser = _.partial(getURL, "/user");
    //console.log(getURL);
    //console.log(_.partial(get,client));

    //getURL         = _.partial(get, client);
    /*
        ping           = _.partial(getURL, '/api/ping');
        getAdventurers = _.partial(getURL, '/api/data?party=adventurers');
        getSteamPunk   = _.partial(getURL, '/api/data?party=steampunk');
        */
    startServer()
      .then(result => {
        server = result;
        done();
      })
      .catch(done);
  });
  after(() => {
    client.close();
    server.close();
  });

  describe("#GET api/user", () => {
    it("should respond", () => {
      return this.allUser().should.be.fulfilled;
    });
  });
});
