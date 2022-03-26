import React, { useEffect, useReducer, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Paper, Autocomplete, TextField, Button} from "@mui/material";
import teamServices from "../../services/teamService";
import projectServices from "../../services/projectService";
import theme from "../../theme";
import { ThemeProvider } from "@mui/material/styles";

const AddProject = () => {
  let location = useLocation();
  const user = location.state.user;
  const initialState = {
    teams: [],
    projectName: "",
    startDate: "",
    velocity: "",
    hoursToStoryPoint: 0,
    totalEstimatedStoryPoints: 0,
    totalEstimatedCost: 0,
    teamSelected: null,

  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);

  const handleFetchTeams = (data) => {
    // console.log(data);
    setState({ teams: data });
  };

  useEffect(() => {
    teamServices.fetchTeams(handleFetchTeams);
  }, []);



  const onChange = (e, selectedOption) => {
    setState({ teamSelected: selectedOption });
  };

  /* Onchange handle inputs*/
  const handleProjectNameInput = (e) => {
    setState({ projectName: e.target.value });
  };
  const handleStartDateInput = (e) => {
    setState({ startDate: e.target.value });
  };
  const handleVelocityInput = (e) => {
    setState({ velocity: e.target.value });
  };
  const handleHoursStoryPointsInput = (e) => {
    setState({ hoursToStoryPoint: e.target.value });
  };
  const handleTotEstStoryPointsInput = (e) => {
    setState({ totalEstimatedStoryPoints: e.target.value });
  };
  const handleTotEstCostInput = (e) => {
    setState({ totalEstimatedCost: e.target.value });
  };


  const handleAfterCreateNewProj = () => {

  };

  /* Add Button */
  const onAddProjectClicked = async () => {
    let teamSelectedToAdd = state.teams.find(x => x.name === state.teamSelected);
    let projectToAdd = {
      team: teamSelectedToAdd,
      projectName: state.projectName,
      startDate: state.startDate,
      velocity: parseInt(state.velocity),
      hoursToStoryPoint: parseInt(state.hoursToStoryPoint),
      totalEstimatedStoryPoints: parseInt(state.totalEstimatedStoryPoints),
      totalEstimatedCost: parseFloat(state.totalEstimatedCost),
    };
    projectServices.addNewProject(projectToAdd, handleAfterCreateNewProj);
  };

  const emptyorundefined =
    state.projectName === undefined ||
    state.projectName === "" ||
    state.startDate === undefined ||
    state.startDate === "" ||
    state.velocity === undefined ||
    state.velocity === "" ||
    state.hoursToStoryPoint === undefined ||
    state.hoursToStoryPoint === "" ||
    state.totalEstimatedStoryPoints === undefined ||
    state.totalEstimatedStoryPoints === "" ||
    state.totalEstimatedCost === undefined ||
    state.totalEstimatedCost === "" ||
    state.teamSelected === null
    ;


  return (
    <ThemeProvider theme={theme}>
      <div className="register-background">
        <div className="register-container">
          <div className="form-content">
            <div className="titlePage">Create New Project</div>
            <Paper elevation={10} className="paper-style" style={{ padding: 20 }}>
              <div className="input-container">
                <TextField required onChange={handleProjectNameInput} label="Project Name" value={state.projectName} variant="outlined" className="input-field" />

                <TextField required onChange={handleStartDateInput} label="Start Date" value={state.startDate} variant="outlined" className="input-field" />

                <TextField required onChange={handleVelocityInput} label="Velocity" value={state.velocity} variant="outlined" type="number" className="input-field" />

                <TextField required onChange={handleHoursStoryPointsInput} label="Hours To Story Point" value={state.hoursToStoryPoint} variant="outlined" type="number" className="input-field" />

                <TextField required onChange={handleTotEstStoryPointsInput} label="Total Estimated Story Points" value={state.totalEstimatedStoryPoints} variant="outlined" type="number" className="input-field" />

                <TextField required onChange={handleTotEstCostInput} label="Total Estimated Cost" value={state.totalEstimatedCost} variant="outlined" className="input-field" />

                <Autocomplete
                  data-testid="autocomplete"
                  value={state.teamSelected}
                  options={state.teams.map((a) => a.name)}
                  onChange={onChange}
                  getOptionLabel={(option) => option}
                  style={{ margin: "20px auto" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="teams"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />

                <Button onClick={onAddProjectClicked} variant="contained" color="primary" disabled={emptyorundefined} > Add Project</Button>
              </div>
            </Paper>
          </div>
        </div>

      </div>

    </ThemeProvider>

  )

}

export default AddProject;