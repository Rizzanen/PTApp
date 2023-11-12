import "./App.css";
import { Link, Outlet } from "react-router-dom";
import { AppBar, Typography, Toolbar } from "@mui/material";

function App() {
  return (
    <>
      <div className="App">
        <div className="header">Personal Trainer App</div>
        <div className="navigation">
          <nav>
            <Link to={"/"} className="link">
              Customers
            </Link>
            <Link to={"/trainingList"} className="link">
              Trainings
            </Link>
            <Link to={"/trainingCalendar"} className="link">
              Training calendar
            </Link>
            <Link to={"/statistics"} className="link">
              Statistics
            </Link>
          </nav>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default App;
