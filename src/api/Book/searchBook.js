import { prisma } from "../../../generated/prisma-client";

export default {
  Query: {
    searchBook: (_, args) => {
      const { term, count } = args;

      return prisma.books({ where: { title_contains: term }, first: count });
    }
  }
};
