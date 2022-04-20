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
              
              <TextField
                onChange={handleFirstnameInput}
                name="firstname"
                id="firstname"
                variant="outlined"
                className="input-field"
                label="First Name"
                required={true}
              />
              
              <TextField
                onChange={handleLastnameInput}
                name="lastname"
                id="lastname"
                variant="outlined"
                className="input-field"
                label="Last Name"
                required={true}
              />

              
              <TextField
                onChange={handleEmailInput}
                name="email"
                id="email"
                variant="outlined"
                className="input-field"
                label="Email"
                required={true}
              />

              
              <TextField
                onChange={handlePasswordInput}
                name="password"
                id="password"
                type="password"
                variant="outlined"
                className="input-field"
                label="Password"
                required={true}
              />
               <div className="register-section">
              <Button type="submit" variant="contained" size="large" onClick={onRegisterClick} disabled={emptyorundefined} >
                Register
              </Button>
              </div>
              <hr />
              <div className="register-section">
                <p>Already have an account?</p>
                <Link to="/login">
                  <Button
                    variant="outlined"
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
