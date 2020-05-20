const pool = require('./pool');

let name = 'Test';
let author = 'Developers';
let description = 'This is a description for food.';
let category = 'Definitely Italian';
let calories = 5000000;
let directions = `Step 1: Build the database table, 
                  Step 2: ?????
                  Step 3: Profit`

// pool
//     .query('INSERT INTO recipes (name, author, description, category, calories, directions) VALUES ($1, $2, $3, $4, $5, $6)',
//         [name, author, description, category, calories, directions])
//     .then(res => {
//         console.log(res.rows);
//     })

let dbq = `
SELECT i.ingredient_name, ri.amount, ri.measurement, i.category, i.ingredient_id, r.recipe_name 
FROM ingredients i, recipe_ingredients ri, recipes r
WHERE ri.ingredient_id = i.ingredient_id
`

pool
    .query(dbq)
    .then(res => {
        res.rows.forEach((val) => {console.log(val.recipe_name,val.ingredient_id,val.ingredient_name)});
    })

// pool
//     .query(`SELECT * FROM recipes`)
