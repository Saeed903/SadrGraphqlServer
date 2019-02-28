const fetch = require('node-fetch');
module.exports = {
    Query: {
        randomPerson: async ()=> {
            const response = await fetch('https://api.randomuser.me/');
            const data = await response.json();

            console.log(data.results);
            return data.results;
        },
    }
};