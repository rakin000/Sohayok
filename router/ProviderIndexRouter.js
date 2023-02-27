// libraries
const express = require('express');
//const marked = require('marked');

const router = express.Router({mergeParams : true});

// sub-routers
const signupRouter = require('./providerAuth/signup');
const loginRouter = require('./providerAuth/login');
const logoutRouter = require('./providerAuth/logout');

const customJobRouter = require('./provider/customjob');
const bidRouter = require('./provider/bid');
const orderRouter = require('./provider/joborder');


const auth = require('../middlewares/auth').providerAuth;

router.use(auth);

const jobs = ["Custom","AC Repair","Appliance","Travels","Shifting","Saloon","Car"];

// ROUTE: home page
router.get('/', async (req, res) =>{
    if( req.provider == null )
        return res.redirect('/provider/login');

    res.render('providerLayout.ejs', {
        user:req.user,
        body:['landingPage'],
        title:'Squirrel',
        categories:jobs,
    });

});





// setting up sub-routers

router.use('/signup', signupRouter);
router.use('/login', loginRouter);
router.use('/logout', logoutRouter);

router.use('/job/custom', customJobRouter);
router.use('/job/bid', bidRouter);
router.use('/job/order', orderRouter);



module.exports = router;