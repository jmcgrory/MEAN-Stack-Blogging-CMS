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

//************************//
//****    App Setup   ****//
//************************//

  // Development Port
  const port = 3000;
  // Heroku Port
  // const port = process.env.PORT || 8080;
  const app = express();

  // Middleware for Body Parser
  app.use(bodyParser.json());

//************************//
//****   Mongod Init  ****//
//************************//

  // Mongoose connect to DB
  mongoose.connect(config.database);

  // When connected log connection
  mongoose.connection.on('connected', () => {
    console.log('connected to db '+config.database);
  });

  // Error situation, try not to panic
  mongoose.connection.on('error', (err) => {
    console.log('DB Error: '+err);
  });

//************************//
//****  Passport Init ****//
//************************//

  // Middleware for Passport
  app.use(passport.initialize());
  app.use(passport.session());
  // Require our passport config file and pass in our port
  require('./config/passport')(passport);

//************************//
//****   Base Routes  ****//
//************************//

  // Set Static Directory for Angular
  app.use(express.static(path.join(__dirname, 'public')));

  // Allow CORS for cross domain
  app.use(cors());
  
  // Index Route
  app.get('/', (req, res) => {
    res.send('Welcome to Localhost 3000: The Sentient Host')
  });

/* When this sucka is live bruh!
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });
  */

//************************//
//****   CRUD Routes  ****//
//************************//

  // Route for Users
  const users = require('./routes/users');
  app.use('/users', users);

  // Route for Posts
  const posts = require('./routes/posts');
  app.use('/posts', posts);

  // Route for PostChunks
  const postChunks = require('./routes/postChunks');
  app.use('/chunks', postChunks);

//************************//
//****    RUN DMC     ****//
//************************//

  // Run the server
  app.listen(port, () => {
    console.log('LISTENING ON PORT >>> '+ port);
  });