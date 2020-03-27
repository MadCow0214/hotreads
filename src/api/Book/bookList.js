import { prisma } from "../../../generated/prisma-client";

export default {
  Query: {
    bookList: (_, args) => {
      const { category, page } = args;

      return prisma.books({
        where: { category: category ? category : undefined },
        first: 12,
        skip: 12 * (page - 1)
      });
    }
  }
};
