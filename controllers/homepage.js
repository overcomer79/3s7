const Room = require('../models/room');
const BaseUser = require('../models/baseUser')

exports.landing = (req, res, next) => {
    const serv = require('../server').server;
    const io = require('socket.io')(serv, {});
    const socketList = require('../server').SOCKET_LIST;

    var DEBUG = true;

    io.sockets.on('connection', function (socket) {

        console.log("OK");
        socket.id = Math.random();
        socketList[socket.id] = socket;
        //console.log(Object.keys(socketList));
        BaseUser.onConnect(socket);
        

        socket.on('disconnect', function () {
            delete socketList[socket.id];
            console.log(Object.keys(socketList));
            BaseUser.onDisconnect(socket);

        });

        socket.on('sendMsgToServer', function (data) {
            console.log(BaseUser.userList[socket.id].username);
            const playerName = ("" + BaseUser.userList[socket.id].username);
            const color = ("" + BaseUser.userList[socket.id].color);
            for (var i in socketList) {
                socketList[i].emit('addToChat', {
                    playerName: playerName,
                    color: color,
                    text: data
                });
            }
        });

        socket.on('evalServer', function (data) {
            console.log('----- FROM CLIENT: TEXT TO EVAL -------');
            console.log(data);
            if (!DEBUG)
                return;
            var res = eval(data);
            socket.emit('evalAnswer', res);
        });

        socket.on('login', function(data){
            console.log(data);
        });

    });
    res.render('index', {
        data: { rooms: Room.getDeaultRoomList() }
    });


    setInterval(function () {
        //var pack = Player.update();
        for (var i in socketList) {
            var socket = socketList[i];
            socket.emit('ServerMsg',/*pack*/ {
                numberOfUser: Object.keys(socketList).length
            });

        }
    }, 1000 / 25);


}

exports.room = (req, res, next) => {
    const serv = require('../server').server;
    const io = require('socket.io')(serv, {});
    const socketList = require('../server').SOCKET_LIST;
    console.log(socketList);

    

    res.render('room', {
    });

}