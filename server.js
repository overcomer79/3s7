const http = require('http');
const app = require('./app');

const server = http.createServer(app);
const io = require('socket.io')(server, {});

const PORT = process.env.PORT || 3000;
server.listen(PORT);

const SOCKET_LIST = {};
const PLAYER_LIST = {};

module.exports.server = server;
module.exports.SOCKET_LIST = SOCKET_LIST;
