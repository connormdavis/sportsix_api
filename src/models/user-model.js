import sql from './db';
import bcrypt from 'bcryptjs';

const User = function (user) {
  this.email = user.email;
  this.password = user.password;
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
      sql.query("INSERT INTO Users (Email, Password) VALUES (?, ?)", [newUser.email, hash], (err, res) => {
        if (err) {
          console.log("error: ", err);
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
    }
  });
};

User.getAll = (result) => {
  // find all users
};

User.updateById = (id, user, result) => {
  // update user with new fields by id
};

User.removeById = (id, result) => {
  // delete user w/ given id
};

User.removeAll = (result) => {
  // delete all users
};

/*
  'Plays' methods
*/

User.addPosition = (userID, positionID, result) => {
  // add position by given positionID to given user with userID
};

User.removePosition = (userID, positionID, result) => {
  // remove position by given positionID to given user with userID
};

User.getPositions = (userID, result) => {
  // get positions played by user with given userID
};

User.getSports = (userID, result) => {
  // get all sports played by user with given userID by checking all played positions
};

/*
  Major 'User Authentication' methods
*/

User.checkPassword = (userID, plainPassword, result) => {

  User.findById(userID, (err, user) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
    }
    if (user) {
      bcrypt.compare(plainPassword, user.Password, function (err, res) {
        if (err) {
          console.log('error: ', err);
          result(err, null);
        } else {
          // if passwords match, return true
          if (res) {
            result(null, true);
          } else {
            result(null, false);
          }
        }
      });
      result(null, user);
    } else {
      result(null, false);
    }
  });


};

export default User;