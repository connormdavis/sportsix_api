import User from '../models/user-model';
import geo from '../models/geocodio';

// Create and save a new User
exports.create = (req, res) => {

  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const address = `${req.body.address} ${req.body.city}, ${req.body.state} ${req.body.zip}`;
  geo.addressToLatLon(address, (err, location) => {
    if (err) {
      console.log('error: ', err);
    }
    // extract values
    const lat = location.lat || null;
    const lon = location.lng || null;

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
        if (err.errno === 1062) {
          res.status(500).send({
            message: "Email already exists. Please sign in."
          });
        } else {
          res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
          });
        }
      } else {
        res.send(data);
      }
    });

  });

};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while attempting to retrieve all users."
      });
    }
    else {
      if (data) {
        res.send(data);
      }
      else {
        res.status(500).send({
          message: "No users exist"
        });
      }
    }
  });
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
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // create a user with updated info
  const updatedUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    is_instructor: req.body.is_instructor || false,
  });

  // use the id passed as query paramater & use body for user fields
  User.updateById(req.params.userID, updatedUser, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while attempting to update the user."
      });
    }
    else {
      if (data) {
        res.send(data[0]);
      }
      else {
        res.status(500).send({
          message: "User with this ID does not exist"
        });
      }
    }
  });
};

// Delete a User with the specified userID in the request
exports.delete = (req, res) => {
  // use the id passed as query paramater
  User.removeById(req.params.userID, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while searching by ID."
      });
    } else {
      if (data) {
        res.send(data);
      } else {
        res.status(500).send({
          message: "User not found."
        });
      }
    }
  });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while deleting all users."
      });
    } else {
      if (data) {
        res.send(data);
      } else {
        res.status(500).send({
          message: "No users exist"
        });
      }
    }
  });
};


/*
  'Plays' methods
*/

// Add new position (from given positionID) for user with given userID
exports.addPosition = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  User.addPosition(req.params.userID, req.body.positionID, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while adding the position for the user"
      });
    } else {
      if (data) {
        res.send(data);
      } else {
        res.status(500).send({
          message: "No users exist with this id"
        });
      }
    }
  });
};

// Remove position (from given positionID) for user with given userID
exports.removePosition = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  User.removePosition(req.params.userID, req.body.positionID, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while removing the position for the user"
      });
    } else {
      if (data) {
        res.send(data);
      } else {
        res.status(500).send({
          message: "No users exist with this id"
        });
      }
    }
  });
};

// Get all positions that a user plays
exports.getPositions = (req, res) => {
  User.getPositions(req.params.userID, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while getting the positions of the user"
      });
    } else {
      if (data) {
        res.send(data);
      } else {
        res.status(500).send({
          message: "No users exist with this id"
        });
      }
    }
  });
};

// Get all sports that a user plays based on the positions they play
exports.getSports = (req, res) => {
  User.getSports(req.params.userID, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while getting the sports of the user"
      });
    } else {
      if (data) {
        res.send(data);
      } else {
        res.status(500).send({
          message: "No users exist with this id"
        });
      }
    }
  });
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