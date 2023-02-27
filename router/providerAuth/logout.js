// libraries
const express = require('express');
const DB_auth = require('../../Database/DB-auth-api');

// creating router
const router = express.Router({mergeParams : true});

router.post('/', async (req, res) =>{
    // if logged in, delete token from database
    if(req.user !== null){
        // set null in token
        //await DB_auth.updateUserTokenById(req.user.id, null);
    }
    res.clearCookie("providerSessionToken");
    res.redirect('/provider/login');
});

module.exports = router;