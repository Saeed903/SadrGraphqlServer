const { gql } = require('apollo-server-express');
const fetch = require('node-fetch');

const cryptoCurrenciesTypeDefs = gql`
    type CryptoCurrency{
        id: ID!
        cryptoCurrencyCode: String!
        cryptoCurrencyName: String!
        cryptoCurrencyTitle: String
        cryptoCurrencyTeamName: String
    }
`

const cryptoCurrencieResolvers = {
    Query: {
        cryptoCurrencies: async ()=>{
            const response = await fetch(process.env.CryptoCurrenciesRESTURL);
            const data = await response.json();
            console.log(data);
            
            const result = data.data;
            return result;
        },
        cryptoCurrency: async (_, { id })=>{
            const response = fetch(process.env.CryptoCurrenciesRESTURL + `?id=${id}`);
            const data = response.json();
            const result = data.data;
            return result[0];
        },
    }
};

module.exports = { cryptoCurrencieResolvers, cryptoCurrenciesTypeDefs };