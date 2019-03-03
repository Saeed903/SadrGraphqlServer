const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { merge } = require('lodash');
//const  RandomUserDataSource  = require('../graphql/datasource');
// const { randomUserTypeDefs, randomUserResolvers}  = require('./graphql/randomUsers');
// const { advertiseTypeDefs, advertiseResolvers }  = require('./graphql/advertises');
// const { tradeTypeResolvers, tradeTypeTypeDefs }  = require('./graphql/tradeTypes');
// const { countriesTypeDefs, countriesResolvers }  = require('./graphql/countries');
// const { cryptoCurrenciesTypeDefs, cryptoCurrencieResolvers }  = require('./graphql/cryptoCurrencies');
// const { userTypeDefs, userResolvers }  = require('./graphql/users');

// const dotenv = require('dotenv')

// dotenv.config();

const app = express();

const Query = `
    type Query {
        hello:String
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
    typeDefs : [Query] ,
    resolvers : merge(resolvers) ,
    // dataSources: () => ({
    //     randomUserAPI: new RandomUserDataSource()
    // })
});

server.applyMiddleware({app});

app.listen(4070,()=>{
    console.log(`Server ready at http://localhost:4070${server.graphqlPath}`);
})
