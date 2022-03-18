import React, { useReducer, useState } from "react";
import { Route, Link, Routes, } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

import Dashboard from "./components/dashboard/Home";
import {
  Toolbar,
  AppBar,
  Menu,
  MenuItem,
  Typography,
  Card,
  Snackbar,
  Button,
} from "@mui/material";

import "./App.css";
const App = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const initialState = {
    msg: "",
    snackBarMsg: "",
    contactServer: false,
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);

  const snackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({
      msg: `data loaded`,
      contactServer: false,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="black">
            {" "}
            Sprint Compass{" "}
          </Typography>

          <label className="headerUsername">{"   "} username</label> {/* username should be a props */}
          
            <Button variant="contained" color="primary" onClick={handleClick} style={{ marginLeft: "auto", paddingRight: "1vh" }}>
              Menu
              </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            
            <MenuItem onClick={handleClose}>
              <Link to={"/dashboard"}>Dashboard</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to={"/login"}>Login</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to={"/register"}>Register</Link>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Card style={{ marginTop: "2px" }}>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Card>

      <Card className="footer" color="primary">
        <Typography variant="h7" color="black">
          Huron Heights Hive - &copy; {new Date().getFullYear()}
        </Typography>
      </Card>

      <Snackbar
        open={state.contactServer}
        message={state.snackBarMsg}
        autoHideDuration={3000}
        onClose={snackbarClose}
      />
    </ThemeProvider>
  );
};
export default App;
