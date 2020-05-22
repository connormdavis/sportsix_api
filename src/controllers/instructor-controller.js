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
    range: req.body.range
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

};

// Find a single Instructor with a userID
exports.findOne = (req, res) => {

};

// Update an Instructor identified by the userID in the request
exports.update = (req, res) => {

};

// Delete a Instructor with the specified userID in the request
exports.delete = (req, res) => {

};

// Delete all Instructors from the database.
exports.deleteAll = (req, res) => {

};

/*
  'Instructs' methods
*/

// Add new position (from given positionID) for instructor with given userID
exports.addPosition = (req, res) => {

};

// Remove position (from given positionID) for instructor with given userID
exports.removePosition = (req, res) => {

};

// Get all positions that an instructor instructs
exports.getPositions = (req, res) => {

};

// Get all sports that an instructor instructs positions within
exports.getSports = (req, res) => {

};
