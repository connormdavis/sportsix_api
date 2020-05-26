import sql from './db';
import bcrypt from 'bcryptjs';

const Position = function (position) {
  this.name = position.name;
  this.sportID = position.sportID;
};

/*
  Major 'Position' methods
*/

Position.create = (newPosition, result) => {
  // create a position
};

// Return all positions that we have in the DB
Position.getPositionsBySportID = (sportID, result) => {
  sql.query("SELECT * FROM Positions WHERE SportID = ?", [sportID], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
      result(null, res);
    }
  });
};


export default Position;