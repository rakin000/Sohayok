// libraries
const express = require('express');

const DB_bid= require('../../Database/DB-bid-api');
const DB_custom_job= require('../../Database/DB-custom-job-api');
// creating router
const router = express.Router({mergeParams : true});

const jobs = ["Custom","AC Repair","Appliance","Travels","Shifting","Saloon","Car"];

router.get('/', async (req, res) =>{
    if(req.provider === null){
        return res.redirect('/provider/login');
    }
    const bid_result = await DB_bid.getAllBidByProvider(req.provider.id);
    console.log(bid_result);
    res.render('providerLayout.ejs', {
        user:req.user,
        body:['bidAll'],
        title:'All Bids',
        bids:bid_result,
    });

});

router.post('/add', async (req, res) =>{
    if(req.provider === null){
        return res.redirect('/provider/login');
    }
    const custom_job_result = await DB_custom_job.getCustomJobById(req.body.custom_job_id);

    const bid = {
        user_id:custom_job_result[0].poster_id,
        provider_id:req.provider.id,
        user_bid:custom_job_result[0].initial_amount,
        provider_bid:req.body.provider_bid,
        custom_job_id:req.body.custom_job_id
    }
    await DB_bid.addBid(bid);
    res.redirect("/provider");

});

router.post('/update', async (req, res) =>{
    if(req.provider === null){
        return res.redirect('/provider/login');
    }
    console.log(req.body);
    await DB_bid.updateProviderBid(req.body.bid_id,req.body.provider_bid);
    res.redirect("/provider");

});



router.get('/:jobId', async (req, res) =>{
    if(req.provider === null){
        return res.redirect('/provider/login');
    }

    // await DB_review.insertReview(req.user.id,req.body.bookId,req.body.rating,req.body.review);
    const bid_result = await DB_bid.getBidByProvider(req.provider.id,req.params.jobId);
    if( bid_result.length === 0  ){
        const custom_job_result = await  DB_custom_job.getCustomJobById(req.params.jobId);
        if( custom_job_result.length === 0 ) res.redirect("/provider");
        res.render('providerLayout.ejs', {
            user:req.user,
            body:['bidAdd'],
            title:'Add Bid Job',
            job:custom_job_result[0]
        });
    }else{
        const custom_job_result = await  DB_custom_job.getCustomJobById(req.params.jobId);

        res.render('providerLayout.ejs', {
            user:req.user,
            body:['bidUpdate'],
            title:'Update Bid Job',
            job:custom_job_result[0],
            bid:bid_result[0]
        });
    }
});





module.exports = router;