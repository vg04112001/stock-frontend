import React, { useState } from "react";
import EditProductForm from "../../components/EditProductForm";
import StockList from "../../components/StockList";

const Products = () => {
  const [editProduct, setEditProduct] = useState(null); // State to manage the product to edit

  const handleEditProduct = (product) => {
    setEditProduct(product); // Set the product to be edited
  };

  // Function to handle product edited
  const handleProductEdited = () => {
    setEditProduct(null); // Clear the edit product state after editing
  };
  return (
    <div className="bg-lime-300">
      {/* Show EditProductForm when a product is selected for editing */}
      {editProduct && (
        <EditProductForm
          product={editProduct}
          onProductEdited={handleProductEdited}
        />
      )}

      <StockList onEditProduct={handleEditProduct} />
    </div>
  );
};

export default Products;
