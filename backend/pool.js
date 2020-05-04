const { Pool } = require('pg');
const fs = require('fs');

var pgpass = fs.readFileSync(".pwd");
var username = 'olson16';
var schema = 'mca_s20_recipe, olson16'

const pool = new Pool({
    user: username,
    host: 'csinparallel.cs.stolaf.edu',
    database: 'mca_s20',
    password: pgpass,
    port: 5432,
});

pool.on('error', (err, client) => {
    console.error('Error on idle client', err)
    process.exit(-1)
})

pool.on('connect', client => {
    client.query(`SET search_path = ${schema}, public;`)
    console.log(`Connected to db mca_s20, schema = ${schema}.`)
})

module.exports = pool;