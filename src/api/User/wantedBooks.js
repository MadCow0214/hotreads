import { prisma } from "../../../generated/prisma-client";

export default {
  Query: {
    wantedBooks: (_, args) => {
      const { nickName, page } = args;

      return prisma.user({ nickName }).wantedBooks({
        first: 12,
        skip: 12 * (page - 1)
      });
    }
  }
};
