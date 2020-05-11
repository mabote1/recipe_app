/* DEPRECATED - DO NOT USE, SCHEDULED FOR UPDATE */

var express = require('express');
var bodyParser = require('body-parser');
var os = require('os');
const pool = require('./pool');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/allrecipes', (request, response) => {
    console.log('Got request for all recipes');
    pool.query(`SELECT * FROM recipes`)
        .then(res => {
            console.log('DB response: ' + res.rows);
            response.send(res.rows);
        })
        .catch(err => 
                setImmediate(() => {
                    throw err;
                }));
})

app.get('/allrecipenames', (request, response) => {
    console.log('Got request for all recipe names');
    pool.query(`SELECT name, recipe_id FROM recipes;`)
        .then(res => {
            console.log('DB response: ' + res.rows);
            response.send(res.rows);
        })
        .catch(err => 
            setImmediate(() => {
                throw err;
            }));
})

app.post('/addrecipe', (request, response) => {
    console.log('Got request to add a new recipe');
    let name = request.body.name;
    let author = request.body.author;
    let description = request.body.description;
    let serves = request.body.serves;
    let category = request.body.category;
    let calories = request.body.calories;
    let directions = request.body.directions;
    let ingredients = request.body.ingredients;
    pool.query(`INSERT INTO recipes VALUES($1, $2, $3, $4, $5)`, [name, category, calories, directions, ingredients])
        .then(res => {
            console.log('DB response: ' + res.rows[0]);
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

app.listen(4001);
console.log("Listening to port 4001")

module.exports = app;