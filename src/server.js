import "./env";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import "./passport";
import cors from "cors";
import { authenticateJwt } from "./passport";
import { checkAuthenticated } from "./middlewares";

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, checkAuthenticated })
});

server.express.use(logger("dev"));
server.express.use(authenticateJwt);
server.express.use(cors());

const PORT = process.env.PORT || 4000;
server.start({ port: PORT }, () => console.log(`Server running on port ${PORT}`));
