import * as https from "https";
import { ServerOptions } from "https";
import * as fs from "fs";
import * as path from "path";
import app from "./app";
import * as io from "./socket";

//TODO: move the PORT const in a config file
const PORT: any = process.env.PORT || 3000;

//TODO: consider to use restify
export const startServer = () => {
  return new Promise((success, failure) => {
    const httpsOptions: ServerOptions = {
      cert: fs.readFileSync(path.join(__dirname, "./../../ssl", "server.crt")),
      key: fs.readFileSync(path.join(__dirname, "./../../ssl", "server.key"))
    };
    let server: https.Server = https.createServer(httpsOptions, app);
    io.listen(server);
    server.listen(PORT, err => {
      if (err) {
        failure(err);
      }
      console.log("Server listening on port", PORT, "...");
      success(server);
    });
  }).catch(err => console.log("Unable to start the server:", err));
};

if (require.main === module) {
  startServer();
}
