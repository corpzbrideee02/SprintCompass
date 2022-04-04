import React, { useEffect, useReducer, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import backlogServices from "../../services/backlogServices";

import { Paper, Autocomplete, TextField, Button } from "@mui/material";
import DatePicker from "react-datepicker";
import "./datepicker.css"
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import "./backlog.css"

const AddSprint = () => {
    let location = useLocation();
    let navigate = useNavigate();
    const project = location.state.project;
    //const user =location.state.user;
    console.log(project);

    const initialState = {
        startDate: false,
        endDate: false,
        minDate: new Date(),
        disabled: true
    };
    const reducer = (state, newState) => ({ ...state, ...newState });
    const [state, setState] = useReducer(reducer, initialState);

    useEffect(() => {

        if (project.sprints.length > 0)
        {
            const today = new Date();
            let endDate = project.sprints[project.sprints.length - 1].endDate;
            let dateArray = endDate.split("/");
            let endDateofLastSprint = new Date(`${dateArray[2]}-${dateArray[0]}-${dateArray[1]}`);

            if ( endDateofLastSprint >= state.minDate)
            {
                let newMinDate = new Date(endDateofLastSprint.setDate(endDateofLastSprint.getDate() + 1));

                setState({
                    minDate: newMinDate
                })
            }
        } 
    }, []);

    const handleStartDateInput = (value) => {
        let originalDate = new Date(value)
;       let twoWeeksLater = new Date(originalDate.setDate(originalDate.getDate() + 13));
        setState({ startDate: value, endDate: twoWeeksLater.toLocaleDateString()});
      };

    const onAddSprintClicked = () => {

        let sprintToAdd = {
            projectName: project.projectName,
            startDate: state.startDate.toLocaleDateString(),
            endDate: state.endDate
        }
        backlogServices.addNewSprint(sprintToAdd,handleAfterAddClick)
        // navigate(-1);
    }

    //NOTE: disabled Add button if not all fields are entered
    const emptyorundefined =
        state.asA === undefined ||
        state.asA === "";

    const handleAfterAddClick=()=>{
        setState({
            startDate: false,
            endDate: false,
        });
    }

    return (
        <ThemeProvider theme={theme}>
            <div className="register-background">
                <div className="register-container">
                    <div className="form-content">
                        <div className="titlePage">Add Sprint</div>
                        <Paper elevation={10} className="paper-style" style={{ padding: 20 }}>
                            <div className="input-container">
                                <TextField disabled={state.disabled} label="Sprint #" value={project.sprints.length + 1} variant="outlined" type="number" className="input-field" />
                                <DatePicker required selected={state.startDate} onChange={(date) => handleStartDateInput(date)} minDate={state.minDate} placeholderText="Start Date *" variant="outlined" className="input-field" />
                                <TextField disabled={state.disabled} label="End Date" value={state.endDate} variant="outlined" className="input-field" />
                                
                                <Button onClick={onAddSprintClicked} variant="contained" color="primary"> Add </Button>
                            </div>
                        </Paper>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )

};

export default AddSprint; 