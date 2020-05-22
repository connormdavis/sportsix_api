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
    console.log("created instructor: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertID, ...newUser });
  });
};

Instructor.findById = (userID, result) => {
  // find instructor by their id 
};

Instructor.getAll = (result) => {
  // find all users
};

Instructor.updateById = (userID, user, result) => {
  // update instructor with new fields by id
};

Instructor.removeById = (userID, result) => {
  // delete instructor w/ given id
};

Instructor.removeAll = (result) => {
  // delete all instructors
};

/*
  'Instructs' methods
*/

Instructor.addPosition = (userID, positionID, result) => {
  // add position by given positionID to given user with userID
};

Instructor.removePosition = (userID, positionID, result) => {
  // remove position by given positionID to given user with userID
};

Instructor.getPositions = (userID, result) => {
  // get positions instructed by instructor with given userID
};

Instructor.getSports = (userID, result) => {
  // get all sports associated with instructor by checking all positions
};

export default Instructor;