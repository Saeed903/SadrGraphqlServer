const { gql } = require('apollo-server-express');
const fetch = require('node-fetch');

const randomUserTypeDefs = gql`
  type Person {
    gender: String
    email: String
    phone: String
  }

  # type Query {
  #   randomPerson: [Person!]!
  # }
`;

const randomUserResolvers = {
    Query: {
        randomPerson: async ()=> {
            const response = await fetch('https://api.randomuser.me/');
            const data = await response.json();
            return data.results;
        },
    }
};

module.exports = { randomUserTypeDefs, randomUserResolvers };