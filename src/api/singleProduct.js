import axios from "axios";

const API_URL = "http://localhost:5000/api/stock";
// Function to get a single product by ID
export const getSingleStock = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`); // Send GET request to backend
    return response.data; // Return the product data
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error; // Throw error to be handled by caller
  }
};
