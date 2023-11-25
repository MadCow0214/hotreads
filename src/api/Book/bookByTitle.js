import prisma from "../prismaClient";

export default {
  Query: {
    bookByTitle: async (_, { title }) => {
      return await prisma.book.findUnique({ 
        where: { title }
      });
    }
  }
};
