import sql from './db';
import bcrypt from 'bcryptjs';

const Sport = function (sport) {
  this.name = sport.name;
};

/*
  Major 'sport' methods
*/

Sport.create = (newSport, result) => {
  // create a sport
};

// Return all sports that we have in the DB
Sport.getSports = (result) => {
  sql.query("SELECT * FROM Sports", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
      result(null, res);
    }
  });
};

Sport.assembleSportsWithPositionsList = (sportsList, positionsList) => {
  const tmpList = [];
  sportsList.forEach((sport) => {
    tmpList.push({
      sportID: sport.SportID,
      sport: sport.Name,
      positions: [],
    });
  });
  positionsList.forEach((position) => {
    tmpList.filter((sport) => sport.sportID === position.SportID)[0].positions.push(position);
  });
  return tmpList;
};


export default Sport;