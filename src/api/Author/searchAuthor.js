import { prisma } from "../../../generated/prisma-client";

export default {
  Query: {
    searchAuthor: async (_, args) => {
      const { term, count } = args;

      if (!term) {
        return [];
      }

      const result = await prisma.authors({
        where: { name_contains: term },
        first: count
      });

      return result;
    }
  }
};
