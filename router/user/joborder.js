// libraries
const express = require('express');

const DB_custom_job= require('../../Database/DB-custom-job-api');
const DB_bid= require('../../Database/DB-bid-api');
const DB_job_order= require('../../Database/DB-job-order-api');
// creating router
const router = express.Router({mergeParams : true});

const jobs = ["Custom","AC Repair","Appliance","Travels","Shifting","Saloon","Car"];
const category_array = ["Custom","AC Repair","Appliance","Travels","Shifting","Saloon","Car"];
const status_array = ["Pending","On Going","Completed"];

router.get('/', async (req, res) =>{
    if(req.user === null){
        return res.redirect('/login');
    }
    const job_order_result = await DB_job_order.getJobOrderByUserId(req.user.id);
    for(let i=0;i<job_order_result.length;i++){
        job_order_result[i].status = status_array[ job_order_result[i].status ];
        job_order_result[i].category = category_array[ job_order_result[i].category ];
    }
    res.render('layout.ejs', {
        user:req.user,
        body:['jobOrderAll'],
        title:'Job Orders',
        jobs:job_order_result
    });

});

/*
router.get('/:joborderId', async (req, res) =>{
    if(req.user === null){
        return res.redirect('/login');
    }
    const bid_result = await DB_bid.getBidByBidId(req.params.bidId,req.user.id);
    if( bid_result.length === 0 ) return res.redirect("/");
    const custom_job_result = await DB_custom_job.getCustomJobById(bid_result[0].custom_job_id);

    res.render('layout.ejs', {
        user:req.user,
        body:['bidUpdate'],
        title:'Add Custom Job',
        bid:bid_result[0],
        job:custom_job_result[0]
    });

});
*/

module.exports = router;