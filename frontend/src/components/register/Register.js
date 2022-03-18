import React from "react";

import { Paper, Button, TextField } from "@mui/material";
import "./Register.css";

import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="register-background">
      <div className="register-container">
        <div className="form-content">
          <Paper elevation={10} className="paper-style" style={{ padding: 20 }}>
            <div className="input-container">
              <label className="input-label">First Name</label>
              <TextField
                name="firstname"
                id="firstname"
                variant="outlined"
                className="input-field"
                placeholder="John"
                required={true}
              />
              <label className="input-label">Last Name</label>
              <TextField
                name="lastname"
                id="lastname"
                variant="outlined"
                className="input-field"
                placeholder="Smith"
                required={true}
              />

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
              <Button type="submit" fullWidth variant="contained" size="large">
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
          </Paper>
        </div>
      </div>
    </div>
  );
};
export default Register;
