import "./env";
import schema from "./schema";
import { createYoga } from "graphql-yoga";
import express from "express"
import logger from "morgan";
import "./passport";
import { authenticateJwt } from "./passport";
import { checkAuthenticated } from "./middlewares";
import helmet from "helmet";

const app = express();

const yoga = createYoga({
  schema,
  context: ({ request }) => ({ request, checkAuthenticated }),
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }
});

app.use(logger("dev"));
app.use(helmet());
app.use(authenticateJwt);

app.use(yoga.graphqlEndpoint, yoga);

const PORT = process.env.PORT || 4000;
app.listen(
  PORT, 
  () => console.log(`Server running on port ${PORT}`)
);
