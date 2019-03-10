import {gql} from 'apollo-server-express';
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
            const data = await response.json();
            console.log(data);
            
            return data.data;
        },
        country: async(_,{id}) =>{
            const response = await fetch(process.env.CountriesRESTURL + `?id=${id}`);
            const data = await response.json();
            const result = data.data;
            return result[0];
        }
    }
};

module.exports = { countriesResolvers, countriesTypeDefs };