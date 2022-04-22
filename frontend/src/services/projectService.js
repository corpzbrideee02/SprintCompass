
//constant variables
const GRAPHURL = "http://localhost:5000/graphql";
const METHOD = "POST";
const HEADERS = { "Content-Type": "application/json; charset=utf-8" };

const projectServices = {

  fetchProjectsByUser: async (projectName,cb) => {
    try {
      let response = await fetch(GRAPHURL, {
        method: METHOD,
        headers: HEADERS,
        body: JSON.stringify({ query: "query { projects {teamName, projectName, startDate, velocity, hoursToStoryPoint, totalEstimatedStoryPoints, totalEstimatedCost, team {firstName, lastName, email, role}, backlog { asA, iWantTo, soIcan, priority, initialRelativeEstimate, initialCostEstimate, tasks {description, member, status, hoursWorked} }, sprints { userStories { asA, iWantTo, soIcan, priority, initialRelativeEstimate, initialCostEstimate, relativeReEstimate, costReEstimate, tasks {description, member, status, hoursWorked} }, startDate, endDate } } } " }),
      });
      let json = await response.json();

      cb(json.data.projects.find(e=>e.projectName===projectName));
    } catch (error) {
      console.log(error);
    }
  },
    addNewProject: async(project,cb)=>{

        console.log(project.team);
        project.team.members.map(e=>console.log(e));
        try {
          let response = await fetch(GRAPHURL, {
            method: METHOD,
            headers: HEADERS,
            body: JSON.stringify({
              query: `mutation{addproject(teamName:"${project.team.name}", projectName:"${project.projectName}", startDate: "${project.startDate}", velocity:${project.velocity}, hoursToStoryPoint: ${project.hoursToStoryPoint}, totalEstimatedStoryPoints:${project.totalEstimatedStoryPoints}, totalEstimatedCost: ${project.totalEstimatedCost}, team: [${project.team.members.map(x=>`{firstName: "${x.firstName}", lastName: "${x.lastName}", email: "${x.email}", role: "${x.role}"}`)}]){teamName, projectName, startDate, velocity, hoursToStoryPoint, totalEstimatedStoryPoints, totalEstimatedCost, team {firstName, lastName, email, role} }}`  
            }),
          });
          let json = await response.json();
    
          cb(); //trigger the handleAfterCreateNewProj
        } catch (error) {
          console.log(error);
        }
  },

};

export default projectServices;

//${project.team.map(x=>`${x.name}`)}