// configuring .env variables
require('dotenv').config();

const app = require('./app');
require('./repository/Repository');

// need to set this for oracledb connection pool
process.env.UV_THREADPOOL_SIZE = 10;

const port = process.env.PORT;
app.listen(port, async () => {
    try{
        // create database connection pool, log startup message
        console.log(`listening on http://localhost:${port}`);
    } catch(err) {
        console.log("Error starting up database: " + err);
        process.exit(1);
    }
});



process
    .once('SIGTERM', database.shutdown)
    .once('SIGINT',  database.shutdown);