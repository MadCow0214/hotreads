import prisma from "../../prismaClient";

export default {
  Query: {
    searchBook: async (_, args) => {
      const { term, count } = args;

      return await prisma.book.findMany({ 
        where: { title: { contains: term } },
        take: count
      });
    }
  }
};
