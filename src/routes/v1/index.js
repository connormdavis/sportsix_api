var express = require('express');
var router = express.Router();              // get an instance of the express Router
import sql from '../../models/db';
import users from '../../controllers/user-controller';
import instructors from '../../controllers/instructor-controller';
import sports from '../../controllers/sport-controller';
import positions from '../../controllers/position-controller';

// test route
router.get('/', function (req, res) {
  sql.query("SELECT * FROM Users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      return;
    }
    console.log('Got customers: ', { ...res })
  });
  res.send('Welcome to the SportsIX API v1 endpoint!');
});

/*
  'users' routes
*/
router.get('/users', users.findAll);            // works
router.get('/users/:userID', users.findOne);    // works
router.put('/users/:userID', users.update);     // works
router.delete('/users', users.deleteAll);       // probably works, not going to try
router.delete('/users/:userID', users.delete);  // works
router.post('/users', users.create);            // works

/*
  'instructors' routes
*/
router.get('/instructors', instructors.findAll);
router.get('/instructors/byposition/:positionID', instructors.findAllByPosition);
router.get('/instructors/bysport/:sportID', instructors.findAllBySport);
router.get('/instructors/:userID', instructors.findOne);
router.put('/instructors/:userID', instructors.update);
router.delete('/instructors', instructors.deleteAll);
router.delete('/instructors/:userID', instructors.delete);
router.post('/instructors', instructors.create);

/*
  'instructs' position routes
*/
router.get('/instructors/positions/:userID', instructors.getPositions);
router.post('/instructors/positions/:userID', instructors.addPosition);
router.delete('/instructors/positions/:userID', instructors.removePosition);

/*
  'instructs' sport routes
*/
router.get('/instructors/sports/:userID', instructors.getSports);

/*
  'plays' position routes
*/
router.get('/users/positions/:userID', users.getPositions);       // works
router.post('/users/positions/:userID', users.addPosition);       // works
router.delete('/users/positions/:userID', users.removePosition);  // works

/*
  'plays' sport routes
*/
router.get('/users/sports/:userID', users.getSports);   // works

/*
  'auth' routes
*/
router.post('/signin', users.authUser);

/*
  'sports' routes
*/
router.get('/sports', sports.findAll);

/*
  'positions' routes
*/
router.get('/positions/:sportID', positions.findAll);

export default router;