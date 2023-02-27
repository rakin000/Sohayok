const database = require('./database');




async function addJobOrder(job_order){
    const sql = `
        Insert Into job_order(custom_job_id,provider_id,price)
        values($1,$2,$3)
        `;
    const params = [job_order.custom_job_id,job_order.provider_id,job_order.price];

    const result = await database.execute(sql, params);
    return result;
}

async function getJobOrderById(order_id){
    const sql = `
        SELECT  job_order.*,custom_job.*
        FROM  job_order
        JOIN custom_job
             ON job_order.custom_job_id = custom_job.custom_job_id  
        WHERE  job_order_id = $1
        `;
    const params = [order_id];

    const result = await database.execute(sql, params);
    return result;
}

async function getJobOrderByProviderId(provider_id){
    const sql = `
       SELECT  job_order.*,custom_job.*
        FROM  job_order
        JOIN custom_job
             ON job_order.custom_job_id = custom_job.custom_job_id  
        WHERE  provider_id = $1
        `;
    const params = [provider_id];

    const result = await database.execute(sql, params);
    return result;
}

async function getJobOrderByUserId(user_id){
    const sql = `
        SELECT  *
        FROM  job_order
        JOIN custom_job 
            ON job_order.custom_job_id = custom_job.custom_job_id 
                and custom_job.poster_id=$1
        `;
    const params = [user_id];

    const result = await database.execute(sql, params);
    return result;
}

async function updateJobOrderStatus(job_order_id,status){
    const sql = `
        UPDATE job_order
        SET status=$2
        WHERE job_order_id=$1
        `;
    const params = [job_order_id,status];

    const result = await database.execute(sql, params);
    return result;
}

module.exports = {
    addJobOrder,
    getJobOrderById,
    getJobOrderByUserId,
    getJobOrderByProviderId,
    updateJobOrderStatus
}