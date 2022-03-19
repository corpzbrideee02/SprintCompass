import React from "react";

import { Paper, Button, TextField, Snackbar } from "@mui/material";
import "./Register.css";

import { Link } from "react-router-dom";

const Register = () => {

  const initialState = {
    showMsg: false,
    snackbarMsg: "",
    username: "",
    password: "",
    firstname: "",
    lastname: "",
  };

  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);

  const onRegisterClick = async () => {
    let user = {
      firstname: state.firstname,
      lastname: state.lastname,
      username: state.username,
      password: state.password,
    };

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    try {
      let query = JSON.stringify({
        query: `mutation {adduser(firstName: "${user.firstname}", lastName: "${user.lastname}", username: "${user.username}", password: "${user.password}" )
                {firstName, lastName, username, password}}`,
      });

      let response = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: query,
      });

      let json = await response.json();

      setState({
        showMsg: true,
        snackbarMsg: `User ${json.data.adduser.firstname} added!`,
        username: "",
        password: "",
        firstname: "",
        lastname: "",
      });

    }
    catch (error) {
      setState({
        snackbarMsg: `${error.message} - user failed to register`,
        showMsg: true,
      });
    }

  };


  const handleUsernameInput = (e) => {
    setState({ username: e.target.value });
  };

  const handlePasswordInput = (e) => {
    setState({ password: e.target.value });
  };

  const handleFirstnameInput = (e) => {
    setState({ firstname: e.target.value });
  };

  const handleLastnameInput = (e) => {
    setState({ lastname: e.target.value });
  };

  const snackbarClose = () => {
    setState({ showMsg: false });
  };

  return (
    <div className="register-background">
      <div className="register-container">
        <div className="form-content">
          <Paper elevation={10} className="paper-style" style={{ padding: 20 }}>
            <div className="input-container">
              <label className="input-label">First Name</label>
              <TextField
                onChange={handleFirstnameInput}
                name="firstname"
                id="firstname"
                variant="outlined"
                className="input-field"
                placeholder="John"
                required={true}
              />
              <label className="input-label">Last Name</label>
              <TextField
                onChange={handleLastnameInput}
                name="lastname"
                id="lastname"
                variant="outlined"
                className="input-field"
                placeholder="Smith"
                required={true}
              />

              <label className="input-label">Username</label>
              <TextField
                onChange={handleUsernameInput}
                name="email"
                id="email"
                variant="outlined"
                className="input-field"
                placeholder="johnsmith@gmail.com"
                required={true}
              />

              <label className="input-label">Password</label>
              <TextField
                onChange={handlePasswordInput}
                name="password"
                id="password"
                variant="outlined"
                className="input-field"
                placeholder="xxxxxxxxxxxxxxxxx"
                required={true}
              />
              <Button type="submit" fullWidth variant="contained" size="large" onClick={onRegisterClick}>
                Register
              </Button>

              <hr />
              <div className="register-section">
                <p>Already have an account?</p>
                <Link to="/login">
                  <Button
                    variant="outlined"
                    className="register-btn"
                    size="large"
                  >
                    {" "}
                    Sign in{" "}
                  </Button>
                </Link>
              </div>
            </div>
            <Snackbar
                open={state.showMsg}
                message={state.snackbarMsg}
                autoHideDuration={4000}
                onClose={snackbarClose}
            />
          </Paper>
        </div>
      </div>
    </div>
  );
};
export default Register;
