import prisma from "../../prismaClient";

export default {
  Query: {
    bookByAuthor: async (_, args) => {
      const { name, page } = args;

      const { books } = await prisma.author.findUnique({ 
        where: { name },
        select: {
          books: {
            take: 12,
            skip: 12 * (page - 1)
          }
        }
      });
      
      return books;
    }
  }
};
