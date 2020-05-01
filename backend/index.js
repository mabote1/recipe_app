var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var Scraper = require('images-scraper');

const scraper = new Scraper({
    puppeteer: {
        headless: true,
    }
});

var schema = buildSchema(`
    type Ingredient {
        id: Int!
        name: String!
        amount: Int!
        measurement: String!
    }

    type Recipe {
        id: Int!
        name: String!
        ingredients: [Ingredient!]
        image: String
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
    id() {
        return 1;
    }
    name() {
        return "Flour";
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
    recipe: (name) => {
        return new Recipe();
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

