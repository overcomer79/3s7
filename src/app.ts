import * as express from "express";
import * as morgan from "morgan";
import * as bodyParse from "body-parser";
//import * as path from "path";

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.setLogMiddleware();
    this.setBodyParserMiddlewares();
    this.handleCORSErrors();
    //this.setRouteMiddleweres();
    //this.prepareStatic();
    this.setErrorHandlingMiddlewares();
  }

  private handleCORSErrors(): any {
    this.express.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-ALlow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      if (req.method === "OPTIONS") {
        res.header(
          "Access-Control-Allow-Methods",
          "PUT, POST, PATCH, GET, DELETE"
        );
        return res.status(200).json({});
      }
      // send the request to the next middleware
      next();
    });
  }

  private setLogMiddleware(): void {
    this.express.use(morgan("dev"));
  }

  private setBodyParserMiddlewares(): void {
    this.express.use(bodyParse.urlencoded({ extended: false }));
    this.express.use(bodyParse.json());
  }

  private setErrorHandlingMiddlewares(): void {
    this.express.use((req, res, next) => {
        const error: Error = new Error('Not found');
        error.name = "404: Not found";
        next(error);
    });
    this.express.use((error, req, res, next) => {
        res.status(error.name ===  "404: Not found" || 500)
        res.json({
            error: error.message
        });
    });
    
  }

  /*
  private setRouteMiddleweres(): void {
    this.express.use('/', homeRoutes);
    this.express.use('/api/products', productRoutes);
    this.express.use('/api/orders', orderRoutes);
  }
  */

  /*
  private prepareStatic(): void {
    this.express.use(express.static(path.join(__dirname + '/')));
  }
  */
}

export default new App().express;