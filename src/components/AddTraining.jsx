import React, { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import dayjs from "dayjs";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import { Select, MenuItem } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

function AddTraining(props) {
  const { saveTraining } = props;
  const [open, setOpen] = React.useState(false);
  const [newTraining, setNewTraining] = useState({
    date: "",
    activity: "",
    duration: "",
    customer: "",
  });

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch("https://traineeapp.azurewebsites.net/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data.content))
      .catch((err) => console.error(err));
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const inputChanged = (event) => {
    setNewTraining({ ...newTraining, [event.target.name]: event.target.value });
  };

  const addTraining = () => {
    const selectedDate = newTraining.date;

    const FormattedDate = dayjs(selectedDate).toISOString();
    for (let i = 0; i < customers.length; i++) {
      const { firstname, lastname } = customers[i];
      let customerName = `${firstname} ${lastname}`;

      if (
        customerName.trim().toLowerCase() ===
        newTraining.customer.trim().toLowerCase()
      ) {
        const customerHref = customers[i].links[0].href;
        const CustomerAPIData = {
          ...newTraining,
          customer: customerHref,
          date: FormattedDate,
        };
        saveTraining(CustomerAPIData);
      }
      customerName = "";
    }

    handleClose();

    setNewTraining({
      date: "",
      activity: "",
      duration: "",
      customer: "",
    });
  };

  return (
    <div>
      <Button
        className="addButton"
        variant="outlined"
        onClick={handleClickOpen}
      >
        ADD NEW TRAINING
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ textAlign: "center" }}>
          ADD NEW TRAINING
        </DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]}>
              <DateTimePicker
                label="Choose date"
                name="date"
                value={new dayjs(newTraining.date)}
                onChange={(date) => setNewTraining({ ...newTraining, date })}
                ampm={false}
              />
            </DemoContainer>
          </LocalizationProvider>
          <InputLabel style={{ textAlign: "center" }}>Activity</InputLabel>
          <TextField
            type="text"
            onChange={inputChanged}
            placeholder="activity"
            name="activity"
            value={newTraining.activity}
            label="Activity"
          />
          <InputLabel style={{ textAlign: "center" }}>
            Duration (min)
          </InputLabel>
          <TextField
            type="text"
            onChange={inputChanged}
            placeholder="duration"
            name="duration"
            value={newTraining.duration}
            label="Duration"
          />
          <InputLabel style={{ textAlign: "center" }}>
            Customer fullname
          </InputLabel>
          <Select
            value={newTraining.customer}
            onChange={inputChanged}
            name="customer"
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select a customer
            </MenuItem>
            {customers.map((customer) => (
              <MenuItem
                key={customer.links[0].href}
                value={`${customer.firstname} ${customer.lastname}`}
              >
                {`${customer.firstname} ${customer.lastname}`}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addTraining}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddTraining;
