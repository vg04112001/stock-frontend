import * as React from "react";

import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProduct } from "../../redux-toolkit/slices/productSlice";

const DisplayTableData = ({ stocks, handleDelete, onEditProduct }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const nodes = stocks;

  let data = { nodes };

  const theme = useTheme([
    getTheme(),
    {
      Table: `
        --data-table-library_grid-template-columns:  160px repeat(7, 125px) 90px 70px auto;
      `,
      Cell: `
      padding : 10px;
      `,
    },
  ]);
  const [search, setSearch] = React.useState("");

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  data = {
    nodes: data.nodes.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    ),
  };
  const COLUMNS = [
    // { label: "PId:", renderCell: (item) => item._id },
    { label: "Product Name", renderCell: (item) => item.name },
    { label: "Batch No", renderCell: (item) => item.batchNo },
    {
      label: "MFG Date",
      renderCell: (item) => new Date(item.mfgDate).toLocaleDateString(),
    },
    {
      label: "Expiry Date",
      renderCell: (item) => new Date(item.expiryDate).toLocaleDateString(),
    },
    { label: "Company", renderCell: (item) => item.company },
    {
      label: "WholeSaler",
      renderCell: (item) => item.wholeSalerName,
    },
    {
      label: "Challen No",
      renderCell: (item) => item.challenNo,
    },
    {
      label: "Challen Date",
      renderCell: (item) => new Date(item.debitMemoDate).toLocaleDateString(),
    },
    { label: "Quantity", renderCell: (item) => item.quantity },
    { label: "Price", renderCell: (item) => item.price },
    {
      label: "Actions",
      renderCell: (item) => {
        return (
          <div className="flex gap-x-2">
            <button
              className="bg-violet-500 text-white rounded-full w-16"
              onClick={() => {
                dispatch(fetchProduct(item._id));
                // onEditProduct(item);
                navigate(`/update-product/${item._id}`);
              }}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white rounded-full w-16"
              onClick={() => handleDelete(item._id)}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <label htmlFor="search">
        Search by Product Name (Frontend Side):&nbsp;
        <input id="search" type="text" value={search} onChange={handleSearch} />
      </label>
      <br />
      <CompactTable
        columns={COLUMNS}
        data={data}
        theme={theme}
        layout={{ custom: true }}
      />
    </>
  );
};

export default DisplayTableData;
