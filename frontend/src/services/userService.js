//constant variables
const GRAPHURL = "http://localhost:5000/graphql";
const METHOD = "POST";
const HEADERS = { "Content-Type": "application/json; charset=utf-8" };

const userServices = {
  //fetch users
  fetchUsers: async (cb) => {
    try {
      let response = await fetch(GRAPHURL, {
        method: METHOD,
        headers: HEADERS,
        body: JSON.stringify({
          query:
            "query { users { firstName, lastName, email, password, teams, projects { project, role, team } } }",
        }),
      });
      let json = await response.json();
      //props.dataFromChild(`found ${json.data..length} users`);
      cb(json.data.users);
    } catch (error) {
      console.log(error);
      //props.dataFromChild(`Problem loading server data - ${error.message}`);
    }
  },

   //fetch teams of user
   fetchUsersTeams: async (email,cb) => {
    try {
      let response = await fetch(GRAPHURL, {
        method: METHOD,
        headers: HEADERS,
        body: JSON.stringify({
          query:
            "query { users { firstName, lastName, email, password, teams, projects { project, role, team } } }",
        }),
      });
      let json = await response.json();
      cb(json.data.users.find(e=>e.email===email).teams);
    } catch (error) {
      console.log(error);
    }
  },
};
export default userServices;
