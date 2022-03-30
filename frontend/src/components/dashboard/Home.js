import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import { Paper, TableContainer, TableCell, TableRow, Table, TableBody, TableHead, Button } from "@mui/material";

import "./Home.css";
import { Link, useLocation } from "react-router-dom";

import projectServices from "../../services/projectService";

const Home = (props) => {
  let location = useLocation();

  let user = location.state.userInfo;
  console.log(user);

 

  return (
    <ThemeProvider theme={theme}>
      <div className="homePage">
        <div className="titlePage">Dashboard</div>
        <div style={{display: "flow-root"}}>
          
        <Link to={"/addproject"} state={{ user: user }}>
          <div className="addButton">
            <Button variant="contained" style={{color:"#fff", backgroundColor:"rgb(10, 74, 89)"}}>Add Project</Button>
          </div>
        </Link>


        <Link to={"/addnewteam"} state={{ user: user }}>
          <div className="addButton">
            <Button variant="contained" style={{color:"#fff", backgroundColor:"rgb(10, 74, 89)"}}>Add New Team</Button>
          </div>
        </Link>

        </div>
        
        <Paper style={{ padding: 20, height: "100vh" }}>
        <div className="tableCustomHeader">  {`${user.firstName}'s Projects `} </div>
        <TableContainer>
          <Table sx={{ minWidth: 350, padding: 20 }} aria-label="simple table">
            <TableHead>
              <TableRow>
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
                      <Link to={"/project"} state={{ selectedRow: row,user: user.email  }}>
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
        <Paper style={{ padding: 20, marginTop:50 }}>
        <div className="tableCustomHeader"> {`${user.firstName}'s Teams: `} </div>
        <TableContainer>
          <Table sx={{ minWidth: 350, padding: 20 }} aria-label="simple table">
            <TableBody>
              {user.teams.map((row, index) => (
                <TableRow key={index} hover>
                  <TableCell component="th"  scope="row"  color="primary" align="center" > {row} <br /> </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </TableContainer>
        </Paper>
        </Paper>

      </div>
    </ThemeProvider>
  );
};
export default Home;
