import Position from '../models/position-model';

// Create and save a new Position 
// UNFINISHED!!!!
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Position
  const position = new Position({
    // set fields from req
  });

  // Save Position in the database
  Position.create(position, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the position."
      });
    } else {
      res.send(data);
    }
  });
};

// Retrieve all positions associated with given sportID
exports.findAll = (req, res) => {
  // Find all the positions 
  Position.getPositionsBySportID(req.params.sportID, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while getting positions w/ sport ID " + req.params.sportID,
      });
    } else {
      res.send(data);
    }
  });
};
