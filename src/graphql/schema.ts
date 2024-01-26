import { gql } from 'apollo-server-express';

// Just a side note, it's my first time using GraphQL, probably there is a 
// better way to define the type definitions, jeje but I don't know it yet 😂
export const typeDefs = gql`
  type Query {
    plans: [Plan]
    subscriptions(customerId: Int): [Subscription]
  }

  type Plan {
    id: ID!
    name: String!
    description: String
  }

  type Subscription {
    id: ID!
    plan: Plan!
    startsAt: Float!
    endsAt: Float
  }
`;