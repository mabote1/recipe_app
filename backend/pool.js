const { Pool } = require('pg');
const fs = require('fs');

var pgpass = fs.readFileSync(".pwd");
var username = 'olson16';

const pool = new Pool({
    user: username,
    host: 'csinparallel.cs.stolaf.edu',
    database: 'mca_s20',
    password: pgpass,
    port: 5432,
});

var pgschema = 'mca_s20_recipe, olson16'

pool.on('error', (err, client) => {
    console.error('Error on idle client', err)
    process.exit(-1)
})

pool.on('connect', client => {
    client.query(`SET search_path = ${pgschema}, public;`)
    console.log(`Connected to db mca_s20, schema = ${pgschema}.`)
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