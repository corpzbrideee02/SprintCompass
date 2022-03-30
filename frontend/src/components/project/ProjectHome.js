import React, { useEffect, useReducer } from "react";
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

import projectServices from "../../services/projectService";

const ProjectHome = () => {
  let location = useLocation();

  //console.log(location.state.selectedRow);
  const project = location.state.selectedRow;
  console.log(project);

  const initialState = {
    projects: [],

  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);


  useEffect(() => {
    //teamServices.fetchTeams(handleFetchTeams);
    projectServices.fetchProjectsByUser(project.project, handleFetchProjects)
  }, []);

  const handleFetchProjects = (data) => {
    console.log(data);
    setState({ projects: data });
  }

 // console.log(state.projects);

  return (
    <ThemeProvider theme={theme}>
      <div className="homePage">
        <div className="titlePage">Project</div>
        <div className="propertiesTextLabel">
          Project Name: {project.project}
        </div>
        <div className="propertiesTextLabel">Team Name: {project.team}</div>
        <div className="addButton">
        <Link to={"/addbacklog"} state={{ project: state.projects, user: project.user}}>
          <Button variant="contained" style={{color:"#fff", backgroundColor:"rgb(10, 74, 89)"}}> Add Product Backlog</Button>
          </Link>
        </div>

        <Paper style={{ padding: 20 }}>
        <div className="tableCustomHeader"> Product Backlogs </div>
          <TableContainer >
            <Table sx={{ minWidth: 350, padding: 20 }} aria-label="simple table" >
              <TableHead>
                <TableRow className="tableHead"> {``}
                  <TableCell align="center" variant="head"> {`Priority`} </TableCell>
                  <TableCell align="center" variant="head"> {`Product Backlogs`} </TableCell>
                  <TableCell align="center" variant="head"> {`Initial Relative Estimate `}</TableCell>
                  <TableCell align="center" variant="head">  {`Initial Cost Estimate `}</TableCell>
                  <TableCell align="center" variant="head"> {`Actions `}</TableCell>
                </TableRow>
              </TableHead>

              {state.projects.backlog !== undefined ? (
                <TableBody>
                  {state.projects.backlog.map((row, index) => (
                    <TableRow key={index} hover>
                      <TableCell  component="th" scope="row"  color="primary"  align="center" >
                        {row.priority}
                      </TableCell>

                      <TableCell component="th" scope="row"  color="primary"  align="center">
                      {row.iWantTo}
                        {/* {`As a ${row.asA}`}<br />
                        {`I want to ${row.iWantTo}`}<br />
                        {`So I can ${row.soIcan}`}<br /> */}
                      </TableCell>
                      <TableCell  component="th"  scope="row"  color="primary"  align="center" >
                        {row.initialRelativeEstimate}
                      </TableCell>

                      <TableCell  component="th"  scope="row"  color="primary"  align="center" >
                        {row.initialCostEstimate}
                      </TableCell>

                      <TableCell  component="th"  scope="row"  color="primary"  align="center" >
                      <Link to={"/updatebacklog"} state={{ backlog: row, projectName: project.project, user: project.user }}>
                        <Button variant="contained">Edit Backlog</Button>
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

                {/* NOTE: Will change this to project's sprints  */}
        <Paper style={{ padding: 20 }}>
        <div className="tableCustomHeader"> Sprints</div>
          <TableContainer >
            <Table sx={{ minWidth: 350, padding: 20 }} aria-label="simple table" >
              <TableHead>
                <TableRow className="tableHead"> {``}
                  <TableCell align="center" variant="head"> {`Number`} </TableCell>
                  <TableCell align="center" variant="head"> {`Product Backlogs`} </TableCell>
                  <TableCell align="center" variant="head"> {`Start Date`}</TableCell>
                  <TableCell align="center" variant="head">  {`End Date`}</TableCell>
                  <TableCell align="center" variant="head"> {`Actions `}</TableCell>
                </TableRow>
              </TableHead>

              {state.projects.sprints !== undefined ? (
                <TableBody>
                  {state.projects.sprints.map((row, index) => (
                    <TableRow key={index} hover>
                      <TableCell  component="th" scope="row"  color="primary"  align="center" >
                        1
                      </TableCell>
                      {row.userStories.map((row2, index) => (
                        <TableCell key={index} component="th" scope="row"  color="primary"  align="center" >
                        {row2.iWantTo}
                      </TableCell>
                      ))}

                    
                      <TableCell  component="th"  scope="row"  color="primary"  align="center" >
                      {row.startDate}
                      </TableCell>

                      <TableCell  component="th"  scope="row"  color="primary"  align="center" >
                      {row.endDate}
                      </TableCell>

                      <TableCell  component="th"  scope="row"  color="primary"  align="center" >
                        <Button variant="contained">View Sprint</Button>
                      
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
export default ProjectHome;
