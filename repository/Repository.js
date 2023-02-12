const { Client } = require('pg');
require('dotenv').config()

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client
    .connect()
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Database connection error', err.stack))

// creates connection pool for oracledb
async function startup() {
    console.log('starting up database.');
    await oracledb.createPool({
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        connectstring: process.env.DB_CONNECTSTRING,
        poolMin: 4,
        poolMax: 10,
        poolIncrement: 1
    });
    console.log('pool created');
}

// closes connection pool for oracledb
async function shutdown() {
    console.log('shutting down database.');
    try {
        // If this hangs, you may need DISABLE_OOB=ON in a sqlnet.ora file.
        await oracledb.getPool().close(10);
        console.log('Pool closed');
    } catch(err) {
        console.log("ERROR shutting down database: "+err.message);
    }
}


class Repository {
    constructor () {
        // If anything needs be done here
    }

    query = async function (query, params) {
        try {
            // console.log(query);
            const data = await client.query(query, params);
            return {
                success: true,
                data: data.rows
            }
        } catch (error) {
            console.log(error)
            return {
                success: false,
                error
            }
        }
    }

}

exports.Repository = Repository;
exports.shutdown = shutdown;
exports.startup = startup;