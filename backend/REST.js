var express = require('express');
var bodyParser = require('body-parser');
var os = require('os');
const pool = require('pool');

var app = express();
app.use(bodyPaerser.urlencoded({ extended: true }))

app.get('/allrecipes', (request, response) => {
    console.log('Got request for all recipes');
    pool.query(`SELECT * FROM recipes`)
        .then(res => {
            console.log('DB response: ' + res.rows[0]);
            response.send(res.rows[0]);
        })
        .catch(err => 
                setImmediate(() => {
                    throw err;
                }));
})

app.post('/addrecipe', (request, response) => {
    console.log('Got request to add a new recipe');
    let 
    pool.query(`INSERT INTO recipes VALUES($1, $2, $3, $4, $5)`, [name, category, calories, directions, ingredients])
})