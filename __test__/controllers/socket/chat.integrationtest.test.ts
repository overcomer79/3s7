import * as socketio_client from "socket.io-client";

import { sockets } from "./../../../shared/config/sockets";
var should = require("chai").should();
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

import { startServer } from "./../../../src/server";
import app from "./../../../src/app";

import * as io from "./../../../src/socket";

var os = require("os");
//const end_point = "https://" + os.hostname() + ":" + process.env.PORT || 3000 + sockets.namespaces.general;
const end_point = "https://" + os.hostname() + ":" + (process.env.PORT || 3000) +  sockets.namespaces.general;

/*var opts = { forceNew: true, secure: true };
{ secure: true }
*/
const opts = { secure: true };

describe("async test with socket.io", function() {
  let socket_client;
  let server;

  before(done => {
    startServer()
      .then(result => {
        server = result;
        console.log("OK OK OK OK OK ");
        done();
      })
      .catch(done);
  });

  after(() => {
    app.disconnectMongoose();
    clearInterval(io.pulseFunc);
    server.close();
  });

  // beforeEach(done => {
  //   //socket_client  = socketio_client.connect(end_point);
  //   const socket_client = socketio_client.connect(end_point);

  //   //console.log("end point", end_point);
  //   //console.log(socket_client);

  //   /*
  //   socket_client.on("connect", function() {
  //     console.log("worked...");
  //     done();
  //   });
  //   socket_client.on("disconnect", function() {
  //     console.log("disconnected...");
  //   });
  //   */

  //   done();
  // });

  // this.afterEach(done => {

  //   if (socket_client.connected) {
  //     console.log("disconnecting...");
  //     socket_client.disconnect();
  //   } else {
  //     // There will not be a connection unless you have done() in beforeEach, socket.on('connect'...)
  //     console.log("no connection to break...");
  //   }
  //   done();

  // });

  it.only("Response should be an object", done => {
    //console.log("TESTTTTTTTTT");
    //socket_client.connect();
    //socket_client.emit('connect');
    console.log("END POINT", end_point);
    const socket = socketio_client.connect(end_point, opts);
    console.log(socket);

    socket.on("connect", () => {
      console.log("Successfully connected!");
    });

    socket.disconnect();

    done();

    //-socket_client.emit("join", null);

    //var
    //console.log(socket_client);
    //done();

    // setTimeout(function() {
    //   true.should.be.true;

    //   /*
    //         socket_client.emit('event', 'ABCDEF');

    //         socket_client.on('event response', function (data) {
    //             data.should.be.an('object');
    //             socket_client.disconnect();
    //             done();
    //         });

    //         socket_client.on('event response error', function (data) {
    //             console.error(data);
    //             socket_client.disconnect();
    //             done();
    //             });
    //         }, 4000);
    //         */
    //   done();

    // });
  });
});
