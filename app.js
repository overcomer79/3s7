const express = require('express');
const app = express();
const router = express.Router();
const morgan = require('morgan');
const bodyParse = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

mongoose.connect(
    'mongodb+srv://nodejsApi:'
    //'mongodb://nodejsApi:'
    + process.env.MONGO_ATLAS_PASSWORD
    + '@3s7-nfqmx.mongodb.net/test');
    //+ '@3s7-shard-00-00-nfqmx.mongodb.net:27017,3s7-shard-00-01-nfqmx.mongodb.net:27017,3s7-shard-00-02-nfqmx.mongodb.net:27017/test?ssl=true&replicaSet=3s7-shard-0&authSource=admin&retryWrites=true', {});
    
   //'mongodb://localhost/3s7?retryWrites=true'); //locale
mongoose.Promise = global.Promise;

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'It works'
    });
});

app.use(morgan('dev'));

app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());

// CORS Errors Handling
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-ALlow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE');
        return res.status(200).json({});
    }
    // send the request to the next middleware
    next();
 }); 

 app.use('/', router);

 app.use('/products', productRoutes);
 app.use('/orders', orderRoutes);

//Error Handling

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: error.message
    });
});

module.exports = app;