import React, { useState, useEffect } from "react";
import { deleteStock } from "../api/deleteStock";
import { getStocks } from "../api/getStock";
// import EditProductForm from "./EditProductForm";

const StockList = ({ reload, onEditProduct }) => {
  const [stocks, setStocks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortTerm, setSortTerm] = useState("");

  // const [selectedProduct, setSelectedProduct] = useState(null);

  // const handleEdit = (product) => {
  //   setSelectedProduct(product); // Open the edit form with product data
  // };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteStock(id);
        setStocks(stocks.filter((stock) => stock._id !== id)); // Remove from list
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStocks(searchTerm, sortTerm);
      setStocks(data);
    };
    fetchData();
  }, [searchTerm, sortTerm, reload]); // Now listening for reload changes

  return (
    <div>
      <h1>Stock List</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select onChange={(e) => setSortTerm(e.target.value)}>
        <option value="" disabled>
          Sort by
        </option>
        <option value="name">Name</option>
        <option value="price">Price</option>
        <option value="expiryDate">Expiry Date</option>
      </select>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock._id}>
              <td>{stock.name}</td>
              <td>{stock.category}</td>
              <td>{stock.quantity}</td>
              <td>{stock.price}</td>
              <td>{new Date(stock.expiryDate).toLocaleDateString()}</td>
              <td>
                <button onClick={() => onEditProduct(stock)}>Edit</button>
                <button onClick={() => handleDelete(stock._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockList;
