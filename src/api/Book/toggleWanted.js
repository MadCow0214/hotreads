import prisma from "../prismaClient";

export default {
  Mutation: {
    toggleWanted: async (_, args, { request, checkAuthenticated }) => {
      checkAuthenticated(request, true);

      const { bookId, curState } = args;
      const { user } = request;

      if (curState) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            wantedBooks: {
              disconnect: [{id: bookId}],
              update: {
                where: { id: bookId },
                update: {
                  data: {
                    wantedCount: {
                      decrement: 1,
                    }
                  }
                }
              }
            }
          }
        });
      } else {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            wantedBooks: {
              connect: { id: bookId },
              update: {
                where: { id: bookId },
                data: {
                  wantedCount: {
                    increment: 1,
                  }
                }
              },
            }
          }
        });
      }

      return true;
    }
  }
};
