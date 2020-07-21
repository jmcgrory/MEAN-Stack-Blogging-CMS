# MEAN-Stack-Blogging-CMS

MEAN Stack Blog CMS Build with Mongoose/MongoDB, Express, Angular 4 and Node.js, still in production...

# Basic Functionalities

This is a MEAN stack blog for fast and quick blogging on the go, full CRUD capabilities and user authentication, allows multiple users.

 - User Authentication
 - User Post Dashboard
 - Categorisable Posts
 - Full CMS post creation functionality
 - Text/Code/Image input fields for posts
 - Fully custom lightweight styles

Build notes:

 - Backend built in Node.js
 - Express/Bodyparser for handling routing/post and user API
 - Mongoose for MongoDB integration
 - passport for JWT authentication
 - Angular 4 for front end
 - SCSS integrated with Angular for encapsulated global/non-global styles
 - ngx-highlightjs used for code syntax highlighting
 - angular-font-awesome used for font graphics
 - ngx-infinite-scroll added but not currently implemented for dynamic post content loading
 
To-Do:

 - Full responsiveness/Cross Browser stylings need finishing
 - Written articles need to be uploaded using CMS (not a real concern here)
 - Improve UI for initial load
 - Add animations to post/page navigation
 
Instructions:

 - in `angular-src/src/environments/`, copy `environment.ts.example` to `environment.ts`, and copy `environment.prod.ts.example` to `environment.prod.ts`
 - in the application root, run `npm install` and then `npm run start`
 - open another bash shell, and in `angular-src`, run `npm install` and then `npm run start`
 - in `routes/users.js`, uncomment the commented out code in the `register` route handler
 - in another shell, run  `curl -d "name=<username>&password=<password>" -X POST http://localhost:3000/users/register`, replacing `<username>` and `<password>` with desired values
 - undo the previous changes to `routes/users.js`, to prevent unauthorized creation of arbitrary users
 - navigate to `localhost:4200/login`, and login with the username and password you chose above
