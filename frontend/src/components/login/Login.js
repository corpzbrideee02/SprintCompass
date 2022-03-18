import React from "react";

import { Paper, Button, TextField } from "@mui/material";

import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
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
              <Button type="submit" fullWidth variant="contained" size="large">
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
