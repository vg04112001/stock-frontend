import React, { useState, useEffect } from "react";
import { updateStock } from "../api/updateStock";

const EditProductForm = ({ product, onProductEdited }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
    expiryDate: "",
  });

  // Pre-fill form data with the selected product
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        quantity: product.quantity,
        price: product.price,
        expiryDate: new Date(product.expiryDate).toISOString().split("T")[0],
      });
    }
  }, [product]);

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
      // Send updated data to backend
      await updateStock(product._id, formData);
      onProductEdited(); // Trigger reload of product list
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Product</h2>
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
      <button type="submit">Update Product</button>
    </form>
  );
};

export default EditProductForm;
