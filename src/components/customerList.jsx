import React, { useEffect, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "../App.css";
import AddCustomer from "./AddCustomer";
import DeleteBtnRenderer from "./DeleteButtonRenderer";
import EditBtnRenderer from "./EditButtonRenderer";

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  //data for agGrid is fetched. Also the selfLink of the customers is added to customers state so it can be accessed in the columns as field value.
  useEffect(() => {
    fetch("https://traineeapp.azurewebsites.net/api/customers")
      .then((response) => response.json())
      .then((data) => {
        const customerData = data.content.map((customerInfo) => {
          const customerHref = customerInfo.links.find(
            (link) => link.rel === "self"
          ).href;

          return {
            ...customerInfo,
            customerHref,
          };
        });

        Promise.all(customerData)
          .then((customerEntries) => {
            setCustomers(customerEntries);
          })
          .catch((error) => console.error(error));
      })
      .catch((err) => console.error(err));
  }, []);

  //this function fetcehs the data when called
  const fetchUpdatedData = () => {
    fetch("https://traineeapp.azurewebsites.net/api/customers")
      .then((response) => response.json())
      .then((data) => {
        const customerData = data.content.map((customerInfo) => {
          const customerHref = customerInfo.links.find(
            (link) => link.rel === "self"
          ).href;

          return {
            ...customerInfo,
            customerHref,
          };
        });

        Promise.all(customerData)
          .then((customerEntries) => {
            setCustomers(customerEntries);
          })
          .catch((error) => console.error(error));
      })
      .catch((err) => console.error(err));
  };
  //columns for the agGrid
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
      width: 230,
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
    {
      width: 130,
      sortable: false,
      filter: false,
      headerName: "",
      field: "customerHref",
      cellRenderer: EditBtnRenderer,
      cellRendererParams: {
        onClick: (customerHref, customer) =>
          editCustomer(customerHref, customer),
      },
    },
    {
      width: 170,
      sortable: false,
      filter: false,
      headerName: "",
      field: "customerHref",
      cellRenderer: DeleteBtnRenderer,
      cellRendererParams: {
        onClick: (customerHref) => deleteCustomer(customerHref),
      },
    },
  ];
  // /customers endpoint call to save new customer to backends database and updating the grid data
  const saveCustomer = (newCustomer) => {
    fetch("https://traineeapp.azurewebsites.net/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCustomer),
    })
      .then((res) => fetchUpdatedData())
      .catch((err) => console.error(err));
  };

  // /customers/{id} call to delete customer from backends database and updating the grid data
  const deleteCustomer = (customerHref) => {
    if (
      window.confirm(
        "Are you sure you want to permanently delete this customer?"
      )
    ) {
      fetch(customerHref, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            fetchUpdatedData();
          } else {
            console.error("Failed to delete the customer.");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  // /customers/{id} call with put method to update existing customers data and updating the grid data
  const editCustomer = (customer, customerHref) => {
    fetch(customerHref, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((response) => {
        if (response.ok) {
          fetchUpdatedData();
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="agGrid">
      <div className="ag-theme-material">
        <AddCustomer saveCustomer={saveCustomer} />
        <AgGridReact
          columnDefs={columns}
          rowData={customers}
          frameworkComponents={{
            DeleteBtnRenderer: DeleteBtnRenderer,
            EditBtnRenderer: EditBtnRenderer,
          }}
        ></AgGridReact>
      </div>
    </div>
  );
}
export default CustomerList;
