// libraries
const express = require('express');
const bcrypt = require('bcrypt');

// my modules
const DB_auth = require('../../Database/DB-auth-api');
const authUtils = require('../../utils/auth-utils');

// creating router
const router = express.Router({mergeParams : true});

// ROUTE: login (get)
router.get('/', (req, res) => {
    // if not logged in take to login page
    if(req.provider == null){
        const errors = [];
        return res.render('providerLayout.ejs', {
            title : 'Login - Squirrel',
            body : ['login'],
            user : null,
            form: {
                email: "",
                password: ""
            },
            errors : errors
        })
    } else {
        res.redirect('/provider');
    }
});


// ROUTE: login (post)
// Launches when submit button is pressed on form
router.post('/', async (req, res) => {
    // if not logged in take perform the post
    console.log("in provider loigin post");
    if(req.provider == null){
        let results, errors = [];
        // get login info for handle (id, handle, password)
        results = await DB_auth.getLoginInfoByEmail(req.body.email,2);

        // if no result, there is no such user
        if(results.length == 0){
            errors.push('No such user found');
        } else {
            // match passwords
            const match = await bcrypt.compare(req.body.password, results[0].password);
            if(match){
                // if successful login the user
                await authUtils.loginProvider(res, results[0].user_id);
            }
            else{
                errors.push('wrong password');
            }
        }

        // if any error, redirect to login page but with form information, else redirect to homepage
        if(errors.length == 0){
            console.log("successful at logging in provider");
            res.redirect('/provider');
        } else {
            res.render('providerLayout.ejs', {
                title : 'Login - Shohayok',
                body : ['login'],
                user : null,
                errors : errors,
                form: {
                    email: req.body.email,
                    password: req.body.password
                }
            });
        }
    } else {
        //console.log(req.user);
        res.redirect('/provider');
    }
});

module.exports = router;