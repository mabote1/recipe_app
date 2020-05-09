var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var Scraper = require('images-scraper');
//const fs = require('fs');
const pool = require('./db/pool');

const scraper = new Scraper({
    puppeteer: {
        headless: true,
    }
});

var schema = buildSchema(`
    type Ingredient {
        id: ID
        name: String!
        amount: Float!
        measurement: String!
        category: String!
    }

    type Recipe {
        id: ID
        name: String!
        author: String
        description: String!
        category: String
        calories: Int
        ingredients: [Ingredient!]
        image: String
        serves: Int
    }

    type Names {
        recipe_id: ID
        name: String
    }

    type Query {
        recipe(id: Int!,): Recipe
        hello: String
        names: [Names]
    }
`);

class Ingredient {
    constructor (id, name, category, amount, measurement) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.amount = amount;
        this.measurement = measurement;
    }
    id() {
        return this.id;
    }
    name() {
        return this.name;
    }
    category() {
        return this.category;
    }
    amount() {
        return this.amount;
    }
    measurement() {
        return this.measurement;
    }
}

class Recipe {
    constructor (id) {
        this.pool = pool;
        this.id = id;
    }
    id() {
        return this.id;
    }
    name() {
        return this.pool.query(`SELECT name FROM recipes WHERE recipe_id = $1`,[this.id])
                   .then(res => {
                       return res.rows[0].name;
                   })
    }
    author() {
        return this.pool.query(`SELECT author FROM recipes WHERE recipe_id = $1`,[this.id])
                   .then(res => {
                       return res.rows[0].author;
                   })
    }
    description() {
        return this.pool.query(`SELECT description FROM recipes WHERE recipe_id = $1`,[this.id])
                   .then(res => {
                       return res.rows[0].description;
                   })
    }
    category() {
        return this.pool.query(`SELECT category FROM recipes WHERE recipe_id = $1`,[this.id])
                   .then(res => {
                       return res.rows[0].category;
                   })
    }
    serves() {
        return this.pool.query(`SELECT serves FROM recipes WHERE recipe_id = $1`,[this.id])
                   .then(res => {
                       return res.rows[0].serves;
                   })
    }
    ingredients() {
        return this.pool.query(`
        SELECT i.ingredient_id, i.name, i.category, ri.amount, ri.measurement
        FROM ingredients i, recipe_ingredients ri
        WHERE i.ingredient_id = ri.ingredient_id AND ri.recipe_id = $1
        `, [this.id])
        .then(res => {
            let ings = [];
            res.rows.forEach((val, i) => {
                let ing_id = val.ingredient_id;
                let name = val.name;
                let category = val.category;
                let amount = val.amount;
                let measurement = val.measurement;
                ings[i] = new Ingredient(ing_id, name, category, amount, measurement);
            })
            return ings;
        })
    }
    image(){
        return "placeholder.image.url"
    }
}

var root = {
    recipe: ({id}) => {
        return new Recipe(id);
    },
    hello: () => {
        return "Hello, World!";
    },
    names: () => {
        return pool.query(`SELECT recipe_id, name FROM recipes`)
                   .then(res => {
                       return res.rows;
                   })
    }
};

// Run the graphQL server
var app = express();
app.use('/graphiql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: false,
}));

app.listen(4000);
console.log("Running a test graphql API server at http://localhost:4000/graphiql");

