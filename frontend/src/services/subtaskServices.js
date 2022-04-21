

//constant variables
const GRAPHURL = "http://localhost:5000/graphql";
const METHOD = "POST";
const HEADERS = { "Content-Type": "application/json; charset=utf-8" };

const subtaskServices = {
  //fetch backlogs
  fetchBacklogsByProject: async (project,cb) => {
    try {
      let response = await fetch(GRAPHURL, {
        method: METHOD,
        headers: HEADERS,
        body: JSON.stringify({
          query:`query {projectbyname(projectName: "${project}") { projectName,  backlog { asA, iWantTo, soIcan, priority, initialRelativeEstimate, initialCostEstimate, tasks {description, member, status, hoursWorked} },  }}`,
        }),
      });
      let json = await response.json();
      cb(json.data.projectbyname);
    } catch (error) {
      console.log(error);
    }
  },

   //fetch a backlog to be updated (for subtask)
   fetchOneBacklog: async (backlogName,project,cb) => {
    try {
      let response = await fetch(GRAPHURL, {
        method: METHOD,
        headers: HEADERS,
        body: JSON.stringify({
          query:`query {projectbyname(projectName: "${project}") { projectName,  backlog { asA, iWantTo, soIcan, priority, initialRelativeEstimate, initialCostEstimate, tasks {description, member, status, hoursWorked} },  }}`,
        }),
      });
      let json = await response.json();
      cb(json.data.projectbyname.backlog.find(e=>e.iWantTo===backlogName));
    } catch (error) {
      console.log(error);
    }
  },

  //Add subtask
  addNewSubtask: async(backlogName,project,cb)=>{
    
    //set new new backlogs to newallBackLogs
    try {
      //  console.log(project.allBackLogs);
       let allSubtask=project.allSubtasks;
       allSubtask.push(project.subtask)
   
   
   const index = project.allBackLogs.findIndex(item => item.iWantTo === backlogName);
   let newallBackLogs = [...project.allBackLogs]; // important to create a copy, otherwise you'll modify something
   project.backlog.tasks=allSubtask;
   newallBackLogs[index] = project.backlog;

   console.log(newallBackLogs);

      let response2 = await fetch(GRAPHURL, {
        method: METHOD,
        headers: HEADERS,
        body: JSON.stringify({
          query: `mutation{updateprojectbacklog(
            projectName: "${project.projectName}",
            backlog:  [${newallBackLogs.map(x=>`{asA: "${x.asA}", iWantTo: "${x.iWantTo}", soIcan: "${x.soIcan}", tasks:[${ x.tasks.map(y=>`{description: "${y.description}", member: "${y.member}", status: "${y.status}", hoursWorked: ${y.hoursWorked}}`)}], priority: ${x.priority}, initialRelativeEstimate:${x.initialRelativeEstimate}, initialCostEstimate:${x.initialCostEstimate}}`)}]
            ){backlog { asA, iWantTo, soIcan, priority, initialRelativeEstimate, initialCostEstimate, member, tasks {description, member, status, hoursWorked} }}}`,
        }), 
      });
      let json2 = await response2.json();
      console.log(json2.data.updateprojectbacklog);
      console.log("added successfully");
      cb(); //trigger 
    } catch (error) {
      console.log(error);
    }
  },



  //update subtask
  updateSubtask: async(backlogName,project,cb)=>{
    
    try {
   
   
   const index = project.allBackLogs.findIndex(item => item.iWantTo === backlogName);
   let newallBackLogs = [...project.allBackLogs]; // important to create a copy, otherwise you'll modify something
   project.backlog.tasks=project.newallSubtasks;
   newallBackLogs[index] = project.backlog;

   console.log(newallBackLogs);

      let response2 = await fetch(GRAPHURL, {
        method: METHOD,
        headers: HEADERS,
        body: JSON.stringify({
          query: `mutation{updateprojectbacklog(
            projectName: "${project.projectName}",
            backlog:  [${newallBackLogs.map(x=>`{asA: "${x.asA}", iWantTo: "${x.iWantTo}", soIcan: "${x.soIcan}", tasks:[${ x.tasks.map(y=>`{description: "${y.description}", member: "${y.member}", status: "${y.status}", hoursWorked: ${y.hoursWorked}}`)}], priority: ${x.priority}, initialRelativeEstimate:${x.initialRelativeEstimate}, initialCostEstimate:${x.initialCostEstimate}}`)}]
            ){backlog { asA, iWantTo, soIcan, priority, initialRelativeEstimate, initialCostEstimate, member, tasks {description, member, status, hoursWorked} }}}`,
        }), 
      });
      let json2 = await response2.json();
      console.log(json2.data.updateprojectbacklog);
      console.log("updated successfully");
      cb(); //trigger 
    } catch (error) {
      console.log(error);
    }
  },
};
export default subtaskServices;


// backlog:  [${project.allBackLogs.map(x=>x.asA===newallBackLogs)}]
       
