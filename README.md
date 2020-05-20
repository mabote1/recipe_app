# GRUT: Recipe Application

## MCA/S20

## Contributors

- Anders Olson
- Dakota Williams
- Dylan Blake
- Thabiso Mabote

## Setup/Installation

### Setting up backend

1. Change the variables in `backend/gql/db/.env` to suit your needs.
2. To run the GraphQL API, open a terminal and navigate to `/path/to/backend/gql` and run ```npm run deploy```
3. To run the RESTful API, open a new terminal and navigate to `/path/to/backend/rest and run ```npm run deploy```

### Setting up frontend

1. Open these three files (all in the frontend folder): AllRecipes.js, AddRecipe.js, ViewRecipe.js
2. In each, change the `this.state.url` field to match your backend host's IP address.
3. Open a new terminal and navigate to `/path/to/frontend`, and run ```npm start```


### Setup/Install Old

Note: Change the IP addresses in frontend/AddRecipe.js and frontend/recipe-RESTful_frontend/App.js.
For testing New Recipe button, make appropriate changes to the username in the file backend/db/pool.js.
For testing All Recipes button, make approriate changes to the username in the file
backend/recipe-RESTful-db/app.js.

To run the app and test for New Recipe, go into the frontend subdirectory and run the comment "run start",
then you should be able to navigate into New Recipe! Using another terminal window, run  the comment
"npm run deploy" in backend/. Output is seen on the terminal, and added
items (recipes or recipe_ingredients) go into the database of our schema:mca_s20_recipe.

To run the app and test for All Recipes, go into the frontend subdirectory and run the comment "run start".
Using another terminal window, run  the comment "npm run deploy" in backend/recipe-REStful-db/, then
you should be able to navigate into All Recipes. Output is seen in the app and on the terminal , and
added items (recipes) go into the database of our schema:mca_s20_recipe
