import React, { useEffect, useReducer, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import jsPDF from "jspdf";

import {
    Paper,
    TableContainer,
    TableCell,
    TableRow,
    Table,
    TableBody,
    TableHead,
    Button,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import generateSprintReport from "../../report/sprintReport";
import sprintSubtaskService from "../../services/sprintSubtaskService";

const ViewSprint = () => {

    let location = useLocation();
    const project = location.state.project;
    const sprint = location.state.sprint;
    const projectName = location.state.projectName;
    const sprintNum = location.state.rowNum;
    const teamName = location.state.teamName;
    //const backlog = location.state.backlog;
    console.log(sprint)
    const initialState = {
        startDate: sprint.startDate,
        endDate: sprint.endDate,
        projectName: sprint.projectName,
        disabled: true,
        sprintToReport: null,
    };

    const reducer = (state, newState) => ({ ...state, ...newState });
    const [state, setState] = useReducer(reducer, initialState);

    useEffect(() => {
        sprintSubtaskService.fetchSprintsUserStories(sprintNum, projectName, handleFetchUserStories);

    }, []);

    const onCreateReportClicked = () => {
        let doc = new jsPDF("p", "pt", "a4");
        doc.html(document.querySelector("#homePage"), {
            callback: function (pdf) {
                pdf.save("sprint.pdf");
            }
        });
    }

    const calcPercentageComplete = () => {
        //Steps:
        //1. get actual hours spent and re-estimate hours
        //2. do calculation: ((actual hours + re-estimate hours) / actual hours) * 100
    }

    const calcReEstimates = () => {
        //
    }

    //data needed for report
    const handleFetchUserStories = (data) => {
        setState({ sprintToReport: data });
    }

    const onClickGenerateReport = () => {
        let projectName = project.projectName;
        //sprintSubtaskService.fetchSprintsUserStories(sprintNum,projectName,handleFetchUserStories)
        //console.log(userStories);
        generateSprintReport(state.sprintToReport, sprint, projectName, sprintNum);


        /* let userStories=[{iWantTo:'iii', relativeReEstimate:'9090', costReEstimate:'9', other:'xx'}];
        const userStoriesFields = ['iWantTo', 'relativeReEstimate', 'costReEstimate'];
       let values = userStories.map(e=>{Object.keys(userStories[0]).filter(e=>{userStoriesFields.includes(e)})});
       //let values=Object.keys(userStories).filter(e=>userStoriesFields.includes(e));
       console.log(values);
        //values = primary_data.userStories.map((element) => { return Object.values(element)});
 
        //keyValuesUserStory = primary_data.userStories.map((element) => {Object.keys(element).filter((e)=>userStoriesFields.includes(e))});
        //let keyValuesUserStory =  {...userStories};
        // Convert `obj` to a key/value array
        const asArray = Object.entries(userStories);
 
        const filtered = asArray.filter(([key, value]) => userStoriesFields.includes(key));
      console.log(filtered)
 
        // Convert the key/value array back to an object:
        const userStoriesObjs = Object.fromEntries(filtered);
        const returnValues = {...Object.values(userStoriesObjs)};
        console.log(returnValues); */

    }

    return (
        <ThemeProvider theme={theme}>
            <div className="homePage">
                <div className="titlePage">Sprint # {sprintNum}</div>
                <table style={{ margin: 'auto' }}>
                    <div className="projectHomeTextLabel">
                        <tr>
                            <td>Project Name:</td>
                            <td style={{ fontWeight: 'lighter' }}>{projectName}</td>
                        </tr>
                        <tr>
                            <td>Start Date:</td>
                            <td style={{ fontWeight: 'lighter' }}>{sprint.startDate}</td>
                            <td style={{ paddingLeft: 50 }}>End Date:</td>
                            <td style={{ fontWeight: 'lighter' }}>{sprint.endDate}</td>
                        </tr>

                    </div>

                    <div style={{ textAlign: 'center', margin: '20px' }}>

                        <Button variant="outlined" onClick={onClickGenerateReport}>Download Sprint Report</Button>
                    </div>
                </table>

                <Paper style={{ padding: 20 }}>
                    <div className="tableCustomHeader"> User Stories</div>
                    <TableContainer >
                        <Table sx={{ minWidth: 350, }} aria-label="simple table" >
                            <TableHead>
                                <TableRow className="tableHead"> {``}
                                    <TableCell size="small" align="center" variant="head"><b>{`Priority`}</b></TableCell>
                                    <TableCell size="small" align="center" variant="head"><b>{`User Story`}</b> </TableCell>
                                    <TableCell size="small" align="center" variant="head"><b>{`Initial Relative Estimate `}</b></TableCell>
                                    <TableCell size="small" align="center" variant="head"><b>{`Initial Cost Estimate `}</b></TableCell>
                                    <TableCell size="small" align="center" variant="head"><b>{`Actions `}</b></TableCell>
                                </TableRow>
                            </TableHead>

                            {sprint.userStories !== undefined ? (
                                <TableBody>
                                    {sprint.userStories.map((row, index) => (
                                        <TableRow key={index} hover>
                                            <TableCell component="th" scope="row" color="primary" align="center" size="small" >
                                                {row.priority}
                                            </TableCell>

                                            <TableCell component="th" scope="row" color="primary" align="center" size="small">
                                                {row.iWantTo}
                                            </TableCell>
                                            <TableCell component="th" scope="row" color="primary" align="center" size="small">
                                                {row.initialRelativeEstimate}
                                            </TableCell>

                                            <TableCell component="th" scope="row" color="primary" align="center" size="small">
                                                {row.initialCostEstimate}
                                            </TableCell>

                                            <TableCell component="th" scope="row" color="primary" align="center" size="small">
                                                <Link to={"/updateSprintStory"} state={{ project: project, userStory: row, teamName: teamName, projectName: projectName, sprintNum: sprintNum, index: index }} style={{ textDecoration: 'none' }}>
                                                    <Button variant="contained">Edit User Story</Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            ) : (
                                <div className="propertiesTextLabel">No Data found</div>

                            )}


                        </Table>
                    </TableContainer>
                </Paper>
            </div>
        </ThemeProvider>
    );
};

export default ViewSprint;