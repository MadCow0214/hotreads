import { mergeSchemas } from "@graphql-tools/schema";
import { loadFilesSync } from "@graphql-tools/load-files";
import { createSchema } from "graphql-yoga";
import path from "path";

const allTypes = loadFilesSync(path.join(__dirname, "/api/**/*.graphql"));
const allResolvers = loadFilesSync(path.join(__dirname, "/api/**/*.js"));

const schema = mergeSchemas({
  typeDefs: allTypes,
  resolvers: allResolvers
});

export default schema;
