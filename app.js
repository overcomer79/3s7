const express = require("express");
const app = express();
const router = express.Router();

const path = require("path");

const morgan = require("morgan");
const bodyParse = require("body-parser");
const mongoose = require("mongoose");

const costants = require("./helpers/global");
const passportSetup = require("./config/passport");

const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const homeRoutes = require("./routes/home");
const oauthRoutes = require("./routes/oauth");

mongoose.connect(
  costants.DBConnectionStrings.LOCAL,
  () => {
    console.log("connected to mongoDB");
  }
);
mongoose.Promise = global.Promise;

// Load View Engine
app.set("views", path.join(__dirname, "public/views"));
app.set("view engine", "pug");

app.use(morgan("dev"));
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());

// CORS Errors Handling
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-ALlow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, GET, DELETE");
    return res.status(200).json({});
  }
  // send the request to the next middleware
  next();
});

// Middlewere for public resource
app.use(express.static(__dirname + "/public"));

// Others Middleware
app.use("/oauth", oauthRoutes);
app.use("/", homeRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

//Error Handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: error.message
  });
});

module.exports = app;
