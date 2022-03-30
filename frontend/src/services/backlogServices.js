
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
        body: JSON.stringify({ query: "query { projects {backlog { asA, iWantTo, soIcan, priority, initialRelativeEstimate, initialCostEstimate, tasks {description, member, status} }} }" }),
      });
      let json = await response.json();

      cb(json.data.projects.find(e=>e.projectName===projectName).backlog);
    } catch (error) {
      console.log(error);
    }
  },

  addNewBacklog: async(project,cb)=>{
    try {

        let allPB=project.allBackLogs;
        allPB.push(project.backlog)

      let response2 = await fetch(GRAPHURL, {
        method: METHOD,
        headers: HEADERS,
        body: JSON.stringify({
          query: `mutation{updateprojectbacklog(
            projectName: "${project.projectName}",
            backlog:  [${project.allBackLogs.map(x=>`{asA: "${x.asA}", iWantTo: "${x.iWantTo}", soIcan: "${x.soIcan}", tasks:[], priority: ${x.priority}, initialRelativeEstimate:${x.initialRelativeEstimate}, initialCostEstimate:${x.initialCostEstimate}}`)}]
            ){backlog { asA, iWantTo, soIcan, priority, initialRelativeEstimate, initialCostEstimate, member, tasks {description, member, status} }}}`,
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

};

export default backlogServices;