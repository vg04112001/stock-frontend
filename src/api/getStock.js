import axios from "axios";

// const API_URL = "http://localhost:5000/api/stock";

export const getStocks = async (
  search = "",
  sort = "",
  startDate = "",
  endDate = ""
) => {
  try {
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (sort) params.append("sort", sort);
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);

    const response = await axios.get(
      `https://stock-backend-wiix.onrender.com/api/stock?${params.toString()}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching stocks:", error);
    return [];
  }
};
