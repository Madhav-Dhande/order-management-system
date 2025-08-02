// import axios from 'axios';

// const BASE_URL = 'http://localhost:8080';

// // ✅ Exported functions
// export const getOrders = () => axios.get(`${BASE_URL}/orders`);
// export const getOrderById = (id) => axios.get(`${BASE_URL}/orders/${id}`);
// export const createOrder = (formData) =>
//   axios.post(`${BASE_URL}/orders`, formData, {
//     headers: { 'Content-Type': 'multipart/form-data' },
//   });


import axios from 'axios';

const BASE_URL = 'http://localhost:8080/orders';

// POST: Create a new order
export const createOrder = async (formData) => {
  return await axios.post(BASE_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// GET: Fetch all orders
export const getOrders = async () => {
  return await axios.get(BASE_URL);
};

// GET: Fetch order by ID
export const getOrderById = async (orderId) => {
  return await axios.get(`${BASE_URL}/${orderId}`);
};
