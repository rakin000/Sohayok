// libraries
const express = require('express');

const DB_custom_job= require('../../Database/DB-custom-job-api');
// creating router
const router = express.Router({mergeParams : true});

const jobs = ["Custom","AC Repair","Appliance","Travels","Shifting","Saloon","Car"];

router.get('/:categoryId', async (req, res) =>{
    if(req.provider === null){
        return res.redirect('/provider/login');
    }
   const custom_job_result = await DB_custom_job.getAllCustomJobsOfCategory(req.params.categoryId);

    console.log(custom_job_result);
    res.render('providerLayout.ejs', {
        user:req.user,
        body:['customJobAll'],
        title:'Custom Job',
        jobs:custom_job_result,

    });
});




router.post('/add', async (req, res) =>{
    // if logged in, delete token from database
    if( req.user == null )
        return res.redirect('/login');

    const custom_job = {
        title:req.body.title,
        description:req.body.description,
        category:req.body.category,
        initial_amount:req.body.amount,
        poster_id:req.user.id
    }
    const addResult = await DB_custom_job.addCustomJob(custom_job);
    res.redirect('/');
});



module.exports = router;