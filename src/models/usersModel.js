const fetch = require('node-fetch');
const users = fetch('http://localhost:3030/Users')
    .then(async res => {
        const data = await res.json();
        return data.data;
    });

module.exports = users;

