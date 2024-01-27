import { gql } from 'apollo-server-express';

// Just a side note, it's my first time using GraphQL, probably there is a 
// better way to define the type definitions, jeje but I don't know it yet 😂
export const typeDefs = gql`
  type Query {
    plans: [Plan]
    subscriptions(customerId: Int): [Subscription]
  }

  enum Currency {
    usd
  }
  
  enum BillingFrequency {
    annual
    monthly
  }

  enum SupportLevel {
    basic
    dedicated
    priority
  }

  enum Analytics {
    advanced
    basic
    none
  }

  enum Integrations {
    custom
    none
  }

  enum CountryCode {
    arg
    usa
  }

  enum SubscriptionStatus {
    active
    canceled
    paused
    trial
  }

  enum InvoiceStatus {
    draft
    open
    paid
    uncollectible
    voided
  }
  
  enum Role {
    admin
    su
    user
  }
  
  enum PaymentStatus {
    approved
    pending
    processing
    rejected
  }
  
  enum PaymentMethod {
    bankTransfer
    credit
    debit
  }

  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    password: String!
    avatar: String
    role: Role!
    createdAt: Float!
    updatedAt: Float!
    deletedAt: Float
  }

  type Customer {
    id: ID!
    user: User!
    createdAt: Float!
    updatedAt: Float!
    deletedAt: Float
  }

  type Plan {
    id: ID!
    name: String!
    description: String
    price: Float!
    currency: Currency!
    billingFrequency: BillingFrequency!
    storage: Int!
    supportLevel: SupportLevel!
    analytics: Analytics!
    integrations: Integrations!
    annualDiscount: Int!
    createdAt: Float!
    updatedAt: Float!
    deletedAt: Float
  }

  type Subscription {
    id: ID!
    customer: Customer!
    plan: Plan!
    startsAt: Float!
    endsAt: Float
    createdAt: Float!
    updatedAt: Float!
    deletedAt: Float
  }
  
  type Invoice {
    id: ID!
    customer: Customer!
    subscription: Subscription!
    status: InvoiceStatus!
    amount: Float!
    currency: Currency!
    dueDateAt: Float!
    billingAddress: String!
    billingZipCode: String!
    billingCountryCode: CountryCode!
    billingFullName: String!
    createdAt: Float!
    updatedAt: Float!
    deletedAt: Float
  }
  
  type Payment {
    id: ID!
    customer: Customer!
    invoice: Invoice!
    status: PaymentStatus!
    amount: Float!
    currency: Currency!
    method: PaymentMethod!
    createdAt: Float!
    updatedAt: Float!
    deletedAt: Float
  }
`;