
//constant variables
const GRAPHURL = "http://localhost:5000/graphql";
const METHOD = "POST";
const HEADERS = { "Content-Type": "application/json; charset=utf-8" };

const backlogServices = {

  fetchBacklogs: async (projectName,cb) => {
    try {
      let response = await fetch(GRAPHURL, {
        method: METHOD,
        headers: HEADERS,
        body: JSON.stringify({ query: "query { projects {backlog { asA, iWantTo, soIcan, priority, initialRelativeEstimate, initialCostEstimate, tasks {description, member, status, hoursWorked} }} }" }),
      });
      let json = await response.json();

      cb(json.data.projects.find(e=>e.projectName===projectName).backlog);
    } catch (error) {
      console.log(error);
    }
  },
//NOTE: updated backlog's task (04-15-22)
  addNewBacklog: async(project,cb)=>{
    try {

       // let allPB=project.allBackLogs;
       // allPB.push(project.backlog)

      let response2 = await fetch(GRAPHURL, {
        method: METHOD,
        headers: HEADERS,
        body: JSON.stringify({
          query: `mutation{updateprojectbacklog(
            projectName: "${project.projectName}",
            backlog:  [${project.allBackLogs.map(x=>`{asA: "${x.asA}", iWantTo: "${x.iWantTo}", soIcan: "${x.soIcan}", priority: ${x.priority}, initialRelativeEstimate:${x.initialRelativeEstimate}, initialCostEstimate:${x.initialCostEstimate}}`)}]
            ){backlog { asA, iWantTo, soIcan, priority, initialRelativeEstimate, initialCostEstimate, member, tasks {description, member, status, hoursWorked } }}}`,
        }), 
      });
      let json2 = await response2.json();
      console.log(json2.data.updateprojectbacklog);
      console.log("added successfully");
      cb(); //trigger 
    } catch (error) {
      console.log(error);
      //props.dataFromChild(`${error.message} - advisory not added`);
    }
  },

  addNewSprint: async(project,cb)=>{
    try {

      let response2 = await fetch(GRAPHURL, {
        method: METHOD,
        headers: HEADERS,
        body: JSON.stringify({
          query: `mutation { addnewsprint( projectName: "${project.projectName}", startDate: "${project.startDate}", endDate: "${project.endDate}" )
          {sprints {startDate, endDate, userStories {asA, iWantTo, soIcan, priority, initialRelativeEstimate, initialCostEstimate, member, tasks {description, member, status, hoursWorked} } } } }`,
        }), 
      });
      let json2 = await response2.json();
      console.log(json2.data.addnewsprint);
      console.log("added successfully");
      cb(); //trigger 
    } catch (error) {
      console.log("something went wrong");
      console.log(error);
      //props.dataFromChild(`${error.message} - advisory not added`);
    }
  },

  updateBacklog: async(project,cb)=>{
    try {

      //let allPB=project.allBackLogs;

      let response = await fetch(GRAPHURL, {
        method: METHOD,
        headers: HEADERS,
        body: JSON.stringify({
          query: `mutation{updateprojectbacklog(
            projectName: "${project.projectName}",
            backlog:  [${project.backlog.map(x=>`{asA: "${x.asA}", iWantTo: "${x.iWantTo}", soIcan: "${x.soIcan}", tasks:[${ x.tasks.map(y=>`{description: "${y.description}", member: "${y.member}", status: "${y.status}", hoursWorked: ${y.hoursWorked}}`)}], priority: ${x.priority}, initialRelativeEstimate:${x.initialRelativeEstimate}, initialCostEstimate:${x.initialCostEstimate}}`)}]
            ){backlog { asA, iWantTo, soIcan, priority, initialRelativeEstimate, initialCostEstimate, member, tasks {description, member, status, hoursWorked} }}}`,
        }), 
      });

      let json = await response.json();
      console.log(json.data.updateprojectbacklog);
      console.log("updated successfully");
      cb(); //trigger 
    } catch (error) {
      console.log(error);
      //props.dataFromChild(`${error.message} - advisory not added`);
    }
  },

  moveToSprint: async(project, addIndex, removeIndex, userStory, cb) => {
    try{
      let response2;

     if (project.sprints !== undefined)
     {
        response2 = await fetch(GRAPHURL, {
          method: METHOD,
          headers: HEADERS,
          body: JSON.stringify({
            query: `mutation{movetosprint(
              projectName: "${project.projectName}",
              addIndex: ${addIndex},
              removeIndex: ${removeIndex},
              userStory: {asA: "${userStory.asA}", iWantTo: "${userStory.iWantTo}", soIcan: "${userStory.soIcan}", tasks:[${ userStory.tasks.map(y=>`{description: "${y.description}", member: "${y.member}", status: "${y.status}", hoursWorked: ${y.hoursWorked}}`)}], priority: ${userStory.priority}, initialRelativeEstimate:${userStory.initialRelativeEstimate}, initialCostEstimate:${userStory.initialCostEstimate}}
              ){sprints {startDate, endDate, userStories {asA, iWantTo, soIcan, priority, initialRelativeEstimate, initialCostEstimate, member, tasks {description, member, status, hoursWorked} } } }}`,
          }), 
        });
     }
      let json2 = await response2.json();
      console.log(json2.data.movetosprint);
      console.log("updated successfully");
      cb(); //trigger 

    } catch (error) {
      console.log(error);
      //props.dataFromChild(`${error.message} - advisory not added`);
    }  
  },
  updateSprint: async(project, sprintIndex, userStoryIndex, userStory, cb) => {
    try{
      let response2;

     if (project.sprints !== undefined)
     {
        response2 = await fetch(GRAPHURL, {
          method: METHOD,
          headers: HEADERS,
          body: JSON.stringify({
            query: `mutation{updateprojectsprints(
              projectName: "${project.projectName}",
              sprintIndex: ${sprintIndex},
              userStoryIndex: ${userStoryIndex},
              userStory: {asA: "${userStory.asA}", iWantTo: "${userStory.iWantTo}", soIcan: "${userStory.soIcan}", tasks:[${ userStory.tasks.map(y=>`{description: "${y.description}", member: "${y.member}", status: "${y.status}", hoursWorked: ${y.hoursWorked}}`)}], priority: ${userStory.priority}, initialRelativeEstimate:${userStory.initialRelativeEstimate}, initialCostEstimate:${userStory.initialCostEstimate}}
              ){sprints {startDate, endDate, userStories {asA, iWantTo, soIcan, priority, initialRelativeEstimate, initialCostEstimate, member, tasks {description, member, status, hoursWorked} } } }}`,
          }), 
        });
     }
      let json2 = await response2.json();
      console.log(json2.data.movetosprint);
      console.log("updated successfully");
      cb(); //trigger 

    } catch (error) {
      console.log(error);
      //props.dataFromChild(`${error.message} - advisory not added`);
    }  
  }
};

export default backlogServices;