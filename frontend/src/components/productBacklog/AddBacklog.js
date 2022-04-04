import React, { useEffect, useReducer, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import backlogServices from "../../services/backlogServices";

import { Paper, Autocomplete, TextField, Button } from "@mui/material";

import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import "./backlog.css"

const AddBacklog = () => {
    let location = useLocation();
    let navigate = useNavigate();
    const project = location.state.project;
    //const user =location.state.user;
    console.log(project);

    const initialState = {
        bclog: null,
        asA: "",
        iWantTo: "",
        soIcan: "",
        initialRelativeEstimate: "",
        initialCostEstimate: "",
        priority: ""
    };
    const reducer = (state, newState) => ({ ...state, ...newState });
    const [state, setState] = useReducer(reducer, initialState);

    const handleFetchBlogs = (data) => {
        //console.log(data);
        setState({ bclog: data });
    };

    useEffect(() => {
        backlogServices.fetchBacklogs(project.project, handleFetchBlogs)
    }, []);

    /** onChange handlers */
    const handleAsAInput = (e) => { setState({ asA: e.target.value }) };
    const handleIwantToInput = (e) => { setState({ iWantTo: e.target.value }) };
    const handleSoIcanInput = (e) => { setState({ soIcan: e.target.value }) };
    const handleInitRelEstInput = (e) => { setState({ initialRelativeEstimate: e.target.value }) };
    const handleInitCostEstInput = (e) => { setState({ initialCostEstimate: e.target.value }) };
    const handlePriorityInput = (e) => { setState({ priority: e.target.value }) };


    const onAddBacklogClicked = () => {
        //setAddBacklog({})
        let backlogToAdd = {
            projectName: project.projectName,
            backlog: { asA: state.asA, iWantTo: state.iWantTo, soIcan: state.soIcan, priority: parseInt(state.priority), initialRelativeEstimate: parseInt(state.initialRelativeEstimate), initialCostEstimate: parseFloat(state.initialCostEstimate)},
            allBackLogs: project.backlog,
        }
        backlogServices.addNewBacklog(backlogToAdd,handleAfterAddClick);
        navigate(-1);
    }

    //NOTE: disabled Add button if not all fields are entered
    const emptyorundefined =
        state.asA === undefined ||
        state.asA === "";

    const handleAfterAddClick=()=>{
        setState({
            asA: "",
            iWantTo: "",
            soIcan: "",
            initialRelativeEstimate: "",
            initialCostEstimate: "",
            priority: ""
        });
    }

    return (
        <ThemeProvider theme={theme}>
            <div className="register-background">
                <div className="register-container">
                    <div className="form-content">
                        <div className="titlePage">Add Product Backlog</div>
                        <Paper elevation={10} className="paper-style" style={{ padding: 20 }}>
                            <div className="input-container">
                                <TextField required onChange={handleAsAInput} label="As a" value={state.asA} variant="outlined" className="input-field" />
                                <TextField required onChange={handleIwantToInput} label="I want to" value={state.iWantTo} variant="outlined" className="input-field" />
                                <TextField required onChange={handleSoIcanInput} label="So I can" value={state.soIcan} variant="outlined" className="input-field" />
                                <TextField required onChange={handleInitRelEstInput} label="Initial Relative Estimate" value={state.initialRelativeEstimate} variant="outlined" type="number" className="input-field" />
                                <TextField required onChange={handleInitCostEstInput} label="Initial Cost Estimate" value={state.initialCostEstimate} variant="outlined" className="input-field" />
                                <TextField required onChange={handlePriorityInput} label="Priority" value={state.priority} variant="outlined" className="input-field" />

                                <Button onClick={onAddBacklogClicked} variant="contained" color="primary"> Add </Button>
                            </div>
                        </Paper>
                    </div>
                </div>

            </div>

        </ThemeProvider>
    )

};

export default AddBacklog; 