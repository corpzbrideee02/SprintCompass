import React, { useEffect, useReducer, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import {
    Paper,
    TableContainer,
    TableCell,
    TableRow,
    Table,
    TableBody,
    TableHead,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import backlogServices from "../../services/backlogServices";

const UpdateBacklog = () => {
    let location = useLocation();
    const backlog = location.state.backlog;
    console.log(backlog)
    const initialState = {
        bclog: null,
        asA: backlog.asA,
        iWantTo: backlog.iWantTo,
        soIcan: backlog.soIcan,
        priority: backlog.priority
        

    };
    const reducer = (state, newState) => ({ ...state, ...newState });
    const [state, setState] = useReducer(reducer, initialState);

    const handleFetchBlogs = (data) => {
        console.log(data);
        setState({ bclog: data });
    };

    useEffect(() => {
        // backlogServices.fetchBacklogs(backlog.projectName,handleFetchBlogs)
    }, []);
    const [selectSprint, setSelectSprint] = useState('');

    const handleSprintChange = (event) => {
        setSelectSprint(event.target.value);
    };

    /**onchange handler */
    const handleAsAInput = (e) => { setState({ asA: e.target.value }) };
    const handleIwantToInput = (e) => { setState({ iWantTo: e.target.value }) };
    const handleSoIcanInput = (e) => { setState({ soIcan: e.target.value }) };
    const handlePriorityInput = (e) => { setState({ priority: e.target.value }) };

    //will put 1. Product Backlogs TextFields (to edit), 2. table of subtasks (see Figma Design-> View User Story) 3. A dropdown to Move Product Backlogs to Sprints (see Figma Design-> View User Story  bottom)
    return (
        <ThemeProvider theme={theme}>
            <div className="backlogs-container">
                <div className="form-content">
                    <div className="titlePage">Update Product Backlog</div>
                    <Paper elevation={10} className="paper-style" style={{ padding: 20 }}>
                        <div className="input-container">
                            <TextField required onChange={handleAsAInput} label="As a" value={state.asA} variant="outlined" className="input-field" />
                            <TextField required onChange={handleIwantToInput} label="I want to" value={state.iWantTo} variant="outlined" className="input-field" />
                            <TextField required label="So I can" onChange={handleSoIcanInput} value={state.soIcan} variant="outlined" className="input-field" />
                            <TextField required label="Priority" onChange={handlePriorityInput} value={state.priority} variant="outlined" className="input-field" />
                        </div>
                    </Paper>
                </div>
                <div>

                {/* NOTE: will change this */}    
                <div className="input-container">
                    <FormControl fullWidth  className="input-field">
                        <InputLabel id="demo-simple-select-label">Move to Sprint</InputLabel>
                        <Select
                            value={selectSprint}
                            label="Move to Sprint"
                            onChange={handleSprintChange}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                        </Select>
                    </FormControl>
                    
                    <Button variant="contained" style={{width:100}}> Save</Button>
                    </div>
                </div>

            </div>

            {/* NOTE: connect this to backend (temporarily hardcoded)*/}
            <Paper style={{ padding: 30, marginTop: 50, minWidth: 350 }}>
                <div className="tableCustomHeader"> SubTasks</div>
                <TableContainer>
                    <Table sx={{ minWidth: 350 }} aria-label="simple table">
                        <TableHead>
                            <TableRow className="tableHead"> {``}
                                <TableCell align="center" variant="head"> {`Description`} </TableCell>
                                <TableCell align="center" variant="head"> {`Member`} </TableCell>
                                <TableCell align="center" variant="head"> {`Status`}</TableCell>
                                <TableCell align="center" variant="head"> {`Actions `}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow hover>
                                <TableCell component="th" scope="row" color="primary" align="center" > create a resolver that updates project's sprints </TableCell>
                                <TableCell component="th" scope="row" color="primary" align="center" > Example</TableCell>
                                <TableCell component="th" scope="row" color="primary" align="center" > Example </TableCell>
                                <TableCell component="th" scope="row" color="primary" align="center" >
                                    <Button variant="contained">View Subtask</Button>
                                </TableCell>
                            </TableRow>

                        </TableBody>

                    </Table>
                </TableContainer>
            </Paper>


        </ThemeProvider >
    )

};

export default UpdateBacklog; 