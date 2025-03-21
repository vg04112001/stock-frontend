import React, { useState, useEffect } from "react";
import { deleteStock } from "../api/deleteStock";
import { getStocks } from "../api/getStock";
import DisplayTableData from "../features/DisplayTableData";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Import autoTable plugin

const StockList = () => {
  const [stocks, setStocks] = useState([]);
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
      console.log(data)
      setStocks(data);
    };
    fetchData();
  }, [searchTerm, sortTerm, startDate, endDate]); // Now listening for date range changes

  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.text("Stock List", 20, 10); // Title

    const tableColumn = [
      "Product Name",
      "Batch No",
      "MFG Date",
      "Expiry Date",
      "Company",
      "WholeSaler",
      "Challen No",
      "Challen Date",
      "Quantity",
      "Price",
    ];
    const tableRows = [];

    stocks.forEach((stock) => {
      const stockData = [
        stock.name,
        stock.batchNo,
        new Date(stock.mfgDate).toISOString().split("T")[0],
        new Date(stock.expiryDate).toISOString().split("T")[0],
        stock.company,
        stock.wholeSalerName,
        stock.challenNo,
        new Date(stock.debitMemoDate).toISOString().split("T")[0],
        stock.quantity,
        stock.price,
      ];
      tableRows.push(stockData);
    });

    // Adding autoTable
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      margin: { top: 20, left: 10, right: 10 },
      theme: "grid",
      headStyles: { fillColor: [22, 160, 133] }, // Customize header color
      styles: {
        fontSize: 8, // Reduce font size to fit more columns
        cellPadding: 2,
        overflow: "linebreak", // Wrap text in columns
      },
      columnStyles: {
        0: { cellWidth: 25 }, // Name
        1: { cellWidth: 23 }, // Category
        2: { cellWidth: 20 }, // Quantity
        3: { cellWidth: 20 }, // Price
        4: { cellWidth: 20 }, // Expiry Date
        5: { cellWidth: 20 }, // Supplier
        6: { cellWidth: 20 }, // Brand
        7: { cellWidth: 23 }, // Batch No.
        8: { cellWidth: 16 }, // Warehouse
        9: { cellWidth: 15 }, // Location
      },
    });

    doc.save("stock_list.pdf"); // Save the PDF
  };
  const handleStartDateChange = (e) => {
    setStartDate(new Date(e.target.value).toISOString().split("T")[0]); // Format YYYY-MM-DD
  };
  
  const handleEndDateChange = (e) => {
    setEndDate(new Date(e.target.value).toISOString().split("T")[0]);
  };
  
  return (
    <div>
      <div className="flex justify-between mx-2 items-center">
        <h1>Stock List</h1>
        <button
          className="rounded-lg bg-yellow-400 w-32 h-6"
          onClick={exportToPDF}
        >
          Export to PDF
        </button>
      </div>

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
            onChange={handleStartDateChange}
          />
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </>
      )}
      <DisplayTableData stocks={stocks} handleDelete={handleDelete} />
    </div>
  );
};

export default StockList;
