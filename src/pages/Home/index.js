import React, { useState } from "react";
import AddProductForm from "../../components/AddProductForm";
import EditProductForm from "../../components/EditProductForm";
import StockList from "../../components/StockList";

const Home = () => {
  const [showAddForm, setShowAddForm] = useState(false); // State to toggle form visibility
  const [editProduct, setEditProduct] = useState(null); // State to manage the product to edit
  const [reload, setReload] = useState(false); // State to trigger reload of stock list

  // Function to handle form toggle
  const toggleAddForm = () => {
    setShowAddForm(!showAddForm); // Toggle form visibility
  };

  // Function to trigger reload after product is added
  const handleProductAdded = () => {
    setReload(!reload); // Reload the stock list after adding a new product
    setShowAddForm(false); // Hide the form after product is added
  };

  const handleEditProduct = (product) => {
    setEditProduct(product); // Set the product to be edited
    setShowAddForm(false); // Hide the Add form if in edit mode
  };

  // Function to handle product edited
  const handleProductEdited = () => {
    setReload(!reload); // Reload the stock list after editing a product
    setEditProduct(null); // Clear the edit product state after editing
  };
  return (
    <div className="bg-lime-300">
      <button onClick={toggleAddForm}>
        {showAddForm ? "Cancel" : "Add New Product"}{" "}
        {/* Button text changes based on form visibility */}
      </button>

      {showAddForm && <AddProductForm onProductAdded={handleProductAdded} />}

      {/* Show EditProductForm when a product is selected for editing */}
      {editProduct && (
        <EditProductForm
          product={editProduct}
          onProductEdited={handleProductEdited}
        />
      )}

      <StockList reload={reload} onEditProduct={handleEditProduct} />
    </div>
  );
};

export default Home;
