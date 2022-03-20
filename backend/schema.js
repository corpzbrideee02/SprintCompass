const { buildSchema } = require("graphql");
const schema = buildSchema(`
    type Query {
        users: [User],
        userlogin(username: String, password: String): User,
        projects: [Project]
    },
    type Mutation {
        adduser(firstName: String, lastName: String, username: String, password: String,): User,
        updateuserteams(username:String, teams: [String]): User
        updateuserprojects(username: String, projects: [ProjectRoleInput]): User
        addproject(teamName: String, projectName: String, startDate: String, hoursToStoryPoint: Int, velocity: Int, totalEstimatedCost: Float, users: [UserRoleInput] ): Project
    },
    input ProjectRoleInput {
        project: String
        role: String
    },
    type ProjectRole {
        project: String
        role: String
    },
    type User {
        firstName: String
        lastName: String
        username: String
        password: String
        teams: [String]
        projects: [ProjectRole]
    },
    input UserRoleInput {
        user: String
        role: String
    },
    type UserRole {
        user: String
        role: String
    },
    type Subtask {
        description: String,
        user: String
        status: String
    },
    type UserStory {
        asA: String
        iWantTo: String
        soIcan: String
        priority: Int
        initialRelativeEstimate: Int
        initialCostEstimate: Float
        tasks: [Subtask]
    },
    type Sprint {
        userStories: [UserStory]
        startDate: String
        endDate: String
    },
    type Project {
        teamName: String
        projectName: String
        startDate: String
        velocity: Int
        hoursToStoryPoint: Int
        totalEstimatedStoryPoints: Int
        totalEstimatedCost: Float
        users: [UserRole]
        backlog: [UserStory]
        sprints: [Sprint]
    },
`);

module.exports = { schema };