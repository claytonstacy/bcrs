/*
============================================
Title: BCRS
Author: Clayton Stacy, Christine Bohnet, Jeff Shepherd
Date: 20 Oct 2020
Description: Routes for BCRS
============================================
*/

/**
 * Require statements
 */
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const SecurityQuestionApi = require('./routes/security-question.api'); //sets up routes for security questions object
const UserApi = require('./routes/user-api');
const SessionApi = require('./routes/session-api');
const ProductApi = require('./routes/product-api');
const InvoiceApi = require('./routes/invoice-api');
const RoleApi = require('./routes/role-api');


/**
 * App configurations
 */
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist/bcrs')));
app.use('/', express.static(path.join(__dirname, '../dist/bcrs')));


/**
 * Variables
 */
const port = 3000; // server port

// TODO: This line will need to be replaced with your actual database connection string
const conn = 'mongodb+srv://bcrs_user:jnKtGz3V62e3yC29@buwebdev-cluster-1.xyv9m.mongodb.net/bcrs?retryWrites=true&w=majority';


/**
 * Database connection
 */
mongoose.connect(conn, {
  promiseLibrary: require('bluebird'),
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => {
  console.debug(`Connection to the database instance was successful`);
}).catch(err => {
  console.log(`MongoDB Error: ${err.message}`)
}); // end mongoose connection

/**
 * API(s) go here...
 */
app.use('/api/security-questions', SecurityQuestionApi);
app.use('/api/users', UserApi);
app.use('/api/session', SessionApi);
app.use('/api/product', ProductApi);
//app.use('/api/invoice', InvoiceApi);
app.use('/api/roles', RoleApi);


/**
 * Create and start server
 */
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`)
}); // end http create server function
