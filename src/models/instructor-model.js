import sql from './db';

const Instructor = function (instructor) {
  this.userID = instructor.userID;
  this.range = instructor.range;
};

/*
  Major 'Instructor' methods
*/

Instructor.create = (newInstructor, result) => {
  sql.query("INSERT INTO Instructors (UserID, Range) VALUES (?, ?)", [newInstructor.userID, newInstructor.range], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created instructor: ", { id: res.insertId, ...newInstructor });
    result(null, { id: res.insertID, ...newInstructor });
  });
};

Instructor.findById = (userID, result) => {
  // find instructor by their id 
  sql.query("SELECT * FROM Instructors WHERE Instructors.UserID = ?", [userID], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length > 0) {
      console.log(`found instructor w/ ID ${userID}: ${JSON.stringify(res)}`);
      result(null, res);
    } else {
      console.log(`no instructors found w/ ID ${userID}`);
      result(null, null);
    }
  });
};

Instructor.getAll = (result) => {
  // find all instructors
  sql.query("SELECT * FROM Instructors", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length > 0) {
      console.log(`found instructors: ${JSON.stringify(res)}`);
      result(null, res);
    } else {
      console.log(`no instructors found`);
      result(null, null);
    }
  });
};

// not sure about this one 

Instructor.updateById = (userID, updatedInstructor, result) => {
  // update instructor with new fields by id
  sql.query("UPDATE Instructors SET Range = ? WHERE UserID = ?", [updatedInstructor.range, userID], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log(`updated instructor w/ ID ${userID}: ${JSON.stringify(res)}`);
    result(null, res);
    
  });
};

// not sure about this one 

Instructor.removeById = (userID, result) => {
  // delete instructor w/ given id
  sql.query("DELETE FROM Instructors WHERE userID = ?", [userID], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log(`deleted instructor w/ ID ${userID}: ${JSON.stringify(res)}`);
    result(null, res);
  });
};

Instructor.removeAll = (result) => {
  // delete all instructors
  sql.query("DELETE FROM Instructors", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
      console.log(`deleted all instructors: ${JSON.stringify(res)}`);
      result(null, res);
  });
};

/*
  'Instructs' methods
*/

Instructor.addPosition = (userID, positionID, result) => {
  // add position by given positionID to given user with userID
  sql.query("INSERT INTO Instructs (UserID, PositionID) VALUES (?, ?)", [userID, positionID], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
      console.log(`added position w/ ID ${positionID} to instructor w/ ID ${userID}: ${JSON.stringify(res)}`);
      result(null, res);
  });
};

Instructor.removePosition = (userID, positionID, result) => {
  // remove position by given positionID to given user with userID
  sql.query("DELETE FROM Instructs WHERE UserID = ? AND PositionID = ?", [userID, positionID], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
      console.log(`deleted position w/ ID ${positionID} from instructor w/ ID ${userID}: ${JSON.stringify(res)}`);
      result(null, res);
  });
};

Instructor.getPositions = (userID, result) => {
  // get all position names instructed by instructor with given userID
  sql.query("SELECT DISTINCT Positions.Name FROM Instructs JOIN Positions ON Instructs.PositionID = Positions.PositionID WHERE Instructs.UserID = ?", [userID], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
      console.log(`found positions for instructor w/ ID ${userID}: ${JSON.stringify(res)}`);
      result(null, res);
  });
};

Instructor.getSports = (userID, result) => {
  // get all sport names associated with instructor by checking all positions
  sql.query("SELECT DISTINCT Sports.Name FROM Instructs JOIN Positions ON Instructs.PositionID = Positions.PositionID JOIN Sports ON Positions.SportID = Sports.SportID WHERE Instructs.UserID = ?", [userID], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
      console.log(`found sports for instructor w/ ID ${userID}: ${JSON.stringify(res)}`);
      result(null, res);
  });
};

export default Instructor;