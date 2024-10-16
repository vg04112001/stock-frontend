import axios from "axios";

const API_URL = "http://localhost:5000/api/stock";

// Get stocks with search and sort functionality
export const getStocks = async (search = "", sort = "") => {
  if (search && sort) {
    console.log("search & sort");
    const response = await axios.get(
      `${API_URL}?search=${search}&sort=${sort}`
    );
    return response.data;
  } else {
    console.log("nothing");
    const response = await axios.get(`${API_URL}`);
    return response.data;
  }
};

// Add more API functions (createStock, updateStock, deleteStock) as needed
