import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CustomerList from "./components/customerList.jsx";
import TrainingList from "./components/TrainingList.jsx";
import TrainingCalendar from "./components/TrainingCalendar.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <CustomerList />,
        index: true,
      },
      {
        path: "customerList",
        element: <CustomerList />,
      },
      {
        path: "trainingList",
        element: <TrainingList />,
      },
      {
        path: "trainingCalendar",
        element: <TrainingCalendar />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
