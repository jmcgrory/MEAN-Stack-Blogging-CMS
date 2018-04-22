//************************//
//****  Dependencies  ****//
//************************//

    // Bring in Express Router
    const express = require('express');
    const router = express.Router();

    // Others
    const config = require('../config/database');
    const passport = require('passport');
    const jwt = require('jsonwebtoken');
    const PostChunk = require('../models/PostChunk');

//************************//
//****    Functions   ****//
//************************//

    // Add Post Chunk
    router.post('/add',
        passport.authenticate('jwt', { session: false }),
        (req, res, next) => {

        // define new post
        let newPostChunk = new PostChunk({
            type: "text"
        });

        PostChunk.addPostChunk(newPostChunk, (err, postChunk) => {
            if(err){
                res.json({success: false, msg: 'Failed to create chunk'});
            } else {
                res.json({
                    success: true,
                    msg: 'Post Chunk Added',
                    newID: postChunk._id
                });
            }
        });

    });


    // Get all postChunks via Array!
    router.get('/all',
        (req, res, next) => {

        // Query
        let query = req.query[0];
        
        PostChunk.getAll(query, (err, chunks)=>{
            if(err){
                res.json({success: false, msg: 'Failed to get chunks'});
            } else {
                res.json({
                    success: true,
                    msg: 'Got Chunks',
                    newChunks: chunks
                });
            }
        });

    });

    // Delete Post
    router.post('/delete',
        passport.authenticate('jwt', { session: false }),
        (req, res, next) => {

        let id = req.body.id;

        PostChunk.deleteChunk( id, (err, posts) => {
            if(err){
                res.json({success: false, msg: 'Failed to delete'});
            } else {
                res.json({success: true, msg: 'Chunk deleted'});
            }
        });

    });

    // Delete Post
    router.post('/update',
        passport.authenticate('jwt', { session: false }),
        (req, res, next) => {

        let send = {
            id: req.body.id,
            type: req.body.type,
            content: req.body.content
        }

        PostChunk.updateChunk(send, (err, posts) => {
            if(err){
                res.json({success: false, msg: 'Failed to update'});
            } else {
                res.json({success: true, msg: 'Chunk updated'});
            }
        });

    });

//************************//
//****     Export     ****//
//************************//

    // Export
    module.exports = router;