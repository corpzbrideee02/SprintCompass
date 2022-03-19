import React, {useReducer, useState} from "react";

import { Paper, Button, TextField } from "@mui/material";

import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {

  const initialState = {
    username: "",
    password: "",
    success: false,
  };

  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);

  const onLoginBtnClicked = async () => {

    let user= {
      username: state.username,
      password: state.password,
    };


    try {
      let response = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({query: `query {userlogin(username: "${user.username}", password: "${user.password}"){username,password}}`})
      });


      let json = await response.json();
      if (json.data.username == user.username && json.data.password == user.password) { //Success
        setState({
          success: true,
        });
      }

      setState({
        username: "",
        password: "",
      });
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="section-container">
      <div className="login-container">
        <Paper elevation={10} className="paper-style">
          <div className="input-container">
            <label className="input-label">Username</label>
            <TextField
              name="email"
              id="email"
              variant="outlined"
              className="input-field"
              placeholder="johnsmith@gmail.com"
              required={true}
            />

            <label className="input-label">Password</label>
            <TextField
              name="password"
              id="password"
              variant="outlined"
              className="input-field"
              placeholder="xxxxxxxxxxxxxxxxx"
              required={true}
            />
            <Link to="/dashboard"> {/* will only proceed to dashboard if user is authenticated */}
              <Button type="submit" fullWidth variant="contained" size="large" onClick={onLoginBtnClicked}>
                Sign In
              </Button>
            </Link>

            <hr />
            <div className="register-section">
              <p>Don't have an Account?</p>
              <Link to="/register">
                <Button
                  variant="outlined"
                  className="register-btn"
                  size="large"
                >
                  {" "}
                  Sign Up{" "}
                </Button>
              </Link>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
};
export default Login;

//TODO: Put this in logic area
/*const ConditionalLink = ({ children, to, condition }) => (!!condition && to)
    ? <Link to={to}>{children}</Link>
    : <>{children}</>;*/

//TODO: Put this in the jsx
/*<ConditionalLink to="/path" condition={state.success == true}>
  <Button type="submit" fullWidth variant="contained" size="large" onClick={onLoginBtnClicked}>
    Sign In
  </Button>
</ConditionalLink>*/