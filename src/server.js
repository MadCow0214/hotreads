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

app.use(logger("dev"));
app.use(helmet());

const yoga = createYoga({
  schema,
  context: ({ request }) => ({ checkAuthenticated }),
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }
});

const yogaRouter = express.Router()
yogaRouter.use(authenticateJwt);
yogaRouter.use(yoga);

app.use(yoga.graphqlEndpoint, yogaRouter);

const PORT = process.env.PORT || 4000;
app.listen(
  PORT, 
  () => console.log(`Server running on port ${PORT}`)
);
