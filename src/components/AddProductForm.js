import React, { useState } from "react";
import { addStock } from "../api/addStock"; // Import the API call
import { useNavigate } from "react-router-dom";
import Input from "./Input";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    batchNo: "",
    mfgDate: "",
    expiryDate: "",
    company: "",
    wholeSalerName: "",
    debitMemoDate: "",
    challenNo: "",
    quantity: "",
    price: "",
  });

  const navigate = useNavigate();
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
      navigate("/");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label={"Product Name:"}
        name="name"
        value={formData.name}
        handleChange={handleChange}
      />
      <Input
        label={"Batch No:"}
        name="batchNo"
        value={formData.batchNo}
        handleChange={handleChange}
      />
      <Input
        label={"MFG Date:"}
        type="date"
        name="mfgDate"
        value={formData.mfgDate}
        handleChange={handleChange}
      />
      <Input
        label={"Expiry Date:"}
        type="date"
        name="expiryDate"
        value={formData.expiryDate}
        handleChange={handleChange}
      />
      <Input
        label={"Company Name:"}
        name="company"
        value={formData.company}
        handleChange={handleChange}
      />
      <Input
        label={"WholeSaler Name:"}
        name="wholeSalerName"
        value={formData.wholeSalerName}
        handleChange={handleChange}
      />
      <Input
        label={"DebitMemo Date:"}
        type="date"
        name="debitMemoDate"
        value={formData.debitMemoDate}
        handleChange={handleChange}
      />
      <Input
        label={"Challen No:"}
        name="challenNo"
        value={formData.challenNo}
        handleChange={handleChange}
      />
      <Input
        label={"Quantity:"}
        type="number"
        name="quantity"
        value={formData.quantity}
        handleChange={handleChange}
        min="1"
        max="1000"
      />
      <Input
        label={"Price:"}
        type="number"
        name="price"
        value={formData.price}
        handleChange={handleChange}
        min="1"
        step="0.01"
      />

      <div className="flex gap-x-3">
        <button type="submit" className="bg-green-600 rounded-full p-2">
          Add Product
        </button>
        <button
          onClick={() => navigate("/")}
          type="submit"
          className="bg-orange-600 rounded-full p-2"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddProductForm;
