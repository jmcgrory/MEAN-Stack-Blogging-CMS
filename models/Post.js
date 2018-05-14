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

    const PostSchema = Schema({

        title: {

            type: String,

            required: true

        },

        url: {

            type: String,
            
            required: true

        },

        category: {

            type: [String]

        },

        date: {

            type: Date,

            default: Date.now

        },

        hero: {

            type: String

        },

        body: {

            type: Array,
            
            default: []

        },

        active: {

            type: Boolean

        }

    });

//************************//
//****     Export     ****//
//************************//

    const Post = module.exports = mongoose.model('Post', PostSchema);

//************************//
//****   Functions    ****//
//************************//

    // Construct Parameters

    // Get Post by URL

    module.exports.getPostByURL = (search, callback) => {

        Post.findOne({ url: search.url }, callback);

    }

    // Get Post by URL

    module.exports.getPostByID = (search, callback) => {

        Post.findById( search.id, callback);

    }

    // Get All Posts

    module.exports.getAllPosts = (callback) => {

        Post.find({}, 'id hero title date url active', callback);

    }

    const constructParams = (query) => {

        let params = {}

        if(query.hasOwnProperty('active')){
            
            const active = query.active === 'true';

            params['active'] =  active;

        }

        if(query.hasOwnProperty('categories')) {

            const categoryParams = query['categories'].split(',');
            
            params['category'] = { $in: categoryParams }

        }

        if(query.hasOwnProperty('excluding')) {
            
            const excludedIds = query['excluding'].split(',');

            params['id'] = { $ne: excludedIds };

        }

        return params;

    }

    // Get All Posts
    module.exports.countPosts = (query, callback) => {

        const allParams = constructParams(query);
    
        Post.find(allParams.params).exec(callback);

    }

    // Get All Posts
    module.exports.getPosts = (query, callback) => {

        const limit = query.hasOwnProperty('limit') ? parseInt(query.limit) : 12;

        const offset = query.hasOwnProperty('offset') ? parseInt(query.offset) : 0;

        const order = query.hasOwnProperty('order') ? query.order : 'desc';

        const select = query.hasOwnProperty('select') ? query.select.replace(/,/g, ' ').trim() : 'id';

        const params = constructParams(query);
    
        Post.find(params).skip(offset).limit(limit).select(select).sort({date: order}).exec(callback);

    }

    // Add new Post

    module.exports.addPost = (newPost, callback) => {

        newPost.save(callback);

    }

    // Delete Post

    module.exports.deletePost = (id, callback) => {

        Post.remove({ _id: id }, callback);

    }

    // ?Active Post

    module.exports.postActive = (req, callback) => {

        Post.update(

            { _id: req.id },

            { $set: { active: req.active } },

            callback

        )

    }

    // Update Post

    module.exports.postUpdate = (req, callback) => {

        Post.update(

            { _id: req.id },

            {
                
                $set: {

                    url: req.post.url,
                    
                    title: req.post.title,
                    
                    hero: req.post.hero,
                    
                    date: req.post.date,
                    
                    category: req.post.category,
                    
                    body: req.post.body
                
                }

            },

            callback

        )
    }
