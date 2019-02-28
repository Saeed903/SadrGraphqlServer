const { gql } = require('apollo-server-express');
const fetch = require('node-fetch');

const advertiseTypeDefs = gql`
    type Advertise {
        id:ID!
        tradeTyepId:Int
        tradeType:TradeType
        margin:Float
        priceEquation: String
        minTransactionLimit: Float
        maxTransactionLimit: Float
        restrictAmountsTo: Float
        termsOfTrade: String
        trackLiquidity:Boolean
        identifiedPeopleOnly: Boolean
        smsVerification: Boolean
        trustedPeopleOnly: Boolean
    }

    # type Query{
    #     advertises:[advertise]
    # }
`;

const advertiseResolvers= {
    Query: {
        advertises: async () => {
            const response = await fetch("http://localhost:3030/advertises");
            const data = await response.json();
            return data.data;
        },
        advertise: async(parent, { id }) => {
            const response = await fetch(`http://localhost:3030/advertises/?id=${id}`);
            const data = await response.json();
            const result = data.data;
            return result[0];
        }
    },
    Advertise:{
        tradeType: async(parent) => {
            const response = await fetch (`http://localhost:3030/tradeTypes/?id=${parent.tradeTypeId}`);
            const data = await response.json();
            const result = data.data;
            return result[0];      
        }
    }
};

module.exports = { advertiseTypeDefs, advertiseResolvers };