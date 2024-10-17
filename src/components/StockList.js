import React, { useState, useEffect } from "react";
import { deleteStock } from "../api/deleteStock";
import { getStocks } from "../api/getStock";
import DisplayTableData from "../features/DisplayTableData";

const StockList = ({ onEditProduct }) => {
  const [stocks, setStocks] = useState([]);
  console.log(stocks);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortTerm, setSortTerm] = useState("");
  const [startDate, setStartDate] = useState(""); // State for start date
  const [endDate, setEndDate] = useState(""); // State for end date

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
      const data = await getStocks(searchTerm, sortTerm, startDate, endDate);
      setStocks(data);
    };
    fetchData();
  }, [searchTerm, sortTerm, startDate, endDate]); // Now listening for date range changes

  return (
    <div>
      <h1>Stock List</h1>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Sorting dropdown */}
      <select onChange={(e) => setSortTerm(e.target.value)}>
        <option value="">Sort by</option>
        <option value="name">Name</option>
        <option value="price">Price</option>
        <option value="expiryDate">Expiry Date</option>
      </select>

      {/* Date range inputs */}
      {sortTerm === "expiryDate" && (
        <>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </>
      )}
      <DisplayTableData
        stocks={stocks}
        // onEditProduct={onEditProduct}
        handleDelete={handleDelete}
      />
      {/* Stock table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Expiry Date</th>
            <th>Actions</th>
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
                {/* <button onClick={() => onEditProduct(stock)}>Edit</button> */}
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
