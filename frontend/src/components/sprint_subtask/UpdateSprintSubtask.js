import React, { useEffect, useReducer, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import {
    Paper,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Autocomplete
} from "@mui/material";
import { Link, useLocation,useNavigate } from "react-router-dom";
import teamServices from "../../services/teamService";
import backlogServices from "../../services/backlogServices";
import sprintSubtaskService from "../../services/sprintSubtaskService";

const UpdateSprintSubtask = () => {
    let location = useLocation();
    let navigate = useNavigate();
    const subtask = location.state.subtask;
    const team = location.state.teamName;
    const projectName=location.state.projectName;
    const userStoryName=location.state.userStoryName;
    const sprintNum=location.state.sprintNum;
    const currentIndex=location.state.currentIndex;
    const userStory = location.state.userStory;
    const subtaskIndex = location.state.subtaskIndex;
    const project = location.state.project;

    const subtaskConstant=location.state.subtask.description; //to be used as an identifier

    const initialState = {
        description: subtask.description,
        memberSelected: subtask.member,
        hoursWorked: subtask.hoursWorked,
        teamMembers: [],
        allSubtasks:[],
        allSprints:[],
        thisSprint:null

    };
    const reducer = (state, newState) => ({ ...state, ...newState });
    const [state, setState] = useReducer(reducer, initialState);
    const [statusSelected, setStatusSelected] = useState(subtask.status);


    useEffect(() => {
        teamServices.teamMembersByProject(team, handlefetchTeam);
        sprintSubtaskService.fetchSprintsByProject(sprintNum,projectName,fetchAllsprints);
        sprintSubtaskService.fetchOneSprint(sprintNum,userStoryName,projectName,fetchOneSprint);
    }, []);


    const handlefetchTeam = (data) => {
        setState({ teamMembers: data });
    }

    const onSaveSubtaskClicked=()=>{
        // let subtaskToSave={description: state.description, member:state.memberSelected, status: statusSelected, hoursWorked: state.hoursWorked};
        // const index = state.allSubtasks.findIndex(item => item.description === subtaskConstant);
        // let newallSubtasks = [...state.allSubtasks]; // important to create a copy,
        // newallSubtasks[index] = subtaskToSave;
        // let projectData={allSprints:state.allSprints, newallSubtasks:newallSubtasks, sprint:state.thisSprint, projectName:projectName};
        // console.log(projectData);
        // sprintSubtaskService.updateSprintSubtask(sprintNum,userStoryName,projectData,handleSaveSubtask)

        userStory.tasks[subtaskIndex] = {description: state.description, member:state.memberSelected, status: statusSelected, hoursWorked: state.hoursWorked};

        backlogServices.updateSprint(project, sprintNum -1, currentIndex, userStory, handleSaveSubtask);
    }

    const handleSaveSubtask=()=>{
        navigate(-3); //to refresh the list, NOTE: might change this later
    }


      const fetchAllsprints=(data)=>{
        //console.log(data);
        setState({allSprints:data})
    }

    const fetchOneSprint=(data)=>{
          setState({allSubtasks:data.tasks, thisSprint:data})
      }

    /**onchange handler */
    const handleDescriptionInput = (e) => {setState({ description: e.target.value });};
    const onChangeMembers = (e, selectedOption) => {setState({ memberSelected: selectedOption });};
    const handleStatusChange = (event) => {setStatusSelected(event.target.value);};
    const handleHoursWorkedChange = (e) => {setState({ hoursWorked: e.target.value });};

    console.log(subtaskConstant)

    return (
        <ThemeProvider theme={theme}>
            <div className="backlogs-container">
                <div className="form-content">
                    <div className="titlePage">Update Sprint's Subtask</div>
                    <Paper elevation={10} className="paper-style" style={{ padding: 30 }}>
                        <div className="input-container">
                            <TextField required label="Description" value={state.description} onChange={handleDescriptionInput} variant="outlined" className="input-field" />
                            <TextField required label="Hours Worked" value={state.hoursWorked} onChange={handleHoursWorkedChange} variant="outlined" type="number" className="input-field" />
                            <Autocomplete
                                style={{ minWidth: "500px", marginBottom: 20 }}
                                data-testid="autocomplete"
                                value={state.memberSelected}
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
                            <Button onClick={onSaveSubtaskClicked} variant="contained" color="primary"> Save </Button>
                        </div>
                    </Paper>
                </div>

            </div>


        </ThemeProvider >
    )

};

export default UpdateSprintSubtask; 