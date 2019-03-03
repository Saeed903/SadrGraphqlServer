const { gql } = require('apollo-server-express');
const fetch = require('node-fetch');

const advertiseTypeDefs = gql`
    type Advertise {
        id:ID!
        tradeTyepId:Int
        tradeType:TradeType
        countryId:Int
        # country:Country
        cryptoCurrencyId: Int
        # cryptoCurrency: CryptoCurrency
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
        ownerId:Int!
        # owner:User
    }

    # type Query{
    #     advertises:[advertise]
    # }
`;

const advertiseResolvers= {
    Query: {
        advertises: async () => {
            const response = await fetch(process.env.AdvertisesRESTURL);
            const data = await response.json();
            return data.data;
        },
        advertise: async(parent, { id }) => {
            const response = await fetch(process.env.AdvertisesRESTURL + `?id=${id}`);
            const data = await response.json();
            const result = data.data;
            return result[0];
        }
    },
    Advertise:{
        tradeType: async(parent) => {
            const response = await fetch (process.env.TradeTypesRESTURL + `?id=${parent.tradeTypeId}`);
            const data = await response.json();
            const result = data.data;
            return result[0];      
        },
        // owner: async(parent) => {
        //     const response = await fetch( process.env.UsersRESTURL + `?id=${parent.owneId}`);
        //     const data = await response.json();
        //     const result = data.data;
        //     return result[0];
        // },
        // cryptoCurrency: async(parent) => {
        //     const response = await fetch( process.env.CryptoCurrenciesRESTURL + `?id=${parent.cryptoCurrencyId}`);
        //     const data = await response.json();
        //     const result = data.data;
        //     return result[0];
        // },
        // country: async(parent) => {
        //     const response = await fetch( process.env.CountiresRESTURL + `?id=${parent.countryId}`);
        //     const data = await response.json();
        //     const result = data.data;
        //     return result[0];
        // },
    }
};

module.exports = { advertiseTypeDefs, advertiseResolvers };