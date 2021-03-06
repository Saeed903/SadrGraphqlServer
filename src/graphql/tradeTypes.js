const { gql } = require('apollo-server-express');
const fetch = require('node-fetch');

const tradeTypeTypeDefs = gql`
    type TradeType {
        id: ID
        tradeTypeTitle: String
    }
`;

const tradeTypeResolvers = {
    Query: {
        tradeTypes:async () => {
            const response = await fetch(process.env.TradeTypesRESTURL);
            const data = await response.json();
            //console.log(data.data);
            return data.data;
        },
        tradeType: async(_,{id}) => {
            const response = await fetch (process.env.TradeTypesRESTURL + `?id=${id}`);
            const data = await response.json();
            const result = data.data;
            return result[0];      
        }
    }
};

module.exports = { tradeTypeTypeDefs, tradeTypeResolvers };