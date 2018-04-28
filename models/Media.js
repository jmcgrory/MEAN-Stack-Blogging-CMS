//************************//
//****  Dependencies  ****//
//************************//

    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;
    const config = require('../config/database');

//************************//
//****   Post Model   ****//
//************************//

    // User Schema
    const MediaSchema = Schema({
        mimeType: {
            type: String,
            required: true
        },
            uploaded: {
            type: String,
            required: true
        },
            fileName: {
            type: String,
            required: true
        },
            filePath: {
            type: String,
            required: true
        },
            alt: {
            type: String
        }
    });

//************************//
//****     Export     ****//
//************************//

    const Media = module.exports = mongoose.model('Media', MediaSchema);

//************************//
//****   Functions    ****//
//************************//

    // Add Media
    module.exports.addMedia = (media, callback)=>{
        media.save(callback);
    }

    // Get Media
    module.exports.getMedia = (id, callback)=>{
        Media.findOne({ _id: id }, callback);
    }

    // Get Media
    module.exports.getPagedMedia = (page, callback)=>{

        // TODO: Pagination Offset

        Media.find({}, callback);
    }