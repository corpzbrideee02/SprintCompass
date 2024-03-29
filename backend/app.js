const { port } = require("./config");
const fastify = require("fastify")({ logger: true });
const mercurius = require("mercurius");
const { resolvers } = require("./resolvers");
const { schema } = require("./schema");
const path = require('path');

// additions for handling static file
fastify.register(require("fastify-static"), {
    root: path.join(__dirname, "public"),
    prefix: "/",
});

fastify.get("/", (req, reply) => reply.sendFile("index.html"));
    // if user refreshes page
    fastify.setNotFoundHandler((req, res) => {
    res.sendFile("index.html");
});

fastify.register(require("fastify-cors"), {}); // comment out when site goes online

fastify.register(mercurius, {
    schema,
    resolvers,
    graphiql: true, // web page for to test queries
});

// start the fastify server
fastify.listen(process.env.PORT || 5000, "0.0.0.0", (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});