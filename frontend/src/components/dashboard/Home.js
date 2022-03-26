import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import { Paper, TableContainer, TableCell, TableRow, Table, TableBody, TableHead, Button } from "@mui/material";

import "./Home.css";
import { Link, useLocation } from "react-router-dom";

const Home = (props) => {
  let location = useLocation();

  let user = location.state.userInfo;
  //console.log(user);

  return (
    <ThemeProvider theme={theme}>
      <div className="homePage">
        <div className="titlePage">Dashboard</div>

        <Link to={"/addproject"} state={{ user: user }}>
          <div className="addButton">
            <Button variant="contained">Add Project</Button>
          </div>
        </Link>


        <Link to={"/addnewteam"} state={{ user: user }}>
          <div className="addButton">
            <Button variant="contained">Add New Team</Button>
          </div>
        </Link>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 350, padding: 20 }} aria-label="simple table">
            <TableHead>
              <TableRow className="tableHead">
                <TableCell align="center" variant="head">Project Name</TableCell>
                <TableCell align="center" variant="head"> User Role </TableCell>
                <TableCell align="center" variant="head"> Team Name </TableCell>
                <TableCell align="center" variant="head"> Actions </TableCell>
              </TableRow>
            </TableHead>
            {(user.projects.length !== 0) ? (
              <TableBody>
                {user.projects.map((row, index) => (
                  <TableRow key={index} hover>
                    <TableCell  component="th" scope="row" color="primary" align="center" > {row.project} </TableCell>
                    <TableCell component="th" scope="row"  color="primary"  align="center" >  {row.role} </TableCell>
                    <TableCell  component="th" scope="row"  color="primary"  align="center">{row.team} </TableCell>
                    <TableCell  component="th"  scope="row"  color="primary" align="center" >
                      <Link to={"/project"} state={{ selectedRow: row }}>
                        <Button variant="contained" > View </Button>
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

        {/* List of Teams Table  */}
        <TableContainer component={Paper} style={{ marginTop: 300 }}>
          <Table sx={{ minWidth: 350, padding: 20 }} aria-label="simple table">
            <TableHead>
              <TableRow className="tableHead">
                <TableCell align="center" variant="head">
                  {`${user.firstName}'s Teams: `}
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {user.teams.map((row, index) => (
                <TableRow key={index} hover>
                  <TableCell component="th"  scope="row"  color="primary" align="center" > {row} <br /> </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </TableContainer>


      </div>
    </ThemeProvider>
  );
};
export default Home;
