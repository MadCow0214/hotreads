import prisma from '../prismaClient';

export default {
  Query: {
    authorByName: async (_, args) => {
      const { name } = args;

      return await prisma.author.findUnique({ 
        where: { name }
      });
    }
  }
};
