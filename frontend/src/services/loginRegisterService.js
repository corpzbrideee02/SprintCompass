//constant variables
const GRAPHURL = "http://localhost:5000/graphql";
const METHOD = "POST";
const HEADERS = { "Content-Type": "application/json; charset=utf-8" };

const loginRegisterServices = {
    //login user
    userLogin: async (props,user, cb) => {
        try {
          let response = await fetch(GRAPHURL, {
            method: METHOD,
            headers: HEADERS,
            body: JSON.stringify({query: `query {userlogin(email: "${user.email}", password: "${user.password}"){firstName, lastName, email, password, teams, projects { project, role, team } }}`}),
          });
          let json = await response.json();
    
         if(json.data.userlogin==null){
            props.dataFromChild( `login failed`);
          }
          else if (json.data.userlogin.email === user.email && json.data.userlogin.password === user.password) { //Success
          //  console.log(json.data.userlogin);
           cb(json.data.userlogin); //callback that will trigger loginSuccess() in Login.js
           props.dataFromChild( `login success` );
          }
    
        } catch (error) {
          console.log(error);
          props.dataFromChild(`Problem loading server data - ${error.message}`);
        }
      },

      registerUser:async (props,user, cb)=>{
        try {
            let response = await fetch(GRAPHURL, {
                method: METHOD,
                headers: HEADERS,
                body: JSON.stringify({query: `mutation {adduser(firstName: "${user.firstname}", lastName: "${user.lastname}", email: "${user.email}", password: "${user.password}" )
                {firstName, lastName, email, password}}`}),
              });
              let json = await response.json();
              cb();  //callback that will trigger handleRegister() in Register.js
              props.dataFromChild(`User ${json.data.adduser.firstName} ${json.data.adduser.lastName} added!`);

          }
          catch (error) {
            props.dataFromChild(`${error.message} - user failed to register`);
          }
      }

};

export default loginRegisterServices;
