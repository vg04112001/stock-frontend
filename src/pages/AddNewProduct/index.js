import React from "react";
import AddProductForm from "../../components/AddProductForm";

const AddNewProduct = () => {
  return (
    <div className="bg-green-200 h-auto">
      <div className="text-center font-bold text-red-500">
        Welome to Add New Product Screen
      </div>
      <AddProductForm />
    </div>
  );
};

export default AddNewProduct;
