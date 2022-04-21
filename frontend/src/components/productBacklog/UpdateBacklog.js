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
import { Link, useLocation, useNavigate } from "react-router-dom";
import backlogServices from "../../services/backlogServices";

const UpdateBacklog = () => {
    let location = useLocation();
    let navigate = useNavigate();
    const backlog = location.state.backlog;
    let sprints = location.state.sprints;
    let project = location.state.project;
    let index = location.state.index;
    console.log(backlog)
    const teamName = location.state.team;
    const projectName = location.state.projectName;

    const initialState = {
        bclog: null,
        asA: backlog.asA,
        iWantTo: backlog.iWantTo,
        soIcan: backlog.soIcan,
        priority: backlog.priority,
        subtasks: backlog.tasks

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

    const updateUserStory = () => {

        if (selectSprint === undefined || selectSprint === '') //save user story changes
        {
            console.log("save user story");

            project.backlog[index] = {
                asA: state.asA,
                iWantTo: state.iWantTo,
                soIcan: state.soIcan,
                priority: state.priority,
                tasks: state.subtasks,
                initialRelativeEstimate: backlog.initialRelativeEstimate,
                initialCostEstimate: backlog.initialCostEstimate
            };

            backlogServices.updateBacklog(project, navigate(-1));
        }
        else // move to sprint
        {
            project.backlog.splice(index, 1); // remove from backlog
            backlogServices.updateBacklog(project, navigate(-1));

            console.log("move to sprint");

            let userStory = {
                asA: state.asA,
                iWantTo: state.iWantTo,
                soIcan: state.soIcan,
                priority: state.priority,
                tasks: state.subtasks,
                initialRelativeEstimate: backlog.initialRelativeEstimate,
                initialCostEstimate: backlog.initialCostEstimate
            }

            backlogServices.updateSprints(project, selectSprint, -1, userStory, navigate(-1));
        }
    };

    //will put 1. Product Backlogs TextFields (to edit), 2. table of subtasks (see Figma Design-> View User Story) 3. A dropdown to Move Product Backlogs to Sprints (see Figma Design-> View User Story  bottom)
    return (
        <ThemeProvider theme={theme}>
            <div className="backlogs-container">
                <div className="form-content">
                    <div className="titlePage">Update Product Backlog</div>
                    <Paper elevation={10} className="paper-style" style={{ padding: 10 }}>
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
                        <FormControl fullWidth className="input-field">
                            <InputLabel id="demo-simple-select-label">Move to Sprint</InputLabel>
                            <Select
                                value={selectSprint}
                                label="Move to Sprint"
                                onChange={handleSprintChange}
                            >
                                {sprints.map((row, index) => (
                                    <MenuItem value={index}>{index + 1}</MenuItem>
                                ))}
                                {/* <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem> */}
                            </Select>
                        </FormControl>

                        <Button variant="contained" style={{ width: 100 }} onClick={() => updateUserStory()}> Save</Button>
                    </div>
                </div>

            </div>

            <div className="addButton">
                <Link to={"/addsubtask"} state={{ teamName: teamName, projectName: projectName, backlogName: state.iWantTo }} >
                    <Button variant="contained" style={{ color: "#fff", backgroundColor: "rgb(10, 74, 89)" }} > Add Subtask</Button>
                </Link>
            </div>

            {/* NOTE: connect this to backend (temporarily hardcoded)*/}
            <Paper style={{ padding: 20 }}>
                <div className="tableCustomHeader"> SubTasks</div>
                <TableContainer>
                    <Table sx={{ minWidth: 350 }} aria-label="simple table">
                        <TableHead>
                            <TableRow className="tableHead"> {``}
                                <TableCell size="small" align="center" variant="head"> {`Description`} </TableCell>
                                <TableCell size="small" align="center" variant="head"> {`Member`} </TableCell>
                                <TableCell size="small" align="center" variant="head"> {`Status`}</TableCell>
                                <TableCell size="small" align="center" variant="head"> {`Actions `}</TableCell>
                            </TableRow>
                        </TableHead>

                        {state.subtasks != undefined && state.subtasks.length > 0 ? (
                            <TableBody>
                                {state.subtasks.map((row, index) => (
                                    <TableRow key={index} hover>
                                        <TableCell component="th" scope="row" color="primary" align="center" size="small">
                                            {row.description}
                                        </TableCell>

                                        <TableCell component="th" scope="row" color="primary" align="center" size="small">
                                            {row.member}
                                        </TableCell>
                                        <TableCell component="th" scope="row" color="primary" align="center" size="small">
                                            {row.status}
                                        </TableCell>
                                        {row.status === "Closed" || row.status === "Completed" ?
                                            <TableCell component="th" scope="row" color="primary" align="center" size="small">
                                                <Button variant="contained" disabled={true} >Task Closed</Button>
                                            </TableCell>
                                            :
                                            <TableCell component="th" scope="row" color="primary" align="center" size="small">
                                                <Link to={"/updatesubtask"} state={{ subtask: row, teamName: teamName, projectName: projectName, backlogName: state.iWantTo }} style={{ textDecoration: 'none' }}>
                                                    <Button variant="contained">Edit Subtask</Button>
                                                </Link>
                                            </TableCell>

                                        }
                                    </TableRow>
                                ))}
                            </TableBody>
                        ) :
                            (<div className="propertiesTextLabel">No Data found</div>)
                        }
                    </Table>
                </TableContainer>
            </Paper>


        </ThemeProvider >
    )

};

export default UpdateBacklog; 