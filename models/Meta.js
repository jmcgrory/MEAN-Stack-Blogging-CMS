//************************//
//****  Dependencies  ****//
//************************//

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const config = require('../config/database');

//************************//
//****   Meta Model   ****//
//************************//

const MetaSchema = Schema({

    title: {

        type: String,

        required: true

    },

    home: {

        type: Object

    },

    about: {

        type: Object

    },

    contact: {

        type: Object

    }

});

//************************//
//****     Export     ****//
//************************//

const Meta = module.exports = mongoose.model('Meta', MetaSchema);

//************************//
//****   Functions    ****//
//************************//

module.exports.get = (query, callback) => {

    Meta.findOne({}).select(query.select).exec(callback);

}

module.exports.update = (meta, callback) => {

    const newMeta = meta.body.meta;

    Meta.findByIdAndUpdate(newMeta._id, newMeta, callback);

}

