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

const UpdateSprintUserStory = () => {

    let location = useLocation();
    const thisUserStory = location.state.userStory;
    const projectName = location.state.projectName;
    const teamName=location.state.teamName;
    const sprintNum=location.state.sprintNum;
    console.log(thisUserStory)


    const [selectSprint, setSelectSprint] = useState('');

    const initialState = {
        asA: thisUserStory.asA,
        iWantTo: thisUserStory.iWantTo,
        soIcan: thisUserStory.soIcan,
        priority: thisUserStory.priority,
    };
    const reducer = (state, newState) => ({ ...state, ...newState });
    const [state, setState] = useReducer(reducer, initialState);


    /**onchange handler */
    const handleAsAInput = (e) => { setState({ asA: e.target.value }) };
    const handleIwantToInput = (e) => { setState({ iWantTo: e.target.value }) };
    const handleSoIcanInput = (e) => { setState({ soIcan: e.target.value }) };
    const handlePriorityInput = (e) => { setState({ priority: e.target.value }) };

    return (
        <ThemeProvider theme={theme}>
            <div className="backlogs-container">
                <div className="form-content">
                    <div className="titlePage">Update Sprint's User Story</div>
                    <Paper elevation={10} className="paper-style" style={{ padding: 10 }}>
                        <div className="input-container">
                            <TextField required onChange={handleAsAInput}  value={state.asA} label="As a"  variant="outlined" className="input-field" />
                            <TextField required onChange={handleIwantToInput}  value={state.iWantTo} label="I want to" variant="outlined" className="input-field" />
                            <TextField required onChange={handleSoIcanInput} value={state.soIcan} label="So I can" variant="outlined" className="input-field" />
                            <TextField required onChange={handlePriorityInput} value={state.priority} abel="Priority" variant="outlined" className="input-field" />
                        </div>
                    </Paper>
                </div>
                {/*NOTE: insert "move userStory to sprint" functionality  */}
                <div>
                    <div className="input-container">
                        <FormControl fullWidth className="input-field">
                            <InputLabel id="demo-simple-select-label">Move to Sprint</InputLabel>
                            <Select
                                label="Move to Sprint"
                            >
                            </Select>
                        </FormControl>

                        <Button variant="contained" style={{ width: 100 }} > Save</Button>
                    </div>
                </div>
            </div>

            <div className="addButton">
                <Link to={"/addSprintSubtask"} state={{teamName: teamName, projectName:projectName, userStoryName:state.iWantTo, sprintNum:sprintNum }}>
                    <Button variant="contained" style={{ color: "#fff", backgroundColor: "rgb(10, 74, 89)" }} > Add Subtask</Button>
                </Link>
            </div>

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

                        {thisUserStory.tasks != undefined && thisUserStory.tasks.length>0 ? (
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
                                        <TableCell component="th" scope="row" color="primary" align="center" size="small">
                                        <Link to={"/"} state={{ subtask: row}}>
                                            <Button variant="contained">Edit Subtask</Button>
                                        </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        ) :
                            ( <div className="propertiesTextLabel">No Data found</div>)
                        }
                    </Table>
                </TableContainer>
            </Paper>



        </ThemeProvider>
    );
};

export default UpdateSprintUserStory;