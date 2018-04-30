
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

    // Media Schema
    const Media = require('../models/Media');

//*************************//
//****    Functions    ****//
//*************************//

    // Middleware
    const directory = './uploads/';
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, directory)
        },
        filename: (req, file, cb) => {
            const originalname = file.originalname;
            let filetype = '.';
            if(file.mimetype==='image/jpeg') filetype+='jpg';
            if(file.mimetype==='image/gif') filetype+='gif';
            let newname = 'file';
            if(originalname !== ''){
                newname = originalname.replace(/[^a-zA-Z 0-9]/g, "");
                newname = newname.replace(' ', '-');
                newname = newname.toLowerCase();
            }
            newname = newname+'-'+Date.now()+filetype;
            cb(null, newname);
        }
    });

    // Filter out non jpegs
    const fileFilter = (req, file, cb) => {
        const mime = file.mimetype;
        if( mime !== 'image/jpeg' && mime !== 'image/gif' ){
            return cb(null, false);
        } else {
            cb(null, true);
        }
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

        const date = new Date();
        const month = ('0'+(date.getMonth()+1)).slice(-2);
        const year = (date.getFullYear()+'').substring(2,4);

        // Check if year dir exists & mkdir if not
        const yearDirectory = directory+year;
        if(!fs.existsSync(yearDirectory)) fs.mkdir(yearDirectory);

        // Check if month dir exists & mkdir if not
        const monthDirectory = yearDirectory+'/'+month;
        if(!fs.existsSync(monthDirectory)) fs.mkdir(monthDirectory);

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
                return res.json(response);

            }

            const oldPath = req.file.path;
            const newPath = monthDirectory+'/'+req.file.filename;

            fs.rename(oldPath, newPath);

            const insert = new Media({
                fileName: req.file.filename,
                mimeType: req.file.mimetype,
                uploaded: new Date(),
                filePath: newPath
            });

            Media.addMedia(insert, (err, media) => {
                if(err){
                    response.success = false,
                    response.msg = 'Failed to add media via schema';
                }
            });

            return res.json(response);

        });

    });

    // Get All Media
    router.get(
        '/all',
        passport.authenticate('jwt', { session: false }),
        (req, res, next) => {

        const page = 1;

        Media.getPagedMedia(page, (err, media) => {

            if(err){
                res.json({
                    success: true,
                    msg: 'Could not get Media'
                });
            }

            res.send(media);
        });

    });

    // File Delete
    router.post(
        '/delete',
        passport.authenticate('jwt', { session: false }),
        (req, res, next) => {

        const path = req.body.filePath;

        if(!path.endsWith('.jpg')&&!path.endsWith('.gif')){

            return res.json({

                success: false,

                msg: 'Incorrect Filetype Deletion'

            });

        }

        Media.delete( path, (err, media) => {

            if(err){

                res.json({success: false, msg: 'Failed to delete'});

            } else {

                fs.unlink(path, (err) => {

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

            }

        });

    });


//************************//
//****     Export     ****//
//************************//

  // Export our router!
  module.exports = router;