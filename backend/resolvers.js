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
};

 module.exports = { resolvers };