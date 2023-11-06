import React, { useEffect, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "../App.css";
import dayjs from "dayjs";

function TrainingList() {
  const [trainings, setTrainings] = useState([]);
  const gridRef = useRef();

  //the data of trainings and customernames are fetched, prosessed and combined into the trainings state.
  useEffect(() => {
    fetch("https://traineeapp.azurewebsites.net/api/trainings")
      .then((response) => response.json())
      .then((data) => {
        const trainingData = data.content.map((trainingInfo) => {
          const customerHref = trainingInfo.links.find(
            (link) => link.rel === "customer"
          ).href;
          return fetch(customerHref)
            .then((customerResponse) => customerResponse.json())
            .then((customerData) => {
              const { firstname, lastname } = customerData;
              const customerName = `${firstname} ${lastname}`;

              return { ...trainingInfo, customerName };
            })
            .catch((customerErr) => {
              console.error(customerErr);
              return { ...trainingInfo, customerName: "N/A" };
            });
        });

        Promise.all(trainingData)
          .then((trainingEntries) => {
            setTrainings(trainingEntries);
          })
          .catch((error) => console.error(error));
      })
      .catch((err) => console.error(err));
  }, []);

  const columns = [
    {
      field: "date",
      headerName: "Date and time",
      sortable: true,
      filter: "agTextColumnFilter",
      floatingFilter: true,
      floatingFilterComponentParams: {
        suppressFilterButton: true,
      },
      menuTabs: [],
      headerClass: "customHeader",
      cellClass: "customCell",
      valueFormatter: (params) => {
        const formattedDate = dayjs(params.value).format(`DD/MM/YYYY HH:mm`);
        return formattedDate;
      },
    },
    {
      width: 160,
      field: "duration",
      headerName: "Duration (min)",
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
      width: 170,
      field: "activity",
      headerName: "Activity",
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
      width: 170,
      field: "customerName",
      headerName: "Customer",
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
    <div className="ag-theme-material" id="trainingGrid">
      <AgGridReact columnDefs={columns} rowData={trainings}></AgGridReact>
    </div>
  );
}
export default TrainingList;
