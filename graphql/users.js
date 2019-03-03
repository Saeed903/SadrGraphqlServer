const { gql } = require('apollo-server-express');

const userTypeDefs = gql`
    type User{
        id: ID!
        userName: String!
        password: String!
        tel: String
        mobile: String
        passportImageURL: String
        verifiedData: String
        email: String!
        introduction: String
        emailVerifiedDate: String
        phoneVerifiedDate: String
        identityVerifiedDate: String
        identityCardImageURL: String
        driversLicenseURL: String
        realName: String
    }
`

const userResolvers = {
    query: {
        users: async ()=>{
            const response = fetch(process.env.UsersRESTURL);
            const data = response.json();
            const result = data.data;
            return result;
        },
        user: async (_, { id })=>{
            const response = fetch(process.env.UsersRESTURL + `?id=${id}`);
            const data = response.json();
            const result = data.data;
            return result[0];
        },
    }
};

module.exports = { userTypeDefs, userResolvers};