import React, { useEffect, useState, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "../App.css";
import dayjs from "dayjs";
import AddTraining from "./AddTraining";
import DeleteBtnRenderer from "./DeleteButtonRenderer";
import { Button } from "@mui/material";

function TrainingList() {
  const [trainings, setTrainings] = useState([]);

  const gridRef = useRef();

  const onGridReady = (params) => {
    gridRef.current = params.api;
  };

  //the data of trainings and customernames are fetched, prosessed and combined into the trainings state.
  useEffect(() => {
    fetch("https://traineeapp.azurewebsites.net/api/trainings")
      .then((response) => response.json())
      .then((data) => {
        const trainingData = data.content.map((trainingInfo) => {
          const customerHref = trainingInfo.links.find(
            (link) => link.rel === "customer"
          ).href;
          const trainingHref = trainingInfo.links.find(
            (link) => link.rel === "self"
          ).href;
          var modifyCustomerHref = customerHref.replace("http://", "https://");
          var modifyTrainingHref = trainingHref.replace("http://", "https://");

          return fetch(modifyCustomerHref)
            .then((customerResponse) => customerResponse.json())
            .then((customerData) => {
              const { firstname, lastname } = customerData;

              const customerName = `${firstname} ${lastname} `;

              return {
                ...trainingInfo,
                customerName,
                modifyCustomerHref,
                modifyTrainingHref,
              };
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

  //this function fetcehs the data when called
  const fetchUpdatedData = () => {
    fetch("https://traineeapp.azurewebsites.net/api/trainings")
      .then((response) => response.json())
      .then((data) => {
        const trainingData = data.content.map((trainingInfo) => {
          const customerHref = trainingInfo.links.find(
            (link) => link.rel === "customer"
          ).href;
          const trainingHref = trainingInfo.links.find(
            (link) => link.rel === "self"
          ).href;
          var modifyCustomerHref = customerHref.replace("http://", "https://");
          var modifyTrainingHref = trainingHref.replace("http://", "https://");

          return fetch(modifyCustomerHref)
            .then((customerResponse) => customerResponse.json())
            .then((customerData) => {
              const { firstname, lastname } = customerData;

              const customerName = `${firstname} ${lastname} `;

              return {
                ...trainingInfo,
                customerName,
                modifyCustomerHref,
                modifyTrainingHref,
              };
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
  };

  //columns for the agGrid
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
    {
      width: 170,
      sortable: false,
      filter: false,
      headerName: "",
      field: "trainingHref",
      cellRenderer: DeleteBtnRenderer,
      cellRendererParams: {
        onClick: (trainingHref) => deleteTraining(trainingHref),
      },
    },
  ];

  // /trainings endpoint call to save new training to backends database
  const saveTraining = (newTraining) => {
    fetch("https://traineeapp.azurewebsites.net/api/trainings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTraining),
    })
      .then((res) => fetchUpdatedData())
      .catch((err) => console.error(err));
  };

  // /trainings/{id} call to delete training from backends database
  const deleteTraining = (trainingHref) => {
    if (
      window.confirm(
        "Are you sure you want to permanently delete this training?"
      )
    ) {
      fetch(trainingHref, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            fetchUpdatedData();
          } else {
            console.error("Failed to delete the training.");
          }
        })
        .catch((err) => console.error(err));
    }
  };
  //data of the agGrid is taken, file named, button columns field values is parsed off and then its exported as csv.
  const exportToCSV = () => {
    if (gridRef.current) {
      const params = {
        fileName: "training_data.csv",
        processCellCallback: (params) => {
          const column = params.column;

          if (column && column.getColDef().headerName !== "") {
            return params.value;
          }
          return null;
        },
      };
      gridRef.current.exportDataAsCsv(params);
    }
  };
  //call exportToCSV onClick
  const onClickExport = useCallback(() => {
    exportToCSV();
  }, []);

  return (
    <div className="ag-theme-material" id="trainingGrid">
      <AddTraining saveTraining={saveTraining} trainings={trainings} />
      <AgGridReact
        columnDefs={columns}
        rowData={trainings}
        onGridReady={onGridReady}
        frameworkComponents={{
          DeleteBtnRenderer: DeleteBtnRenderer,
        }}
      ></AgGridReact>
      <Button onClick={onClickExport} className="CSVButton">
        Download as CSV
      </Button>
    </div>
  );
}
export default TrainingList;
