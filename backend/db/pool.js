const { Pool } = require('pg');
const fs = require('fs');

const lib = require('./mcalib');
lib.setErrorPrefix(__filename);  // set label for lib error messages

// database connection parameters
const dbHost = "csinparallel.cs.stolaf.edu";
const username = 'mabote1';    // CHANGE to your username, e.g., jones1
const password = lib.getPGPassword(dbHost);  // uncomment for Windows
const dbName = 'mca_s20';
const schema = 'mabote1';  // CHANGE to your username as schema for Lab 5
                       // CHANGE to team schema for project

const pool = new Pool({
    user: username,
    password: password,                      // uncomment for Windows
    host: dbHost,
    database: dbName,
    port: 5432,
});



var pgschema = 'mca_s20_recipe, olson16'

pool.on('error', (err, client) => {
    console.error('Error on idle client', err)
    process.exit(-1)
})

pool.on('connect', client => {
    client.query(`SET search_path = ${pgschema}, public;`)
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