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

        return true;
      }

      await prisma.updateUser({
        where: { id: user.id },
        data: {
          wantedBooks: { connect: { id: bookId } }
        }
      });

      return true;
    }
  }
};
