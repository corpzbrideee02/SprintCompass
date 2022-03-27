const dbRtns = require("./dbroutines");
const { users, teams, projects, } = require("./config");

const resolvers = {
    adduser: async (args) => {
        let db = await dbRtns.getDBInstance();
        let user = { firstName: args.firstName, lastName: args.lastName, email: args.email, email: args.email, password: args.password, teams: [], projects: [] };
        let results = await dbRtns.addOne(db, users, user);
        return results.acknowledged ? user : null;
    },
    users: async () => {
        let db = await dbRtns.getDBInstance();
        return await dbRtns.findAll(db, users, {}, {})
    },
    userlogin: async args => {
        let db = await dbRtns.getDBInstance();
        return await dbRtns.findOne( db, users, { email: args.email, password: args.password } )
    },
    updateuserteams: async (args) => {
        let db = await dbRtns.getDBInstance();
        let results = await dbRtns.updateOne( db, users, { email: args.email }, { teams: args.teams } );
        return  results.lastErrorObject.updatedExisting ? await dbRtns.findOne( db, users, { email: args.email } ) : null;
    },
    updateuserprojects: async (args) => {
        let db = await dbRtns.getDBInstance();
        let results = await dbRtns.updateOne( db, users, { email: args.email }, { projects: args.projects } );
        return  results.lastErrorObject.updatedExisting ? await dbRtns.findOne(db, users, { email: args.email } ) : null;
    },
    addteam: async (args) => {
        let db = await dbRtns.getDBInstance();
        let team = { name: args.name, members: args.members, projects: [] };
        let results = await dbRtns.addOne(db, teams, team);
        return results.acknowledged ? team : null;
    },
    teams: async () => {
        let db = await dbRtns.getDBInstance();
        return await dbRtns.findAll(db, teams, {}, {})
    },
    updateteammembers: async (args) => {
        let db = await dbRtns.getDBInstance();
        let results = await dbRtns.updateOne( db, teams, {name: args.name }, { members: args.members } );
        return  results.lastErrorObject.updatedExisting ? await dbRtns.findOne(db, teams, { name: args.name } ) : null;
    },
    updateteamprojects: async (args) => {
        let db = await dbRtns.getDBInstance();
        let results = await dbRtns.updateOne( db, teams, {name: args.name }, { projects: args.projects } );
        return  results.lastErrorObject.updatedExisting ? await dbRtns.findOne(db, teams, { name: args.name } ) : null;
    },
    addproject: async (args) => {
        let db = await dbRtns.getDBInstance();
        let project = { teamName: args.teamName, projectName: args.projectName, startDate: args.startDate, 
                        velocity: args.velocity, hoursToStoryPoint: args.hoursToStoryPoint,
                        totalEstimatedStoryPoints: args.totalEstimatedStoryPoints, 
                        totalEstimatedCost: args.totalEstimatedCost,
                        team: args.team, backlog: [], sprints: [] };
        let results = await dbRtns.addOne(db, projects, project);
        return results.acknowledged ? project : null;
    },
    projects: async () => {
        let db = await dbRtns.getDBInstance();
        return await dbRtns.findAll(db, projects, {}, {})
    },
    updateprojectbacklog: async (args) => {
        let db = await dbRtns.getDBInstance();
        let results = await dbRtns.updateOne( db, projects, {projectName: args.projectName }, { backlog: args.backlog } );
        return  results.lastErrorObject.updatedExisting ? await dbRtns.findOne(db, projects, { projectName: args.projectName } ) : null;
    },
    updateprojectsprints: async (args) => {
        let db = await dbRtns.getDBInstance();
        let results = await dbRtns.updateOne( db, projects, {projectName: args.projectName }, { sprints: args.sprints } );
        return  results.lastErrorObject.updatedExisting ? await dbRtns.findOne(db, projects, { projectName: args.projectName } ) : null;
    },
};

 module.exports = { resolvers };