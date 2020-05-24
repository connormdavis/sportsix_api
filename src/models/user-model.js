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
    }
  });
};

User.findIdByEmail = (email, result) => {
  sql.query("SELECT UserID FROM Users WHERE Email = ?", [email], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
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
    } else {
      // return no error and user obj in 'res' var
      result(null, res[0]);
    }
  });
};

// TODO: find all users
User.getAll = (result) => {
  sql.query("SELECT * FROM Users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      // return no error and user obj in 'res' var
      result(null, res[0]);
    }
  });
};

// TODO: update user with new fields by id
User.updateById = (id, user, result) => {
  
};

// TODO: delete user w/ given id
User.removeById = (id, result) => {
  
};

// TODO: delete all users
User.removeAll = (result) => {
  
};

/*
  'Plays' methods
*/

// TODO: add position by given positionID to given user with userID
User.addPosition = (userID, positionID, result) => {
  
};

// TODO: remove position by given positionID to given user with userID
User.removePosition = (userID, positionID, result) => {
  
};

// TODO: get positions played by user with given userID
User.getPositions = (userID, result) => {
  
};

// TODO: get all sports played by user with given userID by checking all played positions
User.getSports = (userID, result) => {
  
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