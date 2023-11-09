import React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import "../App.css";

function DeleteBtnRenderer(props) {
  const { value, onClick } = props;

  const handleDelete = () => {
    onClick(value);
  };

  return (
    <Button
      className="deleteButton"
      variant="outlined"
      color="error"
      startIcon={<DeleteIcon />}
      onClick={handleDelete}
    >
      Delete
    </Button>
  );
}

export default DeleteBtnRenderer;
