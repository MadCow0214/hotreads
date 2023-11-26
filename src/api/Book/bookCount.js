import prisma from "../../prismaClient";

export default {
  Query: {
    bookCount: async (_, args) => {
      const { category } = args;

      const books = await prisma.book.findMany({
        where: { category: category ? category : undefined },
        select: {
          id: true,
        }
      });

      return books.length;
    }
  }
};
