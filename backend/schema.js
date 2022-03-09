const { buildSchema } = require("graphql");
const schema = buildSchema(`
    type Query {
        users: [User],  
        userbyname(name: String): User,
        countrybycode(code: String): Country,
        countrybyname(name: String): Country,
        countries: [Country],
    },
    type Mutation {
        adduser(name: String, age: Int, email: String): User,
        addcountry(code: String, name: String): Country
    },  
    type User {
        firstName: String
        lastName: String
        username: String
        password: String
        projects: [String]
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
        initialCostEstimate: Double
        tasks: [Subtasks]
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
        password: String
        projects: [String]
        velocity: Int
        hoursToStoryPoint: Int
        totalEstimatedStoryPoints: Int
        totalEstimatedCost: Double
        users: [UserRole]
        blacklog: [UserStory]
    },
`);

module.exports = { schema };