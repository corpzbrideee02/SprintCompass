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
            
              <Button type="submit" fullWidth variant="contained" size="large" onClick={onLoginBtnClicked} disabled={emptyorundefined}>
                Sign In
              </Button>

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