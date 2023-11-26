import prisma from "../../prismaClient";

export default {
  Query: {
    wantedBooks: async (_, args) => {
      const { nickName, page } = args;

      const { wantedBooks } = await prisma.user.findUnique({ 
        where: { nickName },
        select: {
          wantedBooks: {
            take: 12,
            skip: 12 * (page - 1)
          }
        }
      });

      return wantedBooks;
    }
  }
};
