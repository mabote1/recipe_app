// Example query to the backend server:
const fetch = require('node-fetch')

/* Example using hard coded data -- good for querying names */
fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify({query: `
    {
        hello
        names{
            recipe_id
            name
        } 
    }
    `})
})
    .then(r => r.json())
    .then(data => console.log('Data returned: ', data.data));



/* Example using a query and variables -- good for querying recipes by recipe_id */
let query = `query Example($id: Int!) {
    recipe(id:$id) {
        name
        description
        author
        ingredients {
          name
          amount
          measurement
          category
        }
        category
        serves
      }
}`
let id = 1;

fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify({
        query,
        variables: { id },
    })
})
    .then(r => r.json())
    .then(data => console.log('Data returned: ', data.data.recipe.ingredients));
