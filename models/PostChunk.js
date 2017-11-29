//************************//
//****  Dependencies  ****//
//************************//

  // Mongoose, Schema Consts and our db config
  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;
  const config = require('../config/database');

//************************//
//****  Chunks Model  ****//
//************************//

  // User Schema
  const PostChunkSchema = Schema({
    id: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    content: {
      type: String
    }
  });

//************************//
//****     Export     ****//
//************************//

  // Create user model that's avaible ootside
  const PostChunk = module.exports = mongoose.model('PostChunk', PostChunkSchema);

//************************//
//****   Functions    ****//
//************************//

  // Get PostChunk by ID
  module.exports.getPostChunkById = (id, callback)=>{
    PostChunk.findById(id, callback);
  }