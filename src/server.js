import "./env";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
//import "./passport";
//import { authenticateJwt } from "./passport";

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request })
});

server.express.use(logger("dev"));
//server.express.use(authenticateJwt);

const PORT = process.env.PORT || 4000;
server.start({ port: PORT }, () =>
  console.log(`Server running on port ${PORT}`)
);
