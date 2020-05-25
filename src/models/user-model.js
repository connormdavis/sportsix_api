import sql from './db';
import bcrypt from 'bcryptjs';
import geo from './geocodio';

const User = function (user) {
  this.firstName = user.firstName;
  this.lastName = user.lastName;
  this.email = user.email;
  this.password = user.password;
  this.phone = user.phone;
  this.address = user.address;
  this.city = user.city;
  this.state = user.state;
  this.zip = user.zip;
  this.lat = user.lat;
  this.lon = user.lon;
};

/*
  Major 'User' methods
*/

User.create = (newUser, result) => {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(newUser.password, salt, function (err, hash) {
      // catch error while hashing pass
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      // Store hash in your password DB.
      sql.query("INSERT INTO Users (FirstName, LastName, Email, Password, Phone, Address, City, State, Zip, Lat, Lon, c_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())", [newUser.firstName, newUser.lastName, newUser.email, hash, newUser.phone, newUser.address, newUser.city, newUser.state, newUser.zip, newUser.lat, newUser.lon], (err, res) => {
        if (err) {
          console.log("ERROR making query: ", err);
          result(err, null);
          return;
        }
        console.log("created user: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
      });
    });
  });
};

User.findById = (userID, result) => {
  // find user by their id
  sql.query("SELECT * FROM Users WHERE UserID = ?", [userID], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length > 0) {
      console.log(`found user w/ ID ${userID}: ${JSON.stringify(res)}`);
      result(null, res);
    } else {
      console.log(`no users found w/ ID ${userID}`);
      result(null, null);
      return;
    }
  });
};

User.findIdByEmail = (email, result) => {
  sql.query("SELECT UserID FROM Users WHERE Email = ?", [email], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
      // return no error and found id in 'res' var
      result(null, res[0]);
    }
  });
};

User.findByEmail = (email, result) => {
  sql.query("SELECT * FROM Users WHERE Email = ?", [email], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
      // return no error and user obj in 'res' var
      result(null, res[0]);
    }
  });
};



// find all users
User.getAll = (result) => {
  sql.query("SELECT * FROM Users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
      if (res.length > 0) {
        console.log(`found users: ${JSON.stringify(res)}`);
        result(null, res);
      } else {
        console.log(`no users found`);
        result(null, null);
      }
    }
  });
};

// need to fix
// TODO: update user with new fields by id
User.updateById = (userID, updatedUser, result) => {
  sql.query("UPDATE Users SET FirstName = ?, LastName = ?, Email = ?, Phone = ?, Address = ?, City = ?, State = ?, Zip = ? WHERE UserID = ?", [updatedUser.firstName, updatedUser.lastName, updatedUser.email, updatedUser.phone, updatedUser.address, updatedUser.city, updatedUser.state, updatedUser.zip, userID], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
      console.log(`updated user with ID ${userID}: ${JSON.stringify(res)}`);
      result(null, res);
    }
  });
};

// delete user w/ given id
User.removeById = (userID, result) => {
  sql.query("DELETE FROM Users WHERE userID = ?", [userID], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
      console.log(`deleted all user with ID ${userID}: ${JSON.stringify(res)}`);
      result(null, res);
    }
  });
};

// Haven't tried it because I don't want to delete all the entries, but it should work...
// delete all users
User.removeAll = (result) => {
  sql.query("DELETE FROM Users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
      // return no error and user obj in 'res' var
      console.log(`deleted all users: ${JSON.stringify(res)}`);
      result(null, res);
    }
  });
};


/*
  'Plays' methods
*/
// For some reason PositionID gets added as null
// add position by given positionID to given user with userID
User.addPosition = (userID, positionID, result) => {
  sql.query("INSERT INTO Plays (UserID, PositionID) VALUES (?, ?)", [userID, positionID], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
      // return no error and user obj in 'res' var
      console.log(`added position w/ ID ${positionID} to user w/ ID ${userID}: ${JSON.stringify(res)}`);
      result(null, res);
    }
  });
};

// For some reason does not delete the user id and the position
// remove position by given positionID to given user with userID
User.removePosition = (userID, positionID, result) => {
  sql.query("DELETE FROM Plays WHERE UserID = ? AND PositionID = ?", [userID, positionID], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
      // return no error and user obj in 'res' var
      console.log(`deleted position w/ ID ${positionID} to user w/ ID ${userID}: ${JSON.stringify(res)}`);
      result(null, res);
    }
  });
};

// get positions played by user with given userID
User.getPositions = (userID, result) => {
  sql.query("SELECT DISTINCT Positions.Name FROM Plays JOIN Positions ON Plays.PositionID = Positions.PositionID WHERE Plays.UserID = ?", [userID], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
      // return no error and user obj in 'res' var
      console.log(`getting positions for user w/ ID ${userID}: ${JSON.stringify(res)}`);
      result(null, res);
    }
  });
};

// get all sports played by user with given userID by checking all played positions
User.getSports = (userID, result) => {
  sql.query("SELECT DISTINCT Sports.Name FROM Plays JOIN Positions ON Plays.PositionID = Positions.PositionID JOIN Sports ON Positions.SportID = Sports.SportID WHERE Plays.UserID = ?", [userID], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
      // return no error and user obj in 'res' var
      console.log(`getting sports played for user w/ ID ${userID}: ${JSON.stringify(res)}`);
      result(null, res);
    }
  });
};

/*
  Major 'User Authentication' methods
*/

User.checkPassword = (email, plainPassword, result) => {
  // look for user 
  User.findByEmail(email, (err, user) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    }
    if (user) {
      bcrypt.compare(plainPassword, user.Password, function (err, res) {
        console.log(`compare results: ${res}`);
        if (err) {
          console.log('error: ', err);
          result(err, null);
        } else {
          // if passwords match, return user object
          if (res) {
            result(null, user);
          } else {
            result(null, null);
          }
        }
      });
    } else {
      result(null, null);
    }
  });
};

export default User;