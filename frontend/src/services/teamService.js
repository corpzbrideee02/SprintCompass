
//constant variables
const GRAPHURL = "http://localhost:5000/graphql";
const METHOD = "POST";
const HEADERS = { "Content-Type": "application/json; charset=utf-8" };


const teamServices = {
    //fetch teams
  fetchTeams: async (cb) => {
    try {
      let response = await fetch(GRAPHURL, {
        method: METHOD,
        headers: HEADERS,
        body: JSON.stringify({ query: "query { teams  { name, members { firstName, lastName, email, role } } }" }),
      });
      let json = await response.json();

      cb(json.data.teams);
    } catch (error) {
      console.log(error);
    }
  },
  teamMembersByProject:async (teamName,cb) => {
    try {
      let response = await fetch(GRAPHURL, {
        method: METHOD,
        headers: HEADERS,
        body: JSON.stringify({ query: "query { teams  { name, members { firstName, lastName, email, role } } }" }),
      });
      let json = await response.json();

      cb(json.data.teams.find(e=>e.name===teamName).members);
    } catch (error) {
      console.log(error);
    }
  },

  addNewTeam: async(team,cb)=>{
        try {
          let response = await fetch(GRAPHURL, {
            method: METHOD,
            headers: HEADERS,
            body: JSON.stringify({
              query: `mutation{addteam(name:"${team.name}", members: [${team.list.map(x=>`{firstName: "${x.firstName}", lastName: "${x.lastName}", email: "${x.email}", role: "${x.role}"}`)}]){name,members{firstName,lastName,email,role},projects}}`,
              
            }),
          });
          let json = await response.json();
          //console.log(json.data.addteam);
          cb(); //trigger the handleAfterCreateNewTeam
        } catch (error) {
          console.log(error);
        }
  },

  updateuserteams: async (user, cb) => {

    try {
        // let response1 = await fetch(GRAPHURL, {
        //     method: METHOD,
        //     headers: HEADERS,
        //     body: JSON.stringify({
        //       query: `query { users { firstName, lastName, email, password, teams, projects { team } } }`,
        //     }),
        //   });
        // let json1 = await response1.json();
        // let teamsOfUser=json1.data.users.find(x=>x.email===user.email).teams;
        // teamsOfUser.push(user.team);

      let response2 = await fetch(GRAPHURL, {
        method: METHOD,
        headers: HEADERS,
        body: JSON.stringify({
          query: `mutation{updateuserteams(email: "${user.email}", team: "${user.team}"){ firstName, lastName, email, password, teams }}`,
        }), 
      });
      let json2 = await response2.json();
      console.log(json2.data.updateuserteams.teams);
      //cb(); //trigger 
    } catch (error) {
      console.log(error);
      //props.dataFromChild(`${error.message} - advisory not added`);
    }
  },

}
export default teamServices;

//mutation($email: String, $teams: [String]) { updateuserteams(email: $email, teams: $teams){ firstName, lastName, email, password, teams }}
//`mutation{updateuserteams(email: "${user.email}", teams: \[${teamsList.map(x=>`"${x}"`)}\]){ firstName, lastName, email, password, teams }}`
// query: `mutation{addteam(name:"${team.name}", members: \[${team.list.map(x=>`{firstName: "${x.firstName}", lastName: "${x.lastName}", email: "${x.email}", role: "${x.role}"}`)}\]){name,members{firstName,lastName,email,role},projects}}`,
             
