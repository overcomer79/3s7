import * as https from "https";
import { ServerOptions } from "https";
import * as fs from "fs";
import * as path from "path";
import app from "./app";
import * as io from './socket';

const httpsOptions: ServerOptions = {
  cert: fs.readFileSync(path.join(__dirname, "../../ssl", "server.crt")),
  key: fs.readFileSync(path.join(__dirname, "../../ssl", "server.key"))
};

const server: https.Server = https.createServer(httpsOptions, app);
io.listen(server);

const PORT: any = process.env.PORT || 3000;
server.listen(PORT);
