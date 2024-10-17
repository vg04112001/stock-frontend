import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/stock";

// Function to get a single product by ID
export const fetchProduct = createAsyncThunk("fetchProducts", async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  // console.log(response.data);
  return response.data;
});

const productSlice = createSlice({
  name: "productList",
  initialState: {
    isLoading: false,
    data: [],
  },

  extraReducers: (builder) => {
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      console.log("fulfilled");
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchProduct.pending, (state, action) => {
      console.log("pending");
      state.isLoading = true;
      state.data = null;
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      console.log("rejected");
      state.isLoading = true;
      state.data = null;
    });
  },
});

export default productSlice.reducer;
