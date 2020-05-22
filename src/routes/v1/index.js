var express = require('express');
var router = express.Router();              // get an instance of the express Router
import sql from '../../models/db';
import users from '../../controllers/user-controller';
import instructors from '../../controllers/instructor-controller';

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
router.get('/users', users.findAll);
router.get('/users/:userID', users.findOne);
router.put('/users/:userID', users.update);
router.delete('/users', users.deleteAll);
router.delete('/users/:userID', users.delete);
router.post('/users', users.create);

/*
  'instructors' routes
*/
router.get('/instructors', instructors.findAll);
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
router.get('/users/positions/:userID', users.getPositions);
router.post('/users/positions/:userID', users.addPosition);
router.delete('/users/positions/:userID', users.removePosition);

/*
  'plays' sport routes
*/
router.get('/users/sports/:userID', instructors.getSports);

/*
  'auth' routes
*/
router.post('/signin', users.authUser);


export default router;