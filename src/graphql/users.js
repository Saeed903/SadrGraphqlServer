const { gql } = require('apollo-server-express');
import users from './../models/usersModel';

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
    Query: {
            users: async() => {
                const data = await users;
                return data;
            },
            user: async (parent, { id }) => {
                const data = await users;
                const result = data.find(d => d.id == id);
                console.log(result);
                
                return result;
            }
    }
};

module.exports = { userTypeDefs, userResolvers};