import { prisma } from "../../../generated/prisma-client";

export default {
  Mutation: {
    createAuthor: (_, args, { request, checkAuthenticated }) => {
      checkAuthenticated(request, true);

      const { name, desc } = args;

      return prisma.createAuthor({
        name,
        desc
      });
    }
  }
};
