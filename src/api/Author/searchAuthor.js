import prisma from "../prismaClient";

export default {
  Query: {
    searchAuthor: async (_, args) => {
      const { term, count } = args;

      if (!term) {
        return [];
      }

      const result = await prisma.author.findMany({
        where: { name: { contains: term } },
        take: count
      });

      return result;
    }
  }
};
