import { prisma } from "../../../generated/prisma-client";

export default {
  Query: {
    uploadedBooks: (_, args) => {
      const { nickName, page } = args;

      return prisma.user({ nickName }).uploadedBooks({
        first: 12,
        skip: 12 * (page - 1)
      });
    }
  }
};