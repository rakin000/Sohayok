// libraries
const express = require('express');
//const marked = require('marked');

const router = express.Router({mergeParams : true});
// const DB_stats = require('../Database/DB-userSite-stats-api');
// sub-routers
const signupRouter = require('./providerAuth/signup');
const loginRouter = require('./providerAuth/login');
const logoutRouter = require('./providerAuth/logout');


const auth = require('../middlewares/auth').providerAuth;

router.use(auth);

// ROUTE: home page
router.get('/', async (req, res) =>{
    if( req.provider == null )
        return res.redirect('/provider/login');

    res.render('providerLayout.ejs', {
        user:req.user,
        body:['landingPage'],
        title:'Squirrel',
    });

});



// setting up sub-routers

router.use('/signup', signupRouter);
router.use('/login', loginRouter);
router.use('/logout', logoutRouter);



module.exports = router;