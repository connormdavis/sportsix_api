import User from '../models/user-model';
import geo from '../models/geocodio';

// Create and save a new User
exports.create = (req, res) => {
  res.status(400).send({
    message: "so many errors maph is so incredibly gay it broke my shit"
  });
  return;

  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  geo.addressToLatLon(req.body.address, (err, res) => {
    if (err) {
      console.log('error: ', err);
    }
    // extract values
    const lat = res.lat || null;
    const lon = res.lon || null;

    // Create a User
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      lat: lat,
      lon: lon,
    });

    // Save User in the database
    User.create(user, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the User."
        });
      } else {
        res.send(data);
      }
    });

  });

};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {

};

// Find a single User with a userID
exports.findOne = (req, res) => {
  // use the id passed as query paramater
  User.findById(req.params.userID, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while searching by ID."
      });
    } else {
      if (data) {
        res.send(data[0]);
      } else {
        res.status(500).send({
          message: "User not found."
        });
      }
    }
  });
};

// Update a User identified by the userID in the request
exports.update = (req, res) => {
  // use the id passed as query paramater & use body for user fields
};

// Delete a User with the specified userID in the request
exports.delete = (req, res) => {
  // use the id passed as query paramater
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {

};

/*
  'Plays' methods
*/

// Add new position (from given positionID) for user with given userID
exports.addPosition = (req, res) => {

};

// Remove position (from given positionID) for user with given userID
exports.removePosition = (req, res) => {

};

// Get all positions that a user plays
exports.getPositions = (req, res) => {

};

// Get all sports that a user plays based on the positions they play
exports.getSports = (req, res) => {

};

/*
  Major 'User Authentication' methods
*/

// authenticate user
exports.authUser = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Body must not be empty!"
    });
  }
  User.checkPassword(req.body.email, req.body.password, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err,
      });
    } else {
      if (data) {
        res.send({
          authenticated: true,
          user: data,
        });
      } else {
        res.status(401).send({
          message: 'Incorrect password.'
        });
      }
    }
  });
};