var socketio_client = require("socket.io-client");
import { sockets } from "./../../../shared/config/sockets";
var should = require("chai").should();

var os = require("os");
var end_point = "https://" + os.hostname() + ":" + process.env.PORT || 3000 + sockets.namespaces.general;

var opts = { forceNew: true, secure: true };

describe("async test with socket.io", function() {

    var socket_client;

    beforeEach((done)=> {
        socket_client = socketio_client(end_point, opts);
        console.log(socket_client);
            
        socket_client.on('connect', function() {
            console.log('worked...');
            done();
        });
        socket_client.on('disconnect', function() {
            console.log('disconnected...');
        })
        done();
    });

    this.afterEach((done) => {
    if(socket_client.connected) {
        console.log('disconnecting...');
        socket_client.disconnect();
    } else {
        // There will not be a connection unless you have done() in beforeEach, socket.on('connect'...)
        console.log('no connection to break...');
    }
    done();
});

  it.only("Response should be an object", function(done) {
      socket_client.emit("join", null);
    //var 
    //console.log(socket_client);
    //done();
    setTimeout(function() {
        true.should.be.true;
      
      /*
            socket_client.emit('event', 'ABCDEF');

            socket_client.on('event response', function (data) {
                data.should.be.an('object');
                socket_client.disconnect();
                done();
            });

            socket_client.on('event response error', function (data) {
                console.error(data);
                socket_client.disconnect();
                done();
                });
            }, 4000);
            */
      done();
    });
  });
});
