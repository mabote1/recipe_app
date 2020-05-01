var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
    type Ingredient {
        name: String
        amount: Int
    }

    type Recipe {
        name: String
        
    }

    type Query {
        hello: String
    }
`);

var root = {
    hello: () => {
        return 'Hello world!';
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