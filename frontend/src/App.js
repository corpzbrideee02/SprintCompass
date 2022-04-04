import React, { useReducer, useState } from "react";
import { Route, Link, Routes, } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Dashboard from "./components/dashboard/Home";
import ProjectHome from "./components/project/ProjectHome";
import AddProject from "./components/project/AddProject";
import AddNewTeam from "./components/team/AddNewTeam";
import UpdateBacklog from "./components/productBacklog/UpdateBacklog";
import AddBacklog from "./components/productBacklog/AddBacklog";
import AddSprint from "./components/productBacklog/AddSprint";

import {Toolbar, AppBar, Menu,MenuItem,Typography,Card,Snackbar, Button,} from "@mui/material";

import "./App.css";

const App = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout=()=>{
    setAnchorEl(null);
    setState({ firstName: "", lastName: "" });
  }

  const initialState = {
    msg: "",
    snackBarMsg: "",
    contactServer: false,
    firstName:"",
    lastName:""
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

  const msgFromChildComponents = (msg) => {
    setState({ snackBarMsg: msg, contactServer: true });
    };

    const setUpName=({firstName,lastName})=>{
      setState({ firstName: firstName, lastName: lastName });
    };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="black">
              {" "}
              Sprint Compass{" "}
            </Typography>
            {/* only visible if login is successful */} 
              {(state.firstName!==""&&state.lastName!=="")&&
              <>
              <label className="headerUsername">User: {state.firstName} {state.lastName}</label>
              <Button variant="contained" color="primary" onClick={handleClick} style={{ marginLeft: "auto", paddingRight: "1vh",color:"#fff", backgroundColor:"rgb(10, 74, 89)" }}> Menu </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                <MenuItem onClick={handleLogout}>
                  <Link to={"/"}>Logout</Link>
                </MenuItem>
              </Menu>
              </>
              
              }
          </Toolbar>
        </AppBar>
          <Routes>
            <Route path="/" element={<Login dataFromChild={msgFromChildComponents} nameFromChild={setUpName}/>} />
            <Route path="/login" element={<Login dataFromChild={msgFromChildComponents} nameFromChild={setUpName} />}   />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<Register dataFromChild={msgFromChildComponents}/>} />
            <Route path="/addnewteam" element={<AddNewTeam />} />
            <Route path="/addproject" element={<AddProject />} />
            <Route path="/project" element={<ProjectHome />} />
            <Route path="/addbacklog" element={<AddBacklog/>} />
            <Route path="/updatebacklog" element={<UpdateBacklog/>} />
            <Route path="/addsprint" element={<AddSprint/>} />
            <Route path="/logout" element={<Login dataFromChild={msgFromChildComponents}/>} />
          </Routes>


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
