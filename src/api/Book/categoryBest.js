import prisma from "../../prismaClient";

export default {
  Query: {
    categoryBest: async (_, args) => {
      const { category } = args;

      return await prisma.book.findMany({
        where: { category },
        orderBy: {
          avgStar: 'desc',
        },
        take: 9
      });
    }
  }
};
