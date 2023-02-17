const database = require('./database');



// function to get id from email
async function getUserIDByEmail(email,authority=1){
    const sql = `
        SELECT 
            *
        FROM 
            APP_USER
        WHERE 
            EMAIL = $1 AND AUTHORITY = $2
        `;
    const params = [email,authority];

    const result = await database.execute(sql, params);
    return result;
}

// function to creat new user
// user should have handle, email, pass, dob
// {id} will be returned
async function createNewUser(user){
    if( !user.authority ) user.authority = 1;
    const sql = `
        INSERT INTO
            APP_USER(username,password,email,authority)
        VALUES 
            ($1,$2,$3,$4)
    `;
    const params = [user.name,user.password,user.email,user.authority];
    const result = await database.execute(sql, params);
    return result;
}

// return login info (id, handle, password) from handle
async function getLoginInfoByEmail(email,authority=1){
    const sql = `
        SELECT 
           *
        FROM
            APP_USER
        WHERE
            EMAIL = $1 and authority = $2
    `;
    const params = [email,authority];

    const result = await database.execute(sql, params);
    return result;
}

async function getLoginInfoByID(id){
    const sql = `
        SELECT 
            *
        FROM
            APP_USER
        WHERE
            user_id = $1
    `;
    const params = [id];

    const result = await database.execute(sql, params);
    return result;
}


module.exports = {
    getUserIDByEmail,
    createNewUser,
    getLoginInfoByEmail,
    getLoginInfoByID,
}