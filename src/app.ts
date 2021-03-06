import * as express from "express";

import oauthRoutes from "./routes/oauth";
import userRoutes from "./routes/user";

import * as morgan from "morgan";
import * as bodyParse from "body-parser";
import * as cors from "cors";
import * as mongoose from "mongoose";
//import * as path from "path";
import * as conf from "./../shared/config/keys";

class App {
  public express: express.Application;

  constructor() {
    this.express = express();

    this.connectToMongoDb();

    this.setLogMiddleware();
    this.setBodyParserMiddlewares();
    this.handleCORSErrors();
    this.setRouteMiddleweres();
    //this.prepareStatic();
    this.setErrorHandlingMiddlewares();
  }

  private connectToMongoDb(): void {
    (<any>mongoose).Promise = global.Promise;
    mongoose.connect(
      /**
       * "atlas_coonn_string":  connects to the cloud atlas Mongo DB
       * "local":               connects to local Mongo DB istance
       */
      conf.keys.mongoDB.local,
      err => {
        if (err) {
          console.log("Unable to connect to Mongo DB:", err);
          return;
        }
        console.log("Connected to Mongo DB....");
      }
    );
  }

  private setLogMiddleware(): void {
    this.express.use(morgan("dev"));
  }

  private setBodyParserMiddlewares(): void {
    this.express.use(bodyParse.urlencoded({ extended: false }));
    this.express.use(bodyParse.json());
  }

  private handleCORSErrors(): any {
    const corsOptions: cors.CorsOptions = {
      // Set origin into production
      // origin: 'http://example.com',
      optionsSuccessStatus: 200
    };
    this.express.use(cors(corsOptions));
  }

  private setErrorHandlingMiddlewares(): void {
    /***
     * 500 or 404 Server error shold be returnded to the client
     * in json format in the response object
     */
    this.express.use((req, res, next) => {
      const error: Error = new Error("Not found");
      error.name = "404";
      next(error);
    });
    this.express.use((error, req, res, next) => {
      const status: number = (error.name = "404" ? 404 : 500);
      res.status(status);
      res.json({
        error: error.message
      });
    });
  }

  private setRouteMiddleweres(): void {
    this.express.use("/oauth", oauthRoutes);
    this.express.use("/user", userRoutes);

    /*
    this.express.use('/', homeRoutes);
    this.express.use('/api/products', productRoutes);
    this.express.use('/api/orders', orderRoutes);
    */
  }

  /*
  private prepareStatic(): void {
    this.express.use(express.static(path.join(__dirname + '/')));
  }
  */

  public disconnectMongoose() {
    mongoose.disconnect(err => {
      if (err) {
        console.log("Unable to disconnect to Mongo DB:", err);
        return;
      }
      console.log("Disconnected to Mongo DB....");
    });
  }
}

export default new App();
