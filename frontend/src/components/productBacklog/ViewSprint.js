import React, { useEffect, useReducer, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
//import jsPDF from "jspdf";

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
    const sprint = location.state.project;
    const projectName=location.state.projectName;
    const sprintNum= location.state.rowNum;
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
        //Create pdf with jspdf
        //let doc = new jsPDF();

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
        <div className="propertiesTextLabel"> Project Name: {projectName} </div>
        <Paper style={{ padding: 20 }}>
        <div className="tableCustomHeader"> User Stories</div>
          <TableContainer >
            <Table sx={{ minWidth: 350,  }} aria-label="simple table" >
              <TableHead>
                <TableRow className="tableHead"> {``}
                  <TableCell size="small" align="center" variant="head"><b>{`Priority`}</b></TableCell>
                  <TableCell size="small" align="center" variant="head"><b>{`User Story`}</b> </TableCell>
                  <TableCell size="small" align="center" variant="head"><b>{`Initial Relative Estimate `}</b></TableCell>
                  <TableCell size="small" align="center" variant="head"><b>{`Initial Cost Estimate `}</b></TableCell>
                  <TableCell size="small" align="center" variant="head"><b>{`Actions `}</b></TableCell>
                </TableRow>
              </TableHead>
            {/* <Paper style={{ padding: 30, marginTop: 50, minWidth: 350 }}>
                <TableContainer>
                    <Table sx={{ minWidth: 350 }} aria-label="simple table">
                        <TableHead>
                            <TableRow className="tableHead"> {``}
                                <TableCell align="center" variant="head"> {`Project Name`} </TableCell>
                                <TableCell align="center" variant="head"> {`Start Date`} </TableCell>
                                <TableCell align="center" variant="head"> {`End Date`} </TableCell>
                                <TableCell align="center" variant="head"> {`Percentage Complete`} </TableCell>
                                <TableCell align="center" variant="head"> {`Re-estimate To Complete`} </TableCell>
                            </TableRow>
                        </TableHead> */}
                        {/*  <TableBody>
                            <TableRow hover>
                                <TableCell component="th" scope="row" color="primary" align="center" > {sprint.project.projectName} </TableCell>
                                <TableCell component="th" scope="row" color="primary" align="center" > {sprint.project.startDate} </TableCell>
                                <TableCell component="th" scope="row" color="primary" align="center" > {sprint.project.endDate} </TableCell>
                                <TableCell component="th" scope="row" color="primary" align="center" > {calcPercentageComplete} </TableCell> //FIXME:
                                <TableCell component="th" scope="row" color="primary" align="center" > {calcReEstimates} </TableCell> //FIXME:
                                <TableCell component="th" scope="row" color="primary" align="center" >
                                    <Button variant="contained" onClick={onCreateReportClicked}>Create PDF Report</Button>
                                </TableCell>
                            </TableRow>

                        </TableBody> */}
                        {sprint.userStories  !== undefined ? (
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