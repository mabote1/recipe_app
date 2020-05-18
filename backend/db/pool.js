const { Pool } = require('pg');
const fs = require('fs');

var username = 'pi';
var password = fs.readFileSync('db/.pwd', {encoding: 'utf8'});
var dbHost = 'localhost';
var dbName = 'recipe';

password = password.trim();
console.log(`Username set to ${username}\nPassword set to ${password.substr(0,4)}****`)


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