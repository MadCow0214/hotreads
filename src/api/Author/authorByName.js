import { prisma } from "../../../generated/prisma-client";

export default {
  Query: {
    authorByName: (_, args) => {
      const { name } = args;

      return prisma.author({ name });
    }
  }
};
