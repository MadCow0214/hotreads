import prisma from "../prismaClient";

export default {
  Query: {
    bookCount: (_, args) => {
      const { category } = args;

      return prisma
        .booksConnection({ where: { category: category ? category : undefined } })
        .aggregate()
        .count();
    }
  }
};
