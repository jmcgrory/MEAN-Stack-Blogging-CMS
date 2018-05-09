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

    // Get Post by URL

    module.exports.getPostByURL = (search, callback) => {

        Post.findOne({ url: search.url }, callback);

    }

    // Get Post by URL

    module.exports.getPostByID = (search, callback) => {

        Post.findById( search.id, callback);

    }

    // Get Featured Posts

    module.exports.getLimitPosts = (limit, callback) => {

        Post.find({ active: true }, 'title hero date url', callback).limit(limit).sort({date: 'desc'});

    }

    // Get All Posts

    module.exports.getAllPosts = (callback) => {

        Post.find({}, 'id hero title date url active', callback);

    }

    // Get All Posts
    module.exports.getPosts = (query, callback) => {
        
        const limit = query.limit;
                    
        const offset = query.offset;
        
        const order = query.order;

        const fields = query.fields.replace(',', ' ').trim();
        
        const categories = query.categories.split(',');
        
        const excluding = query.excluding.split(',');

        console.log(limit, offset, order, fields, categories, excluding);

        Post.find({}, 'id hero title date url active', callback);

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
