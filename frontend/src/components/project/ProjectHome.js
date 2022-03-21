import React, { useEffect } from "react";
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
  Button,
} from "@mui/material";

import "./project.css";
import { Link, useLocation } from "react-router-dom";

const ProjectHome = () => {
  let location = useLocation();

  //console.log(location.state.selectedRow);
  const project = location.state.selectedRow;
  console.log(project);
  return (
    <ThemeProvider theme={theme}>
      <div className="homePage">
        <div className="titlePage">Project</div>
        <div className="propertiesTextLabel">
          Project Name: {project.project}
        </div>
        <div className="propertiesTextLabel">Team Name: {project.team}</div>
        <div className="addButton">
          <Button variant="contained">Add User Story</Button>
        </div>
       
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 350, padding: 20 }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow className="tableHead">
                  <TableCell align="center" variant="head">
                    Priority
                  </TableCell>
                  <TableCell align="center" variant="head">
                    Product Backlogs
                  </TableCell>
                  <TableCell align="center" variant="head">
                    Initial Relative Estimate
                  </TableCell>
                  <TableCell align="center" variant="head">
                    Initial Cost Estimate
                  </TableCell>
                  <TableCell align="center" variant="head">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              {project.projects !== undefined ? (
              <TableBody>
                {project.projects.map((row, index) => (
                  <TableRow key={index} hover>
                    <TableCell
                      component="th"
                      scope="row"
                      color="primary"
                      align="center"
                    >
                      {row.priority}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      color="primary"
                      align="center"
                    >
                      {row.backlogs}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      color="primary"
                      align="center"
                    >
                      {row.initRelEstimate}
                    </TableCell>

                    <TableCell
                      component="th"
                      scope="row"
                      color="primary"
                      align="center"
                    >
                      {row.initCostEstimate}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      color="primary"
                      align="center"
                    >
                      <Button variant="contained">View User Story</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
               ) : (
                <div className="propertiesTextLabel">No Data found</div>
             
            )}
            </Table>
          </TableContainer>
       
      </div>
    </ThemeProvider>
  );
};
export default ProjectHome;
