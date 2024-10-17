import React, { useEffect, useState } from "react";
import EditProductForm from "../../components/EditProductForm";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleStock } from "../../api/singleProduct";

const UpdateExistingProduct = () => {
  const [singleProduct, setSingleProduct] = useState(null); // State to manage the product to edit
  const product = useSelector((state) => state.product.data);
  console.log(product);

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
      <h2 className="text-center">Welome to Edit Existing Product Screen</h2>
      <EditProductForm
        product={singleProduct}
        // onProductEdited={handleProductEdited}
      />
    </div>
  );
};

export default UpdateExistingProduct;
