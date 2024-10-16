import React, { useState } from "react";
import { addStock } from "../api/addStock"; // Import the API call

const AddProductForm = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
    expiryDate: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data to backend to add new product
      await addStock(formData);
      onProductAdded(); // Trigger reload of product list and hide the form
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Product</h2>
      <div>
        <label>Product Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Quantity:</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Expiry Date:</label>
        <input
          type="date"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;
