// Example query to the backend server:
/*
fetch('/graphql', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify({
        query,
        variables: { dice, sides },
    })
})
    .then(r => r.json())
    .then(data => console.log('Data returned: ', data));
*/