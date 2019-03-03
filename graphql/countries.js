const  {gql} = require('apollo-server-express');
const fetch = require('node-fetch');

const countriesTypeDefs = gql`
    type Country {
        id: ID!
        countryName: String!
        countryNickName: String
        coutnryTitle: String
    }
`

const countriesResolvers = {
    Query: {
        countries: async()=>{
            const response = await fetch(process.env.CountriesRESTURL);
            const data = response.json();
            const result = data.data;
            return result;
        },
        country: async(_,{id}) =>{
            const response = await fetch(process.env.CountriesRESTURL + `?id=${id}`);
            const data = resonse.json();
            const result = data.data;
            return result[0];
        }
    }
};

module.exports = { countriesResolvers, countriesTypeDefs };