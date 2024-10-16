import axios from "axios";

const API_URL = "http://localhost:5000/api/stock";

// Add Stock (new product)
export const addStock = async (stockData) => {
  const response = await axios.post(API_URL, stockData);
  return response.data;
};
