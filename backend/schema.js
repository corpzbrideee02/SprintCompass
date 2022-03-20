const { buildSchema } = require("graphql");
const schema = buildSchema(`
    type Query {
        users: [User]
        userlogin(email: String, password: String): User
        teams: [Team]
        projects: [Project]
    },
    type Mutation {
        adduser(firstName: String, lastName: String, email: String, password: String,): User,
        updateuserteams(email:String, teams: [String]): User
        updateuserprojects(email: String, projects: [ProjectRoleInput]): User
        addteam(name: String, members: [MemberRoleInput]): Team
        updateteammembers(name: String, members: [MemberRoleInput]): Team
        updateteamprojects(name: String, projects: [String]): Team
        addproject(teamName: String, projectName: String, startDate: String, hoursToStoryPoint: Int, velocity: Int, totalEstimatedStoryPoints: Int, totalEstimatedCost: Float, team: [MemberRoleInput] ): Project
    },
    input ProjectRoleInput {
        project: String
        role: String
        team: String
    },
    type ProjectRole {
        project: String
        role: String
        team: String
    },
    type User {
        firstName: String
        lastName: String
        email: String
        password: String
        teams: [String]
        projects: [ProjectRole]
    },
    input MemberRoleInput {
        firstName: String
        lastName: String
        email: String
        role: String
    },
    type MemberRole {
        firstName: String
        lastName: String
        email: String
        role: String
    },
    type Team {
        name: String
        members: [MemberRole]
        projects: [String]
    },
    type Subtask {
        description: String
        member: String
        status: String
    },
    type UserStory {
        asA: String
        iWantTo: String
        soIcan: String
        priority: Int
        initialRelativeEstimate: Int
        initialCostEstimate: Float
        member: [String]
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
        team: [MemberRole]
        backlog: [UserStory]
        sprints: [Sprint]
    },
`);

module.exports = { schema };