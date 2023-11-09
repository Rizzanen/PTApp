import React from "react";
import Button from "@mui/material/Button";
import EditCustomer from "./EditCustomer";

function EditBtnRenderer(props) {
  const { value, customerHref, onClick } = props;

  const handleEdit = (customer, link) => {
    onClick(customer, link);
  };

  return <EditCustomer customer={value} handleEdit={handleEdit} />;
}

export default EditBtnRenderer;
