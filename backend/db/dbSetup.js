const pool = require('./pool');

pool.query('SELECT * FROM lab6')

pool.connect()
    .then(client => {
        return client
                .query(`DROP TABLE IF EXISTS recipes;
                        DROP TABLE IF EXISTS ingredients;
                        DROP TABLE IF EXISTS recipe_ingredients;
                        CREATE TABLE recipes (
                            recipe_id serial primary key,
                            name text NOT NULL,
                            author text,
                            description text NOT NULL,
                            category text,
                            calories int,
                            directions text NOT NULL                  
                        );
                        CREATE TABLE ingredients (
                            ingredient_id serial primary key,
                            name text,
                            category text
                        );
                        CREATE TABLE recipe_ingredients (
                            recipe_id serial references recipes(recipe_id),
                            ingredient_id serial references
                        )
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