import React, { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import "../App.css";
import EditIcon from "@mui/icons-material/Edit";

function EditCustomer(props) {
  const [open, setOpen] = React.useState(false);
  const [link, setLink] = React.useState();
  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  });
  // data of the rows customer is fetched and set to state. also open the  from dialog
  const handleClickOpen = () => {
    fetch(props.customer, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCustomer({
          firstname: data.firstname,
          lastname: data.lastname,
          streetaddress: data.streetaddress,
          postcode: data.postcode,
          city: data.city,
          email: data.email,
          phone: data.phone,
        });
        setLink(data.links[0].href);
      })
      .catch((err) => {
        console.error(err);
      });

    setOpen(true);
  };
  //close form dialog
  const handleClose = () => {
    setOpen(false);
  };
  //save changes made to state
  const inputChanged = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };
  //call parent components handleEdit() and pass the modified customerinfo as props.
  const saveCustomer = () => {
    props.handleEdit(customer, link);
    handleClose();
  };

  return (
    <div>
      <Button
        className="editButton"
        onClick={handleClickOpen}
        variant="outlined"
        startIcon={<EditIcon />}
      >
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit customer</DialogTitle>
        <DialogContent>
          <InputLabel>firstname</InputLabel>
          <TextField
            type="text"
            onChange={inputChanged}
            placeholder="Firstname"
            name="firstname"
            value={customer.firstname}
          />
          <InputLabel>Lastname</InputLabel>
          <TextField
            type="text"
            onChange={inputChanged}
            placeholder="Lastname"
            name="lastname"
            value={customer.lastname}
          />
          <InputLabel>Streetaddress</InputLabel>
          <TextField
            type="text"
            onChange={inputChanged}
            placeholder="Streetaddress"
            name="streetaddress"
            value={customer.streetaddress}
          />
          <InputLabel>Postcode</InputLabel>
          <TextField
            type="text"
            onChange={inputChanged}
            placeholder="Postcode"
            name="postcode"
            value={customer.postcode}
          />
          <InputLabel>City</InputLabel>
          <TextField
            type="text"
            onChange={inputChanged}
            placeholder="City"
            name="city"
            value={customer.city}
          />
          <InputLabel>Email</InputLabel>
          <TextField
            type="text"
            onChange={inputChanged}
            placeholder="Email"
            name="email"
            value={customer.email}
          />
          <InputLabel>Phone</InputLabel>
          <TextField
            type="text"
            onChange={inputChanged}
            placeholder="Phone"
            name="phone"
            value={customer.phone}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveCustomer}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditCustomer;
