// libraries
const express = require('express');
const bcrypt = require('bcrypt');

// my modules
const DB_auth = require('../../Database/DB-auth-api');
// const DB_cart = require('../../Database/DB-cart-api');
const authUtils = require('../../utils/auth-utils');

// creating router
const router = express.Router({mergeParams : true});

// ROUTE: sign up (get)
router.get('/', (req, res) => {
    // check if already logged in
    if(req.provider == null){
        const errors = [];
        res.render('providerLayout.ejs', {
            title : 'Sign Up - Squirrel',
            body : ['signup'],
            user : null,
            errors : errors
        });
    } else {
        res.redirect('/provider');
    }
});

// ROUTE: sign up (post)
router.post('/', async (req, res) => {
    // check if already logged in
    if(req.provider == null){
        let results, errors = [];

        // check if email is alredy used or not
        console.log(req.body);
        results = await DB_auth.getUserIDByEmail(req.body.email,2);
        if(results.length > 0)
            errors.push('Email is already registered to a user');

        // check if password confimation is right
        if(req.body.password !== req.body.password2)
            errors.push('Password confirmation doesn\'t match with password');

        // check if password has at least 6 char
        if(req.body.password.length < 6){
            errors.push('Password must be at least 6 characters');
        }


        // if there are errors, redirect to sign up but with form informations
        if(errors.length > 0){
            res.render('providerLayout.ejs', {
                title : 'Sign Up - Squirrel',
                body : ['signup'],
                user : null,
                errors : errors,
                form : {
                    name : req.body.name,
                    email : req.body.email,
                    password : req.body.password,
                    password2 : req.body.password2,
                }
            });
        }
        else{
            // if no error, create user object to be sent to database api
            let user = {
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
                authority:2,
            }
            // hash user password
            await bcrypt.hash(user.password, 8, async (err, hash) =>{
                if(err)
                    console.log("ERROR at hashing password: " + err.message);
                else{
                    // create user via db-api, id is returned
                    user.password = hash;
                    let result = await DB_auth.createNewUser(user);
                    let result2 = await DB_auth.getLoginInfoByEmail(user.email,user.authority);
                    // login the user too
                    // await DB_cart.addNewCart(result2[0].ID);
                    console.log(user.email,result2);
                    await authUtils.loginProvider(res, result2[0].user_id)
                    // redirect to home page
                    //res.redirect(`/profile/${user.handle}/settings`);
                    res.redirect('/provider');
                }
            });
        }
    } else {
        res.redirect('/provider');
    }
});

module.exports = router;