// ONLY RUN THIS ONCE!!!


const pool = require('./pool');

pool.query('SELECT * FROM lab6')

pool.connect()
    .then(client => {
        return client
                .query(`DROP TABLE IF EXISTS recipe_ingredients, ingredients, recipes;
                        CREATE TABLE IF NOT EXISTS recipes (
                            recipe_id serial primary key,
                            name text NOT NULL,
                            author text,
                            description text NOT NULL,
                            category text,
                            calories int,
                            directions text NOT NULL,
                            serves int
                        );
                        CREATE TABLE IF NOT EXISTS ingredients (
                            ingredient_id serial primary key,
                            name text unique,
                            category text
                        );
                        CREATE TABLE IF NOT EXISTS recipe_ingredients (
                            recipe_id bigint references recipes(recipe_id),
                            ingredient_id bigint references ingredients(ingredient_id),
                            amount float NOT NULL,
                            measurement text NOT NULL
                        );
                `)
                .then(res => {
                    client.release();
                    console.log(res.rows);
                })
                .catch(err => {
                    client.release();
                    console.error(err.stack);
                })
                
    })