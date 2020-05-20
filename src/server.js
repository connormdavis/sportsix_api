var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
import morgan from 'morgan';

// set up parsing body of requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// enable/disable http request logging
app.use(morgan('dev'));

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
  res.send('Welcome to the SportsIX API endpoint!');
});

// future routes

// Register routes (all will begin w/ '/api')
app.use('/api', router);

// Start up our server
app.listen(port);
console.log('Server running on port ' + port + '...');