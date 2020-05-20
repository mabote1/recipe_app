var express = require('express');
var bodyParser = require('body-parser');
var os = require('os');
const pool = require('./pool');
var cors = require('cors');

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/allrecipes', (request, response) => {
    console.log('Got request for all recipes');
    pool.query(`SELECT * FROM recipes`)
        .then(res => {
            console.log('DB response: ' + JSON.stringify(res.rows));
            response.send(res.rows);
        })
        .catch(err => 
                setImmediate(() => {
                    throw err;
                }));
})

app.get('/allrecipenames', (request, response) => {
    //console.log('Got request for all recipe names');
    pool.query(`SELECT * FROM recipes`)
        .then(res => {
            //console.log('DB response: ' + JSON.stringify(res.rows));
            response.send(res.rows);
        })
        .catch(err => 
            setImmediate(() => {
                throw err;
            }));
})

app.post('/addrecipe', (request, response) => {
    console.log('Got request to add a new recipe');
    let recipe_name = request.body.recipe_name;
    let author = request.body.author;
    let description = request.body.description;
    let serves = request.body.serves;
    let category = request.body.category;
    let calories = request.body.calories;
    let directions = request.body.directions;
    console.log(request.body)
    console.log(request.body.recipe_name)
    console.log(request.body.author)
    console.log(request.body.description)
    console.log(request.body.serves)
    console.log(request.body.category)
    console.log(request.body.calories)
    console.log(request.body.directions)
    //let ingredients = request.body.ingredients;return new Promise(function (resolve, reject){
    pool.query(`INSERT INTO recipes (recipe_name, author, description,
        category, calories, directions, serves) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [recipe_name, author, description,
        category, calories, directions, serves])
        .then(res => {
            console.log('DB response: ' + res.rows[0].recipe_name);
            console.log('DB response: ' + res.rows[0].author);
            console.log('DB response: ' + res.rows[0].description);
            console.log('DB response: ' + res.rows[0].category);
            console.log('DB response: ' + res.rows[0].calories);
            console.log('DB response: ' + res.rows[0].directions);
            console.log('DB response: ' + res.rows[0].serves);
            response.sendStatus(200);
        })
        .catch(err => 
                setImmediate(() => {
                    throw err;
                }));
})

app.use(function(request, response, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, request, response, next) {
    response.locals.message = err.message;
    response.locals.error = request.app.get('env') === 'development' ? err : {};

    response.status(err.status || 500);
});

/* Main program */

console.log(`Starting button-server-db app`);

const lib = require('./mcalib');
lib.setErrorPrefix(__filename);  // set label for lib error messages

<<<<<<< HEAD
=======
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

/*// database connection parameters
const dbHost = "csinparallel.cs.stolaf.edu";
const user = 'mabote1';    // CHANGE to your username, e.g., jones1
const password = lib.getPGPassword(dbHost);  // uncomment for Windows
const dbName = 'mca_s20';
const schema = 'mabote1';  // CHANGE to your username as schema for Lab 5
                       // CHANGE to team schema for project

const pool = new Pool({
    user: user,
    password: password,                      // uncomment for Windows
    host: dbHost,
    database: dbName,
    port: 5432,
});

var pgschema = 'mca_s20_recipe, mabote1'

pool.on('connect', client => {
    client.query(`SET search_path = ${pgschema}, public;`)
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})*/

console.log(`Connected to database ${dbName} on ${dbHost}`);

>>>>>>> 2572dd184e3b558d48ab25dee6cbcdf2b7376c67
console.log("IP addresses:  ", lib.getIPAddresses());


module.exports = app;