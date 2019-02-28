module.exports = `
  type Person {
    gender: String
    email: String
    phone: String
  }

  type Query {
     randomPerson: [Person!]!
  }
`;