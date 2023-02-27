const database = require('./database');


// schema name: custom_job
// columns : custom_job_id, title,description,category,initial_amount,poster_id

// get all jobs posted by user
async function getAllCustomJobsOfUser(user_id){
    const sql = `
        SELECT   *
        FROM  custom_job
        WHERE  poster_id= $1
                and final = false
        `;
    const params = [user_id];

    const result = await database.execute(sql, params);
    return result;
}

async function getAllCustomJobsOfCategory(categoryId){
    const sql = `
        SELECT   *
        FROM  custom_job
        WHERE  category= $1 and final = false
        `;
    const params = [categoryId];

    const result = await database.execute(sql, params);
    return result;
}

async function addCustomJob(custom_job){
    const sql = `
        Insert Into custom_job(title,description,category,initial_amount,poster_id)
        values($1,$2,$3,$4,$5)
        
        `;
    const params = [custom_job.title,custom_job.description,custom_job.category,custom_job.initial_amount,custom_job.poster_id];

    const result = await database.execute(sql, params);
    return result;
}

async function getCustomJobById(job_id){
    const sql = `
        SELECT  *
        FROM  custom_job
        WHERE  custom_job_id = $1
        `;
    const params = [job_id];

    const result = await database.execute(sql, params);
    return result;
}

async function finalizeCustomJob(custom_job_id){
    const sql = `
       UPDATE custom_job
       SET final = true
       WHERE custom_job_id = $1
        `;
    const params = [custom_job_id];

    const result = await database.execute(sql, params);
    return result;
}


module.exports = {
    getAllCustomJobsOfUser,
    addCustomJob,
    getAllCustomJobsOfCategory,
    getCustomJobById,
    finalizeCustomJob
}