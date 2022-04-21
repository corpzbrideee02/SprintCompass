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

const ViewSprint = () => {

    let location = useLocation();
    const project = location.state.project;
    const sprint = location.state.sprint;
    const projectName = location.state.projectName;
    const sprintNum = location.state.rowNum;
    const teamName=location.state.teamName;
    //const backlog = location.state.backlog;
    console.log(sprint)
    const initialState = {
        startDate: sprint.startDate,
        endDate: sprint.endDate,
        projectName: sprint.projectName,
        disabled: true
    };

    const reducer = (state, newState) => ({ ...state, ...newState });
    const [state, setState] = useReducer(reducer, initialState);

    const onCreateReportClicked = () => {
        let doc = new jsPDF("p", "pt", "a4");
        doc.html(document.querySelector("#homePage"), {
            callback: function(pdf){
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
                                                <Link to={"/updateSprintStory"} state={{ project: project, userStory: row, teamName: teamName, projectName:projectName, sprintNum:sprintNum, index: index}} style={{textDecoration:'none'}}>
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