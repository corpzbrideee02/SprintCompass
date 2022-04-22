import React, { useEffect, useReducer, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Paper, Autocomplete, TextField, Button, FormControl, InputLabel, Select,MenuItem, } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import teamServices from "../../services/teamService";
import sprintSubtaskService from "../../services/sprintSubtaskService";
import backlogServices from "../../services/backlogServices";

const AddSprintSubtask = () => {
    let location = useLocation();
    let navigate = useNavigate();
    const team = location.state.teamName;
   const projectName=location.state.projectName;
   const userStoryName=location.state.userStoryName; //replace backlogName with userStoryName
   const sprintNum=location.state.sprintNum;
   const currentIndex=location.state.currentIndex;
    const userStory = location.state.userStory;
    const project = location.state.project;
   
    const initialState = {
        description: "",
        member: "",
        teamMembers: [],
        userSelected: null,
        allSubtasks:[],
        allSprints:[],
        thisSprint:null
        
    };
    const reducer = (state, newState) => ({ ...state, ...newState });
    const [state, setState] = useReducer(reducer, initialState);
    const [statusSelected, setStatusSelected] = useState('');

    useEffect(() => {
        teamServices.teamMembersByProject(team, handlefetchTeam);
        sprintSubtaskService.fetchSprintsByProject(sprintNum,projectName,fetchAllsprints);
        sprintSubtaskService.fetchOneSprint(sprintNum,userStoryName,projectName,fetchOneSprint);

    }, []);

    const handlefetchTeam = (data) => { setState({ teamMembers: data });}

    /* Onchange handle inputs*/
    const handleDescriptionInput = (e) => {setState({ description: e.target.value });};
    const onChangeMembers = (e, selectedOption) => {setState({ userSelected: selectedOption });};
    const handleStatusChange = (event) => { setStatusSelected(event.target.value);};

    
    const onAddSubtaskClicked = () => {
    //     let subtaskToAdd={description: state.description, member:state.userSelected, status: statusSelected,hoursWorked: 0};
    //     let projectData={allSprints:state.allSprints, allSubtasks:state.allSubtasks, subtask:subtaskToAdd, sprint:state.thisSprint, projectName:projectName};
    //    //console.log(state.thisSprint);
    //      sprintSubtaskService.addNewSubtask(sprintNum,userStoryName,projectData,handleAddSubtask);

        userStory.tasks.push({description: state.description, member:state.userSelected, status: statusSelected, hoursWorked: 0});

        backlogServices.updateSprint(project, sprintNum -1, currentIndex, userStory, handleAddSubtask);
    }

    const fetchAllsprints=(data)=>{
        //console.log(data);
        setState({allSprints:data})
    }

    const fetchOneSprint=(data)=>{
          setState({allSubtasks:data.tasks, thisSprint:data})
      }

    

    //neeed for subtask
    const fetchOneBacklog=(data)=>{
      //  setState({allSubtasks:data.tasks, thisBacklog:data})
    }

    const handleAddSubtask=()=>{
        navigate(-3);
        //console.log(data);
    }

console.log(statusSelected)
    return (
        <ThemeProvider theme={theme}>
            <div className="register-background">
                <div className="register-container">
                    <div className="form-content">
                        <div className="titlePage">Add Sprint's Subtask</div>
                        <Paper elevation={10} className="paper-style" style={{ padding: 30 }}>
                            <div className="input-container">
                                <TextField label="Description" value={state.description} onChange={handleDescriptionInput} variant="outlined" className="input-field" />
                                <Autocomplete
                                    style={{ minWidth: "500px",marginBottom:20 }}
                                    data-testid="autocomplete"
                                    value={state.userSelected}
                                    options={state.teamMembers.map((a) => a.email)}
                                    onChange={onChangeMembers}
                                    getOptionLabel={(option) => option}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Assign Member"
                                            variant="outlined"
                                            fullWidth
                                        />
                                    )}
                                />

                                <FormControl fullWidth className="input-field">
                                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                    <Select
                                        value={statusSelected}
                                        label="Status"
                                        onChange={handleStatusChange}
                                    >
                                        <MenuItem value={'Open'}>Open</MenuItem>
                                        <MenuItem value={'Planned'}>Planned</MenuItem>
                                        <MenuItem value={'Development'}>Development</MenuItem>
                                        <MenuItem value={'Testing'}>Testing</MenuItem>
                                        <MenuItem value={'Closed'}>Closed</MenuItem>
                                    </Select>
                                </FormControl>

                                <Button onClick={onAddSubtaskClicked} variant="contained" color="primary"> Add </Button>
                            </div>
                        </Paper>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )

};

export default AddSprintSubtask; 