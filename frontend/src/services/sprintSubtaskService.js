

//constant variables
const GRAPHURL = "http://localhost:5000/graphql";
const METHOD = "POST";
const HEADERS = { "Content-Type": "application/json; charset=utf-8" };

const sprintSubtaskService = {
  //fetch sprints userstories
  fetchSprintsByProject: async (index, project, cb) => {
    try {
      let response = await fetch(GRAPHURL, {
        method: METHOD,
        headers: HEADERS,
        body: JSON.stringify({
          query: `query {projectbyname(projectName: "${project}") { projectName, sprints { userStories { asA, iWantTo, soIcan, priority, initialRelativeEstimate, initialCostEstimate, tasks {description, member, status,, hoursWorked} }, startDate, endDate } }}`,
        }),
      });
      let json = await response.json();
      //console.log(json.data.projectbyname);
      //console.log(json.data.projectbyname.sprints[index-1].userStories)
      if ((index - 1) >= 0) {
        cb(json.data.projectbyname.sprints[index - 1].userStories);
      }
    } catch (error) {
      console.log(error);
    }
  },


  //fetch a sprint to be updated (for sprint's subtask)
  fetchOneSprint: async (index, userStoryName, project, cb) => {
    try {
      let response = await fetch(GRAPHURL, {
        method: METHOD,
        headers: HEADERS,
        body: JSON.stringify({
          query: `query {projectbyname(projectName: "${project}") { projectName, sprints { userStories { asA, iWantTo, soIcan, priority, initialRelativeEstimate, initialCostEstimate, tasks {description, member, status, hoursWorked} }, startDate, endDate }  }}`,
        }),
      });
      let json = await response.json();

      if ((index - 1) >= 0) {
        // console.log((json.data.projectbyname.sprints[index-1].userStories.find(e=>e.iWantTo===userStoryName)));
        cb((json.data.projectbyname.sprints[index - 1].userStories.find(e => e.iWantTo === userStoryName)));
      }
      //console.log((json.data.projectbyname.sprints[index-1].userStories.find(e=>e.iWantTo===userStoryName)));
      // cb(json.data.projectbyname.sprints.userStories.find(e=>e.iWantTo===userStoryName));
    } catch (error) {
      console.log(error);
    }
  },

  //Add subtask
  addNewSubtask: async (sprintNum, userStoryName, project, cb) => {


    try {
      //console.log(project.allSprints);
      let allSubtask = project.allSubtasks;
      allSubtask.push(project.subtask)

      //****************************************************************************************************************** */   
      let AllSprintResponse = await fetch(GRAPHURL, {
        method: METHOD,
        headers: HEADERS,
        body: JSON.stringify({
          query: `query {projectbyname(projectName: "${project.projectName}") { projectName, sprints { userStories { asA, iWantTo, soIcan, priority, initialRelativeEstimate, initialCostEstimate, tasks {description, member, status, hoursWorked} }, startDate, endDate } }}`,
        }),
      });
      let json = await AllSprintResponse.json();
      //console.log(json.data.projectbyname.sprints)

      //console.log(allsprintsToUpdate);
      //console.log(allsprintsToUpdate.at(sprintNum-1));


      const index = project.allSprints.findIndex(item => item.iWantTo === userStoryName); //index of sprints userStories to be updated

      let newallSprintsUserStories = [...project.allSprints]; // new all sprint's userStories
      project.sprint.tasks = allSubtask;
      newallSprintsUserStories[index] = project.sprint;

      //console.log(newallSprints);

      let allsprintsToUpdate = json.data.projectbyname.sprints;
      let newallSprintsInProject = [...allsprintsToUpdate];  // returns all sprints so that it can be used in a query (updateprojectsprints)
      //allsprintsToUpdate.at(sprintNum-1).userStories=newallSprintsUserStories;

      newallSprintsInProject.at(sprintNum - 1).userStories = newallSprintsUserStories;

      //let allsprintsToUpdate=json.data.projectbyname.sprints; // returns all sprints so that it can be used in a query (updateprojectsprints)
      console.log(newallSprintsInProject);
      //****************************************************************************************************************** */   
      let response2 = await fetch(GRAPHURL, {
        method: METHOD,
        headers: HEADERS,
        body: JSON.stringify({
          query: `mutation{
    updateprojectsprints(
    projectName: "${project.projectName}",
    sprints: [${newallSprintsInProject.map(x =>
            `{userStories: 
                      [${x.userStories.map(s =>
              `{asA: "${s.asA}", iWantTo: "${s.iWantTo}", soIcan: "${s.soIcan}", priority: ${s.priority},  
                          initialRelativeEstimate:${s.initialRelativeEstimate}, initialCostEstimate:${s.initialCostEstimate},
                            tasks:[${s.tasks.map(y => `{description: "${y.description}", member: "${y.member}", status: "${y.status}", hoursWorked: ${y.hoursWorked}}`)}]
                            }`
            )}],
                      startDate: "${x.startDate}",
                      endDate: "${x.endDate}"}
                  `)}
  
  ])
  {sprints { userStories { asA, iWantTo, soIcan, priority, initialRelativeEstimate, initialCostEstimate, tasks {description, member, status, hoursWorked} }, startDate, endDate } }
}`,
        }),
      });//end of response2


      let json2 = await response2.json();
      console.log(json2.data.updateprojectsprints);
      console.log("added successfully");
      cb(); //trigger 
    } catch (error) {
      console.log(error);
    }
  },


  //update sprint subtask
  updateSprintSubtask: async (sprintNum, userStoryName, project, cb) => {

    try {

      let AllSprintResponse = await fetch(GRAPHURL, {
        method: METHOD,
        headers: HEADERS,
        body: JSON.stringify({
          query: `query {projectbyname(projectName: "${project.projectName}") { projectName, sprints { userStories { asA, iWantTo, soIcan, priority, initialRelativeEstimate, initialCostEstimate, tasks {description, member, status, hoursWorked} }, startDate, endDate } }}`,
        }),
      });
      let json = await AllSprintResponse.json();

      const index = project.allSprints.findIndex(item => item.iWantTo === userStoryName); //index of sprints userStories to be updated

      let newallSprintsUserStories = [...project.allSprints]; // new all sprint's userStories
      project.sprint.tasks = project.newallSubtasks;
      newallSprintsUserStories[index] = project.sprint;

      let allsprintsToUpdate = json.data.projectbyname.sprints;  //from the query above
      let newallSprintsInProject = [...allsprintsToUpdate];  // returns all sprints so that it can be used in a query (updateprojectsprints)
      //allsprintsToUpdate.at(sprintNum-1).userStories=newallSprintsUserStories;

      newallSprintsInProject.at(sprintNum - 1).userStories = newallSprintsUserStories;

      let response2 = await fetch(GRAPHURL, {
        method: METHOD,
        headers: HEADERS,
        body: JSON.stringify({
          query: `mutation{
              updateprojectsprints(
              projectName: "${project.projectName}",
              sprints: [${newallSprintsInProject.map(x =>
                        `{userStories: 
                                [${x.userStories.map(s =>
                          `{asA: "${s.asA}", iWantTo: "${s.iWantTo}", soIcan: "${s.soIcan}", priority: ${s.priority},  
                                    initialRelativeEstimate:${s.initialRelativeEstimate}, initialCostEstimate:${s.initialCostEstimate},
                                      tasks:[${s.tasks.map(y => `{description: "${y.description}", member: "${y.member}", status: "${y.status}", hoursWorked: ${y.hoursWorked}}`)}]
                                      }`
                        )}],
                                startDate: "${x.startDate}",
                                endDate: "${x.endDate}"}
                            `)}

            ])
            {sprints { userStories { asA, iWantTo, soIcan, priority, initialRelativeEstimate, initialCostEstimate, tasks {description, member, status, hoursWorked} }, startDate, endDate } }
            }`,
        }),
      });//end of response2


      let json2 = await response2.json();
      console.log(json2.data.updateprojectsprints);
      console.log("saved successfully");
      cb(); //trigger 

    } catch (error) {
      console.log(error);
    }

  }//end of updateSprintSubtask function

};
export default sprintSubtaskService;


