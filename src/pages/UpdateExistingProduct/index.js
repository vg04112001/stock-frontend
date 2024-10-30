import React, { useEffect, useState } from "react";
import EditProductForm from "../../components/EditProductForm";
import { useParams } from "react-router-dom";
import { getSingleStock } from "../../api/singleProduct";

const UpdateExistingProduct = () => {
  const [singleProduct, setSingleProduct] = useState(null); // State to manage the product to edit

  const { id } = useParams();

  useEffect(() => {
    const fetchSingleProductData = async () => {
      const data = await getSingleStock(id);
      setSingleProduct(data);
    };
    fetchSingleProductData();
  }, [id]); // Now listening for date range changes
  return (
    <div className="bg-green-200 h-auto">
      <div className="text-center font-bold text-red-500">
        Welome to Edit Existing Product Screen
      </div>
      <EditProductForm product={singleProduct} />
    </div>
  );
};

export default UpdateExistingProduct;
