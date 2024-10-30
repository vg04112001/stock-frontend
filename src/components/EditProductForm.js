import React, { useState, useEffect } from "react";
import { updateStock } from "../api/updateStock";
import Input from "./Input";
import { useNavigate } from "react-router-dom";

const EditProductForm = ({ product }) => {
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

  // Pre-fill form data with the selected product
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        batchNo: product.batchNo,
        mfgDate: product.mfgDate,
        expiryDate: product.expiryDate,
        company: product.company,
        wholeSalerName: product.wholeSalerName,
        challenNo: product.challenNo,
        debitMemoDate: product.debitMemoDate,
        quantity: product.quantity,
        price: product.price,
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
      // onProductEdited(); // Trigger reload of product list
      navigate("/");
    } catch (error) {
      console.error("Error updating product:", error);
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
        step={"0.01"}
      />

      <div className="flex gap-x-3">
        <button type="submit" className="bg-green-600 rounded-full p-2">
          Edit Product
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

export default EditProductForm;
