import React, { useEffect, useReducer, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Paper,
  Autocomplete,
  TextField,
  Button,
} from "@mui/material";
import userServices from "../../services/userService";
import teamServices from "../../services/teamService";
import theme from "../../theme";
import { ThemeProvider } from "@mui/material/styles";
import "./team.css";
const AddNewTeam = () => {

  let location = useLocation();
  let navigate = useNavigate();
  const selectedUser = location.state.user;
  //console.log(selectedUser)

  const initialState = {
    users: [],
    teamName: "",
    userSelected: null,
    tempMembersToAdd: [{ firstName: selectedUser.firstName, lastName: selectedUser.lastName, email: selectedUser.email, role: "PMO" }]

  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);

  // const [tempMembersToAdd, setMembersToAdd]= useState([]);

  const handleFetchUsers = (data) => {
    // console.log(data);
    setState({ users: data.filter(d => d.email != selectedUser.email) });
  };

  const handleTeamNameInput = (e) => {
    setState({ teamName: e.target.value });
  };

  useEffect(() => {
    userServices.fetchUsers(handleFetchUsers);
  }, []);

  const handleAfterAddMember = () => {

  };

  const handleAfterCreateNewTeam = () => {
    navigate(-1);
  };


  /* ADD MEMBER BUTTON CLICK */
  const onAddMemberClicked = () => {
    //state.tempMembersToAdd.push(state.userSelected);
    let someUser = state.users.find(e => e.email === state.userSelected);
    let role = (selectedUser.email === state.userSelected ? "PMO" : "Team Member");
    let membersToAdd = { firstName: someUser.firstName, lastName: someUser.lastName, email: state.userSelected, role: role };

    if (someUser !== undefined && state.tempMembersToAdd.find(member => member.email === membersToAdd.email) === undefined)
      state.tempMembersToAdd.push(membersToAdd);    
      setState({ usersSelected: '' });
  }

  const onResetMemberClicked = () => {
    setState({ tempMembersToAdd: [{ firstName: selectedUser.firstName, lastName: selectedUser.lastName, email: selectedUser.email, role: "PMO" }] })
  }

  const onChange = (e, selectedOption) => {
    setState({ userSelected: selectedOption });
  };


  const onCreateNewTeamCLicked = async () => {

    state.tempMembersToAdd.forEach(member => {
      let updateMember = {
        email: member.email,
        team: state.teamName,
      };

      teamServices.updateuserteams(updateMember, handleAfterAddMember);
    });
    
    let createNewTeam = {
      name: state.teamName,
      list: state.tempMembersToAdd
    };

    teamServices.addNewTeam(createNewTeam, handleAfterCreateNewTeam);
  };


  const addDisabled = state.userSelected === null || state.userSelected === "";
  const resetDisabled = state.tempMembersToAdd.length === 0;
  const createDisabled = (state.teamName === undefined || state.teamName === "") && (state.tempMembersToAdd.length === 1);

  return (
    <ThemeProvider theme={theme}>
      <div className="register-background">
        <div className="register-container">
          <div className="form-content">
            <div className="titlePage">Create New Team</div>
            <Paper elevation={10} className="paper-style" style={{ padding: 60 }}>
              <div className="input-container">
                <TextField
                  onChange={handleTeamNameInput}
                  label="Team's Name"
                  value={state.teamName}
                  variant="outlined"
                  className="input-field"
                />
                <Autocomplete
                  data-testid="autocomplete"
                  value={state.userSelected}
                  options={state.users.map((a) => a.email)}
                  onChange={onChange}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="users"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                <div className="teamButtonContainer">
                  <Button onClick={onAddMemberClicked} variant="contained" color="primary" className="buttonTeam" disabled={addDisabled}> Add Member </Button>

                  <Button onClick={onResetMemberClicked} variant="contained" color="primary" className="buttonTeam" disabled={resetDisabled}> Reset</Button>

                  <Button onClick={onCreateNewTeamCLicked} variant="contained" color="primary" className="buttonTeam" disabled={createDisabled}> Create Team </Button>

                </div>

                {state.tempMembersToAdd.map((e, index) =>
                  <p key={index}>{`${e.firstName} ${e.lastName}`}<br /></p>
                )}
              </div>

            </Paper>

          </div>
        </div>
      </div>

    </ThemeProvider>
  )

}

export default AddNewTeam;