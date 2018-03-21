//************************//
//****  Dependencies  ****//
//************************//

  // Mongoose, Schema Consts and our db config
  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;
  const config = require('../config/database');

//************************//
//**** Category Model ****//
//************************//

  // User Schema
  const CategorySchema = Schema({
    name: {
      type: String,
      required: true
    }
  });

//************************//
//****     Export     ****//
//************************//

  // Create Post model that's avaible outside
  const Category = module.exports = mongoose.model('Category', CategorySchema);

//************************//
//****   Functions    ****//
//************************//

  module.exports.getCategories = (callback)=>{
    Category.find({}, callback);
  }

  module.exports.getCategory = (search, callback)=>{
    Category.findOne({ category: search.url }, callback);
  }