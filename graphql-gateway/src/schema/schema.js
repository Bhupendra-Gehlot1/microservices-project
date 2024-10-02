import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    inventory: Int!
  }

  type OrderItem {
    product: Product!
    quantity: Int!
    price: Float!
  }

  type Order {
    id: ID!
    user: User!
    items: [OrderItem!]!
    totalAmount: Float!
    status: String!
    createdAt: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    products: [Product!]!
    product(id: ID!): Product
    orders: [Order!]!
    order(id: ID!): Order
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
  }

  input ProductInput {
    name: String!
    description: String!
    price: Float!
    inventory: Int!
  }

  input OrderItemInput {
    productId: ID!
    quantity: Int!
  }

  input OrderInput {
    items: [OrderItemInput!]!
  }

  type Mutation {
    registerUser(input: RegisterInput!): User!
    createProduct(input: ProductInput!): Product!
    placeOrder(input: OrderInput!): Order!
  }
`;

export default typeDefs;
