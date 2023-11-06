import React, { useEffect, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "../App.css";

function CustomerList() {
  const [customers, setCustomers] = useState([]);

  const gridRef = useRef();

  useEffect(() => {
    fetch("https://traineeapp.azurewebsites.net/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data.content))
      .catch((err) => console.error(err));
  }, []);

  const columns = [
    {
      width: 150,
      field: "firstname",
      headerName: "Firstname",
      sortable: true,
      filter: "agTextColumnFilter",
      floatingFilter: true,
      floatingFilterComponentParams: {
        suppressFilterButton: true,
      },
      menuTabs: [],
      headerClass: "customHeader",
      cellClass: "customCell",
    },
    {
      width: 140,
      field: "lastname",
      headerName: "Lastname",
      sortable: true,
      filter: "agTextColumnFilter",
      floatingFilter: true,
      floatingFilterComponentParams: {
        suppressFilterButton: true,
      },
      menuTabs: [],
      headerClass: "customHeader",
      cellClass: "customCell",
    },
    {
      width: 200,
      field: "streetaddress",
      headerName: "Address",
      sortable: true,
      filter: "agTextColumnFilter",
      floatingFilter: true,
      floatingFilterComponentParams: {
        suppressFilterButton: true,
      },
      menuTabs: [],
      headerClass: "customHeader",
      cellClass: "customCell",
    },
    {
      width: 130,
      field: "postcode",
      headerName: "Postcode",
      sortable: true,
      filter: "agTextColumnFilter",
      floatingFilter: true,
      floatingFilterComponentParams: {
        suppressFilterButton: true,
      },
      menuTabs: [],
      headerClass: "customHeader",
      cellClass: "customCell",
    },
    {
      width: 150,
      field: "city",
      headerName: "City",
      sortable: true,
      filter: "agTextColumnFilter",
      floatingFilter: true,
      floatingFilterComponentParams: {
        suppressFilterButton: true,
      },
      menuTabs: [],
      headerClass: "customHeader",
      cellClass: "customCell",
    },
    {
      field: "email",
      headerName: "Email",
      sortable: true,
      filter: "agTextColumnFilter",
      floatingFilter: true,
      floatingFilterComponentParams: {
        suppressFilterButton: true,
      },
      menuTabs: [],
      headerClass: "customHeader",
      cellClass: "customCell",
    },
    {
      width: 135,
      field: "phone",
      headerName: "Phone",
      sortable: true,
      filter: "agTextColumnFilter",
      floatingFilter: true,
      floatingFilterComponentParams: {
        suppressFilterButton: true,
      },
      menuTabs: [],
      headerClass: "customHeader",
      cellClass: "customCell",
    },
  ];

  return (
    <div className="agGrid">
      <div className="ag-theme-material">
        <AgGridReact columnDefs={columns} rowData={customers}></AgGridReact>
      </div>
    </div>
  );
}
export default CustomerList;
