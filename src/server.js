var express = require('express');        // call express
var app = express();                 // define our app using express
import dotenv from 'dotenv';
dotenv.config();
var bodyParser = require('body-parser');
import morgan from 'morgan';
import cors from 'cors';
import v1Routes from './routes/v1';


// set up parsing body of requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// enable/disable http request logging
app.use(morgan('dev'));

// enable/disable cross origin resource sharing if necessary
app.use(cors());

var port = process.env.PORT || 3000;        // set our port

// Register routes (all will begin w/ '/api/v1')
app.use('/api/v1', v1Routes);

// Start up our server
app.listen(port);
console.log('Server running on port ' + port + '...');