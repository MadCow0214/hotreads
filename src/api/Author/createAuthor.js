import prisma from "../../prismaClient";

export default {
  Mutation: {
    createAuthor: async (_, args, { req, checkAuthenticated }) => {
      checkAuthenticated(req, true);

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
