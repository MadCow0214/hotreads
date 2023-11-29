import prisma from "../../prismaClient";

export default {
  Mutation: {
    toggleWanted: async (_, args, { req, checkAuthenticated }) => {
      checkAuthenticated(req, true);

      const { bookId, curState } = args;
      const { user } = req;

      if (curState) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            wantedBooks: {
              update: {
                where: { id: bookId },
                update: {
                  data: {
                    wantedCount: {
                      decrement: 1,
                    }
                  }
                }
              },
              disconnect: [{id: bookId}],
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
