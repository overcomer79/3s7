const express = require('express');
const router = express.Router();
const Room = require('../models/room');
const BaseUser = require('../models/baseUser')

router.get('/', (req, res, next) => {

    const serv = require('../server').server;
    const io = require('socket.io')(serv, {});
    const socketList = require('../server').SOCKET_LIST;

    io.sockets.on('connection', function (socket) {

        socket.id = Math.random();
        socketList[socket.id] = socket;

        //BaseUser.onConnect(socket);
        socket.on('disconnect', function () {
            delete socketList[socket.id];
            //BaseUser.onDisconnect(socket);
        });

    });
    res.render('index', {
        data: { rooms: Room.getDeaultRoomList() }
    });

    /*
    setInterval(function () {
        //var pack = Player.update();
        for (var i in socketList) {
            var socket = socketList[i];
            //socket.emit('newPositions', pack);
        }
    }, 1000 / 25);
    */

});

module.exports = router;