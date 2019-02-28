const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { merge } = require('lodash');
const  RandomUserDataSource  = require('./graphql/datasource');
const { userTypeDefs, userResolvers}  = require('./graphql/users');
const { advertiseTypeDefs, advertiseResolvers }  = require('./graphql/advertises');
const { tradeTypeTypeDefs, tradeTypeResolvers }  = require('./graphql/tradeTypes');

const app = express();

const Query = `
    type Query {
        randomPerson: [Person!]!
        advertises:[Advertise]
        tradeTypes: [TradeType]
        tradeType(id:ID!): TradeType
        advertise(id:ID!): Advertise
    }
`;

// const resolvers = {
//     Query: {
//         ...,
//     }
// }

const server = new ApolloServer({
    typeDefs : [Query,tradeTypeTypeDefs, userTypeDefs, advertiseTypeDefs] ,
    resolvers : merge(tradeTypeResolvers,advertiseResolvers, userResolvers) ,
    dataSources: () => ({
        randomUserAPI: new RandomUserDataSource()
    })
});

server.applyMiddleware({app});

app.listen(4060,()=>{
    console.log(`Server ready at http://localhost:4060${server.graphqlPath}`);
})
