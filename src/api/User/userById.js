import prisma from "../../prismaClient";

export default {
  Query: {
    userById: async (_, args) => {
      const { id } = args;

      return await prisma.user.findUnique({ 
        where: { id }
      });
    }
  }
};
