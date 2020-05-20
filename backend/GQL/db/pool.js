const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const prompt = require('prompt-sync')();

const lib = require('./mcalib');
lib.setErrorPrefix(__filename);  // set label for lib error messages
var env_path = path.join(__dirname, '../', '.env');
require('dotenv').config({path: env_path});
console.log(`Hello! Running in ${process.env.NODE_ENV} mode.`)

// database connection parameters

var username = process.env.DB_USER;
console.log(`Username set to ${username}`);
const dbHost = "csinparallel.cs.stolaf.edu";
var password = '';
// Set PG_PASS to true in .env
if (process.env.PG_PASS === 'true') {
    console.log("Trying to find .pgpass password")
    try {
        password = lib.getPGPassword(dbHost);
    } catch {
        throw new Error('Could not use .pgpass, consider using .pwd')
    }
    
}
else {
    var pwd_path = path.join(__dirname, '.pwd')
    console.log("Trying to find .pwd password at " + pwd_path)
    password = fs.readFileSync(pwd_path, {encoding:'utf8'});
    password = password.trim();
}
console.log(`Password set to ${password.substr(0,4)}********************`);

const dbName = 'mca_s20';

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

var pgschema = `mca_s20_recipe, ${username}, public;`

pool.on('connect', client => {
    client.query(`SET search_path = ${pgschema}`)
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