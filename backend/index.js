var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var Scraper = require('images-scraper');
const { Pool } = require('pg');
const fs = require('fs');

const scraper = new Scraper({
    puppeteer: {
        headless: true,
    }
});

const pool = new Pool({
    user: 'olson16',
    host: 'csinparallel.cs.stolaf.edu',
    database: 'mca_s20',
    password: 
    port: 5432,
});

var schema = buildSchema(`
    type Ingredient {
        id: ID
        name: String!
        amount: Int!
        measurement: String!
        category: String!
    }

    type Recipe {
        id: ID
        name: String!
        ingredients: [Ingredient!]
        image: String
        serves: Int
    }

    type Query {
        recipe(name: String): Recipe
        hello: String
    }
`);

class Ingredient {
    id() {
        return 1;
    }
    name() {
        return "Flour"
    }
    amount() {
        return 2;
    }
    measurement() {
        return "Cup(s)";
    }
}

class Recipe {
    constructor (name) {
        this.testName = name;
    }
    id() {
        return 1;
    }
    name() {
        return this.testName;
    }
    ingredients() {
        let ings = [];
        ings[0] = new Ingredient();
        ings[1] = new Ingredient();
        return ings;
    }
    image(){
        return "image.url.thing"
    }
}

var root = {
    recipe: ({name}) => {
        return new Recipe(name);
    },
    hello: () => {
        return "Hello, World!";
    },
};

// Run the graphQL server
var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(4000);
console.log("Running a test graphql API server at http://localhost:4000/graphql");

