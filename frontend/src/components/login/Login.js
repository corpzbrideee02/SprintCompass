import React, {useReducer} from "react";
import { Paper, Button, TextField } from "@mui/material";
import { Link,useNavigate } from "react-router-dom";
import "./Login.css";

import loginRegisterServices from "../../services/loginRegisterService";
const Login = (props) => {

  const initialState = {
    email: "",
    password: "",
    success: false,
    userInfo:null
    
  };

  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);

  const navigate = useNavigate();

  const loginSuccess=(data)=>{
    //console.log(data);
    setState({success: true,userInfo:data});
    navigate('/dashboard', { state: { userInfo:data}}); 
    props.nameFromChild({firstName:data.firstName, lastName:data.lastName});
  };
  

  const onLoginBtnClicked = async () => {
    let user= {
      email: state.email,
      password: state.password,
    };
    loginRegisterServices.userLogin(props,user,loginSuccess);
  };

  const handleEmailInput = (e) => {
    setState({ email: e.target.value });
  };

  const handlePasswordInput = (e) => {
    setState({ password: e.target.value });
  };

  const emptyorundefined =
  state.email === undefined ||
  state.email === "" ||
  state.password === null ||
  state.password === "";


  return (
    <div className="section-container">
      <div className="login-container">
        <Paper elevation={10} className="paper-style">
          <div className="input-container">
            <TextField
              onChange={handleEmailInput}
              label="Email"
              name="email"
              id="email"
              variant="outlined"
              className="input-field"
              required={true}
            />

            <TextField
              onChange={handlePasswordInput}
              label="Password"
              name="password"
              id="password"
              type="password"
              variant="outlined"
              className="input-field"
              required={true}
            />
             <div className="register-section">
              <Button type="submit" size="large" variant="contained" onClick={onLoginBtnClicked} disabled={emptyorundefined}>
                Sign In
              </Button>
              </div>
            <hr />
            <div className="register-section">
              <p>Don't have an Account?</p>
              <Link to="/register">
                <Button variant="outlined" > Sign Up </Button>
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