const { Pool } = require('pg');
const fs = require('fs');
require('dotenv').config();

console.log(`Hello! Running in ${process.env.NODE_ENV} mode.`)

// database connection parameters
const dbHost = process.env.DB_HOST;
const username = process.env.DB_USER;
console.log(`Username set to ${username}`);
const password = fs.readFileSync('db/.pwd', {encoding:'utf8'}).trim();
console.log(`Password set to ${password.substr(0,4)}********************`);
const dbName = process.env.DB_NAME;
const pool = new Pool({
    user: username,
    password: password,                      // uncomment for Windows
    host: dbHost,
    database: dbName,
    port: 5432,
});

pool.on('error', (err, client) => {
    console.error('Error on idle client', err)
    process.exit(-1)
})

const pgschema = `SET search_path = ${process.env.DB_SCHEMA}, ${username}, public;`;
pool.on('connect', client => {
    client.query(pgschema)
})

module.exports = pool;

/*
EXAMPLE USAGE:

const pool = require(./pool.js); // where "./pool.js" is the path to this pool.js file

pool
    .connect()
    .then(client => {
        return client
            .query('select * from my_table')
            .then(res => {
                client.release()
                res.rows.forEach((val, i) => {
                    console.log("["+i+"]:  ",val);
                })
            })
            .catch(err => {
                client.release()
                console.log(err.stack)
            })
    })

*/