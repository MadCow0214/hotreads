import { prisma } from "../../../generated/prisma-client";

export default {
  Query: {
    categoryBest: (_, args) => {
      const { category } = args;

      return prisma.books({
        where: { category },
        orderBy: "avgStar_DESC",
        first: 9
      });
    }
  }
};
