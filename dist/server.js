"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https = require("https");
const fs = require("fs");
const path = require("path");
const app_1 = require("./app");
const io = require("./socket");
const httpsOptions = {
    cert: fs.readFileSync(path.join(__dirname, "../ssl", "server.crt")),
    key: fs.readFileSync(path.join(__dirname, "../ssl", "server.key"))
};
const server = https.createServer(httpsOptions, app_1.default);
io.listen(server);
const PORT = process.env.PORT || 3000;
server.listen(PORT);
//# sourceMappingURL=server.js.map