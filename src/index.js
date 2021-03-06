const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { merge } = require('lodash');
const  RandomUserDataSource  = require('./graphql/datasource');
const { randomUserTypeDefs, randomUserResolvers}  = require('./graphql/randomUsers');
const { advertiseTypeDefs, advertiseResolvers }  = require('./graphql/advertises');
const { tradeTypeResolvers, tradeTypeTypeDefs }  = require('./graphql/tradeTypes');
const { countriesTypeDefs, countriesResolvers }  = require('./graphql/countries');
const { cryptoCurrenciesTypeDefs, cryptoCurrencieResolvers }  = require('./graphql/cryptoCurrencies');
const { userTypeDefs, userResolvers }  = require('./graphql/users');

const dotenv = require('dotenv')

dotenv.config();

// user(id:ID!):User
        // users: [User]
        
        // 
const app = express();

const Query = `
    type Query {
        randomPerson: [Person!]!
        advertises:[Advertise]
        tradeTypes: [TradeType]
        tradeType(id:ID!): TradeType
        advertise(id:ID!): Advertise
        hello:String
        country(id:ID!): Country
        countries:[Country]
        cryptoCurrency(id:ID!): CryptoCurrency
        cryptoCurrencies: [CryptoCurrency]
        user(id:ID!):User
        users:[User]
    }
`;

const resolvers = {
    Query: {
        hello(root, args, context) {
            return 'Hello world!'
        },
    }
}

const server = new ApolloServer({
    typeDefs : [Query, userTypeDefs, cryptoCurrenciesTypeDefs, randomUserTypeDefs, advertiseTypeDefs, tradeTypeTypeDefs, countriesTypeDefs] ,
    resolvers : merge(resolvers, userResolvers, cryptoCurrencieResolvers, randomUserResolvers, advertiseResolvers, tradeTypeResolvers, countriesResolvers) ,
    dataSources: () => ({
        randomUserAPI: new RandomUserDataSource()
    })
});

server.applyMiddleware({app});

app.listen(process.env.port,()=>{
    console.log(`Server ready at http://localhost:${process.env.port}${server.graphqlPath}`);
})
