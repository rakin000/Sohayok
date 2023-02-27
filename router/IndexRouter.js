// libraries
const express = require('express');


const router = express.Router({mergeParams : true});

// sub-routers
const signupRouter = require('./auth/signup');
const loginRouter = require('./auth/login');
const logoutRouter = require('./auth/logout');

const customJobRouter = require('./user/customjob');
const bidRouter = require('./user/bid');
const orderRouter = require('./user/joborder');



const auth = require('../middlewares/auth').auth;

router.use(auth);

// ROUTE: home page
router.get('/', async (req, res) =>{
    if( req.user == null )
        return res.redirect('/login');

    res.render('layout.ejs', {
        user:req.user,
        body:['landingPage'],
        title:'Shohayok',

    });

});



// setting up sub-routers

router.use('/signup', signupRouter);
router.use('/login', loginRouter);
router.use('/logout', logoutRouter);

router.use('/job/custom',customJobRouter);
router.use('/job/bid',bidRouter);
router.use('/job/order',orderRouter);




module.exports = router;