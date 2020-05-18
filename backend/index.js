var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var Scraper = require('images-scraper');
const pool = require('./db/pool');
var cors = require('cors');

const scraper = new Scraper({
    puppeteer: {
        headless: true,
    }
});

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
        return this.pool.query(`SELECT recipe_name FROM recipes WHERE recipe_id = $1`,[this.id])
                   .then(res => {
                       return res.rows[0].recipe_name;
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
    calories() {
        return this.pool.query(`SELECT calories FROM recipes WHERE recipe_id = $1`,[this.id])
        .then(res => {
            return res.rows[0].calories;
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
        SELECT i.ingredient_id, i.ingredient_name, i.category, ri.amount, ri.measurement
        FROM ingredients i, recipe_ingredients ri
        WHERE i.ingredient_id = ri.ingredient_id AND ri.recipe_id = $1
        `, [this.id])
        .then(res => {
            let ings = [];
            res.rows.forEach((val, i) => {
                let ing_id = val.ingredient_id;
                let name = val.ingredient_name;
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

class RecipeInput {
    constructor(id, {name, author, description, directions, category, calories, image, serves, ingredients}){
        this.id = id;
        this.name = name;
        this.author = author;
        this.description = description;
        this.directions = directions;
        this.category = category;
        this.calories = calories;
        this.image = image;
        this.serves = serves;
        this.ingredients = ingredients;
    }
    id(){return this.id;}
    name(){return this.name;}
    author(){return this.author;}
    description(){return this.description;}
    directions(){return this.directions;}
    category(){return this.category;}
    calories(){return this.calories;}
    image(){return this.image;}
    serves(){return this.serves;}
    ingredients(){return this.ingredients;}
}

var schema = buildSchema(`
    input RecipeInput {
        name: String!
        author: String
        description: String!
        directions: String!
        category: String
        calories: Int
        image: String
        serves: Int
        ingredients: [IngredientInput!]
    }

    input IngredientInput {
        name: String!
        amount: Float!
        measurement: String!
        category: String
    }

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
        directions: String
        category: String
        calories: Int
        ingredients: [Ingredient!]
        image: String
        serves: Int
    }

    type Names {
        recipe_id: ID
        recipe_name: String
    }

    type Query {
        recipe(id: Int!): Recipe
        hello: String
        names: [Names]
    }

    type Mutation {
        createRecipe(input: RecipeInput): Recipe
        deleteRecipeByID(id: ID): ID
    }
`);

var root = {
    recipe: ({id}) => {
        return new Recipe(id);
    },
    deleteRecipeByID: ({id}) => {
        return pool.query(`
        DELETE FROM recipe_ingredients WHERE recipe_id = $1
        `,[id])
        .then(pool.query(`
        DELETE FROM recipes WHERE recipe_id = $1
        `,[id]))
        .then(res => {return id;})
    },
    createRecipe: ({input}) => {
        let recipe_id = 0;
        let ingredient_id = 0;
        recipe_id = pool.query(`
        INSERT INTO recipes (recipe_name, author, description, category, calories, directions, serves)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING recipe_id
        `,[input.name, input.author, input.description, input.category, input.calories, input.directions, input.serves])
        .then(res => {
            recipe_id = res.rows[0].recipe_id;
            input.ingredients.forEach((val, i) => {
                pool.query(`
                INSERT INTO ingredients (ingredient_name, category)
                VALUES ($1, $2) ON CONFLICT ("ingredient_name") DO
                UPDATE SET ingredient_name=EXCLUDED.ingredient_name RETURNING ingredient_id
                `,[val.name, val.category])
                .then(res => {
                    ingredient_id = res.rows[0].ingredient_id
                })
                .then(res => {
                    pool.query(`
                    INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount, measurement)
                    VALUES ($1, $2, $3, $4) RETURNING *
                    `,[recipe_id, ingredient_id, val.amount, val.measurement])
                })
            })
            return recipe_id;
        })
        return new RecipeInput(recipe_id, input);
    },
    hello: () => {
        return "Hello, World!";
    },
    names: () => {
        return pool.query(`SELECT recipe_id, recipe_name FROM recipes`)
                   .then(res => {
                       return res.rows;
                   })
    }
};

// Run the graphQL server
var app = express();
app.use(cors());
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
console.log("Running a test graphql API server at port 4000/graphiql or 4000/graphql for programmatic queries.");

