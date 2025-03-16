import axios from "axios";

const API_URL = "https://stock-backend-wiix.onrender.com/api/stock";

// Add Stock (new product)
export const addStock = async (stockData) => {
  const response = await axios.post(API_URL, stockData);
  return response.data;
};
