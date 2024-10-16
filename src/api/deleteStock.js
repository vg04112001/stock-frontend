import axios from "axios";

const API_URL = "http://localhost:5000/api/stock";

// Delete Stock (product) by ID
export const deleteStock = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
