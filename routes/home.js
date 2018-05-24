const express = require('express');
const router = express.Router();
const Room = require('../models/room');
const BaseUser = require('../models/baseUser')


router.get('/', (req, res, next) => {

    const io = require('../server').io;
    const socketList = require('../server').SOCKET_LIST;

    io.on('connection', function (socket) {
        socket.id = Math.random();
        
        socketList[socket.id] = socket;
        //console.log("Utente collegato");

        BaseUser.onConnect(socket);

        socket.on('disconnect', function () {
            delete socketList[socket.id];
            BaseUser.onDisconnect(socket);
        });

        //console.log("utenti connessi: " + BaseUser.userList.length)

    });
    res.render('index', {
        data: { rooms: Room.getDeaultRoomList() }
    });

});


module.exports = router;