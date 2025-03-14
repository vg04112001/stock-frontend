import * as React from "react";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { useNavigate } from "react-router-dom";
import { useSort } from "@table-library/react-table-library/sort";
import { usePagination } from "@table-library/react-table-library/pagination";

const DisplayTableData = ({ stocks, handleDelete }) => {
  const navigate = useNavigate();

  const nodes = stocks;
  let data = { nodes };

  const theme = useTheme([
    getTheme(),
    {
      Table: `
        --data-table-library_grid-template-columns:  170px repeat(4, 125px) 170px repeat(2, 125px) 90px 70px auto;
      `,
      Cell: `
      padding : 12px;
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

  const sort = useSort(
    data,
    {
      onChange: onSortChange,
    },
    {
      sortFns: {
        "Product Name": (array) =>
          array.sort((a, b) => a.name.localeCompare(b.name)),
      },
    }
  );

  function onSortChange(action, state) {
    console.log(action, state);
  }

  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: 10,
    },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action, state) {
    console.log(action, state);
  }

  const COLUMNS = [
    {
      label: "Product Name",
      renderCell: (item) => item.name,
      sort: { sortKey: "Product Name" },
    },
    { label: "Batch No", renderCell: (item) => item.batchNo },
    {
      label: "MFG Date",
      renderCell: (item) => new Date(item.mfgDate).toLocaleDateString("en-GB"),
    },
    {
      label: "Expiry Date",
      renderCell: (item) =>
        new Date(item.expiryDate).toLocaleDateString("en-GB"),
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
      renderCell: (item) =>
        new Date(item.debitMemoDate).toLocaleDateString("en-GB"),
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
        sort={sort}
        pagination={pagination}
      />
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>Total Pages: {pagination.state.getTotalPages(data.nodes)}</div>

        <div className="flex gap-x-8">
          Page
          {pagination.state.getPages(data.nodes).map((_, index) => (
            <button
              key={index}
              type="button"
              style={{
                fontWeight: pagination.state.page === index ? "bold" : "normal",
              }}
              onClick={() => pagination.fns.onSetPage(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayTableData;
