// libraries
const express = require('express');

const DB_custom_job= require('../../Database/DB-custom-job-api');
const DB_bid= require('../../Database/DB-bid-api');
// creating router
const router = express.Router({mergeParams : true});

const jobs = ["Custom","AC Repair","Appliance","Travels","Shifting","Saloon","Car"];

router.get('/all', async (req, res) =>{
    if(req.user === null){
        return res.redirect('/login');
    }
    // await DB_review.insertReview(req.user.id,req.body.bookId,req.body.rating,req.body.review);
    const custom_job_result = await DB_custom_job.getAllCustomJobsOfUser(req.user.id);
    for(let i=0;i<custom_job_result.length;i++){
        custom_job_result[i].category = jobs[ custom_job_result[i].category ];
    }
    console.log(custom_job_result);
    res.render('layout.ejs', {
        user:req.user,
        body:['customJobAll'],
        title:'Custom Job',
        jobs:custom_job_result,
    });
});



router.get('/add', async (req, res) =>{
    if(req.user === null){
        return res.redirect('/login');
    }
   // await DB_review.insertReview(req.user.id,req.body.bookId,req.body.rating,req.body.review);

    res.render('layout.ejs', {
        user:req.user,
        body:['customJobAdd'],
        title:'Add Custom Job',
    });
});

router.post('/add', async (req, res) =>{
    // if logged in, delete token from database
    if( req.user == null )
        return res.redirect('/login');
    console.log("henloo");
    console.log(req.body);
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

router.get('/:jobId', async (req, res) =>{
    if(req.user === null){
        return res.redirect('/login');
    }
    const bid_result = await DB_bid.getBidByJobId(req.params.jobId,req.user.id);
    const custom_job_result = await DB_custom_job.getCustomJobById(req.params.jobId);
    // await DB_review.insertReview(req.user.id,req.body.bookId,req.body.rating,req.body.review);

    res.render('layout.ejs', {
        user:req.user,
        body:['customJobOne'],
        title:'Custom Job',
        bids:bid_result,
        job:custom_job_result[0]
    });
});


module.exports = router;