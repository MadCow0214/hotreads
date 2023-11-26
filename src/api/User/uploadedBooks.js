import prisma from "../../prismaClient";

export default {
  Query: {
    uploadedBooks: async (_, args) => {
      const { nickName, page } = args;

      return await prisma.user.findUnique({ 
        where: { nickName },
        select: {
          uploadedBooks: {
            take: 12,
            skip: 12 * (page - 1)
          }
        }
      });
    }
  }
};
