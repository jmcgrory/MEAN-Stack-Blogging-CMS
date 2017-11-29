//************************//
//****  Dependencies  ****//
//************************//

  // Mongoose, bcrypt, Schemas and our db config
  const mongoose = require('mongoose');
  const bcrypt = require('bcryptjs');
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;
  const config = require('../config/database');

//************************//
//****   User Model   ****//
//************************//

  // User Schema
  const UserSchema = Schema({
    name: {
      type: String
    },
    password: {
      type: String,
      required: true
    }
  });

//************************//
//****     Export     ****//
//************************//

  // Create user model that's avaible ootside
  const User = module.exports = mongoose.model('User', UserSchema);

//************************//
//****   Functions    ****//
//************************//

  // Get User by ID
  module.exports.getUserById = (id, callback)=>{
    User.findById(id, callback);
  }

  // Get User by Name using 'findOne'
  module.exports.getUserByName = (name, callback)=>{
    const query = { name: name };
    console.log(query);
    User.findOne(query, callback);
  }

  // Add new User
  module.exports.addUser = (newUser, callback)=>{
    bcrypt.genSalt(10, (err, salt)=>{
      bcrypt.hash(newUser.password, salt, (err, hash)=>{
        if(err){
          throw err
        } else {
          newUser.password = hash;
          newUser.save(callback);
        }
      });
    });
  }

  // Compare dem pwords
  module.exports.comparePassword = (candidate, hash, callback)=>{
    bcrypt.compare(candidate, hash, (err, isMatch)=>{
      if(err) throw err;
      callback(null, isMatch);
    });
  };