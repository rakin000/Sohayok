const { Client } = require('pg');
require('dotenv').config()


const client = new Client({
    connectionString: "postgres://postgres:password@localhost:5432/shohayok?sslmode=disable\n",
    // connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// creates connection pool for postgresql
async function startup() {
    console.log('starting up database.');
    try{
        await client.connect();
        console.log("Database Connected");
    }catch (e) {
        console.log("Database connection error",e.stack);
    }
}

// closes connection pool for oracledb
async function shutdown() {
    console.log('shutting down database.');
    try {
        // If this hangs, you may need DISABLE_OOB=ON in a sqlnet.ora file.
       // await client.close();
        console.log('Connection closed');
    } catch(err) {
        console.log("ERROR shutting down database: "+err.message);
    }
}

// code to execute sql
async function execute(query, params){
    try {
         //console.log(query);
        const data = await client.query(query, params);
       // console.log(data);
        return data.rows;
        return {
            success: true,
            data: data.rows
        }
    } catch (error) {
        console.log(error)
        return [];
        return {
            success: false,
            error
        }
    }
}

// code to execute many sql
// async function executeMany(sql, binds, options){
//     let connection;
//     try {
//         // Get a connection from the default pool
//         connection = await oracledb.getConnection();
//         await connection.executeMany(sql, binds, options);
//     } catch (err) {
//         console.log("ERROR executing sql: " + err.message);
//     } finally {
//         if (connection) {
//             try {
//                 // Put the connection back in the pool
//                 await connection.close();
//             } catch (err) {
//                 console.log("ERROR closing connection: " + err);
//             }
//         }
//     }
//
//     return;
// }




module.exports = {
    startup,
    shutdown,
    execute,
};