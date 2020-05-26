import Sport from '../models/sport-model';

// Create and save a new Sport 
// UNFINISHED!!!!
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Sport
  const sport = new Sport({
    // set fields from req
  });

  // Save Sport in the database
  Sport.create(sport, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the sport."
      });
    } else {
      res.send(data);
    }
  });
};

// Retrieve all sports in the DB
exports.findAll = (req, res) => {
  // Find all sports 
  Sport.getSports((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while getting sports",
      });
    } else {
      res.send(data);
    }
  });
};
