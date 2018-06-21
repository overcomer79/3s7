const https = require('https');

const fs = require('fs');
const path = require('path');

const app = require('./app');

const httpsOptions = {
    cert: fs.readFileSync(path.join(__dirname,'ssl', 'server.crt')),
    key: fs.readFileSync(path.join(__dirname,'ssl', 'server.key')),
}

const server = https.createServer(httpsOptions, app);

const io = require('./socket').listen(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT);

// Redirect from http port 80 to https
// to work https port need to be set to the standard 443
/*
const http = require('http');
const httpServer = http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
})

httpServer.listen(80);
*/

const SOCKET_LIST = {};

module.exports.server = server;
module.exports.SOCKET_LIST = SOCKET_LIST;