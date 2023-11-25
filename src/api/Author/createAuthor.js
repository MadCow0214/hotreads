import prisma from "../prismaClient";

export default {
  Mutation: {
    createAuthor: async (_, args, { request, checkAuthenticated }) => {
      checkAuthenticated(request, true);

      const { name, desc } = args;

      return await prisma.author.create({
        data: {
          name,
          desc
        }
      });
    }
  }
};
