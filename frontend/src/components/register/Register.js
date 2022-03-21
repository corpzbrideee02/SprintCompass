import React ,{useReducer} from "react";
import { Paper, Button, TextField,} from "@mui/material";
import "./Register.css";
import { Link } from "react-router-dom";
import loginRegisterServices from "../../services/loginRegisterService";


const Register = (props) => {

  const initialState = {
    showMsg: false,
    snackbarMsg: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  };

  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);

  const handleRegister =()=>{
    setState({
      email: "",
      password: "",
      firstname: "",
      lastname: ""});
  }

  const emptyorundefined =
  state.email === undefined ||
  state.email === "" ||
  state.password === null ||
  state.password === ""||
  state.firstname === null ||
  state.firstname === ""||
  state.lastname === null ||
  state.lastname=== "";

  const onRegisterClick = async () => {
    let user = {
      firstname: state.firstname,
      lastname: state.lastname,
      email: state.email,
      password: state.password,
    };

    loginRegisterServices.registerUser(props,user,handleRegister);
  };


  const handleEmailInput = (e) => {
    setState({ email: e.target.value });
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

              <label className="input-label">Email</label>
              <TextField
                onChange={handleEmailInput}
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
              <Button type="submit" fullWidth variant="contained" size="large" onClick={onRegisterClick} disabled={emptyorundefined}>
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
