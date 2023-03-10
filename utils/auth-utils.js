// libraries
const jwt = require('jsonwebtoken');

// my modules
const DB_auth = require('../Database/DB-auth-api');

// function to login user into a session
async function loginUser(res, userId, authority = 1){
    // create token
    const payload = {
        id: userId,
        authority:1
    };
    let token = jwt.sign(payload, process.env.APP_SECRET);
    // put token in db
    //await DB_auth.updateUserTokenById(userId, token);
    // set token in cookie
    let options = {
        maxAge: 90000000, 
        httpOnly: true
    }
    res.cookie('sessionToken', token, options);
}

async function loginProvider(res, userId){
    // create token
    const payload = {
        id: userId,
        authority:2
    };
    let token = jwt.sign(payload, process.env.APP_SECRET);
    // put token in db
    //await DB_auth.updateUserTokenById(userId, token);
    // set token in cookie
    let options = {
        maxAge: 90000000,
        httpOnly: true
    }
    res.cookie('providerSessionToken', token, options);
}

async function loginAdmin(res, userId){
    // create token
    const payload = {
        superid: userId
    };
    let token = jwt.sign(payload, process.env.APP_SECRET);
    // put token in db
    //await DB_auth.updateUserTokenById(userId, token);
    // set token in cookie
    let options = {
        maxAge: 90000000,
        httpOnly: true
    }
    res.cookie('adminSessionToken', token, options);
}

module.exports = {
    loginUser,
    loginProvider,
    loginAdmin
}