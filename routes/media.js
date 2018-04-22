
//************************//
//****  Dependencies  ****//
//************************//

    // Bring in Express Router
    const express = require('express');
    const router = express.Router();
    const multer  = require('multer');
    const fs = require('fs');

    // Auth
    const config = require('../config/database');
    const passport = require('passport');
    const jwt = require('jsonwebtoken');


    // Middleware
    const directory = './uploads/';
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, directory)
        },
        filename: (req, file, cb) => {
            const originalname = file.originalname;
            let newname = 'file';
            if(originalname !== ''){
                newname = originalname.replace(/[^a-zA-Z 0-9]/g, "");
                newname = newname.replace(' ', '-');
                newname = newname.toLowerCase();
            }
            newname = newname+'-'+Date.now()+'.jpg';
            cb(null, newname);
        }
    });

    // Filter out non jpegs
    const fileFilter = (req, file, cb) => {
        if( file.mimetype !== 'image/jpeg' ) return cb(null, false);
        cb(null, true);
    }

    // Specify
    const upload = multer(
        {
            storage: storage,
            fileFilter: fileFilter,
            limits: {
                files: 1,
                fileSize: 1000000
            }
        }
    ).single('file');


    // File upload
    router.post(
        '/upload',
        passport.authenticate('jwt', { session: false }),
        (req, res, next) => {

        upload(req, res, (err) => {

            // Response
            let response = {
                success: true,
                msg: 'Added media',
            }

            if (err) {
                console.log(err);
                response.success = false,
                response.msg = 'Failed to add media';
            }

            return res.json(response);

        });

    });

    // File Delete
    router.post(
        '/delete',
        passport.authenticate('jwt', { session: false }),
        (req, res, next) => {

        const file = 'uploads/'+req.body.path;

        if(!file.endsWith('.jpg')){
            return res.json({
                success: false,
                msg: 'Incorrect Filetype Deletion'
            });
        }

        fs.unlink(file, (err) => {

            if(err){
                console.log(err);
                return res.json({
                    success: false,
                    msg: 'Could not delete file'
                });
            }

            return res.json({
                success: true,
                msg: 'File Deleted'
            });
    
        });

    });


//************************//
//****     Export     ****//
//************************//

  // Export our router!
  module.exports = router;