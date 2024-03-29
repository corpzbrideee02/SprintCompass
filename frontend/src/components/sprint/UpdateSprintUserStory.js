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

const UpdateSprintUserStory = () => {

    let location = useLocation();
    let navigate = useNavigate();
    const thisUserStory = location.state.userStory;
    const projectName = location.state.projectName;
    const teamName = location.state.teamName;
    const sprintNum = location.state.sprintNum;
    const project = location.state.project;
    const sprints = location.state.project.sprints;
    const currentIndex = location.state.index;
    console.log(thisUserStory)

    const newSprintAvailable = sprintNum < sprints.length;

    const [selectSprint, setSelectSprint] = useState('');

    const initialState = {
        asA: thisUserStory.asA,
        iWantTo: thisUserStory.iWantTo,
        soIcan: thisUserStory.soIcan,
        priority: thisUserStory.priority,
        relativeReEstimate: thisUserStory.relativeReEstimate,
        costReEstimate: thisUserStory.costReEstimate
    };
    const reducer = (state, newState) => ({ ...state, ...newState });
    const [state, setState] = useReducer(reducer, initialState);


    /**onchange handler */
    const handleAsAInput = (e) => { setState({ asA: e.target.value }) };
    const handleIwantToInput = (e) => { setState({ iWantTo: e.target.value }) };
    const handleSoIcanInput = (e) => { setState({ soIcan: e.target.value }) };
    const handlePriorityInput = (e) => { setState({ priority: e.target.value }) };
    const handleRelativeReEstimate = (e) => { setState({ relativeReEstimate: e.target.value }) };
    const handleCostReEstimate = (e) => { setState({ costReEstimate: e.target.value }) };

    const handleSprintChange = (event) => {
        setSelectSprint(event.target.value);
    };

    const updateUserStory = () => {

        let userStory = {
            asA: state.asA,
            iWantTo: state.iWantTo,
            soIcan: state.soIcan,
            priority: state.priority,
            tasks: thisUserStory.tasks,
            initialRelativeEstimate: thisUserStory.initialRelativeEstimate,
            initialCostEstimate: thisUserStory.initialCostEstimate,
            relativeReEstimate: parseInt(state.relativeReEstimate),
            costReEstimate: parseFloat(state.costReEstimate)
        }

        if (selectSprint === undefined || selectSprint === '') //save user story changes
        {
            console.log("save user story");

            backlogServices.updateSprint(project, sprintNum - 1, currentIndex, userStory, handleAfterSavingUserStory);
        }
        else // move to sprint
        {
            console.log("move to sprint");
            backlogServices.moveToSprint(project, selectSprint, sprintNum - 1, userStory, handleAfterMovingToSprint);
        }
    };

    const handleAfterSavingUserStory=()=>{navigate(-2);}

    const handleAfterMovingToSprint=()=>{navigate(-2);}


    return (
        <ThemeProvider theme={theme}>
            <div className="backlogs-container">
                <div className="form-content">
                    <div className="titlePage">Update Sprint's User Story</div>
                    <Paper elevation={10} className="paper-style" style={{ padding: 10 }}>
                        <div className="input-container">
                            <TextField required onChange={handleAsAInput} value={state.asA} label="As a" variant="outlined" className="input-field" />
                            <TextField required onChange={handleIwantToInput} value={state.iWantTo} label="I want to" variant="outlined" className="input-field" />
                            <TextField required onChange={handleSoIcanInput} value={state.soIcan} label="So I can" variant="outlined" className="input-field" />
                            <TextField required onChange={handlePriorityInput} value={state.priority} label="Priority" variant="outlined" className="input-field" />
                            <TextField required onChange={handleRelativeReEstimate} value={state.relativeReEstimate} label="Relative ReEstimate" variant="outlined" className="input-field" />
                            <TextField required onChange={handleCostReEstimate} value={state.costReEstimate} label="Cost ReEstimate" variant="outlined" className="input-field" />
                        </div>
                    </Paper>
                </div>
                {/*NOTE: insert "move userStory to sprint" functionality  */}
                <div>

                    <div className="input-container">
                        {newSprintAvailable &&
                            <FormControl fullWidth className="input-field">
                                <InputLabel id="demo-simple-select-label">Move to Sprint</InputLabel>
                                <Select
                                    value={selectSprint}
                                    label="Move to Sprint"
                                    onChange={handleSprintChange}
                                >
                                    <MenuItem value={sprintNum}>{sprintNum + 1}</MenuItem>
                                </Select>
                            </FormControl>
                        }
                        {!newSprintAvailable &&
                            <FormControl fullWidth className="input-field">
                                <InputLabel id="demo-simple-select-label">No new sprint available</InputLabel>
                                <Select
                                    value={selectSprint}
                                    label="No new sprint available"
                                >
                                </Select>

                            </FormControl>
                        }

                        <Button variant="contained" style={{ width: 100 }} onClick={() => updateUserStory()}> Save</Button>
                    </div>
                </div>
            </div>

            <div className="addButton">
                <Link to={"/addSprintSubtask"} state={{project: project, teamName: teamName, projectName:projectName, userStoryName:state.iWantTo, userStory: thisUserStory, currentIndex: currentIndex, sprintNum:sprintNum }} style={{textDecoration:'none'}}>
                    <Button variant="contained" style={{ color: "#fff", backgroundColor: "rgb(10, 74, 89)" }} > Add Subtask</Button>
                </Link>
            </div>

            <Paper style={{ padding: 20 }}>
                <div className="tableCustomHeader"> SubTasks</div>
                <TableContainer>
                    <Table sx={{ minWidth: 350 }} aria-label="simple table">
                        <TableHead>
                            <TableRow className="tableHead"> {``}
                                <TableCell size="small" align="center" variant="head"> <b>{`Description`}</b> </TableCell>
                                <TableCell size="small" align="center" variant="head"> <b>{`Member`}</b> </TableCell>
                                <TableCell size="small" align="center" variant="head"> <b>{`Status`}</b></TableCell>
                                <TableCell size="small" align="center" variant="head"> <b>{`Actions `}</b></TableCell>
                            </TableRow>
                        </TableHead>

                        {thisUserStory.tasks != undefined && thisUserStory.tasks.length > 0 ? (
                            <TableBody>
                                {thisUserStory.tasks.map((row, index) => (
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
                                                <Link to={"/updateSprintSubtask"} state={{ project: project, subtask: row, subtaskIndex: index, teamName: teamName, projectName:projectName, userStoryName:state.iWantTo, userStory: thisUserStory, currentIndex: currentIndex, sprintNum:sprintNum }} style={{textDecoration:'none'}}>
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
        </ThemeProvider>
    );
};

export default UpdateSprintUserStory;