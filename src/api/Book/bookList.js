import prisma from "../../prismaClient";

export default {
  Query: {
    bookList: async (_, args) => {
      const { category, page } = args;

      return await prisma.book.findMany({
        where: { category: category ? category : undefined },
        take: 12,
        skip: 12 * (page - 1)
      });
    }
  }
};
