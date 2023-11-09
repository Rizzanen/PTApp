import React, { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";

function AddCustomer(props) {
  const [open, setOpen] = React.useState(false);

  const [newCustomer, setNewCustomer] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    streetaddress: "",
    postcode: "",
    city: "",
  });

  //open the form dialog
  const handleClickOpen = () => {
    setOpen(true);
  };
  //close the form dialog
  const handleClose = () => {
    setOpen(false);
  };
  //set customer values according to input
  const inputChanged = (event) => {
    setNewCustomer({ ...newCustomer, [event.target.name]: event.target.value });
  };
  //call the saveCustomer function form parent component, reset newCustomer data and close form dialog.
  const addCustomer = () => {
    props.saveCustomer(newCustomer);
    setNewCustomer({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      streetaddress: "",
      postcode: "",
      city: "",
    });
    handleClose();
  };

  return (
    <div>
      <Button
        className="addButton"
        variant="outlined"
        onClick={handleClickOpen}
      >
        ADD NEW CUSTOMER
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ textAlign: "center" }}>
          ADD NEW CUSTOMER
        </DialogTitle>
        <DialogContent>
          <InputLabel style={{ textAlign: "center" }}>Firstname</InputLabel>
          <TextField
            type="text"
            onChange={inputChanged}
            placeholder="firstname"
            name="firstname"
            value={newCustomer.firstname}
            label="Firstname"
          />
          <InputLabel style={{ textAlign: "center" }}>Lastname</InputLabel>
          <TextField
            type="text"
            onChange={inputChanged}
            placeholder="lastname"
            name="lastname"
            value={newCustomer.lastname}
            label="Lastname"
          />
          <InputLabel style={{ textAlign: "center" }}>Email</InputLabel>
          <TextField
            type="text"
            onChange={inputChanged}
            placeholder="email"
            name="email"
            value={newCustomer.email}
            label="Email"
          />
          <InputLabel style={{ textAlign: "center" }}>Phone</InputLabel>
          <TextField
            type="text"
            onChange={inputChanged}
            placeholder="phone"
            name="phone"
            value={newCustomer.phone}
            label="Phone"
          />
          <InputLabel style={{ textAlign: "center" }}>
            Street Address
          </InputLabel>
          <TextField
            type="text"
            onChange={inputChanged}
            placeholder="streetaddress"
            name="streetaddress"
            value={newCustomer.streetaddress}
            label="Street Address"
          />
          <InputLabel style={{ textAlign: "center" }}>Postcode</InputLabel>
          <TextField
            type="text"
            onChange={inputChanged}
            placeholder="postcode"
            name="postcode"
            value={newCustomer.postcode}
            label="Postcode"
          />
          <InputLabel style={{ textAlign: "center" }}>City</InputLabel>
          <TextField
            type="text"
            onChange={inputChanged}
            placeholder="city"
            name="city"
            value={newCustomer.city}
            label="City"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addCustomer}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddCustomer;
