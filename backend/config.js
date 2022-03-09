const dotenv = require("dotenv");
// const { processArgv } = require("yargs/build");
dotenv.config();
module.exports = {
    atlas: process.env.DBURL,
    appdb: process.env.DB,
    users: process.env.USERCOLLECTION,
    projects: process.env.PROJECTCOLLECTION,
    port: process.env.PORT,
};
