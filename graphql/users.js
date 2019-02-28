const { gql } = require('apollo-server-express');
const fetch = require('node-fetch');

const userTypeDefs = gql`
  type Person {
    gender: String
    email: String
    phone: String
  }

  # type Query {
  #   randomPerson: [Person!]!
  # }
`;

const userResolvers = {
    Query: {
        randomPerson: async ()=> {
            const response = await fetch('https://api.randomuser.me/');
            const data = await response.json();
            return data.results;
        },
    }
};

module.exports = { userTypeDefs, userResolvers };