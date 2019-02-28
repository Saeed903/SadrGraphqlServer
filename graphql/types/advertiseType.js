module.exports = `
    type advertise {
        id:ID!
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

    type Query{
        advertises:[advertise]
    }


`;