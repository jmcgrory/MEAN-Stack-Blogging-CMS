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
    type: {
      type: String,
      required: true
    },
    content: {
      type: String
    }
  }, { collection: 'chunks' });

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

  // Add new chunk
  module.exports.addPostChunk = (newChunk, callback)=>{
    newChunk.save(callback);
  }

  // Get all assoc chunks
  module.exports.getAll = (query, callback)=>{
    PostChunk.find(
      {
        "_id": {
          $in: query
        }
      },
      callback
    );
  }

  // Delete Chunk
  module.exports.deleteChunk = (id, callback)=>{
    PostChunk.remove({ _id: id }, callback);
  }

  // Update Chunk

  // Update Post
  module.exports.updateChunk = (req, callback)=>{
    PostChunk.update(
      { _id: req.id },
      { $set: {
          type: req.type,
          content: req.content
        }
      },
      callback
    )
  }