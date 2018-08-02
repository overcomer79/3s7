const _ = require("lodash");
const chai = require("chai");
const should = chai.should();
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const clients = require("restify-clients");

import { startServer } from "./../src/server";
import { IUser } from "../src/models/user";
import app from "./../src/app";
import * as io from "./../src/socket";

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
    app.disconnectMongoose();
    clearInterval(io.pulseFunc); 
    server.close();
  });

  describe("#GET api/user", () => {
      
    it("should respond", () => {
      return this.allUser().should.eventually.be.fulfilled;
    });
    
    it("Every user should be an object and it should have an auth object based on the access method", async () => {
      const response = await this.allUser();
      response.forEach(user => {          
        let myObject: IUser = user as IUser;
        _.isObject(myObject).should.be.true;
        let method = myObject.method;
        _.isObject(myObject[method]).should.be.true;
      });

    });
    
  });
});
