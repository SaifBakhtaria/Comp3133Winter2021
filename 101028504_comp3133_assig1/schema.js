const { gql } = require('apollo-server-express');

exports.typeDefs = gql `
   type Hotel {
     hotel_id: ID!
     hotel_name: String!
     street: String!
     email: String!
     Postal_code: String!
     city: String!
     price: Float!
     
  }

   type Query { 
     getHotel: [Hotel]
     getHotelByID(id: ID!): Hotel
     getHotelByCity(city: String!): [Hotel]
   }

   type Mutation {
     addHotel(
      hotel_id: ID!
      hotel_name: String!
      street: String!
      email: String!
      Postal_code: String!
      city: String!
      price: Float!): Hotel
      
      
       

     updateHotel(id: String!,
        firstname: String!
        lastname: String!
        email: String!
        city: String!
        price: Float!): Hotel

     deletehotel(id: ID!): Hotel
   }
`