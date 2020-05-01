var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

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
        photoURL: String
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
        return "Just flour";
    }
    ingredients() {
        let ings = [];
        ings[0] = new Ingredient();
        return ings;
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

