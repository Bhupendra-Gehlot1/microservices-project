import axios from "axios";

const USER_SERVICE_URL =
  process.env.USER_SERVICE_URL || "http://localhost:3001/api";
const PRODUCT_SERVICE_URL =
  process.env.PRODUCT_SERVICE_URL || "http://localhost:3002/api";
const ORDER_SERVICE_URL =
  process.env.ORDER_SERVICE_URL || "http://localhost:3003/api";

const resolvers = {
  Query: {
    users: async () => {
      const response = await axios.get(`${USER_SERVICE_URL}/users`);
      return response.data;
    },
    user: async (_, { id }) => {
      const response = await axios.get(`${USER_SERVICE_URL}/users/${id}`);
      return response.data;
    },
    products: async () => {
      const response = await axios.get(`${PRODUCT_SERVICE_URL}/products`);
      return response.data;
    },
    product: async (_, { id }) => {
      const response = await axios.get(`${PRODUCT_SERVICE_URL}/products/${id}`);
      return response.data;
    },
    orders: async (_, __, { userId }) => {
      const response = await axios.get(`${ORDER_SERVICE_URL}/orders`, {
        headers: { Authorization: `Bearer ${userId}` },
      });
      return response.data;
    },
    order: async (_, { id }, { userId }) => {
      const response = await axios.get(`${ORDER_SERVICE_URL}/orders/${id}`, {
        headers: { Authorization: `Bearer ${userId}` },
      });
      return response.data;
    },
  },
  Mutation: {
    registerUser: async (_, { input }) => {
      const response = await axios.post(
        `${USER_SERVICE_URL}/users/register`,
        input
      );
      return response.data;
    },
    createProduct: async (_, { input }, { userId }) => {
      const response = await axios.post(
        `${PRODUCT_SERVICE_URL}/products`,
        input,
        {
          headers: { Authorization: `Bearer ${userId}` },
        }
      );
      return response.data;
    },
    placeOrder: async (_, { input }, { userId }) => {
      const response = await axios.post(`${ORDER_SERVICE_URL}/orders`, input, {
        headers: { Authorization: `Bearer ${userId}` },
      });
      return response.data;
    },
  },
};

export default resolvers;
