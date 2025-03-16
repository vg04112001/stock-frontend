import axios from "axios";

// const API_URL = "http://localhost:5000/api/stock";
const API_URL = "https://stock-backend-wiix.onrender.com/api/stock";

// Update Stock (product) by ID
export const updateStock = async (id, stockData) => {
  const response = await axios.put(`${API_URL}/${id}`, stockData);
  return response.data;
};
