const { Pool } = require('pg');
const fs = require('fs');
const prompt = require('prompt-sync')();
const lib = require('./mcalib');
lib.setErrorPrefix(__filename);  // set label for lib error messages

// database connection parameters
const dbHost = "csinparallel.cs.stolaf.edu";

console.log(`Hello! Running in ${process.env.NODE_ENV} mode.`)

var username = '';

if(process.env.NODE_ENV === "prod"){
    username = prompt('Enter your DB Username: ') || 'mabote1';
}
else {
    username = 'mabote1'
}
console.log(`Username set to ${username}`);

var password = '';
try {
    password = lib.getPGPassword(dbHost);  // uncomment for Windows
} catch {
    password = fs.readFileSync('db/.pwd', {encoding:'utf8'});
}

password = password.trim();

console.log(`Password set to ${password.substr(0,4)}********************`);

const dbName = 'mca_s20';

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