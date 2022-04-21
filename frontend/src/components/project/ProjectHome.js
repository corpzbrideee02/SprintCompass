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

        <table style={{ margin: 'auto' }}>
          <div className="projectHomeTextLabel">
            <tr>
              <td>Project Name:</td>
              <td style={{ fontWeight: 'lighter' }}>{project.project}</td>
              <td style={{ paddingLeft: 50 }}>Team Name:</td>
              <td style={{ fontWeight: 'lighter' }}>{project.team}</td>
            </tr>
            <tr>
              <td>Initial Velocity:</td>
              <td style={{ fontWeight: 'lighter' }}>{state.projects.velocity}</td>
              <td style={{ paddingLeft: 50 }}>Total Estimated Cost:</td>
              {state.projects.totalEstimatedCost !== undefined && <td style={{ fontWeight: 'lighter' }}>{state.projects.totalEstimatedCost.toLocaleString()}</td>}
            </tr>

          </div>
        </table>


        <div className="addButton">
          <Link to={"/addbacklog"} state={{ project: state.projects, user: project.user }}>
            <Button variant="contained" style={{ color: "#fff", backgroundColor: "rgb(10, 74, 89)" }}> Add Product Backlog</Button>
          </Link>
        </div>

        <Paper style={{ padding: 20 }}>
          <div className="tableCustomHeader"> Product Backlogs </div>
          <TableContainer >
            <Table sx={{ minWidth: 350, }} aria-label="simple table" >
              <TableHead>
                <TableRow className="tableHead"> {``}
                  <TableCell size="small" align="center" variant="head"><b>{`Priority`}</b></TableCell>
                  <TableCell size="small" align="center" variant="head"><b>{`Product Backlogs`}</b> </TableCell>
                  <TableCell size="small" align="center" variant="head"><b>{`Initial Relative Estimate `}</b></TableCell>
                  <TableCell size="small" align="center" variant="head"><b>{`Initial Cost Estimate `}</b></TableCell>
                  <TableCell size="small" align="center" variant="head"><b>{`Actions `}</b></TableCell>
                </TableRow>
              </TableHead>

              {state.projects.backlog !== undefined ? (
                <TableBody>
                  {state.projects.backlog.map((row, index) => (
                    <TableRow key={index} hover>
                      <TableCell component="th" scope="row" color="primary" align="center" size="small" >
                        {row.priority}
                      </TableCell>

                      <TableCell component="th" scope="row" color="primary" align="center" size="small">
                        {row.iWantTo}
                        {/* {`As a ${row.asA}`}<br />
                        {`I want to ${row.iWantTo}`}<br />
                        {`So I can ${row.soIcan}`}<br /> */}
                      </TableCell>
                      <TableCell component="th" scope="row" color="primary" align="center" size="small">
                        {row.initialRelativeEstimate}
                      </TableCell>

                      <TableCell component="th" scope="row" color="primary" align="center" size="small">
                        {row.initialCostEstimate}
                      </TableCell>

                      <TableCell  component="th"  scope="row"  color="primary"  align="center" size="small">
                      <Link to={"/updatebacklog"} state={{ backlog: row, index: index, project: state.projects, sprints: state.projects.sprints, projectName: project.project, user: project.user,team : state.projects.teamName }} style={{textDecoration:'none'}} >
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
        <div className="addButton">
          <Link to={"/addsprint"} state={{ project: state.projects, user: project.user, }}>
            <Button variant="contained" style={{ color: "#fff", backgroundColor: "rgb(10, 74, 89)" }}> Add Sprint</Button>
          </Link>
        </div>
        <Paper style={{ padding: 20 }}>
          <div className="tableCustomHeader"> Sprints</div>
          <TableContainer >
            <Table sx={{ minWidth: 350, padding: 20 }} aria-label="simple table" >
              <TableHead>
                <TableRow className="tableHead"> {``}
                  <TableCell align="center" variant="head"><b>{`Sprint`}</b></TableCell>
                  {/* <TableCell align="center" variant="head"><b>{`Number`}</b></TableCell>
                  <TableCell align="center" variant="head"><b>{`Product Backlogs`}</b></TableCell> */}
                  <TableCell align="center" variant="head"><b>{`Start Date`}</b></TableCell>
                  <TableCell align="center" variant="head"><b>{`End Date`}</b></TableCell>
                  <TableCell align="center" variant="head"><b>{`Actions `}</b></TableCell>
                </TableRow>
              </TableHead>

              {state.projects.sprints !== undefined ? (
                <TableBody>
                  {state.projects.sprints.map((row, index) => (
                    <TableRow key={index} hover>
                      <TableCell component="th" scope="row" color="primary" align="center" size="small">
                        {index + 1}
                      </TableCell>


                      <TableCell component="th" scope="row" color="primary" align="center" size="small">
                        {row.startDate}
                      </TableCell>

                      <TableCell component="th" scope="row" color="primary" align="center" size="small">
                        {row.endDate}
                      </TableCell>

                      <TableCell component="th" scope="row" color="primary" align="center" size="small">

                        <Link to={"/viewsprint"} state={{ project: state.projects, sprint: row, user: project.user, projectName: project.project, rowNum: (index + 1),teamName:project.team }} style={{textDecoration:'none'}}>
                          <Button variant="contained">View Sprint</Button>
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
export default ProjectHome;
