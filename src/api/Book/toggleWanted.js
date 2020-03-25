import { prisma } from "../../../generated/prisma-client";

export default {
  Mutation: {
    toggleWanted: async (_, args, { request, checkAuthenticated }) => {
      checkAuthenticated(request, true);

      const { bookId, curState } = args;
      const { user } = request;

      if (curState) {
        await prisma.updateUser({
          where: { id: user.id },
          data: {
            wantedBooks: { disconnect: { id: bookId } }
          }
        });
      } else {
        await prisma.updateUser({
          where: { id: user.id },
          data: {
            wantedBooks: { connect: { id: bookId } }
          }
        });
      }

      const wantedCount = await prisma
        .usersConnection({ where: { wantedBooks_some: { id: bookId } } })
        .aggregate()
        .count();

      await prisma.updateBook({
        where: { id: bookId },
        data: {
          wantedCount
        }
      });

      return true;
    }
  }
};
