"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const morgan = require("morgan");
const bodyParse = require("body-parser");
//import * as path from "path";
class App {
    constructor() {
        this.express = express();
        this.setLogMiddleware();
        this.setBodyParserMiddlewares();
        this.handleCORSErrors();
        //this.setRouteMiddleweres();
        //this.prepareStatic();
        this.setErrorHandlingMiddlewares();
    }
    handleCORSErrors() {
        this.express.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-ALlow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            if (req.method === "OPTIONS") {
                res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, GET, DELETE");
                return res.status(200).json({});
            }
            // send the request to the next middleware
            next();
        });
    }
    setLogMiddleware() {
        this.express.use(morgan("dev"));
    }
    setBodyParserMiddlewares() {
        this.express.use(bodyParse.urlencoded({ extended: false }));
        this.express.use(bodyParse.json());
    }
    setErrorHandlingMiddlewares() {
        this.express.use((req, res, next) => {
            const error = new Error('Not found');
            error.name = "404: Not found";
            next(error);
        });
        this.express.use((error, req, res, next) => {
            res.status(error.name === "404: Not found" || 500);
            res.json({
                error: error.message
            });
        });
    }
}
exports.default = new App().express;
//# sourceMappingURL=app.js.map