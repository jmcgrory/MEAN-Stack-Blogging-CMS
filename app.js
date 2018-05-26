//************************//
//****  Dependencies  ****//
//************************//

const express = require('express');

const path = require('path');

const bodyParser = require('body-parser');

const cors = require('cors');

const mongoose = require('mongoose');

const config = require('./config/database.js');

const passport = require('passport');

const dotenv = require('dotenv');

//************************//
//****    App Setup   ****//
//************************//

dotenv.config();

// Development Port

const port = 8080;

const app = express();

// Middleware for Body Parser

app.use(bodyParser.json());

//************************//
//****   Mongod Init  ****//
//************************//

// Mongoose connect to DB

mongoose.connect(config.database, { useMongoClient: true });

// Log Connection

mongoose.connection.on('connected', () => {

    console.log(`connected to db ${config.database}`);

});

// Error situation, try not to panic

mongoose.connection.on('error', (err) => {

    console.log(err);

});

//************************//
//****  Passport Init ****//
//************************//

// Middleware for Passport

app.use(passport.initialize());

app.use(passport.session());

// Require our passport config file and pass in configured passport

require('./config/passport')(passport);

//************************//
//****   Base Routes  ****//
//************************//

// Upload Directory

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Set Static Directory for Angular

app.use(express.static(path.join(__dirname, 'public')));

// Allow CORS

app.use(cors());

// Index Route (possibly use '*')
app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, 'public/index.html'));

});


//************************//
//****   CRUD Routes  ****//
//************************//

// Multer File Upload

const media = require('./routes/media');

app.use('/media', media);

// Route for Users

const users = require('./routes/users');

app.use('/users', users);

// Route for Posts

const posts = require('./routes/posts');

app.use('/posts', posts);

// Route for Categories

const categories = require('./routes/categories');

app.use('/categories', categories);

// Route for Categories

const meta = require('./routes/meta');

app.use('/meta', meta);

//************************//
//****    RUN DMC     ****//
//************************//

// Run the server

app.listen(port, () => {

    console.log(`Listening on port: ${port}`);

});
