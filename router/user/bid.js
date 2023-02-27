// libraries
const express = require('express');

const DB_custom_job= require('../../Database/DB-custom-job-api');
const DB_bid= require('../../Database/DB-bid-api');
const DB_job_order= require('../../Database/DB-job-order-api');
// creating router
const router = express.Router({mergeParams : true});

const jobs = ["Custom","AC Repair","Appliance","Travels","Shifting","Saloon","Car"];

router.post('/update', async (req, res) =>{
    if(req.user === null){
        return res.redirect('/login');
    }
    console.log(req.body);
    await DB_bid.updateUserBid(req.body.bid_id,req.body.user_bid);
    res.redirect("/");

});

router.post('/accept', async (req, res) =>{
    // if logged in, delete token from database
    if( req.user == null )
        return res.redirect('/login');

    console.log(req.body);
    const custom_job_result = await DB_custom_job.getCustomJobById(req.body.custom_job_id);
    const bid_result = await DB_bid.getBidByBidId(req.body.bid_id,req.user.id);
    if( custom_job_result.length === 0 || bid_result.length === 0 ) return res.redirect("/");
    await DB_bid.finalizeBid(req.body.custom_job_id);
    await DB_custom_job.finalizeCustomJob(req.body.custom_job_id);
    const job_order = {
        custom_job_id:custom_job_result[0].custom_job_id,
        provider_id:bid_result[0].provider_id,
        price:bid_result[0].provider_bid
    }

    await DB_job_order.addJobOrder(job_order);
    res.redirect('/');
});

router.get('/:bidId', async (req, res) =>{
    if(req.user === null){
        return res.redirect('/login');
    }
    const bid_result = await DB_bid.getBidByBidId(req.params.bidId,req.user.id);
    if( bid_result.length === 0 ) return res.redirect("/");
    const custom_job_result = await DB_custom_job.getCustomJobById(bid_result[0].custom_job_id);

    res.render('layout.ejs', {
        user:req.user,
        body:['bidUpdate'],
        title:'Update Bid',
        bid:bid_result[0],
        job:custom_job_result[0]
    });

});


module.exports = router;