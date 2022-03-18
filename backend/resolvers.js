const dbRtns = require("./dbroutines");
const { users, projects } = require("./config");

const resolvers = {
    adduser: async (args) => {
        let db = await dbRtns.getDBInstance();
        let user = { firstName: args.firstName, lastName: args.lastName, username: args.username, password: args.password, projects: []};
        let results = await dbRtns.addOne(db, users, user);
        return results.acknowledged ? user : null;
    },
    users: async () => {
        let db = await dbRtns.getDBInstance();
        return await dbRtns.findAll(db, users, {}, {})
    },
    userlogin: async args => {
        let db = await dbRtns.getDBInstance();
        return await dbRtns.findOne(db, users, {username: args.username, password: args.password})
    },
    updateuserprojects: async (args) => {
        let db = await dbRtns.getDBInstance();
        let results = await dbRtns.updateOne(db, users, {username: args.username}, {projects:args.projects});
        return  results.lastErrorObject.updatedExisting ? await dbRtns.findOne(db, users, {username: args.username}) : null;
    },
};

 module.exports = { resolvers };