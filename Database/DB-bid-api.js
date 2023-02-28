const database = require('./database');


// schema name: custom_job
// columns : custom_job_id, title,description,category,initial_amount,poster_id

// get all jobs posted by user
async function getBidByProvider(provider_id,custom_job_id){
    const sql = `
        SELECT *
        FROM  bid
        WHERE  provider_id= $1 and custom_job_id= $2
        `;
    const params = [provider_id,custom_job_id];

    const result = await database.execute(sql, params);
    return result;
}

async function getAllBidByProvider(provider_id){
    const sql = `
        SELECT bid.*,custom_job.*
        FROM  bid
        JOIN custom_job ON 
            custom_job.custom_job_id = bid.custom_job_id
        WHERE  provider_id= $1 
            and bid.final = false
        `;
    const params = [provider_id];

    const result = await database.execute(sql, params);
    return result;
}

async function getBidByJobId(custom_job_id,user_id){
    const sql = `
        SELECT *
        FROM  bid, app_user
        WHERE custom_job_id= $1 and bid.user_id=$2 and app_user.user_id=provider_id
        `;
    const params = [custom_job_id,user_id];

    const result = await database.execute(sql, params);
    console.log(result);
    return result;
}

async function getBidByBidId(bid_id,user_id){
    const sql = `
        SELECT *
        FROM  bid
        WHERE bid_id= $1 and user_id=$2
        `;
    const params = [bid_id,user_id];

    const result = await database.execute(sql, params);
    return result;
}

async function addBid(bid){
    const sql = `
       Insert Into Bid(user_id,provider_id,user_bid,provider_bid,custom_job_id)
       values($1,$2,$3,$4,$5)
        `;
    const params = [bid.user_id,bid.provider_id,bid.user_bid,bid.provider_bid,bid.custom_job_id];

    const result = await database.execute(sql, params);
    return result;
}

async function updateUserBid(bid_id,user_bid,){
    const sql = `
       Update bid
       set user_bid = $1
       where bid_id=$2
        `;
    const params = [user_bid,bid_id];

    const result = await database.execute(sql, params);
    return result;
}
async function updateProviderBid(bid_id,provider_bid){
    const sql = `
       Update bid
       set provider_bid = $1
       where bid_id=$2
        `;
    const params = [provider_bid,bid_id];

    const result = await database.execute(sql, params);
    return result;
}
async function finalizeBid(custom_job_id){
    const sql = `
       Update bid
       set final = true
       where custom_job_id=$1
        `;
    const params = [custom_job_id];

    const result = await database.execute(sql, params);
    return result;
}




module.exports = {
    getBidByProvider,
    getAllBidByProvider,
    getBidByJobId,
    getBidByBidId,
    addBid,
    updateUserBid,
    updateProviderBid,
    finalizeBid
}