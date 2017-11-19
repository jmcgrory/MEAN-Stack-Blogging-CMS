//************************//
//****  Dependencies  ****//
//************************//

  const express = require('express');
  const path = require('path');
  const bodyParser = require('body-parser');
  const cors = require('cors');

//************************//
//****    App Setup   ****//
//************************//

  // Development Port
  // const port = 3000;
  // Heroku Port
  const port = process.env.PORT || 8080;
  const app = express();

//************************//
//****   Base Routes  ****//
//************************//

  // Set Static Directory for Angular
  app.use(express.static(path.join(__dirname, 'public')));

  // Allow CORS for cross domain
  app.use(cors());
  
  // Index Route
  app.get('/', (req, res) => {
    res.send('wtf is going on')
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });

//************************//
//****    RUN DMC     ****//
//************************//

  // Run the server
  app.listen(port, () => {
    console.log('LISTENING ON PORT >>> '+ port);
  });