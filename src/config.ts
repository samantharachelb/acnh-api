const dotenv = require('dotenv');
dotenv.config({path: 'src/.env'});

module.exports = {
    app: {
        port: 3000
    },
    db: {
        host: process.env.MONGODB_HOST,
        username: process.env.MONGODB_USER,
        password: process.env.MONGODB_PASS,
        database: process.env.MONGODB_DATABASE
    }
}
