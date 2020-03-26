import "./env";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import "./passport";
import cors from "cors";
import { authenticateJwt } from "./passport";
import { checkAuthenticated } from "./middlewares";
import helmet from "helmet";

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, checkAuthenticated })
});

server.express.use(cors());
server.express.use(logger("dev"));
server.express.use(helmet());
server.express.use(authenticateJwt);

const PORT = process.env.PORT || 4000;
server.start({ port: PORT, cors: { origin: process.env.FRONTEND_URL } }, () =>
  console.log(`Server running on port ${PORT}`)
);
