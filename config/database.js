//************************//
//**** MongoDB Config ****//
//************************//

const dotenv = require('dotenv');

dotenv.config();

module.exports = {

    database: process.env.CONNECTION,

    secret: process.env.SECRET,

}
