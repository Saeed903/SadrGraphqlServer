const fetch = require('node-fetch');
module.exports = {
    Query: {
        advertises: async () => {
            const response = await fetch("http://localhost:3030/advertises");
            const data = await response.json();
            console.log(data.data);
            return data.data;
        }
    }
};