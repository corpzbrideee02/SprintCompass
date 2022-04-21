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

import subtaskServices from "../../services/subtaskServices";

const UpdateSubtask = () => {
    let location = useLocation();
    let navigate = useNavigate();
    const subtask = location.state.subtask;
    const team = location.state.teamName;
    const projectName=location.state.projectName;
    const backlogName=location.state.backlogName;

    const subtaskConstant=location.state.subtask.description; //to be used as an identifier

    const initialState = {
        description: subtask.description,
        memberSelected: subtask.member,
        teamMembers: [],
        allSubtasks:[],
        allBacklogs:[],
        thisBacklog:null

    };
    const reducer = (state, newState) => ({ ...state, ...newState });
    const [state, setState] = useReducer(reducer, initialState);
    const [statusSelected, setStatusSelected] = useState(subtask.status);


    useEffect(() => {
        teamServices.teamMembersByProject(team, handlefetchTeam);
        subtaskServices.fetchBacklogsByProject(projectName, fetchAllbacklogs);
        subtaskServices.fetchOneBacklog(backlogName,projectName,fetchOneBacklog);
    }, []);


    const handlefetchTeam = (data) => {
        setState({ teamMembers: data });
    }

    const onSaveSubtaskClicked=()=>{
        let subtaskToSave={description: state.description, member:state.memberSelected, status: statusSelected, hoursWorked: 0};
        const index = state.allSubtasks.findIndex(item => item.description === subtaskConstant);
        let newallSubtasks = [...state.allSubtasks]; // important to create a copy,
        newallSubtasks[index] = subtaskToSave;
        let projectData={allBackLogs:state.allBackLogs, newallSubtasks:newallSubtasks, backlog:state.thisBacklog, projectName:projectName};
        subtaskServices.updateSubtask(backlogName,projectData,handleSaveSubtask)
       
        
    }

    const handleSaveSubtask=()=>{
        navigate(-2); //to refresh the list, NOTE: might change this later
    }


    /* fetch data */
    const fetchAllbacklogs=(data)=>{
        setState({allBackLogs:data.backlog,})
    }

    //neeed for subtask
    const fetchOneBacklog=(data)=>{
        setState({allSubtasks:data.tasks, thisBacklog:data})
    }

    /**onchange handler */
    const handleDescriptionInput = (e) => {setState({ description: e.target.value });};
    const onChangeMembers = (e, selectedOption) => {setState({ memberSelected: selectedOption });};
    const handleStatusChange = (event) => {setStatusSelected(event.target.value);};

    console.log(subtaskConstant)

    return (
        <ThemeProvider theme={theme}>
            <div className="backlogs-container">
                <div className="form-content">
                    <div className="titlePage">Update Subtask</div>
                    <Paper elevation={10} className="paper-style" style={{ padding: 30 }}>
                        <div className="input-container">
                            <TextField required label="Description" value={state.description} onChange={handleDescriptionInput} variant="outlined" className="input-field" />
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

export default UpdateSubtask; 