import Instructor from '../models/instructor-model';

// Create and save a new Instructor
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create an Instructor
  const instructor = new Instructor({
    userID: req.body.userID,
    active: req.body.active,
    range: req.body.range,
    rating: req.body.rating,
    rate: req.body.rate,
  });

  // Save Instructor in the database
  Instructor.create(instructor, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Instructor."
      });
    } else {
      res.send(data);
    }
  });
};

// Retrieve all Instructors from the database.
exports.findAll = (req, res) => {
  // Find all the instructors 
  Instructor.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while getting instructors."
      });
    } else {
      res.send(data);
    }
  });
};

// Find a single Instructor with a userID
exports.findOne = (req, res) => {
  // Find specific instructor 

  Instructor.findById(req.params.userID, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while getting instructor."
      });
    } else {
      res.send(data);
    }
  });

};

// finish this after we finish method in the instructor-model

// Update an Instructor identified by the userID in the request
exports.update = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create an Instructor w/ updated info
  const updatedInstructor = new Instructor({
    active: req.body.active,
    range: req.body.range,
    rating: req.body.rating,
    rate: req.body.rate,
  });

  console.log('updated instructor object: ' + JSON.stringify(updatedInstructor));

  // Update Instructor in the database
  Instructor.updateById(req.params.userID, updatedInstructor, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while updating the Instructor."
      });
    } else {
      res.send(data);
    }
  });

};

// Delete a Instructor with the specified userID in the request
exports.delete = (req, res) => {
  Instructor.removeById(req.params.userID, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while deleting the Instructor."
      });
    } else {
      res.send(data);
    }
  });
};

// Delete all Instructors from the database.
exports.deleteAll = (req, res) => {
  Instructor.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while deleting the Instructors."
      });
    } else {
      res.send(data);
    }
  });

};

/*
  'Instructs' methods
*/

// Add new position (from given positionID) for instructor with given userID
exports.addPosition = (req, res) => {

  // Validate request (need positionID in body)
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Add the position
  Instructor.addPosition(req.params.userID, req.body.positionID, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while adding the position for the Instructor."
      });
    } else {
      res.send(data);
    }
  });

};

// Remove position (from given positionID) for instructor with given userID
exports.removePosition = (req, res) => {

  // Validate request (need positionID in body)
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Remove the position
  Instructor.removePosition(req.params.userID, req.body.positionID, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while removing the position for the Instructor."
      });
    } else {
      res.send(data);
    }
  });


};

// Get all positions that an instructor instructs
exports.getPositions = (req, res) => {

  Instructor.getPositions(req.params.userID, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while getting the positions of the Instructor."
      });
    } else {
      res.send(data);
    }
  });

};

// Get all sports that an instructor instructs positions within
exports.getSports = (req, res) => {

  Instructor.getSports(req.params.userID, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while getting the sports of the Instructor."
      });
    } else {
      res.send(data);
    }
  });

};

exports.findAllByPosition = (req, res) => {
  Instructor.findByPosition(req.params.positionID, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while getting all instructors by positionID."
      });
    } else {
      res.send(data);
    }
  });
};

exports.findAllBySport = (req, res) => {
  Instructor.findBySport(req.params.sportID, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while getting all instructors by sportID."
      });
    } else {
      res.send(data);
    }
  });
};
