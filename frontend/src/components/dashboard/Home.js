import React, { useState,useEffect } from "react";
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

import "./Home.css";
import { Link,useLocation } from "react-router-dom";

const Home = (props) => {
  let location = useLocation();

  let user = location.state.userInfo;
  //console.log(user);
  /* replace somejon by props.users */
  const somejson = [
    {
      id: "1",
      projName: "Sprint compass 1",
      userRole: "teamMember",
      teamName: "Huron Heights Hive",
      projects: [
        {
          priority: "1",
          backlogs: "Capture/Maintain basic project information",
          initRelEstimate: "3",
          initCostEstimate: "$600.00",
        },
        {
          priority: "2",
          backlogs: "Maintain a list of team members assigned to the project",
          initRelEstimate: "1",
          initCostEstimate: "$600.00",
        },
      ],
    },
    {
      id: "2",
      projName: "Sprint compass 2",
      userRole: "PMO",
      teamName: "Huron Heights Hive",
    },
  ];


  return (
    <ThemeProvider theme={theme}>
      <div className="homePage">
        <div className="titlePage">Dashboard</div>
        <div className="addButton">
          <Button variant="contained">Add Project</Button>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 350, padding: 20 }} aria-label="simple table">
            <TableHead>
              <TableRow className="tableHead">
                <TableCell align="center" variant="head">
                  Project Name
                </TableCell>
                <TableCell align="center" variant="head">
                  User Role
                </TableCell>
                <TableCell align="center" variant="head">
                  Team Name
                </TableCell>
                <TableCell align="center" variant="head">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            {(user.projects.length!==0 ) ? (
            <TableBody>
              {user.projects.map((row, index) => (
                <TableRow key={index} hover>
                  <TableCell
                    component="th"
                    scope="row"
                    color="primary"
                    align="center"
                  >
                    {row.project}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    color="primary"
                    align="center"
                  >
                    {row.role}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    color="primary"
                    align="center"
                  >
                    {row.team}
                  </TableCell>

                  <TableCell
                    component="th"
                    scope="row"
                    color="primary"
                    align="center"
                  >
                      <Link
                        to={"/project"}
                        state={{ selectedRow: row }}
                      >
                      <Button
                        variant="contained"
                      >
                        Edit
                      </Button>
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
      </div>
    </ThemeProvider>
  );
};
export default Home;
