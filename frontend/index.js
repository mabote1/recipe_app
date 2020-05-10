// Example query to the backend server:
const fetch = require('node-fetch')

// /* Example using hard coded data -- good for querying names */
// fetch('http://localhost:4000/graphql', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//     },
//     body: JSON.stringify({query: `
//     {
//         hello
//         names{
//             recipe_id
//             name
//         } 
//     }
//     `})
// })
//     .then(r => r.json())
//     .then(data => console.log('Data returned: ', data.data));



// /* Example using a query and variables -- good for querying recipes by recipe_id */
// let query = `query Example($id: Int!) {
//     recipe(id:$id) {
//         name
//         description
//         author
//         ingredients {
//           name
//           amount
//           measurement
//           category
//         }
//         category
//         serves
//       }
// }`
// let id = 1;

// fetch('http://localhost:4000/graphql', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//     },
//     body: JSON.stringify({
//         query,
//         variables: { id },
//     })
// })
//     .then(r => r.json())
//     .then(data => console.log('Data returned: ', data.data.recipe.ingredients));

// /* Example of Mutation */
// let query = `
// mutation CreateMessage($input: RecipeInput){
//     createRecipe(input: $input) {
//         id
//         name
//     }      
//   }`
// let name = "Terrible Cake"
// let author = "A Computer Scientist"
// let description = "I wouldn't eat this cake... But you might"
// let category = "Bakery"
// let directions = "Mix everything together, put it in a pan, and bake it"
// let serves = 4
// let calories = 420
// let flour = {
//     "name": "Flour",
//     "amount": 0.75,
//     "measurement": "Cups",
//     "category": "Dry"
// }
// let sugar = {
//     "name": "Sugar",
//     "amount": 2,
//     "measurement": "Tbsp",
//     "category": "Dry"
// }
// let ingredients = [flour, sugar]
// fetch('http://localhost:4000/graphql', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//     },
//     body: JSON.stringify({
//         query,
//         variables: {
//             input: {
//                 name,
//                 author,
//                 description,
//                 category,
//                 calories,
//                 directions,
//                 serves,
//                 ingredients
//             }
//         }
//     })
// })
// .then(res => res.json())
// .then(data => console.log(data));